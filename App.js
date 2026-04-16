import React, { useState, useEffect, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';

// Zadrži Expo splash screen dok se app ne inicijalizira
SplashScreen.preventAutoHideAsync();

const PulsingSplashScreen = () => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);

  return (
    <View style={styles.splashContainer}>
      <Animated.Image
        source={require('./assets/images/logoZadar.png')}
        style={[styles.logo, { transform: [{ scale: pulseAnim }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const prepare = async () => {
      // Sakrij Expo-ov splash screen čim je React spreman
      await SplashScreen.hideAsync();

      // Prikaži vlastiti splash screen 3 sekunde
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    };

    prepare();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <PulsingSplashScreen key="splash" />
      ) : (
        <View style={styles.container} key="main-content">
          <Text style={styles.welcomeText}>Zračna luka Zadar</Text>
          <Text>Uspješno ste ušli u aplikaciju.</Text>
          <StatusBar style="auto" />
        </View>
      )}
    </View>
  );
}