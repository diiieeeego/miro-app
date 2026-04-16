import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, Image } from 'react-native';

// --- KOMPONENTA ZA PULSIRAJUĆI SPLASH SCREEN ---
const PulsingSplashScreen = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Definira pulsiranje: povećaj na 1.15x pa vrati na 1x
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.15,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require('./assets/images/logoZadar.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: pulseAnim }],
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

// --- GLAVNA APP KOMPONENTA ---
export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulacija učitavanja (npr. dok se spajaš na Supabase)
    // Promijeni 3000 (3 sekunde) na koliko god želiš
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Ako je učitavanje u tijeku, prikaži splash screen
  if (isLoading) {
    return <PulsingSplashScreen />;
  }

  // Kada završi učitavanje, prikaži glavnu aplikaciju
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Dobrodošli u Zračnu luku Zadar!</Text>
      <Text>Aplikacija je uspješno učitana.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

// --- STILOVI ---
const styles = StyleSheet.create({
  // Stil za Splash Screen
  splashContainer: {
    flex: 1,
    backgroundColor: '#ffffff', // Ovdje stavi boju pozadine koja paše uz logo
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 180,
  },
  // Stil za Glavni ekran
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});