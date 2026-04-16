import React, { useEffect, useRef } from 'react';
import { View, Image, Animated, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = () => {
  // Početna skala je 1 (normalna veličina)
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Definiranje animacije pulsiranja
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.2, // Povećaj za 20%
          duration: 1000,
          useNativeDriver: true, // Koristi native driver za bolje performanse
        }),
        Animated.timing(pulseAnim, {
          toValue: 1, // Vrati na originalnu veličinu
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('./assets/images/logoZadar.png')}
        style={[
          styles.logo,
          {
            transform: [{ scale: pulseAnim }], // Povezivanje animacije sa skalom
          },
        ]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff', // Promijeni u boju tvoje aplikacije
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
  },
});

export default SplashScreen;