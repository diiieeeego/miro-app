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

export default function TransportScreen() {
  const [activeTab, setActiveTab] = useState("bus");

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
            <Text style={styles.headerTitle}>Gradski Prijevoz</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            
            {/* 1. Brzi Odabir Tipa Prijevoza */}
            <View style={styles.tabsContainer}>
              <TouchableOpacity 
                style={[styles.tab, activeTab === "bus" && styles.activeTab]} 
                onPress={() => setActiveTab("bus")}
              >
                <FontAwesome5 name="bus" size={20} color={activeTab === "bus" ? "#fff" : "rgba(255,255,255,0.5)"} />
                <Text style={[styles.tabText, activeTab === "bus" && styles.activeTabText]}>Bus</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                style={[styles.tab, activeTab === "ship" && styles.activeTab]} 
                onPress={() => setActiveTab("ship")}
              >
                <FontAwesome5 name="ship" size={20} color={activeTab === "ship" ? "#fff" : "rgba(255,255,255,0.5)"} />
                <Text style={[styles.tabText, activeTab === "ship" && styles.activeTabText]}>Brod</Text>
              </TouchableOpacity>

              
            </View>

            {/* 2. Glavna info kartica (Dizajn kao tvoja WideCard1) */}
            <View style={styles.wideCardWrapper}>
              <BlurView intensity={30} tint="dark" style={styles.wideGlassCard}>
                <View style={styles.headerRowFull}>
                  <MaterialCommunityIcons 
                    name={activeTab === "bus" ? "bus-clock" : activeTab === "ship" ? "ferry" : "phone-in-talk"} 
                    size={30} 
                    color="#00aaff" 
                  />
                  <Text style={styles.wideCardTitle}>
                    {activeTab === "bus" ? "Liburnija Zadar" : activeTab === "ship" ? "Jadrolinija & G&V" : "Taxi Službe"}
                  </Text>
                </View>

                <View style={styles.textContainer80}>
                  <Text style={styles.headerSubtitle}>
                    {activeTab === "bus" ? "Gradske i prigradske linije" : activeTab === "ship" ? "Polasci za otoke" : "Dostupni prijevoznici"}
                  </Text>
                  <Text style={styles.wideCardDescription}>
                    {activeTab === "bus" 
                      ? "Provjerite aktualni vozni red za sve gradske linije. Karte možete kupiti kod vozača ili na prodajnim mjestima." 
                      : activeTab === "ship" 
                      ? "Red vožnje trajekata i katamarana iz luke Gaženica i s poluotoka prema zadarskim otocima."
                      : "Brz i siguran prijevoz u gradu. Nazovite izravno iz aplikacije ili naručite putem weba."}
                  </Text>
                </View>

                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: "#00aaff" }]}
                  onPress={() => console.log("Otvaranje voznog reda")}
                >
                  <Text style={styles.actionButtonText}>
                    {activeTab === "taxi" ? "Nazovi Taxi" : "Pogledaj Vozni Red"}
                  </Text>
                </TouchableOpacity>
              </BlurView>
            </View>

            {/* 3. Idući Polasci (Glass List) */}
            <Text style={styles.sectionTitle}>Idući polasci (Live)</Text>
            <BlurView intensity={20} tint="light" style={styles.listGlassCard}>
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.lineName}>{activeTab === "bus" ? "Linija 2: Poluotok" : "Preko (Trajekt)"}</Text>
                  <Text style={styles.lineSub}>{activeTab === "bus" ? "Polazak: Autobusni kolodvor" : "Polazak: Luka Gaženica"}</Text>
                </View>
                <Text style={styles.timeText}>14:30</Text>
              </View>
              <View style={styles.separator} />
              <View style={styles.listItem}>
                <View>
                  <Text style={styles.lineName}>{activeTab === "bus" ? "Linija 4: Crno" : "Brbinj (Katamaran)"}</Text>
                  <Text style={styles.lineSub}>{activeTab === "bus" ? "Polazak: Autobusni kolodvor" : "Polazak: Poluotok"}</Text>
                </View>
                <Text style={styles.timeText}>14:45</Text>
              </View>
            </BlurView>

          </ScrollView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)" },
  safeArea: { flex: 1, paddingTop: 60, paddingHorizontal: 20 },
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 25 },
  headerTitle: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  backButton: { width: 40, height: 40, justifyContent: 'center' },

  // Tabs
  tabsContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  tab: { 
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 12, 
    borderRadius: 15, 
    backgroundColor: 'rgba(255,255,255,0.1)', 
    marginHorizontal: 4 
  },
  activeTab: { backgroundColor: '#00aaff' },
  tabText: { color: 'rgba(255,255,255,0.5)', fontWeight: 'bold', marginLeft: 8 },
  activeTabText: { color: '#fff' },

  // Wide Card (Dizajn koji si tražio ranije)
  wideCardWrapper: { width: "100%", borderRadius: 25, overflow: "hidden", marginBottom: 25 },
  wideGlassCard: { padding: 20 },
  headerRowFull: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  wideCardTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginLeft: 12 },
  textContainer80: { width: "85%", alignSelf: "flex-start", marginBottom: 20 },
  headerSubtitle: { color: "#fff", fontSize: 17, fontWeight: '600', marginBottom: 8 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.7)", lineHeight: 20 },
  actionButton: { padding: 15, borderRadius: 15, alignItems: "center" },
  actionButtonText: { color: "#fff", fontWeight: "bold", fontSize: 16 },

  // Idući polasci list
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  listGlassCard: { borderRadius: 25, overflow: 'hidden', paddingHorizontal: 20 },
  listItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  lineName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  lineSub: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 },
  timeText: { color: '#00aaff', fontSize: 20, fontWeight: '800' },
  separator: { height: 1, backgroundColor: 'rgba(255,255,255,0.1)' }
});