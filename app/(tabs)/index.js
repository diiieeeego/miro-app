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
import {
  FontAwesome5,
} from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { supabase } from "../../lib/supabase";
import EventModal from "../../components/EventModal";
import DiscountModal from "../../components/DiscountModal";
import AnketaScreen from "../../components/Anketa";
import VazneVijesti from "../../components/VazneVijesti";
import HamburgerMenu from "../../components/HamburgerMenu";

const { width } = Dimensions.get("window");

export default function HomeScreen() {
  const [featuredDiscount, setFeaturedDiscount] = useState(null);
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedDiscount, setSelectedDiscount] = useState(null);
  const [zadarWeather, setZadarWeather] = useState({
    loading: true,
    tempC: null,
    label: "",
    icon: "cloud-outline",
    windKmh: null,
  });

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
  
  const weatherMetaForCode = (code, isDay) => {
    // Open-Meteo weather codes: https://open-meteo.com/en/docs
    if (code === 0) return { label: "Vedro", icon: isDay ? "sunny-outline" : "moon-outline" };
    if (code === 1) return { label: "Pretežno vedro", icon: isDay ? "partly-sunny-outline" : "cloud-outline" };
    if (code === 2) return { label: "Djelomično oblačno", icon: "partly-sunny-outline" };
    if (code === 3) return { label: "Oblačno", icon: "cloud-outline" };
    if ([45, 48].includes(code)) return { label: "Magla", icon: "cloud-outline" };
    if ([51, 53, 55].includes(code)) return { label: "Rominjanje", icon: "rainy-outline" };
    if ([56, 57].includes(code)) return { label: "Ledena rosulja", icon: "rainy-outline" };
    if ([61, 63, 65].includes(code)) return { label: "Kiša", icon: "rainy-outline" };
    if ([66, 67].includes(code)) return { label: "Ledena kiša", icon: "rainy-outline" };
    if ([71, 73, 75, 77].includes(code)) return { label: "Snijeg", icon: "snow-outline" };
    if ([80, 81, 82].includes(code)) return { label: "Pljuskovi", icon: "rainy-outline" };
    if ([85, 86].includes(code)) return { label: "Snježni pljuskovi", icon: "snow-outline" };
    if ([95, 96, 99].includes(code)) return { label: "Grmljavina", icon: "thunderstorm-outline" };
    return { label: "Vrijeme", icon: "cloud-outline" };
  };

  useEffect(() => {
    fetchFeatured();
    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        // Zadar (approx. city center)
        const latitude = 44.1194;
        const longitude = 15.2314;
        const url =
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}` +
          `&current_weather=true&timezone=Europe%2FZagreb`;

        const res = await fetch(url);
        const json = await res.json();
        const cw = json?.current_weather;

        if (!cw) throw new Error("Missing current_weather");

        const tempC = typeof cw.temperature === "number" ? Math.round(cw.temperature) : null;
        const windKmh = typeof cw.windspeed === "number" ? Math.round(cw.windspeed) : null;
        const isDay = cw.is_day === 1;
        const code = cw.weathercode;
        const meta = weatherMetaForCode(code, isDay);

        setZadarWeather({
          loading: false,
          tempC,
          label: meta.label,
          icon: meta.icon,
          windKmh,
        });
      } catch (e) {
        console.error("Greška kod prognoze:", e?.message ?? e);
        setZadarWeather((prev) => ({ ...prev, loading: false }));
      }
    };

    fetchWeather();
    const id = setInterval(fetchWeather, 10 * 60 * 1000);
    return () => clearInterval(id);
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
      <HamburgerMenu />
      <View style={styles.clockWrap} pointerEvents="none">
        <BlurView intensity={40} tint="dark" style={styles.clockPill}>
          <View style={styles.weatherTopRow}>
            <Text style={styles.clockCity}>Zadar</Text>
            <Ionicons
              name={zadarWeather.icon}
              size={16}
              color="rgba(255,255,255,0.85)"
              style={{ marginLeft: 8 }}
            />
          </View>
          <Text style={styles.clockTime}>
            {zadarWeather.loading || zadarWeather.tempC == null
              ? "Učitavanje…"
              : `${zadarWeather.tempC}°C · ${zadarWeather.label}`}
          </Text>
          {zadarWeather.windKmh != null ? (
            <Text style={styles.weatherSub}>Vjetar {zadarWeather.windKmh} km/h</Text>
          ) : null}
        </BlurView>
      </View>
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
            onPress={() => router.push("/transport")}
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

        <VazneVijesti />

        <View style={{ marginTop: 20, marginBottom: 30 }}>
          <AnketaScreen embedded />
        </View>
        
      </ScrollView>

      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <DiscountModal discount={selectedDiscount} onClose={() => setSelectedDiscount(null)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 15, paddingVertical: 100, backgroundColor: 'rgba(0,0,0,0.3)' },
  clockWrap: {
    position: "absolute",
    top: 55,
    right: 15,
    zIndex: 10,
  },
  clockPill: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    minWidth: 150,
  },
  weatherTopRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  clockCity: {
    color: "rgba(255,255,255,0.75)",
    fontSize: 11,
    fontWeight: "600",
    letterSpacing: 0.2,
    marginBottom: 2,
  },
  clockTime: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: 0.4,
  },
  weatherSub: {
    marginTop: 4,
    color: "rgba(255,255,255,0.6)",
    fontSize: 11,
    fontWeight: "600",
  },
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