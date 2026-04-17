import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const grad = require("../assets/images/grad-bg.jpg");

export default function AnketaScreen({ embedded = false } = {}) {
  const [voted, setVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  const pollData = {
    question: "Koji vam je omiljeni dio stare jezgre Zadra?",
    options: [
      { id: 1, text: "Morske orgulje", votes: 45 },
      { id: 2, text: "Forum", votes: 30 },
      { id: 3, text: "Trg pet bunara", votes: 15 },
      { id: 4, text: "Kalelarga", votes: 10 },
    ],
  };

  const handleVote = (id) => {
    if (!voted) {
      setSelectedOption(id);
      setVoted(true);
    }
  };

  const Content = (
    <>
      {/* Header (samo za full-screen) */}
      {!embedded ? (
        <View style={styles.headerRow}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={28} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Dnevna Anketa</Text>
          <View style={{ width: 28 }} />
        </View>
      ) : null}

      {/* Glavna Kartica s Pitanjem */}
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
              <Text style={styles.questionText}>{pollData.question}</Text>
              <Text style={styles.wideCardDescription}>
                Vaše mišljenje nam je važno kako bismo unaprijedili turističku ponudu grada.
              </Text>
            </View>
          </View>
        </BlurView>
      </View>

      {/* Opcije za glasanje */}
      <View style={styles.optionsContainer}>
        {pollData.options.map((option) => (
          <TouchableOpacity
            key={option.id}
            disabled={voted}
            onPress={() => handleVote(option.id)}
            style={styles.optionWrapper}
          >
            <BlurView
              intensity={voted && selectedOption === option.id ? 60 : 30}
              tint={voted && selectedOption === option.id ? "light" : "dark"}
              style={[
                styles.optionGlass,
                voted && selectedOption === option.id && styles.selectedOptionBorder,
              ]}
            >
              <View style={styles.optionContent}>
                <Text style={styles.optionText}>{option.text}</Text>
                {voted && <Text style={styles.percentageText}>{option.votes}%</Text>}
              </View>

              {/* Progress bar koji se pojavljuje nakon glasanja */}
              {voted && (
                <View style={styles.progressBarBg}>
                  <View
                    style={[
                      styles.progressBarFill,
                      {
                        width: `${option.votes}%`,
                        backgroundColor:
                          selectedOption === option.id ? "#f59e0b" : "rgba(255,255,255,0.3)",
                      },
                    ]}
                  />
                </View>
              )}
            </BlurView>
          </TouchableOpacity>
        ))}
      </View>

      {voted && (
        <View style={styles.thankYouBox}>
          <Ionicons name="checkmark-circle" size={20} color="#10b981" />
          <Text style={styles.thankYouText}>Hvala vam na sudjelovanju!</Text>
        </View>
      )}
    </>
  );

  return (
    embedded ? (
      <View style={styles.embeddedWrap}>{Content}</View>
    ) : (
      <ImageBackground source={grad} style={styles.background}>
        <View style={styles.overlay}>
          <View style={styles.safeArea}>
            <ScrollView showsVerticalScrollIndicator={false}>{Content}</ScrollView>
          </View>
        </View>
      </ImageBackground>
    )
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  safeArea: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  embeddedWrap: { paddingHorizontal: 0, paddingTop: 0 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  backButton: { width: 40, height: 40, justifyContent: 'center' },

  // Wide Card Styles
  wideCardWrapper: { width: "100%", borderRadius: 25, overflow: "hidden", marginBottom: 30 },
  wideGlassCard: { padding: 20, minHeight: 180 },
  headerRow1: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  wideCardTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginLeft: 12 },
  textContainer80: { width: "85%", alignSelf: "flex-start" },
  questionText: { color: "#fff", fontSize: 19, fontWeight: '700', marginBottom: 8 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.7)", lineHeight: 20 },

  // Polling Options
  optionsContainer: { gap: 15 },
  optionWrapper: { width: '100%', borderRadius: 15, overflow: 'hidden' },
  optionGlass: { padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  selectedOptionBorder: { borderColor: '#f59e0b' },
  optionContent: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 },
  optionText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  percentageText: { color: '#f59e0b', fontSize: 16, fontWeight: 'bold' },
  
  // Progress Bar
  progressBarBg: { height: 6, backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: 3, marginTop: 10, overflow: 'hidden' },
  progressBarFill: { height: '100%', borderRadius: 3 },

  thankYouBox: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: 30, gap: 8 },
  thankYouText: { color: '#10b981', fontSize: 15, fontWeight: '600' }
});