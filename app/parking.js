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
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import BottomTabBar from "../components/BottomTabBar";

const { width } = Dimensions.get("window");
const grad = require("../assets/images/grad-bg.jpg");

const PARKING_ZONES = [
  { id: 1, name: "Zona 1", color: "#ef4444", price: "1.60 €/h", code: "708231" },
  { id: 2, name: "Zona 2", color: "#f59e0b", price: "1.00 €/h", code: "708232" },
  { id: 3, name: "Zona 3", color: "#10b981", price: "0.40 €/h", code: "708233" },
];

export default function ParkingScreen() {
  const [selectedZone, setSelectedZone] = useState(1);

  const activeZone = PARKING_ZONES.find((z) => z.id === selectedZone);

  return (
    <ImageBackground
      source={
        grad
      }
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          <Text style={[styles.headerTitle, { marginBottom: 20 }]}>Parking Zadar</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
            
            {/* 1. VIZUALNI PRIKAZ KARTE (Interaktivni dio) */}
            <View style={styles.mapContainer}>
              <BlurView intensity={40} tint="light" style={styles.mapGlass}>
                <Text style={styles.mapInstruction}>Vizualni prikaz zona</Text>
                <View style={styles.mapGraphic}>
                  {/* Primjer stiliziranog poluotoka/grada */}
                  <View style={[styles.zoneShape, styles.zone1, selectedZone === 1 && styles.zone1Active]} />
                  <View style={[styles.zoneShape, styles.zone2, selectedZone === 2 && styles.zone2Active]} />
                  <View style={[styles.zoneShape, styles.zone3, selectedZone === 3 && styles.zone3Active]} />
                  <Text style={styles.mapLabel}>POLUOTOK</Text>
                </View>
              </BlurView>
            </View>

            {/* 2. SLIDER ZONA */}
            <View style={styles.sliderContainer}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.zoneList}>
                {PARKING_ZONES.map((zone) => (
                  <TouchableOpacity
                    key={zone.id}
                    onPress={() => setSelectedZone(zone.id)}
                    style={[
                      styles.zoneTab,
                      selectedZone === zone.id && { borderColor: zone.color, backgroundColor: 'rgba(255,255,255,0.1)' }
                    ]}
                  >
                    <View style={[styles.colorDot, { backgroundColor: zone.color }]} />
                    <Text style={[styles.zoneTabText, selectedZone === zone.id && { color: zone.color }]}>
                      {zone.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* 3. INFO KARTICA (Široka kartica po tvom dizajnu) */}
            <View style={styles.infoContainer}>
              <BlurView intensity={60} tint="dark" style={styles.infoGlassCard}>
                <View style={styles.infoContent}>
                  <View style={styles.infoHeader}>
                    <MaterialCommunityIcons name="information-outline" size={24} color={activeZone.color} />
                    <Text style={styles.infoTitle}>Detalji: {activeZone.name}</Text>
                  </View>
                  
                  <View style={styles.detailsRow}>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>Cijena</Text>
                      <Text style={styles.detailValue}>{activeZone.price}</Text>
                    </View>
                    <View style={styles.detailItem}>
                      <Text style={styles.detailLabel}>SMS Broj</Text>
                      <Text style={styles.detailValue}>{activeZone.code}</Text>
                    </View>
                  </View>

                  <TouchableOpacity style={[styles.payButton, { backgroundColor: activeZone.color }]}>
                    <Text style={styles.payButtonText}>Plati putem SMS-a</Text>
                  </TouchableOpacity>
                </View>
              </BlurView>
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
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  safeArea: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 20 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  backButton: { width: 40, height: 40, justifyContent: 'center' },

  // Map Styles
  mapContainer: { width: '100%', height: 250, marginBottom: 20 },
  mapGlass: { flex: 1, borderRadius: 25, overflow: 'hidden', padding: 20, alignItems: 'center' },
  mapInstruction: { color: 'rgba(255,255,255,0.6)', fontSize: 12, marginBottom: 15 },
  mapGraphic: { width: '100%', flex: 1, position: 'relative', justifyContent: 'center', alignItems: 'center' },
  mapLabel: { color: '#fff', fontSize: 10, fontWeight: 'bold', opacity: 0.5, letterSpacing: 2 },
  
  // Zone Shapes
  zoneShape: { position: 'absolute', borderWidth: 2, borderColor: 'rgba(255,255,255,0.2)' },
  zone1: { width: 80, height: 120, borderTopLeftRadius: 40, borderBottomLeftRadius: 20, left: '20%', backgroundColor: 'rgba(239, 68, 68, 0.2)' },
  zone1Active: { backgroundColor: '#ef4444', borderColor: '#fff', transform: [{ scale: 1.05 }] },
  zone2: { width: 100, height: 100, borderRadius: 20, left: '42%', backgroundColor: 'rgba(245, 158, 11, 0.2)' },
  zone2Active: { backgroundColor: '#f59e0b', borderColor: '#fff', transform: [{ scale: 1.05 }] },
  zone3: { width: 120, height: 80, borderRadius: 15, right: '5%', backgroundColor: 'rgba(16, 185, 129, 0.2)' },
  zone3Active: { backgroundColor: '#10b981', borderColor: '#fff', transform: [{ scale: 1.05 }] },

  // Slider Styles
  sliderContainer: { marginBottom: 20 },
  zoneList: { paddingRight: 20 },
  zoneTab: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    paddingHorizontal: 16, 
    paddingVertical: 10, 
    borderRadius: 15, 
    backgroundColor: 'rgba(255,255,255,0.05)', 
    marginRight: 10,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  colorDot: { width: 10, height: 10, borderRadius: 5, marginRight: 8 },
  zoneTabText: { color: '#fff', fontWeight: '600' },

  // Info Card Styles
  infoContainer: { width: '100%' },
  infoGlassCard: { borderRadius: 25, overflow: 'hidden', padding: 20 },
  infoHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  infoTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginLeft: 10 },
  detailsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 25 },
  detailItem: { flex: 1 },
  detailLabel: { color: 'rgba(255,255,255,0.5)', fontSize: 12, textTransform: 'uppercase', marginBottom: 4 },
  detailValue: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  payButton: { padding: 16, borderRadius: 15, alignItems: 'center' },
  payButtonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 }
});