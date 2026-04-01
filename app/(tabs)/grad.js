import React from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions 
} from 'react-native';
import { BlurView } from 'expo-blur';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { router } from 'expo-router';
import gradBg from '../../assets/images/grad-bg.jpg';

const { width } = Dimensions.get('window');

export default function GradScreen() {
  
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

  // Pomoćna komponenta za široke kartice (Full Width)
  const WideCard = ({ title, icon, color, lib }) => {
    const IconLib = lib || Ionicons;
    return (
      <TouchableOpacity style={styles.wideCardWrapper}>
        <BlurView intensity={40} tint="light" style={styles.wideGlassCard}>
          <View style={styles.wideContent}>
            <IconLib name={icon} size={24} color={color} />
            <Text style={styles.wideCardTitle}>{title}</Text>
          </View>
        </BlurView>
      </TouchableOpacity>
    );
  };

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1555990136-2f0802f5be24?q=80&w=1000' }} // Zamijeni sa svojom slikom Zadra noću
      style={styles.background}
    >
      <View style={styles.overlay}>
        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Zadar</Text>
            <Text style={styles.headerDesc}>Sve važne gradske informacije</Text>
          </View>

          {/* Prvi red: Parking i Prijevoz */}
          <View style={styles.row}>
            <GridCard title="Parking" icon="parking" color="#3b82f6" lib={MaterialCommunityIcons} route="/parking" />
            <GridCard title="Prijevoz" icon="bus-clock" color="#d97706" lib={MaterialCommunityIcons} route="/prijevoz" />
          </View>

          {/* Drugi red: Hitne i Komunalne */}
          <View style={styles.row}>
            <GridCard title="Hitne Info" icon="alarm-light" color="#ef4444" lib={MaterialCommunityIcons} />
            <GridCard title="Komunalne Info" icon="office-building" color="#10b981" lib={MaterialCommunityIcons} />
          </View>

          {/* Treći red: Nedjelja i Radno Vrijeme */}
          <View style={styles.row}>
            <GridCard title="Što radi nedjeljom" icon="calendar-check" color="#8b5cf6" lib={FontAwesome5} />
            <GridCard title="Radno Vrijeme" icon="shopping-bag" color="#f59e0b" lib={FontAwesome5} />
          </View>

          {/* Sekcija: Transport specifično */}
          <View style={styles.row}>
            <GridCard title="Autobus" icon="bus" color="#1e40af" lib={FontAwesome5} />
            <GridCard title="Trajekt" icon="ship" color="#0891b2" lib={FontAwesome5} />
          </View>

          <View style={styles.row}>
            <GridCard title="Taxi" icon="taxi" color="#475569" lib={FontAwesome5} />
            <GridCard title="Katamaran" icon="ferry" color="#0d9488" lib={MaterialCommunityIcons} />
          </View>

          {/* Zadnja široka kartica */}
          <WideCard title="Sport & Rekreacija" icon="basketball-ball" color="#fbbf24" lib={FontAwesome5} />

        </ScrollView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.3)' },
  scrollContent: { paddingHorizontal: 15, paddingVertical: 100 },
  header: { alignItems: 'center', marginTop: 0, marginBottom: 30 },
  headerSubtitle: { color: '#fff', fontSize: 18, opacity: 0.8 },
  headerTitle: { color: '#fff', fontSize: 36, fontWeight: 'bold' },
  headerDesc: { color: '#fff', fontSize: 14, opacity: 0.7, marginTop: 5 },
  
  row: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  
  // Grid Card Styles
  cardWrapper: { width: '48%', height: 100 },
  glassCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  iconContainer: {
    width: 45,
    height: 45,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    // Lagani shadow za ikonu
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
  },
  cardTitle: { color: '#fff', fontSize: 13, fontWeight: '600', textAlign: 'center' },

  // Wide Card Styles
  wideCardWrapper: { width: '100%', height: 60, marginTop: 5 },
  wideGlassCard: {
    flex: 1,
    borderRadius: 20,
    overflow: 'hidden',
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  wideContent: { flexDirection: 'row', alignItems: 'center' },
  wideCardTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold', marginLeft: 15 },
});