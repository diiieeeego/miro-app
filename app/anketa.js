import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BottomTabBar from "../components/BottomTabBar";
import { supabase } from "../lib/supabase";

const { width } = Dimensions.get("window");
const grad = require("../assets/images/grad-bg.jpg");

function generateToken() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}

export default function AnketaScreen() {
  const [survey, setSurvey] = useState(null);
  const [options, setOptions] = useState([]);
  const [stats, setStats] = useState([]);
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadSurvey();
  }, []);

  async function loadSurvey() {
    try {
      setLoading(true);
      setError(null);

      const { data: surveys, error: surveyErr } = await supabase
        .from("surveys")
        .select("id, title, description")
        .eq("is_active", true)
        .order("created_at", { ascending: false })
        .limit(1);

      if (surveyErr) throw surveyErr;
      if (!surveys || surveys.length === 0) {
        setError("Trenutno nema aktivnih anketa.");
        return;
      }

      const activeSurvey = surveys[0];
      setSurvey(activeSurvey);

      const { data: opts, error: optsErr } = await supabase
        .from("survey_options")
        .select("id, label, position")
        .eq("survey_id", activeSurvey.id)
        .order("position");

      if (optsErr) throw optsErr;
      setOptions(opts || []);

      const storedToken = await AsyncStorage.getItem(`voted_${activeSurvey.id}`);
      if (storedToken) {
        setVoted(true);
        await loadStats(activeSurvey.id);
      }
    } catch (e) {
      setError("Greška pri učitavanju ankete.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  async function loadStats(surveyId) {
    const { data, error: statsErr } = await supabase
      .from("survey_statistics")
      .select("option_id, vote_percentage")
      .eq("survey_id", surveyId);

    if (!statsErr && data) setStats(data);
  }

  async function handleVote(optionId) {
    if (voted || submitting || !survey) return;

    try {
      setSubmitting(true);
      setSelectedOption(optionId);

      const token = generateToken();

      const { error: insertErr } = await supabase
        .from("survey_responses")
        .insert({ survey_id: survey.id, option_id: optionId, respondent_token: token });

      if (insertErr) throw insertErr;

      await AsyncStorage.setItem(`voted_${survey.id}`, token);
      setVoted(true);
      await loadStats(survey.id);
    } catch (e) {
      setSelectedOption(null);
      setError("Greška pri slanju glasa. Pokušajte ponovo.");
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  }

  function getPercentage(optionId) {
    const stat = stats.find((s) => s.option_id === optionId);
    return stat ? parseFloat(stat.vote_percentage) : 0;
  }

  if (loading) {
    return (
      <ImageBackground source={grad} style={styles.background}>
        <View style={[styles.overlay, styles.centered]}>
          <ActivityIndicator size="large" color="#f59e0b" />
          <Text style={styles.loadingText}>Učitavanje ankete...</Text>
        </View>
      </ImageBackground>
    );
  }

  return (
    <ImageBackground source={grad} style={styles.background}>
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          <Text style={[styles.headerTitle, { marginBottom: 25 }]}>Dnevna Anketa</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>

            <View style={styles.wideCardWrapper}>
              <BlurView intensity={20} tint="dark" style={styles.wideGlassCard}>
                <ImageBackground
                  source={require("../assets/images/explore1.jpg")}
                  style={StyleSheet.absoluteFill}
                  imageStyle={{ opacity: 0.2 }}
                />
                <View style={styles.wideContent}>
                  <View style={styles.headerRow1}>
                    <MaterialCommunityIcons name="comment-question" size={26} color="#f59e0b" />
                    <Text style={styles.wideCardTitle}>Pitanje dana</Text>
                  </View>
                  <View style={styles.textContainer80}>
                    <Text style={styles.questionText}>
                      {survey ? survey.title : "Nema aktivnih anketa"}
                    </Text>
                    <Text style={styles.wideCardDescription}>
                      {survey?.description ||
                        "Vaše mišljenje nam je važno kako bismo unaprijedili turističku ponudu grada."}
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {error && <Text style={styles.errorText}>{error}</Text>}

            {survey && (
              <View style={styles.optionsContainer}>
                {options.map((option) => {
                  const pct = getPercentage(option.id);
                  const isSelected = selectedOption === option.id;
                  return (
                    <TouchableOpacity
                      key={option.id}
                      disabled={voted || submitting}
                      onPress={() => handleVote(option.id)}
                      style={styles.optionWrapper}
                    >
                      <BlurView
                        intensity={voted && isSelected ? 60 : 30}
                        tint={voted && isSelected ? "light" : "dark"}
                        style={[
                          styles.optionGlass,
                          voted && isSelected && styles.selectedOptionBorder,
                        ]}
                      >
                        <View style={styles.optionContent}>
                          <Text style={styles.optionText}>{option.label}</Text>
                          {voted && (
                            <Text style={styles.percentageText}>{pct.toFixed(0)}%</Text>
                          )}
                        </View>
                        {voted && (
                          <View style={styles.progressBarBg}>
                            <View
                              style={[
                                styles.progressBarFill,
                                {
                                  width: `${pct}%`,
                                  backgroundColor: isSelected
                                    ? "#f59e0b"
                                    : "rgba(255,255,255,0.3)",
                                },
                              ]}
                            />
                          </View>
                        )}
                      </BlurView>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}

            {submitting && (
              <View style={styles.thankYouBox}>
                <ActivityIndicator size="small" color="#f59e0b" />
                <Text style={[styles.thankYouText, { color: "#f59e0b" }]}>Slanje glasa...</Text>
              </View>
            )}

            {voted && !submitting && (
              <View style={styles.thankYouBox}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
                <Text style={styles.thankYouText}>Hvala vam na sudjelovanju!</Text>
              </View>
            )}

          </ScrollView>
        </View>
        <BottomTabBar />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  centered: { justifyContent: "center", alignItems: "center", gap: 12 },
  safeArea: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  loadingText: { color: "rgba(255,255,255,0.7)", fontSize: 15 },
  errorText: { color: "#f87171", fontSize: 14, textAlign: "center", marginBottom: 16 },

  wideCardWrapper: { width: "100%", borderRadius: 25, overflow: "hidden", marginBottom: 30 },
  wideGlassCard: { padding: 20, minHeight: 180 },
  headerRow1: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  wideCardTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginLeft: 12 },
  textContainer80: { width: "85%", alignSelf: "flex-start" },
  questionText: { color: "#fff", fontSize: 19, fontWeight: "700", marginBottom: 8 },
  wideCardDescription: { fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 20 },

  optionsContainer: { gap: 15 },
  optionWrapper: { width: "100%", borderRadius: 15, overflow: "hidden" },
  optionGlass: { padding: 18, borderWidth: 1, borderColor: "rgba(255,255,255,0.1)" },
  selectedOptionBorder: { borderColor: "#f59e0b" },
  optionContent: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 5 },
  optionText: { color: "#fff", fontSize: 16, fontWeight: "600" },
  percentageText: { color: "#f59e0b", fontSize: 16, fontWeight: "bold" },

  progressBarBg: { height: 6, backgroundColor: "rgba(255,255,255,0.1)", borderRadius: 3, marginTop: 10, overflow: "hidden" },
  progressBarFill: { height: "100%", borderRadius: 3 },

  thankYouBox: { flexDirection: "row", alignItems: "center", justifyContent: "center", marginTop: 30, gap: 8 },
  thankYouText: { color: "#10b981", fontSize: 15, fontWeight: "600" },
});
