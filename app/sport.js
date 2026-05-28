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
import BottomTabBar from "../components/BottomTabBar";


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

const OBJEKTI_ZADAR = [
  {
    id: "obj-1",
    name: "Sportski centar Višnjik",
    type: "Dvorane i tereni",
    image:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=1200&q=70",
    location: "Splitska ul. 3, 23000 Zadar",
    contact: "info@visnjik.hr · +385 23 200 200",
  },
  {
    id: "obj-2",
    name: "Dvorana Jazine",
    type: "Košarkaška dvorana",
    image:
      "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=1200&q=70",
    location: "Obala kneza Branimira, 23000 Zadar",
    contact: "kontakt@kkzadar.hr · +385 23 315 315",
  },
  {
    id: "obj-3",
    name: "ŠC Stanovi (igralište/teren)",
    type: "Vanjski teren",
    image:
      "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=70",
    location: "Put Stanova, 23000 Zadar",
    contact: "Grad Zadar info · +385 23 208 000",
  },
  {
    id: "obj-4",
    name: "Teniski centar Višnjik",
    type: "Teniski tereni",
    image:
      "https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&w=1200&q=70",
    location: "Splitska ul. 3, 23000 Zadar",
    contact: "rezervacije@visnjik.hr · +385 23 200 200",
  },
];

export default function SportScreen() {
  return (
    <ImageBackground
      source={grad}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          <Text style={[styles.headerTitle, { marginBottom: 25 }]}>Sport & Rekreacija</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
            
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

            {/* Sekcija: Rezervacija termina */}
            
            <View style={styles.venuesList}>
            <Text style={styles.sectionTitle}>Rezervacija termina</Text>
              {OBJEKTI_ZADAR.map((v) => (
                <TouchableOpacity
                  key={v.id}
                  activeOpacity={0.9}
                  onPress={() => console.log("Rezervacija:", v.name)}
                  style={styles.venueCardOuter}
                >
                  <ImageBackground
                    source={{ uri: v.image }}
                    style={styles.venueImage}
                    imageStyle={{ borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
                  >
                    <View style={styles.venueImageShade} />
                    <View style={styles.venueTopBadge}>
                      <Text style={styles.venueTopBadgeText}>{v.type}</Text>
                    </View>
                  </ImageBackground>

                  <BlurView intensity={30} tint="dark" style={styles.venueBody}>
                    <Text style={styles.venueName}>{v.name}</Text>

                    <View style={styles.venueRow}>
                      <Ionicons name="location-outline" size={16} color="rgba(255,255,255,0.85)" />
                      <Text style={styles.venueMeta} numberOfLines={2}>
                        {v.location}
                      </Text>
                    </View>

                    <View style={styles.venueRow}>
                      <Ionicons name="call-outline" size={16} color="rgba(255,255,255,0.85)" />
                      <Text style={styles.venueMeta} numberOfLines={2}>
                        {v.contact}
                      </Text>
                    </View>

                    <View style={styles.venueCtaRow}>
                      <View style={styles.venueHint}>
                        <Ionicons name="time-outline" size={14} color="rgba(255,255,255,0.65)" />
                        <Text style={styles.venueHintText}>Odaberi termin (demo)</Text>
                      </View>
                      <View style={styles.venueBtn}>
                        <Text style={styles.venueBtnText}>Rezerviraj</Text>
                        <Ionicons name="chevron-forward" size={16} color="#0b1220" />
                      </View>
                    </View>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>

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
  otherSportInfo: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 4, lineHeight: 18 },

  // Venues / Reservation
  venuesList: { gap: 10,marginTop: 30, marginBottom: 10 },
  venueCardOuter: {
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
  },
  venueImage: { height: 120, justifyContent: "flex-end" },
  venueImageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  venueTopBadge: {
    alignSelf: "flex-start",
    margin: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(0,0,0,0.45)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  venueTopBadgeText: { color: "#fff", fontSize: 11, fontWeight: "900" },
  venueBody: { padding: 14 },
  venueName: { color: "#fff", fontSize: 16, fontWeight: "900", marginBottom: 8 },
  venueRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  venueMeta: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "700", flex: 1 },
  venueCtaRow: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  venueHint: { flexDirection: "row", alignItems: "center", gap: 6 },
  venueHintText: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "800" },
  venueBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: "#ffd700",
  },
  venueBtnText: { color: "#0b1220", fontSize: 12, fontWeight: "900" },
});