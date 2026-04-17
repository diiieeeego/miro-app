import React from "react";
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
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import { router } from "expo-router";
import HamburgerMenu from "../../components/HamburgerMenu";


const { width } = Dimensions.get("window");

export default function GradScreen() {
  const vazneInfo = [
    {
      id: "info-1",
      type: "Radovi",
      title: "Radovi na kolniku: Put Stanova",
      detail: "Očekuju se povremena zadržavanja i naizmjenično propuštanje prometa.",
      time: "Danas 07:00–16:00",
      icon: "road-variant",
      iconLib: MaterialCommunityIcons,
      color: "#f59e0b",
    },
    {
      id: "info-2",
      type: "Event",
      title: "Događanje u centru: posebna regulacija (Poluotok)",
      detail: "Pojačan nadzor parkiranja i moguće zatvaranje pojedinih ulica u večernjim satima.",
      time: "Danas 18:00–23:30",
      icon: "account-group-outline",
      iconLib: MaterialCommunityIcons,
      color: "#3b82f6",
    },
    {
      id: "info-3",
      type: "Obavijest",
      title: "Privremeno izmijenjene autobusne stanice",
      detail: "Zbog radova se dio linija preusmjerava. Provjerite najbližu zamjensku stanicu.",
      time: "Do petka",
      icon: "bus-alert",
      iconLib: MaterialCommunityIcons,
      color: "#10b981",
    },
  ];

  const VaznaInfoCard = ({ item }) => {
    const IconLib = item.iconLib || Ionicons;
    return (
      <TouchableOpacity activeOpacity={0.9} style={styles.infoCardOuter}>
        <BlurView intensity={35} tint="dark" style={styles.infoCard}>
          <View style={styles.infoTopRow}>
            <View style={[styles.infoBadge, { borderColor: `${item.color}55`, backgroundColor: `${item.color}22` }]}>
              <Text style={[styles.infoBadgeText, { color: item.color }]}>{item.type}</Text>
            </View>
            <Text style={styles.infoTime}>{item.time}</Text>
          </View>

          <View style={styles.infoTitleRow}>
            <View style={[styles.infoIconCircle, { borderColor: `${item.color}55` }]}>
              <IconLib name={item.icon} size={18} color={item.color} />
            </View>
            <Text style={styles.infoTitle} numberOfLines={2}>
              {item.title}
            </Text>
          </View>

          <Text style={styles.infoDetail} numberOfLines={2}>
            {item.detail}
          </Text>
        </BlurView>
      </TouchableOpacity>
    );
  };

  // Pomoćna komponenta za Grid kartice
  const GridCard = ({ title, icon, color, lib, route }) => {
    const IconLib = lib || Ionicons;
    return (
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={() => route && router.push(route)}
      >
        <BlurView intensity={40} tint="light" style={styles.glassCard}>
          <View style={[styles.iconContainer, { backgroundColor: color }]}>
            <IconLib name={icon} size={24} color="#fff" />
          </View>
          <Text style={styles.cardTitle}>{title}</Text>
        </BlurView>
      </TouchableOpacity>
    );
  };
  const WideCard = ({ title, icon, color, lib, route }) => {
    const IconLib = lib || Ionicons;

    return (
      <TouchableOpacity style={styles.wideCardWrapper} onPress={() => route && router.push(route)}>
        <BlurView intensity={40} tint="light" style={styles.wideGlassCard}>
          <View style={styles.wideContent}>
            <IconLib name={icon} size={24} color={color} />

            <Text style={styles.wideCardTitle}>{title}</Text>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  const WideCard1 = ({
    title,
    icon,
    color,
    lib,
    subtitle,
    description,
    buttonText,
    onPress,
  }) => {
    const IconLib = lib || Ionicons;
    return (
      <View style={styles.wideCardWrapper1}>
        
        <BlurView intensity={35} tint="dark" style={styles.wideGlassCard1}>
          <ImageBackground
            source={require('../../assets/images/explore1.jpg')}
            style={StyleSheet.absoluteFill}
            // Za test ostavi: style={[StyleSheet.absoluteFill, {backgroundColor: 'red'}]}
         />
          <View style={styles.wideContent1}>
            {/* Header dio: Ikona i Naslov */}
            <View style={styles.headerRow1}>
              <IconLib name={icon} size={26} color={color} />
              <Text style={styles.wideCardTitle1}>{title}</Text>
            </View>

            <View style={{ width: '80%', marginBottom: 20 }}>
              <Text style={styles.headerSubtitle1}>{subtitle}</Text>
              <Text style={styles.wideCardDescription1}>{description}</Text>
            </View>

            {/* Donji dio: Gumb */}
            <TouchableOpacity
              style={[styles.qrButton, { backgroundColor: color }]}
              onPress={onPress}
              activeOpacity={0.8}
            >
              <Text style={styles.qrButtonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    );
  };

  return (
    
      <View style={styles.overlay}>
        <HamburgerMenu />
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Zadar</Text>
            <Text style={styles.headerDesc}>Sve važne gradske informacije</Text>
          </View>

          <Text style={styles.sectionTitle}>Važne informacije</Text>
          <View style={styles.infoList}>
            {vazneInfo.map((item) => (
              <VaznaInfoCard key={item.id} item={item} />
            ))}
          </View>

          {/* Prvi red: Hitne i Komunalne */}
          <View style={styles.row}>
            <GridCard
              title="Hitne Info"
              icon="alarm-light"
              color="#ef4444"
              lib={MaterialCommunityIcons}
              route="/hitne_info"
            />
            <GridCard
              title="Komunalne Info"
              icon="office-building"
              color="#10b981"
              lib={MaterialCommunityIcons}
              route="/komunalne"
            />
          </View>

          {/* Drugi red: Nedjelja i Radno Vrijeme */}
          <View style={styles.row}>
            <GridCard
              title="Što radi nedjeljom"
              icon="calendar-check"
              color="#8b5cf6"
              lib={FontAwesome5}
              route="/radne_nedjelje"
            />
            <GridCard
              title="Anketa"
              icon="poll"
              color="#f59e0b"
              lib={FontAwesome5}
              route="/anketa"
            />
          </View>

          {/* Sekcija: Transport specifično */}
          <View style={styles.row}>
            <GridCard
              title="Autobus"
              icon="bus"
              color="#1e40af"
              lib={FontAwesome5}
              route="/transport"
            />
            <GridCard
              title="Trajekt & Katamaran"
              icon="ship"
              color="#0891b2"
              lib={FontAwesome5}
              route="/transport"
            />
          </View>

          <View style={styles.row}>
            <GridCard
              title="Taxi"
              icon="taxi"
              color="#475569"
              lib={FontAwesome5}
              route="/taxi"
            />
            <GridCard
              title="Parking"
              icon="parking"
              color="#3b82f6"
              lib={MaterialCommunityIcons}
              route="/parking"
            />
          </View>
          <View style={styles.row}>
            {/* Zadnja široka kartica */}
            <WideCard
              title="Sport & Rekreacija"
              icon="basketball-ball"
              color="#fbbf24"
              lib={FontAwesome5}
              route="/sport"
            />
          </View>
          <View style={styles.row}>
            <WideCard1
              title="Naručite svoj QR code stalak"
              subtitle="Za vaš apartman · brzo i jednostavno"
              icon="globe-europe"
              color="#3b82f6"
              lib={FontAwesome5}
              description="Gosti skeniraju QR i odmah dobiju Wi‑Fi podatke, upute za ulaz, kućni red i preporuke u blizini."
              buttonText="Zatraži ponudu"
              onPress={() => console.log("QR stalak: upit")}
            />
          </View>
        </ScrollView>
      </View>
    
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.3)" },
  scrollContent: { paddingHorizontal: 15, paddingVertical: 100 },
  header: { alignItems: "center", marginTop: 0, marginBottom: 30 },
  headerSubtitle: { color: "#fff", fontSize: 18, opacity: 0.8 },
  headerTitle: { color: "#fff", fontSize: 36, fontWeight: "bold" },
  headerDesc: { color: "#fff", fontSize: 14, opacity: 0.7, marginTop: 5 },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 12,
    marginTop: 4,
  },
  infoList: { marginBottom: 18 },
  infoCardOuter: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    marginBottom: 12,
  },
  infoCard: { padding: 14 },
  infoTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  infoBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    borderWidth: 1,
  },
  infoBadgeText: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  infoTime: { color: "rgba(255,255,255,0.65)", fontSize: 11, fontWeight: "700" },
  infoTitleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  infoIconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  infoTitle: { color: "#fff", fontSize: 15, fontWeight: "800", flex: 1 },
  infoDetail: { color: "rgba(255,255,255,0.75)", fontSize: 12, lineHeight: 18 },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  // Grid Card Styles
  cardWrapper: { width: "48%", height: 100 },
  glassCard: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    // Lagani shadow za ikonu
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  cardTitle: {
    color: "#fff",
    fontSize: 13,
    fontWeight: "600",
    textAlign: "center",
  },

  // Wide Card Styles
  wideCardWrapper: { width: "100%", height: 60, marginTop: 5 },
  wideGlassCard: {
    flex: 1,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  wideContent: { flexDirection: "row", alignItems: "center", justifyContent: "center" },
  wideCardTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 15,
  },
  wideCardWrapper: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden", // Važno za BlurView zaobljene rubove
    marginBottom: 0,
  },
  wideGlassCard: {
    padding: 20,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  wideCardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff", // Prilagodi ovisno o tint-u (light/dark)
    marginLeft: 12,
  },
  wideCardDescription: {
    fontSize: 15,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 22,
    marginBottom: 20,
  },
  qrButton: {
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  qrButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 15,
  },
  wideCardWrapper1: {
    width: "100%",
    borderRadius: 20,
    overflow: "hidden", // Važno za BlurView zaobljene rubove
    marginBottom: 20,
    height: "auto", // Veća visina za više sadržaja
    
    
  },
  wideGlassCard1: {
    padding: 30,
    minHeight: 300, 
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    
  },
  wideContent1: {
    display: "flex",
    flexDirection: "column",
    gap: 15,
    justifyContent: "space-between",
    
  },
  headerRow1: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  wideCardTitle1: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff", // Prilagodi ovisno o tint-u (light/dark)
    marginLeft: 12,
  },
  headerSubtitle1: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 8,
    textAlign: "start",
  },
  wideCardDescription1: {
    fontSize: 14,
    color: "rgba(255, 255, 255, 0.8)",
    lineHeight: 20,
    textAlign: "start",
  },
  
});
