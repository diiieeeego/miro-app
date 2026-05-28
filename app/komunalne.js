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
import BottomTabBar from "../components/BottomTabBar";

const KOMUNALNE_SLUZBE = [
  { id: 1, name: "Čistoća Zadar", phone: "023234810", desc: "Odvoz otpada i reciklažna dvorišta", icon: "recycle", color: "#10b981" },
  { id: 2, name: "Vodovod Zadar", phone: "023234900", desc: "Vodoopskrba i prijave kvarova", icon: "water-pump", color: "#0ea5e9" },
  { id: 3, name: "Odvodnja", phone: "023340505", desc: "Održavanje sustava odvodnje", icon: "pipe", color: "#6b7280" },
  { id: 4, name: "Nasadi Zadar", phone: "023233816", desc: "Održavanje zelenih površina i parkova", icon: "tree", color: "#22c55e" },
  { id: 5, name: "Obala i lučice", phone: "023212871", desc: "Upravljanje lukama i vezovima", icon: "anchor", color: "#0284c7" },
  { id: 6, name: "Elektra Zadar", phone: "0800300412", desc: "Prijava kvarova na mreži (HEP)", icon: "lightning-bolt", color: "#f59e0b" },
];
const grad = require("../assets/images/grad-bg.jpg");

export default function KomunalneInfoScreen() {
  const nazovi = (broj) => Linking.openURL(`tel:${broj}`);

  return (
    <ImageBackground
      source={grad}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <View style={styles.safeArea}>
          <Text style={[styles.headerTitle, { marginBottom: 25 }]}>Komunalne Info</Text>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 90 }}>
            
            {/* WideCard1 Stil - Glavna kartica */}
            <View style={styles.wideCardWrapper}>
              <BlurView intensity={25} tint="dark" style={styles.wideGlassCard}>
                <ImageBackground
                  
                  style={StyleSheet.absoluteFill}
                  imageStyle={{ opacity: 0.25 }}
                />
                <View style={styles.wideContent}>
                  <View style={styles.headerRow1}>
                    <MaterialCommunityIcons name="office-building" size={26} color="#10b981" />
                    <Text style={styles.wideCardTitle}>Gradske Službe</Text>
                  </View>
                  <View style={styles.textContainer80}>
                    <Text style={styles.headerSubtitle}>Zadar održiv i čist</Text>
                    <Text style={styles.wideCardDescription}>
                      Prijavite kvarove, informirajte se o odvozu otpada ili zatražite intervenciju gradskih poduzeća.
                    </Text>
                  </View>
                </View>
              </BlurView>
            </View>

            {/* Lista Službi */}
            <Text style={styles.sectionTitle}>Kontakti poduzeća</Text>
            <View style={styles.listContainer}>
              {KOMUNALNE_SLUZBE.map((sluzba) => (
                <BlurView key={sluzba.id} intensity={35} tint="light" style={styles.sluzbaCard}>
                  <View style={styles.sluzbaContent}>
                    <View style={[styles.iconBox, { backgroundColor: 'rgba(255,255,255,0.1)' }]}>
                      <MaterialCommunityIcons name={sluzba.icon} size={24} color={sluzba.color} />
                    </View>
                    
                    <View style={{ flex: 1 }}>
                      <Text style={styles.sluzbaName}>{sluzba.name}</Text>
                      <Text style={styles.sluzbaDesc}>{sluzba.desc}</Text>
                    </View>

                    <TouchableOpacity 
                      style={[styles.callBtn, { backgroundColor: sluzba.color }]} 
                      onPress={() => nazovi(sluzba.phone)}
                    >
                      <Ionicons name="call" size={18} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </BlurView>
              ))}
            </View>

            {/* Brza poveznica - "E-Redar" stil */}
            <TouchableOpacity style={styles.reportWrapper}>
              <BlurView intensity={60} tint="dark" style={styles.reportGlass}>
                <MaterialCommunityIcons name="camera-plus" size={24} color="#10b981" />
                <Text style={styles.reportText}>Prijavi komunalni problem (Foto)</Text>
              </BlurView>
            </TouchableOpacity>

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
  headerSubtitle: { color: "#10b981", fontSize: 18, fontWeight: '600', marginBottom: 6 },
  wideCardDescription: { fontSize: 14, color: "rgba(255, 255, 255, 0.7)", lineHeight: 20 },

  // List Items
  sectionTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 15, marginLeft: 5 },
  listContainer: { gap: 12 },
  sluzbaCard: { borderRadius: 20, overflow: 'hidden', padding: 15, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  sluzbaContent: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  iconBox: { width: 45, height: 45, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },
  sluzbaName: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  sluzbaDesc: { color: 'rgba(255,255,255,0.5)', fontSize: 12, marginTop: 2 },
  callBtn: { width: 40, height: 40, borderRadius: 12, justifyContent: 'center', alignItems: 'center' },

  // Report Button
  reportWrapper: { marginVertical: 30, borderRadius: 20, overflow: 'hidden' },
  reportGlass: { padding: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 12, backgroundColor: 'rgba(255,255,255,0.1)'   },
  reportText: { color: '#fff', fontSize: 16, fontWeight: '600' }
});