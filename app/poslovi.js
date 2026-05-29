import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";
import BottomTabBar from "../components/BottomTabBar";

const grad = require("../assets/images/grad-bg.jpg");

function formatDate(dateStr) {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return d.toLocaleDateString("hr-HR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function formatSalary(salary) {
  if (!salary) return null;
  return new Intl.NumberFormat("hr-HR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(salary);
}

export default function PosloviScreen() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  async function fetchJobs() {
    setLoading(true);
    setError(null);
    const { data, error } = await supabase
      .from("jobs")
      .select("*")
      .eq("is_active", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error.message);
      setError(error.message);
    } else {
      setJobs(data || []);
    }
    setLoading(false);
  }

  function toggleExpand(id) {
    setExpanded((prev) => (prev === id ? null : id));
  }

  const JobCard = ({ item }) => {
    const isOpen = expanded === item.id;
    return (
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => toggleExpand(item.id)}
        style={styles.cardOuter}
      >
        <BlurView intensity={35} tint="dark" style={styles.card}>
          {/* Header reda */}
          <View style={styles.cardHeader}>
            <View style={styles.companyBadge}>
              <FontAwesome5 name="building" size={11} color="#6366f1" />
              <Text style={styles.companyText} numberOfLines={1}>{item.company_name}</Text>
            </View>
            <View style={styles.headerRight}>
              {item.salary ? (
                <View style={styles.salaryBadge}>
                  <Text style={styles.salaryText}>{formatSalary(item.salary)}</Text>
                </View>
              ) : null}
              <Ionicons
                name={isOpen ? "chevron-up" : "chevron-down"}
                size={16}
                color="rgba(255,255,255,0.4)"
              />
            </View>
          </View>

          {/* Naslov posla */}
          <Text style={styles.jobTitle}>{item.job_title}</Text>

          {/* Datum */}
          {item.start_date ? (
            <View style={styles.dateRow}>
              <Ionicons name="calendar-outline" size={13} color="rgba(255,255,255,0.5)" />
              <Text style={styles.dateText}>Početak: {formatDate(item.start_date)}</Text>
            </View>
          ) : null}

          {/* Opis — skraćen ili pun */}
          <Text style={styles.description} numberOfLines={isOpen ? undefined : 2}>
            {item.job_description}
          </Text>

          {/* Prošireni sadržaj */}
          {isOpen && (
            <View style={styles.expandedSection}>
              {item.requirements ? (
                <View style={styles.requirementsBox}>
                  <Text style={styles.requirementsLabel}>Uvjeti:</Text>
                  <Text style={styles.requirementsText}>{item.requirements}</Text>
                </View>
              ) : null}

              {/* Kontakt gumbi */}
              <View style={styles.contactRow}>
                <TouchableOpacity
                  style={styles.contactBtn}
                  onPress={() => Linking.openURL(`mailto:${item.contact_email}`)}
                  activeOpacity={0.8}
                >
                  <Ionicons name="mail-outline" size={15} color="#fff" />
                  <Text style={styles.contactBtnText}>Email</Text>
                </TouchableOpacity>

                {item.contact_phone ? (
                  <TouchableOpacity
                    style={[styles.contactBtn, styles.contactBtnOutline]}
                    onPress={() => Linking.openURL(`tel:${item.contact_phone}`)}
                    activeOpacity={0.8}
                  >
                    <Ionicons name="call-outline" size={15} color="#6366f1" />
                    <Text style={[styles.contactBtnText, { color: "#6366f1" }]}>Pozovi</Text>
                  </TouchableOpacity>
                ) : null}
              </View>
            </View>
          )}
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground source={grad} style={styles.background}>
      <View style={styles.overlay}>
        {/* Back gumb */}
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <BlurView intensity={40} tint="dark" style={styles.backBtnInner}>
            <Ionicons name="chevron-back" size={24} color="#fff" />
          </BlurView>
        </TouchableOpacity>

        {loading ? (
          <View style={styles.centered}>
            <ActivityIndicator size="large" color="#6366f1" />
            <Text style={styles.loadingText}>Učitavanje oglasa...</Text>
          </View>
        ) : (
          <FlatList
            data={jobs}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <JobCard item={item} />}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
            ListHeaderComponent={
              <View style={styles.header}>
                <Text style={styles.headerTitle}>Poslovi</Text>
                <Text style={styles.headerDesc}>Aktivni oglasi u Zadru</Text>
                {error ? (
                  <View style={styles.errorBox}>
                    <Ionicons name="warning-outline" size={16} color="#f87171" />
                    <Text style={styles.errorText}>{error}</Text>
                  </View>
                ) : null}
              </View>
            }
            ListEmptyComponent={
              !error ? (
                <View style={styles.emptyWrap}>
                  <FontAwesome5 name="briefcase" size={48} color="rgba(255,255,255,0.2)" />
                  <Text style={styles.emptyText}>Trenutno nema aktivnih oglasa.</Text>
                </View>
              ) : null
            }
          />
        )}

        <BottomTabBar />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },
  loadingText: { color: "rgba(255,255,255,0.6)", fontSize: 15 },

  backBtn: {
    position: "absolute",
    top: 55,
    left: 15,
    zIndex: 20,
    borderRadius: 20,
    overflow: "hidden",
  },
  backBtnInner: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
    overflow: "hidden",
  },

  listContent: {
    paddingTop: 110,
    paddingHorizontal: 15,
    paddingBottom: 110,
  },
  header: {
    alignItems: "center",
    marginBottom: 25,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  headerDesc: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 14,
    marginTop: 5,
  },

  cardOuter: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 14,
  },
  card: { padding: 18 },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  companyBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "rgba(99,102,241,0.15)",
    borderWidth: 1,
    borderColor: "rgba(99,102,241,0.35)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    maxWidth: "65%",
  },
  companyText: {
    color: "#a5b4fc",
    fontSize: 12,
    fontWeight: "700",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  salaryBadge: {
    backgroundColor: "rgba(16,185,129,0.15)",
    borderWidth: 1,
    borderColor: "rgba(16,185,129,0.35)",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 999,
  },
  salaryText: {
    color: "#6ee7b7",
    fontSize: 12,
    fontWeight: "700",
  },

  jobTitle: {
    color: "#fff",
    fontSize: 17,
    fontWeight: "800",
    marginBottom: 6,
  },
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginBottom: 10,
  },
  dateText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
  },
  description: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 20,
  },

  expandedSection: {
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.08)",
    paddingTop: 16,
    gap: 14,
  },
  requirementsBox: {
    backgroundColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    padding: 12,
    gap: 6,
  },
  requirementsLabel: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  requirementsText: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 13,
    lineHeight: 20,
  },

  contactRow: {
    flexDirection: "row",
    gap: 10,
  },
  contactBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#6366f1",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 12,
  },
  contactBtnOutline: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: "rgba(99,102,241,0.5)",
  },
  contactBtnText: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "700",
  },

  emptyWrap: {
    alignItems: "center",
    marginTop: 60,
    gap: 14,
  },
  emptyText: {
    color: "rgba(255,255,255,0.4)",
    fontSize: 15,
    textAlign: "center",
  },
  errorBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "rgba(248,113,113,0.1)",
    borderWidth: 1,
    borderColor: "rgba(248,113,113,0.3)",
    borderRadius: 12,
    padding: 12,
    marginTop: 12,
  },
  errorText: {
    color: "#f87171",
    fontSize: 13,
    flex: 1,
  },
});
