import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router, usePathname } from 'expo-router';

const TABS = [
  { name: 'Home',      icon: 'home-outline',     activeIcon: 'home',            route: '/' },
  { name: 'Grad',      icon: 'business-outline',  activeIcon: 'business',        route: '/grad' },
  { name: 'Događaji',  icon: 'calendar-outline',  activeIcon: 'calendar',        route: '/dogadaji' },
  { name: 'Doživljaji',icon: 'pricetag-outline',  activeIcon: 'pricetag',        route: '/experiences' },
];

export default function BottomTabBar() {
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      {TABS.map((tab) => {
        const isActive = pathname === tab.route;
        return (
          <TouchableOpacity
            key={tab.name}
            style={styles.tab}
            onPress={() => router.push(tab.route)}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isActive ? tab.activeIcon : tab.icon}
              size={24}
              color={isActive ? '#fff' : 'rgba(255,255,255,0.4)'}
            />
            <Text style={[styles.label, isActive && styles.labelActive]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: 'rgba(10, 15, 20, 0.9)',
    paddingTop: 10,
    paddingBottom: Platform.OS === 'ios' ? 28 : 12,
    borderTopWidth: 0,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
  },
  label: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 10,
    fontWeight: '600',
  },
  labelActive: {
    color: '#fff',
  },
});
