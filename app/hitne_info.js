import React from "react";
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
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from "@expo/vector-icons";
import { router } from "expo-router";

const HITNI_BROJEVI = [
  { id: 1, name: "Jedinstveni broj (EU)", phone: "112", desc: "Za sve hitne situacije", icon: "alert-octagon" },
  { id: 2, name: "Policija", phone: "192", desc: "Policijska uprava zadarska", icon: "shield-check" },
  { id: 3, name: "Vatrogasci", phone: "193", desc: "Javna vatrogasna postrojba Zadar", icon: "fire" },
  { id: 4, name: "Hitna Pomoć", phone: "194", desc: "Zavod za hitnu medicinu", icon: "ambulance" },
  { id: 5, name: "Pomoć na moru", phone: "195", desc: "Traganje i spašavanje na moru", icon: "life-ring" },
  { id: 6, name: "HAK - Pomoć na cesti", phone: "1987", desc: "Tehnička pomoć i vučna služba", icon: "car-wrench" },
];

const VAŽNE_USTANOVE = [
  { id: 1, name: "Opća bolnica Zadar", phone: "023505505", address: "B. Peričića 5", icon: "hospital-building" },
  { id: 2, name: "Dežurna ljekarna", phone: "023302920", address: "Varoš (Centar)", icon: "pill" },
  { id: 3, name: "Veterinarska stanica", phone: "023239239", address: "Put Bokanjca", icon: "dog" },
];
const grad = require("../assets/images/grad-bg.jpg");

export default function HitneInfoScreen() {
  const nazovi = (broj) => Linking.openURL(`tel:${broj}`);

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
            <Text style={styles.headerTitle}>Hitne Informacije</Text>
            <View style={{ width: 28 }} />
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>
            
            {/* WideCard1 Stil - Glavno upozorenje */}
            <View style={styles.wideCardWrapper}>
              <BlurView intensity={30} tint="dark" style={styles.wideGlassCard}>
                 <ImageBackground
                    source={require('../assets/images/explore1.jpg')}
                    style={StyleSheet.absoluteFill}
                    imageStyle={{ opacity: 0.2 }}
                />
                <View style={styles.wideContent}>
                  <View style={styles.headerRow1}>
                    <MaterialCommunityIcons name="alarm-light" size={28} color="#ef4444" />
                    <Text style={styles.wideCardTitle}>Važni brojevi</Text>
                  </View>
                  <View style={styles.textContainer80}>
                    <Text style={styles.headerSubtitle}>Dostupni 0-24</Text>
                    <Text style={styles.wideCardDescription}>
                      U slučaju neposredne opasnosti po život ili imovinu, odmah nazovite 112.
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Grid glavnih brojeva (2 u redu) */}
            <View style={styles.numbersGrid}>
              {HITNI_BROJEVI.map((item) => (
                <TouchableOpacity 
                  key={item.id} 
                  style={styles.gridItemWrapper} 
                  onPress={() => nazovi(item.phone)}
                >
                  <BlurView intensity={40} tint="light" style={styles.numberGlassCard}>
                    <MaterialCommunityIcons name={item.icon} size={24} color="#ef4444" />
                    <Text style={styles.numberName}>{item.name}</Text>
                    <Text style={styles.numberValue}>{item.phone}</Text>
                  </BlurView>
                </TouchableOpacity>
              ))}
            </View>

            {/* Lista ustanova (Horizontalna/Široka) */}
            <Text style={styles.sectionTitle}>Ustanove i dežurstva</Text>
            {VAŽNE_USTANOVE.map((inst) => (
              <BlurView key={inst.id} intensity={30} tint="dark" style={styles.instCard}>
                <View style={styles.instContent}>
                  <View style={styles.instIconCircle}>
                    <MaterialCommunityIcons name={inst.icon} size={22} color="#fff" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.instName}>{inst.name}</Text>
                    <Text style={styles.instAddress}>{inst.address}</Text>
                  </View>
                  <TouchableOpacity style={styles.callSmallBtn} onPress={() => nazovi(inst.phone)}>
                    <Ionicons name="call" size={20} color="#fff" />
                  </TouchableOpacity>
                </View>
              </BlurView>
            ))}

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
  headerSubtitle: { color: "#ef4444", fontSize: 18, fontWeight: '700', marginBottom: 6 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.8)", lineHeight: 20 },

  // Numbers Grid
  numbersGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', gap: 12, marginBottom: 30 },
  gridItemWrapper: { width: '48%', height: 110, borderRadius: 20, overflow: 'hidden' },
  numberGlassCard: { flex: 1, padding: 15, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  numberName: { color: 'rgba(255,255,255,0.7)', fontSize: 11, fontWeight: '600', marginTop: 8, textAlign: 'center' },
  numberValue: { color: '#fff', fontSize: 22, fontWeight: '900', marginTop: 2 },

  // Institutions List
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  instCard: { borderRadius: 20, overflow: 'hidden', padding: 15, marginBottom: 12, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  instContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  instIconCircle: { width: 40, height: 40, borderRadius: 12, backgroundColor: 'rgba(239, 68, 68, 0.3)', justifyContent: 'center', alignItems: 'center' },
  instName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  instAddress: { color: 'rgba(255,255,255,0.5)', fontSize: 13, marginTop: 2 },
  callSmallBtn: { width: 45, height: 45, borderRadius: 15, backgroundColor: '#10b981', justifyContent: 'center', alignItems: 'center' }
});