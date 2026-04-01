import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  FlatList, 
  ImageBackground, 
  ActivityIndicator,
  TouchableOpacity,
  Dimensions 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { supabase } from '../../lib/supabase';
import EventModal from '../../components/EventModal'; // 1. Uvezi modal

const { width } = Dimensions.get('window');

export default function EventsScreen() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedEvent, setSelectedEvent] = useState(null); // 2. State za odabrani event

  useEffect(() => {
    fetchEvents();
  }, []);

  // Pomoćna funkcija za ljepši prikaz datuma (kao što smo radili za Home)
  const formatirajDatum = (isoString) => {
    if (!isoString) return "Uskoro";
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}. u ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  async function fetchEvents() {
    setLoading(true);
    // Prikazujemo sve buduće događaje
    const { data, error } = await supabase
      .from('events')
      .select('*')
      .gte('start_time', new Date().toISOString()) 
      .order('start_time', { ascending: true });

    if (error) {
      console.error("Greška:", error.message);
    } else {
      setEvents(data);
    }
    setLoading(false);
  }

  const renderEventItem = ({ item }) => (
    <TouchableOpacity 
      activeOpacity={0.9}
      style={styles.cardContainer}
      onPress={() => setSelectedEvent({
        ...item,
        naslov: item.name,
        slika: { uri: item.image_url },
        vrijeme: formatirajDatum(item.start_time),
        opis: item.description || "Nema dodatnog opisa.",
        ponuda: item.price || "Ulaz slobodan",
        link: item.link || "https://www.zadar.travel" // Fallback link
      })}
    >
      <ImageBackground
        source={{ uri: item.image_url || 'https://via.placeholder.com/600x400' }}
        style={styles.imageBg}
        imageStyle={{ borderRadius: 20 }}
      >
        <BlurView intensity={70} tint="dark" style={styles.infoBox}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eventDate}>{formatirajDatum(item.start_time)}</Text>
            <Text style={styles.eventTitle}>{item.name}</Text>
            <Text style={styles.eventLocation}>{item.location || 'Zadar'}</Text>
          </View>
          {item.price && (
            <View style={styles.priceTag}>
              <Text style={styles.priceText}>{item.price}</Text>
            </View>
          )}
        </BlurView>
      </ImageBackground>
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
      <FlatList
        data={events}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderEventItem}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Trenutno nema najavljenih događaja.</Text>
        }
      />

      {/* 3. Dodaj modal na dno View-a */}
      <EventModal 
        event={selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'transparent', paddingHorizontal: 15, paddingVertical: 100 },
  centered: { flex: 1, backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' },
  headerTitle: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 60,
    marginBottom: 20,
  },
  listContent: { paddingBottom: 100 },
  cardContainer: {
    height: 250,
    marginBottom: 20,
    borderRadius: 20,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.1)',
  },
  imageBg: { flex: 1, justifyContent: 'flex-end' },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
  },
  eventDate: { color: '#00aaff', fontSize: 12, fontWeight: 'bold', textTransform: 'uppercase' },
  eventTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold', marginTop: 2 },
  eventLocation: { color: 'rgba(255,255,255,0.6)', fontSize: 14, marginTop: 2 },
  priceTag: {
    backgroundColor: '#ffd700',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
    marginLeft: 10,
  },
  priceText: { color: '#000', fontWeight: 'bold', fontSize: 14 },
  emptyText: { color: '#666', textAlign: 'center', marginTop: 50 },
});