import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '../lib/supabase';
import DiscountCard from '../components/DiscountCard';
import DiscountModal from '../components/DiscountModal';
import HamburgerMenu from '../components/HamburgerMenu';
import BottomTabBar from '../components/BottomTabBar';

export default function PopustiScreen() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState(null);

  useEffect(() => {
    fetchAllDiscounts();
  }, []);

  async function fetchAllDiscounts() {
    setLoading(true);
    const { data, error } = await supabase
      .from('discounts')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Greška pri dohvaćanju:", error.message);
    } else {
      setDiscounts(data);
    }
    setLoading(false);
  }

  return (
    <View style={styles.overlay}>
      <HamburgerMenu />

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#00aaff" />
        </View>
      ) : (
        <FlatList
          data={discounts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => setSelectedDiscount(item)}
            >
              <DiscountCard data={item} />
            </TouchableOpacity>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Popusti</Text>
              <Text style={styles.headerDesc}>Ekskluzivne ponude u Zadru</Text>
            </View>
          }
          ListEmptyComponent={
            <View style={styles.emptyWrap}>
              <Ionicons name="pricetag-outline" size={48} color="rgba(255,255,255,0.25)" />
              <Text style={styles.emptyText}>Trenutno nema dostupnih popusta.</Text>
            </View>
          }
        />
      )}

      <DiscountModal
        discount={selectedDiscount}
        onClose={() => setSelectedDiscount(null)}
      />
      <BottomTabBar />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  backBtn: {
    position: 'absolute',
    top: 55,
    left: 15,
    zIndex: 20,
    borderRadius: 20,
    overflow: 'hidden',
  },
  backBtnInner: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.15)',
    overflow: 'hidden',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    paddingTop: 110,
    paddingHorizontal: 5,
    paddingBottom: 110,
  },
  header: {
    alignItems: 'center',
    marginBottom: 25,
    paddingHorizontal: 10,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 36,
    fontWeight: 'bold',
  },
  headerDesc: {
    color: 'rgba(255,255,255,0.65)',
    fontSize: 14,
    marginTop: 6,
  },
  emptyWrap: {
    alignItems: 'center',
    marginTop: 60,
    gap: 14,
  },
  emptyText: {
    color: 'rgba(255,255,255,0.45)',
    fontSize: 15,
    textAlign: 'center',
  },
});
