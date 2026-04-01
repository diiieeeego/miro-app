import { router } from "expo-router";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
import { supabase } from "../../lib/supabase";
import EventModal from "../../components/EventModal";
import DiscountModal from "../../components/DiscountModal";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [featuredDiscount, setFeaturedDiscount] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  const formatirajDatum = (isoString) => {
    if (!isoString) return "";
    const date = new Date(isoString);
    const dan = String(date.getDate()).padStart(2, "0");
    const mjesec = String(date.getMonth() + 1).padStart(2, "0");
    const godina = date.getFullYear();
    const sati = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    return `${dan}.${mjesec}.${godina}. u ${sati}:${minute}`;
  };

  useEffect(() => {
    fetchFeatured();
    fetchEvents();
  }, []);

  async function fetchEvents() {
    const danas = new Date();
    danas.setHours(0, 0, 0, 0);
    const sutra = new Date(danas);
    sutra.setDate(sutra.getDate() + 1);

    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("start_time", danas.toISOString())
      .lt("start_time", sutra.toISOString())
      .order("start_time", { ascending: true });

    if (data) setEvents(data);
    if (error) console.error("Greška kod filtriranja:", error.message);
  }

  async function fetchFeatured() {
    const { data, error } = await supabase
      .from("discounts")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (data) setFeaturedDiscount(data);
    if (error) console.error("Greška kod glavnog popusta:", error.message);
  }

  return (
    /* 1. UKLONJENA TAMNA BOJA IZ GLAVNOG VIEW-A */
    <View style={{ flex: 1, backgroundColor: "transparent" }}>
      <ScrollView 
        style={styles.container} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <Text style={styles.headerTitle}>Zadar App</Text>

        {/* Glavni istaknuti popust */}
        {featuredDiscount ? (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => setSelectedDiscount(featuredDiscount)}
            style={styles.cardContainer}
          >
            <ImageBackground
              source={{ uri: featuredDiscount.image_url || "https://via.placeholder.com/400" }}
              style={styles.imageBg}
              imageStyle={{ borderRadius: 20 }}
            >
              <BlurView intensity={60} tint="dark" style={styles.glassEffect}>
                <Text style={styles.discountLabel}>Popust Dana</Text>
                <Text style={styles.mainTitle}>
                  {featuredDiscount.discount_percent}% POPUST
                </Text>
                <Text style={styles.partnerText}>
                  {featuredDiscount.partner_name}
                </Text>
              </BlurView>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <View style={styles.loadingPlaceholder}>
            <Text style={{ color: "#fff", opacity: 0.5 }}>Učitavanje ponude...</Text>
          </View>
        )}

        {/* Sekcija: Danas u Zadru */}
        <Text style={styles.sectionTitle}>Danas u Zadru</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.horizontalScroll}
        >
          {events.length > 0 ? (
            events.map((item) => (
              <TouchableOpacity
                key={item.id}
                style={styles.miniCard}
                onPress={() =>
                  setSelectedEvent({
                    ...item,
                    naslov: item.name,
                    slika: { uri: item.image_url },
                    vrijeme: formatirajDatum(item.start_time),
                    opis: item.description || item.name,
                    ponuda: item.price || "Ulaz slobodan",
                  })
                }
                activeOpacity={0.8}
              >
                <ImageBackground
                  source={{ uri: item.image_url }}
                  style={styles.miniCardBg}
                  imageStyle={{ borderRadius: 15 }}
                  resizeMode="cover"
                >
                  <BlurView intensity={40} tint="dark" style={styles.miniOverlay}>
                    <Text style={styles.miniText} numberOfLines={2}>
                      {item.name}
                    </Text>
                  </BlurView>
                </ImageBackground>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ color: "rgba(255,255,255,0.5)", marginLeft: 10 }}>
              Danas nema aktivnih događaja...
            </Text>
          )}
        </ScrollView>

        {/* Sekcija: Prijevoz i Parking */}
        <Text style={styles.sectionTitle}>Prijevoz i Parking</Text>

        <View style={styles.gridContainer}>
          <Pressable
            style={styles.gridCard}
            onPress={() => router.push("/prijevoz")}
          >
            <BlurView intensity={30} tint="light" style={styles.glassCardInner}>
              <View style={styles.iconCircle}>
                <Ionicons name="bus-outline" size={28} color="#00aaff" />
              </View>
              <Text style={styles.gridCardTitle}>Gradski prijevoz</Text>
              <Text style={styles.gridCardSub}>Linije i radno vrijeme</Text>
            </BlurView>
          </Pressable>

          <Pressable
            style={styles.gridCard}
            onPress={() => router.push("/parking")}
          >
            <BlurView intensity={30} tint="light" style={styles.glassCardInner}>
              <View style={styles.iconCircle}>
                <Ionicons name="car-outline" size={28} color="#ffd700" />
              </View>
              <Text style={styles.gridCardTitle}>Parking zone</Text>
              <Text style={styles.gridCardSub}>Lokacije i cijene</Text>
            </BlurView>
          </Pressable>
        </View>
      </ScrollView>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <DiscountModal discount={selectedDiscount} onClose={() => setSelectedDiscount(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, paddingVertical: 100, backgroundColor: 'transparent' },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginTop: 60,
    marginBottom: 20,
  },
  cardContainer: { height: 220, marginBottom: 25 },
  loadingPlaceholder: {
    height: 220,
    backgroundColor: "rgba(255,255,255,0.5)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginBottom: 25
  },
  imageBg: { flex: 1, justifyContent: "flex-end" },
  glassEffect: {
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
  },
  discountLabel: { color: "#ffd700", fontSize: 14, fontWeight: "600", marginBottom: 4 },
  mainTitle: { color: "#fff", fontSize: 26, fontWeight: "bold" },
  partnerText: { color: "rgba(255,255,255,0.7)", fontSize: 16 },
  sectionTitle: { color: "#fff", fontSize: 20, fontWeight: "600", marginBottom: 15, marginTop: 10 },
  horizontalScroll: { marginBottom: 30 },
  miniCard: { width: 150, height: 110, marginRight: 12 },
  miniCardBg: { flex: 1, justifyContent: "flex-end" },
  miniOverlay: {
    padding: 8,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: 'hidden'
  },
  miniText: { color: "#fff", fontSize: 13, fontWeight: "600" },
  gridContainer: { flexDirection: "row", justifyContent: "space-between", marginBottom: 40 },
  gridCard: {
    width: "48%",
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
  },
  glassCardInner: {
    padding: 15,
    flex: 1,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  gridCardTitle: { color: "#fff", fontSize: 16, fontWeight: "bold", marginBottom: 4 },
  gridCardSub: { color: "rgba(255,255,255,0.5)", fontSize: 12 },
});