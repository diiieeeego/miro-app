import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  Linking,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const { width } = Dimensions.get("window");

const TAXI_PROVIDERS = [
  { id: 1, name: "Taxi Lulić", phone: "023494494", icon: "car" },
  { id: 2, name: "Taxi Denis", phone: "0912622621", icon: "car-side" },
  { id: 3, name: "Taxi Predovan", phone: "0989131627", icon: "car" },
  { id: 4, name: "Zadar Taxi (Udruženje)", phone: "023251400", icon: "users" },
  { id: 5, name: "Taxi Velebit", phone: "0959011110", icon: "mountain" },
  { id: 6, name: "Taxi Zara", phone: "0995551212", icon: "star" },
  { id: 7, name: "Uber Zadar", phone: "app", icon: "mobile-alt" },
  { id: 8, name: "Bolt Zadar", phone: "app", icon: "bolt" },
  { id: 9, name: "Taxi Kamel", phone: "0958550101", icon: "car-side" },
  { id: 10, name: "Eko Taxi Zadar", phone: "023500500", icon: "leaf" },
];

export default function TaxiScreen() {
  const uputiPoziv = (broj) => {
    if (broj === "app") {
      alert("Molimo koristite službenu aplikaciju.");
      return;
    }
    Linking.openURL(`tel:${broj}`);
  };

  return (
    <ImageBackground
      source={require("../assets/images/grad-bg.jpg")}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          {/* Header */}
          <View style={styles.headerRow}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <Ionicons name="chevron-back" size={28} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Taxi Zadar</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            
            {/* Glavna Info Kartica (Široka kao WideCard1) */}
            <View style={styles.wideCardWrapper}>
              <BlurView intensity={20} tint="dark" style={styles.wideGlassCard}>
                 <ImageBackground
                    source={require('../assets/images/explore1.jpg')} // Tvoja pozadinska slica
                    style={StyleSheet.absoluteFill}
                    imageStyle={{ opacity: 0.3 }}
                />
                <View style={styles.wideContent}>
                  <View style={styles.headerRow1}>
                    <FontAwesome5 name="taxi" size={26} color="#fbbf24" />
                    <Text style={styles.wideCardTitle}>Naruči Prijevoz</Text>
                  </View>

                  <View style={styles.textContainer80}>
                    <Text style={styles.headerSubtitle}>Dostupno 24/7</Text>
                    <Text style={styles.wideCardDescription}>
                      Svi navedeni prijevoznici imaju dozvole za rad na području grada Zadra i Zračne luke Zadar.
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Lista Prijevoznika */}
            <Text style={styles.sectionTitle}>Popis prijevoznika</Text>
            
            <View style={styles.listContainer}>
              {TAXI_PROVIDERS.map((taxi) => (
                <BlurView key={taxi.id} intensity={40} tint="light" style={styles.taxiCard}>
                  <View style={styles.taxiInfo}>
                    <View style={styles.iconCircle}>
                      <FontAwesome5 name={taxi.icon} size={18} color="#fbbf24" />
                    </View>
                    <View>
                      <Text style={styles.taxiName}>{taxi.name}</Text>
                      <Text style={styles.taxiPhone}>{taxi.phone === "app" ? "Dostupno putem aplikacije" : taxi.phone}</Text>
                    </View>
                  </View>
                  
                  <TouchableOpacity 
                    style={[styles.callButton, taxi.phone === "app" && styles.appButton]} 
                    onPress={() => uputiPoziv(taxi.phone)}
                  >
                    <Ionicons 
                      name={taxi.phone === "app" ? "open-outline" : "call"} 
                      size={20} 
                      color="#fff" 
                    />
                  </TouchableOpacity>
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
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  backButton: { width: 40, height: 40, justifyContent: 'center' },

  // Wide Card Styles
  wideCardWrapper: { width: "100%", borderRadius: 25, overflow: "hidden", marginBottom: 30 },
  wideGlassCard: { padding: 20, minHeight: 180, justifyContent: 'center' },
  wideContent: { zIndex: 1 },
  headerRow1: { flexDirection: "row", alignItems: "center", marginBottom: 12 },
  wideCardTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginLeft: 12 },
  textContainer80: { width: "85%", alignSelf: "flex-start" },
  headerSubtitle: { color: "#fff", fontSize: 18, fontWeight: '600', marginBottom: 6 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.8)", lineHeight: 20 },

  // List Styles
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  listContainer: { gap: 12 },
  taxiCard: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    padding: 15, 
    borderRadius: 20, 
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)'
  },
  taxiInfo: { flexDirection: 'row', alignItems: 'center' },
  iconCircle: { 
    width: 40, 
    height: 40, 
    borderRadius: 20, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginRight: 15 
  },
  taxiName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  taxiPhone: { color: 'rgba(255,255,255,0.6)', fontSize: 13, marginTop: 2 },
  callButton: { 
    width: 45, 
    height: 45, 
    borderRadius: 15, 
    backgroundColor: '#10b981', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  appButton: { backgroundColor: '#3b82f6' }
});