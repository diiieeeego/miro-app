import { BlurView } from 'expo-blur';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

export default function DiscountCard({ data }) {
  return (
    <View style={styles.container}>
      <ImageBackground 
        source={{ uri: data.image_url || 'https://via.placeholder.com/400' }} 
        style={styles.bg}
        resizeMode="cover"
      >
        <BlurView intensity={80} tint="dark" style={styles.blurBox}>
          <Text style={styles.percent}>{data.discount_percent}% POPUST</Text>
          <Text style={styles.title}>{data.partner_name}</Text>
        </BlurView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    borderRadius: 20, 
    overflow: 'hidden', 
    height: 200, 
    margin: 10,
    backgroundColor: '#333' // Dobra praksa: pozadina dok se slika učitava
  },
  bg: { 
    flex: 1, 
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%'
  },
  blurBox: { 
    padding: 15, 
    borderTopWidth: 1, 
    borderTopColor: 'rgba(255,255,255,0.2)' 
  },
  percent: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  title: { color: '#ccc', fontSize: 16 }
});