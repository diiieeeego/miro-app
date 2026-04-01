import React from 'react';
import { 
  Modal, View, Text, ImageBackground, 
  TouchableOpacity, StyleSheet, Linking, ScrollView 
} from 'react-native';

const EventModal = ({ event, onClose }) => {
  if (!event) return null;

  return (
    <Modal
      visible={!!event}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ScrollView bounces={false}>
            <ImageBackground 
              source={event.slika} 
              style={styles.image}
              resizeMode="cover"
            >
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeText}>✕</Text>
              </TouchableOpacity>
            </ImageBackground>

            <View style={styles.content}>
              <Text style={styles.title}>{event.naslov}</Text>
              <Text style={styles.time}>🕒 {event.vrijeme}</Text>
              
              <Text style={styles.sectionLabel}>O događaju</Text>
              <Text style={styles.description}>{event.opis}</Text>

              <Text style={styles.sectionLabel}>Ponuda</Text>
              <View style={styles.offerTag}>
                <Text style={styles.offerText}>{event.ponuda}</Text>
              </View>

              <TouchableOpacity 
                style={styles.linkButton} 
                onPress={() => Linking.openURL(event.link)}
              >
                <Text style={styles.linkButtonText}>Vidi Više</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCard: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    maxHeight: '85%',
  },
  image: {
    width: '100%',
    height: 220,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
  },
  closeButton: {
    margin: 15,
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { color: '#fff', fontWeight: 'bold' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#1a1a1a' },
  time: { fontSize: 14, color: '#666', marginTop: 5 },
  sectionLabel: { fontSize: 16, fontWeight: 'bold', marginTop: 20, color: '#333' },
  description: { fontSize: 15, color: '#444', lineHeight: 22, marginTop: 5 },
  offerTag: { 
    backgroundColor: '#f0f7ff', 
    padding: 10, 
    borderRadius: 10, 
    marginTop: 5,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF'
  },
  offerText: { color: '#005bb5', fontStyle: 'italic' },
  linkButton: {
    backgroundColor: '#1a1a1a',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
  },
  linkButtonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});

export default EventModal;