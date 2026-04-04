import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";


const { width } = Dimensions.get("window");
const grad = require("../assets/images/grad-bg.jpg");

const REZULTATI = [
  { id: 1, sport: "Košarka", klub: "KK Zadar", protivnik: "Cibona", rezultat: "82 : 75", status: "Pobjeda", icon: "basketball-ball", color: "#3b82f6" },
  { id: 2, sport: "Nogomet", klub: "HNK Zadar", protivnik: "Primorac", rezultat: "2 : 0", status: "Pobjeda", icon: "futbol", color: "#10b981" },
  { id: 3, sport: "Rukomet", klub: "RK Zadar 1954", protivnik: "Split", rezultat: "28 : 28", status: "Remi", icon: "volleyball-ball", color: "#ef4444" },
  { id: 4, sport: "Odbojka", klub: "OK Zadar", protivnik: "Rijeka", rezultat: "3 : 1", status: "Pobjeda", icon: "volleyball-ball", color: "#f59e0b" },
];

const OSTALI_SPORTOVI = [
  { id: 1, name: "Jedrenje", klub: "JK Uskok / JK Sv. Krševan", info: "Zadrani dominiraju u klasi 49er i ILCA 7.", icon: "ship" },
  { id: 2, name: "Plivanje", klub: "PK Zadar / PK Jadera", info: "Otvorene prijave za ljetnu školu plivanja na Višnjiku.", icon: "swimmer" },
  { id: 3, name: "Sveučilišni sport", klub: "Unisport ZD", info: "Košarkaška ekipa osigurala završnicu prvenstva.", icon: "graduation-cap" },
];

export default function SportScreen() {
  return (
    <ImageBackground
      source={grad}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Sport & Rekreacija</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            
            {/* Glavna kartica - Zadnji uspjeh (WideCard1 stil) */}
            <View style={styles.wideCardWrapper}>
              <BlurView intensity={25} tint="dark" style={styles.wideGlassCard}>
                <ImageBackground
                  source={require('../assets/images/explore1.jpg')}
                  style={StyleSheet.absoluteFill}
                  imageStyle={{ opacity: 0.25 }}
                />
                <View style={styles.wideContent}>
                  <View style={styles.headerRow1}>
                    <FontAwesome5 name="trophy" size={24} color="#fbbf24" />
                    <Text style={styles.wideCardTitle}>Zadar je najbolji!</Text>
                  </View>
                  <View style={styles.textContainer80}>
                    <Text style={styles.headerSubtitle}>Višnjik - srce sporta</Text>
                    <Text style={styles.wideCardDescription}>
                      Provjerite najnovije rezultate zadarskih klubova i termine rekreacije na Višnjiku i Mocirama.
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Sekcija: Posljednji rezultati */}
            <Text style={styles.sectionTitle}>Posljednji rezultati</Text>
            <View style={styles.resultsGrid}>
              {REZULTATI.map((item) => (
                <BlurView key={item.id} intensity={40} tint="light" style={styles.resultCard}>
                  <View style={styles.resultHeader}>
                    <FontAwesome5 name={item.icon} size={14} color={item.color} />
                    <Text style={[styles.statusText, { color: item.status === "Pobjeda" ? "#10b981" : "#fff" }]}>{item.status}</Text>
                  </View>
                  <Text style={styles.clubName}>{item.klub}</Text>
                  <Text style={styles.scoreText}>{item.rezultat}</Text>
                  <Text style={styles.opponentText}>vs {item.protivnik}</Text>
                </BlurView>
              ))}
            </View>

            {/* Sekcija: Ostali sportovi i vijesti */}
            <Text style={styles.sectionTitle}>Ostali sportovi & Obavijesti</Text>
            <View style={styles.listContainer}>
              {OSTALI_SPORTOVI.map((sport) => (
                <BlurView key={sport.id} intensity={30} tint="dark" style={styles.otherSportCard}>
                  <View style={styles.otherSportContent}>
                    <View style={styles.iconCircle}>
                      <FontAwesome5 name={sport.icon} size={18} color="#fff" />
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.otherSportName}>{sport.name} - {sport.klub}</Text>
                      <Text style={styles.otherSportInfo}>{sport.info}</Text>
                    </View>
                  </View>
                </BlurView>
              ))}
            </View>

          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)" },
  safeArea: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  headerTitle: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  backButton: { width: 40, height: 40, justifyContent: 'center' },

  // Wide Card
  wideCardWrapper: { width: "100%", borderRadius: 25, overflow: "hidden", marginBottom: 30 },
  wideGlassCard: { padding: 20, minHeight: 170 },
  headerRow1: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  wideCardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginLeft: 12 },
  textContainer80: { width: "85%", alignSelf: "flex-start" },
  headerSubtitle: { color: "#fbbf24", fontSize: 18, fontWeight: '600', marginBottom: 6 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.7)", lineHeight: 20 },

  // Results Grid
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  resultsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 25 },
  resultCard: { width: '48%', padding: 15, borderRadius: 20, overflow: 'hidden', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  resultHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  statusText: { fontSize: 10, fontWeight: 'bold', textTransform: 'uppercase' },
  clubName: { color: 'rgba(255,255,255,0.7)', fontSize: 12, fontWeight: '600' },
  scoreText: { color: '#fff', fontSize: 22, fontWeight: '900', marginVertical: 4 },
  opponentText: { color: 'rgba(255,255,255,0.5)', fontSize: 11 },

  // Other Sports List
  listContainer: { gap: 12 },
  otherSportCard: { borderRadius: 20, overflow: 'hidden', padding: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  otherSportContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  iconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center' },
  otherSportName: { color: '#fff', fontSize: 15, fontWeight: 'bold' },
  otherSportInfo: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4, lineHeight: 18 }
});