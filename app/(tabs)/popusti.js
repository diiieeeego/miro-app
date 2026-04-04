import React, { useEffect, useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  ActivityIndicator, 
  TouchableOpacity 
} from 'react-native';
import { supabase } from '../../lib/supabase';
import DiscountCard from '../../components/DiscountCard';
import DiscountModal from '../../components/DiscountModal'; // 1. Uvezi modal

export default function DiscountsScreen() {
  const [discounts, setDiscounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDiscount, setSelectedDiscount] = useState(null); // 2. State za odabrani popust

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

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#00aaff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Svi Popusti</Text>
      
      <FlatList
        data={discounts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // 3. Omotaj DiscountCard u TouchableOpacity
          <TouchableOpacity 
            activeOpacity={0.9} 
            onPress={() => setSelectedDiscount(item)}
          >
            <DiscountCard data={item} />
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listPadding}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Trenutno nema dostupnih popusta.</Text>
        }
      />

      {/* 4. Dodaj DiscountModal na dno ekrana */}
      <DiscountModal 
        discount={selectedDiscount} 
        onClose={() => setSelectedDiscount(null)} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.3)', 
    paddingTop: 100, // Povećao padding zbog iPhone notcha
    paddingHorizontal: 5
  },
  centered: { 
    flex: 1, 
    backgroundColor: 'transparent', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  title: { 
    color: '#fff', 
    fontSize: 28, 
    fontWeight: 'bold', 
    marginLeft: 15, 
    marginBottom: 20 
  },
  listPadding: { 
    paddingBottom: 100, // Prostor za tab bar na dnu
  },
  emptyText: { 
    color: '#666', 
    textAlign: 'center', 
    marginTop: 50 
  }
});