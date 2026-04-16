import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  ImageBackground,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { supabase } from "../../lib/supabase";
import EventModal from "../../components/EventModal";
import { Image } from 'react-native';

const { width } = Dimensions.get("window");
const CATEGORIES = [
  "Sve",
  "Sport",
  "Kultura",
  "Prijevoz",
  "Edukacije",
  "Radionice",
  "Izlasci",
];

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("Sve");

  useEffect(() => {
    fetchEvents();
  }, []);

  async function fetchEvents() {
    setLoading(true);
    // Dobivamo trenutno vrijeme u ISO formatu
    const sad = new Date().toISOString();
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .gte("start_time", sad)
      .order("start_time", { ascending: true });

    if (error) {
      console.error("Greška:", error.message);
    } else {
      setEvents(data);
    }
    setLoading(false);
  }

  const formatirajDatum = (isoString) => {
    if (!isoString) return "Uskoro";
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}. u ${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  // Filtriranje podataka na temelju odabrane kategorije
  const filteredEvents =
    selectedCategory === "Sve"
      ? events
      : events.filter((e) => e.category === selectedCategory);

  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.categoryButton,
        selectedCategory === item && styles.categoryButtonActive,
      ]}
      onPress={() => setSelectedCategory(item)}
    >
      <Text
        style={[
          styles.categoryText,
          selectedCategory === item && styles.categoryTextActive,
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  const renderEventItem = ({ item }) => (
    <TouchableOpacity
      activeOpacity={0.85}
      style={styles.cardContainer}
      onPress={() =>
        setSelectedEvent({
          ...item,
          naslov: item.name,
          slika: { uri: item.image_url },
          vrijeme: formatirajDatum(item.start_time),
          opis: item.description || "Nema dodatnog opisa.",
          ponuda: item.price || "Ulaz slobodan",
          link: item.link || "https://www.zadar.travel",
        })
      }
    >
      <Image
        source={{
          uri: item.image_url || "https://via.placeholder.com/300x200",
        }}
        style={styles.cardImage}
      />
      <View style={styles.cardBody}>
        <View>
          <Text style={styles.eventDate}>
            {formatirajDatum(item.start_time)}
          </Text>
          <Text style={styles.eventTitle} numberOfLines={2}>
            {item.name}
          </Text>
          <Text style={styles.eventLocation}>{item.location || "Zadar"}</Text>
        </View>
        <View style={styles.cardFooter}>
          {item.category && (
            <View style={styles.categoryTag}>
              <Text style={styles.categoryTagText}>{item.category}</Text>
            </View>
          )}
          {item.price && (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerTitle}>Događaji u Zadru</Text>

      {/* Slider kategorija */}
      <View style={{ marginBottom: 20 }}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item}
          renderItem={renderCategoryItem}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      <FlatList
        data={filteredEvents}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            Nema događaja u kategoriji {selectedCategory}.
          </Text>
        }
      />

      <EventModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 15,
    paddingTop: 100,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  headerTitle: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 15,
  },

  // Stilovi za kategorije
  categoryList: { paddingRight: 20 },
  categoryButton: {
    paddingHorizontal: 18,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.1)",
    marginRight: 10,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
  },
  categoryButtonActive: {
    backgroundColor: "#00aaff",
    borderColor: "#00aaff",
  },
  categoryText: { color: "rgba(255,255,255,0.7)", fontWeight: "600" },
  categoryTextActive: { color: "#fff" },

  // Postojeći stilovi...
  listContent: { paddingBottom: 100 },
  // Stari cardContainer, imageBg, infoBox stilovi → zamijeni s ovim:
  cardContainer: {
    height: 140,
    marginBottom: 14,
    borderRadius: 16,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.4)",
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.12)",
  },
  cardImage: {
    width: "38%",
    height: "100%",
  },
  cardBody: {
    flex: 1,
    padding: 14,
    justifyContent: "space-between",
  },
  cardFooter: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  categoryTag: {
    backgroundColor: "rgba(0,170,255,0.15)",
    borderRadius: 8,
    borderWidth: 0.5,
    borderColor: "rgba(0,170,255,0.3)",
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  categoryTagText: {
    color: "#00aaff",
    fontSize: 10,
    fontWeight: "600",
  },
  priceTag: {
    backgroundColor: "#ffd700",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
  },
  priceText: { color: "#000", fontWeight: "bold", fontSize: 11 },
  eventDate: { color: "#00aaff", fontSize: 12, fontWeight: "bold" },
  eventTitle: { color: "#fff", fontSize: 20, fontWeight: "bold" },
  eventLocation: { color: "rgba(255,255,255,0.6)", fontSize: 14 },
  priceTag: {
    backgroundColor: "#ffd700",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  priceText: { color: "#000", fontWeight: "bold" },
  emptyText: {
    color: "#999",
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
  },
});
