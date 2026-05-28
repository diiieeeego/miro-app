import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import HamburgerMenu from "../../components/HamburgerMenu";

const { width } = Dimensions.get("window");

const experiences = [
  {
    id: "grad",
    title: "Grad",
    subtitle: "Otkrijte stari grad Zadar",
    description:
      "Prošetajte uskim ulicama poluotoka, posjetite rimski Forum, crkvu sv. Donata i čuvene Morske orgulje.",
    image: require("../../assets/images/explore1.jpg"),
    icon: "business-outline",
    color: "#3b82f6",
    route: "/experience_grad",
  },
  {
    id: "otoci",
    title: "Otoci",
    subtitle: "Zadarsko otočje i skrivene plaže",
    description:
      "Istražite predivne otoke zadarskog arhipelaga — Ugljan, Pašman, Dugi Otok i nacionalni park Kornati.",
    image: require("../../assets/images/explore.jpg"),
    icon: "boat-outline",
    color: "#10b981",
    route: "/experience_otoci",
  },
];

export default function ExperiencesScreen() {
  return (
    <View style={styles.overlay}>
      <HamburgerMenu />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Doživljaji</Text>
          <Text style={styles.headerDesc}>Pronađite savršeno iskustvo u Zadru</Text>
        </View>

        {/* Cards */}
        {experiences.map((item) => (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.88}
            style={styles.cardOuter}
            onPress={() => router.push(item.route)}
          >
            <ImageBackground
              source={item.image}
              style={styles.cardImage}
              imageStyle={styles.cardImageStyle}
              resizeMode="cover"
            >
              {/* Dark gradient overlay */}
              <View style={styles.cardDimmer} />

              {/* Glass footer */}
              <BlurView intensity={50} tint="dark" style={styles.cardFooter}>
                <View style={styles.cardTopRow}>
                  <View style={[styles.iconCircle, { borderColor: item.color + "88" }]}>
                    <Ionicons name={item.icon} size={20} color={item.color} />
                  </View>
                  <View style={{ flex: 1, marginLeft: 12 }}>
                    <Text style={styles.cardTitle}>{item.title}</Text>
                    <Text style={styles.cardSubtitle}>{item.subtitle}</Text>
                  </View>
                  <View style={[styles.arrowBtn, { backgroundColor: item.color }]}>
                    <Ionicons name="arrow-forward" size={18} color="#fff" />
                  </View>
                </View>

                <Text style={styles.cardDesc} numberOfLines={2}>
                  {item.description}
                </Text>
              </BlurView>
            </ImageBackground>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 100,
    paddingBottom: 110,
  },

  // Header
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

  // Card
  cardOuter: {
    borderRadius: 24,
    overflow: "hidden",
    marginBottom: 20,
    // Shadow (iOS)
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  cardImage: {
    width: "100%",
    height: 280,
    justifyContent: "flex-end",
  },
  cardImageStyle: {
    borderRadius: 24,
  },
  cardDimmer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 24,
    backgroundColor: "rgba(0,0,0,0.15)",
  },

  // Glass footer inside card
  cardFooter: {
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    overflow: "hidden",
  },
  cardTopRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.08)",
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cardTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "800",
  },
  cardSubtitle: {
    color: "rgba(255,255,255,0.6)",
    fontSize: 12,
    marginTop: 2,
  },
  arrowBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
  },
  cardDesc: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 13,
    lineHeight: 19,
  },
});
