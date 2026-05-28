import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import HamburgerMenu from "../components/HamburgerMenu";
import BottomTabBar from "../components/BottomTabBar";

export default function ExperienceGradScreen() {
  return (
    <View style={styles.overlay}>
      <HamburgerMenu />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Grad</Text>
          <Text style={styles.headerDesc}>Doživljaji u starom gradu Zadru</Text>
        </View>

        {/* Placeholder content */}
        <BlurView intensity={35} tint="dark" style={styles.placeholderCard}>
          <Ionicons name="construct-outline" size={32} color="rgba(255,255,255,0.4)" />
          <Text style={styles.placeholderText}>Sadržaj uskoro dostupan</Text>
          <Text style={styles.placeholderSub}>
            Ovdje će biti prikazani gradski doživljaji — šetnje, ture, kulturna mjesta i više.
          </Text>
        </BlurView>
      </ScrollView>
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
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
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 110,
    paddingBottom: 110,
  },
  header: {
    alignItems: "center",
    marginBottom: 30,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 36,
    fontWeight: "bold",
  },
  headerDesc: {
    color: "rgba(255,255,255,0.65)",
    fontSize: 14,
    marginTop: 6,
  },
  placeholderCard: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 40,
    alignItems: "center",
    gap: 12,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  placeholderText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
  },
  placeholderSub: {
    color: "rgba(255,255,255,0.55)",
    fontSize: 13,
    textAlign: "center",
    lineHeight: 20,
  },
});
