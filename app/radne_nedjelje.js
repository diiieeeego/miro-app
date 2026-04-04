import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

const TRGOVINE = [
  { id: 1, name: "Supernova Zadar", type: "Centar", workTime: "09:00 - 21:00", status: "Otvoreno", info: "Provjerite kalendar radnih nedjelja na webu." },
  { id: 2, name: "Konzum (Glavni kolodvor)", type: "Trgovina", workTime: "07:00 - 20:00", status: "Otvoreno", info: "Radna nedjelja prema rasporedu." },
  { id: 3, name: "Pekarna Kroštula", type: "Pekara", workTime: "00:00 - 24:00", status: "Otvoreno", info: "Otvoreno svaku nedjelju." },
  { id: 4, name: "City Galleria", type: "Centar", workTime: "08:00 - 13:00", status: "Zatvoreno", info: "Tržnica radi, trgovine prema rasporedu." },
  { id: 5, name: "Lidl (Put Murvice)", type: "Trgovina", workTime: "08:00 - 21:00", status: "Otvoreno", info: "Samo odabrane nedjelje u sezoni." },
  { id: 6, name: "Interspar (Relja)", type: "Trgovina", workTime: "07:00 - 21:00", status: "Otvoreno", info: "Radna nedjelja." },
];

export default function NedjeljaScreen() {
  const [filter, setFilter] = useState("Sve");

  const filtriraneTrgovine = filter === "Sve" 
    ? TRGOVINE 
    : TRGOVINE.filter(t => t.type === filter);

  return (
    <ImageBackground
      source={{ uri: "https://images.unsplash.com/photo-1555990136-2f0802f5be24?q=80&w=1000" }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Nedjelja u Zadru</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            
            {/* WideCard1 Stil - Glavna Obavijest */}
            <View style={styles.wideCardWrapper}>
              <BlurView intensity={25} tint="dark" style={styles.wideGlassCard}>
                <ImageBackground
                  source={require('../assets/images/explore1.jpg')}
                  style={StyleSheet.absoluteFill}
                  imageStyle={{ opacity: 0.25 }}
                />
                <View style={styles.wideContent}>
                  <View style={styles.headerRow1}>
                    <FontAwesome5 name="calendar-check" size={24} color="#8b5cf6" />
                    <Text style={styles.wideCardTitle}>Što radi danas?</Text>
                  </View>
                  <View style={styles.textContainer80}>
                    <Text style={styles.headerSubtitle}>Radne nedjelje 2026.</Text>
                    <Text style={styles.wideCardDescription}>
                      Zbog ograničenja rada nedjeljom, popis se temelji na objavljenim kalendarima trgovaca.
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Filteri */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterScroll}>
              {["Sve", "Trgovina", "Centar", "Pekara"].map((cat) => (
                <TouchableOpacity 
                  key={cat} 
                  onPress={() => setFilter(cat)}
                  style={[styles.filterTab, filter === cat && styles.activeFilterTab]}
                >
                  <Text style={[styles.filterText, filter === cat && styles.activeFilterText]}>{cat}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Lista trgovina */}
            <View style={styles.listContainer}>
              {filtriraneTrgovine.map((trgovina) => (
                <BlurView key={trgovina.id} intensity={40} tint="light" style={styles.shopCard}>
                  <View style={styles.shopInfo}>
                    <View style={[styles.statusDot, { backgroundColor: trgovina.status === "Otvoreno" ? "#10b981" : "#ef4444" }]} />
                    <View style={{ flex: 1 }}>
                      <Text style={styles.shopName}>{trgovina.name}</Text>
                      <Text style={styles.shopDetails}>{trgovina.type} • {trgovina.workTime}</Text>
                      <Text style={styles.shopInfoText}>{trgovina.info}</Text>
                    </View>
                    <TouchableOpacity 
                      style={styles.mapBtn}
                      onPress={() => Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${trgovina.name}+Zadar`)}
                    >
                      <Ionicons name="location-outline" size={22} color="#fff" />
                    </TouchableOpacity>
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
  wideCardWrapper: { width: "100%", borderRadius: 25, overflow: "hidden", marginBottom: 25 },
  wideGlassCard: { padding: 20, minHeight: 160 },
  headerRow1: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  wideCardTitle: { fontSize: 20, fontWeight: "bold", color: "#fff", marginLeft: 12 },
  textContainer80: { width: "85%", alignSelf: "flex-start" },
  headerSubtitle: { color: "#fff", fontSize: 18, fontWeight: '600', marginBottom: 6 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.8)", lineHeight: 20 },

  // Filters
  filterScroll: { marginBottom: 20 },
  filterTab: { paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.1)', marginRight: 10, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  activeFilterTab: { backgroundColor: '#8b5cf6', borderColor: '#8b5cf6' },
  filterText: { color: 'rgba(255,255,255,0.7)', fontWeight: '600' },
  activeFilterText: { color: '#fff' },

  // Shop List
  listContainer: { gap: 15 },
  shopCard: { borderRadius: 20, overflow: 'hidden', padding: 18, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  shopInfo: { flexDirection: 'row', alignItems: 'flex-start' },
  statusDot: { width: 10, height: 10, borderRadius: 5, marginTop: 6, marginRight: 12 },
  shopName: { color: '#fff', fontSize: 17, fontWeight: 'bold' },
  shopDetails: { color: '#8b5cf6', fontSize: 13, fontWeight: '700', marginTop: 2 },
  shopInfoText: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginTop: 6, lineHeight: 18 },
  mapBtn: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.1)', justifyContent: 'center', alignItems: 'center', marginLeft: 10 }
});