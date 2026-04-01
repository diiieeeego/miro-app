import React from "react";
import {
  Modal,
  View,
  Text,
  Image,
  ImageBackground, // Dodaj ImageBackground
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";

const { width } = Dimensions.get("window");

const DiscountModal = ({ discount, onClose }) => {
  if (!discount) return null;

  // Formatiranje datuma isteka
  const formatirajDatum = (isoString) => {
    if (!isoString) return "Do opoziva";
    const date = new Date(isoString);
    return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}.`;
  };

  return (
    <Modal
      visible={!!discount}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalCard}>
          <ImageBackground
            source={{ uri: discount.image_url }}
            style={styles.backgroundImage}
            imageStyle={{ borderTopLeftRadius: 30, borderTopRightRadius: 30 }}
          >
            {/* Tamni sloj da tekst bude čitljiv */}
            <View style={styles.darkOverlay}>
              <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                {/* Header */}
                <View style={styles.header}>
                  <Text style={styles.partnerName}>
                    {discount.partner_name}
                  </Text>
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={onClose}
                  >
                    <Text style={styles.closeText}>✕</Text>
                  </TouchableOpacity>
                </View>

                <View style={styles.content}>
                  {/* Ostatak sadržaja (Badge, QR, Info) ostaje isti */}
                  <View style={styles.badgeContainer}>
                    <Text style={styles.discountAmount}>
                      {discount.discount_percent}%
                    </Text>
                    <Text style={styles.discountLabel}>POPUSTA</Text>
                  </View>

                  <View style={styles.qrSection}>
                    <Text style={styles.qrInstruction}>
                      Pokažite ovaj kod na blagajni:
                    </Text>
                    <View style={styles.qrContainer}>
                      <Image
                        source={{
                          uri:
                            discount.qr_url ||
                            `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${discount.partner_name}`,
                        }}
                        style={styles.qrImage}
                      />
                    </View>
                    <Text style={styles.expiryDate}>
                      Vrijedi do: {formatirajDatum(discount.expires_at)}
                    </Text>
                  </View>

                  <View style={styles.infoSection}>
                    <Text style={styles.sectionTitle}>Detalji ponude</Text>
                    <BlurView
                      intensity={20}
                      tint="light"
                      style={styles.descriptionBlur}
                    >
                      <Text style={styles.descriptionText}>
                        {discount.description ||
                          `Iskoristite ovaj popust kod partnera ${discount.partner_name}.`}
                      </Text>
                    </BlurView>
                  </View>

                  <TouchableOpacity
                    style={styles.finishButton}
                    onPress={onClose}
                  >
                    <Text style={styles.finishButtonText}>Zatvori</Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </ImageBackground>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.85)",
    justifyContent: "flex-end", // Modal izlazi odozdo
  },
  modalCard: {
    backgroundColor: '#0a0f14', // Fallback boja
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    height: '90%',
    width: '100%',
    overflow: 'hidden',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  darkOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)', // Zatamnjenje slike pozadine
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 25,
    // Mičemo borderBottom jer kvari izgled slike
  },
  partnerName: { fontSize: 22, fontWeight: 'bold', color: '#fff' }, // Bijeli tekst na tamnoj slici
  closeButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 35,
    height: 35,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: { fontSize: 18, color: '#fff', fontWeight: '600' },
  // Opis s laganim blur efektom radi bolje čitljivosti
  descriptionBlur: {
    padding: 15,
    borderRadius: 15,
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  descriptionText: { color: '#ddd', fontSize: 15, lineHeight: 22 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#fff', marginBottom: 10 },
  content: { padding: 25, alignItems: "center" },
  badgeContainer: {
    backgroundColor: "#0a0f14",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 30,
  },
  discountAmount: { color: "#ffd700", fontSize: 42, fontWeight: "900" },
  discountLabel: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    letterSpacing: 2,
  },
  qrSection: {
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    padding: 20,
    borderRadius: 25,
    width: "100%",
    marginBottom: 30,
  },
  qrInstruction: { color: "#666", marginBottom: 15, fontSize: 14 },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  qrImage: { width: 180, height: 180 },
  expiryDate: {
    color: "#e74c3c",
    fontWeight: "600",
    marginTop: 15,
    fontSize: 14,
  },
  infoSection: { width: "100%", marginBottom: 30, color: '#fff' },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
    marginBottom: 10,
  },
  description: { fontSize: 15, color: "#555", lineHeight: 22 },
  finishButton: {
    width: "100%",
    backgroundColor: "#0a0f14",
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  finishButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});

export default DiscountModal;
