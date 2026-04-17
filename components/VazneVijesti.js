import React, { useMemo, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";

const demoNews = [
  {
    id: "vz-1",
    category: "Grad",
    title: "Nova šetnica uz more: radovi ulaze u završnu fazu",
    excerpt:
      "Grad najavljuje završetak uređenja u narednih 14 dana. Očekuje se bolja povezanost rive i centra.",
    timeLabel: "Prije 35 min",
    icon: "walk-outline",
  },
  {
    id: "vz-2",
    category: "Promet",
    title: "Privremena regulacija prometa u Poluotoku ovog vikenda",
    excerpt:
      "Zbog događanja u staroj jezgri uvodi se posebna regulacija i pojačan nadzor parkiranja.",
    timeLabel: "Danas 09:20",
    icon: "car-outline",
  },
  {
    id: "vz-3",
    category: "Kultura",
    title: "Večeras: besplatan koncert na Forumu",
    excerpt:
      "Glazbeni program kreće u 20:30. Preporuka: dođite ranije zbog većeg interesa.",
    timeLabel: "Danas 18:00",
    icon: "musical-notes-outline",
  },
  {
    id: "vz-4",
    category: "Vrijeme",
    title: "Mogući pljuskovi kasno navečer",
    excerpt:
      "Kratkotrajne oborine moguće su iza 22h. U jutarnjim satima očekuje se razvedravanje.",
    timeLabel: "Ažurirano",
    icon: "rainy-outline",
  },
];

export default function VazneVijesti({
  title = "Važne vijesti",
  initialCount = 3,
  items = demoNews,
  onOpenItem,
}) {
  const [expanded, setExpanded] = useState(false);
  const visibleItems = useMemo(() => {
    if (expanded) return items;
    return items.slice(0, initialCount);
  }, [expanded, items, initialCount]);

  return (
    <View style={styles.wrap}>
      <View style={styles.headerRow}>
        <Text style={styles.sectionTitle}>{title}</Text>
        <TouchableOpacity
          activeOpacity={0.85}
          onPress={() => setExpanded((v) => !v)}
          style={styles.expandBtn}
        >
          <Text style={styles.expandText}>{expanded ? "Manje" : "Više"}</Text>
          <Ionicons
            name={expanded ? "chevron-up" : "chevron-down"}
            size={16}
            color="rgba(255,255,255,0.85)"
          />
        </TouchableOpacity>
      </View>

      {visibleItems.map((item) => (
        <TouchableOpacity
          key={item.id}
          activeOpacity={0.9}
          onPress={() => onOpenItem?.(item)}
          style={styles.cardOuter}
        >
          <BlurView intensity={30} tint="dark" style={styles.card}>
            <View style={styles.cardTopRow}>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{item.category}</Text>
              </View>
              <Text style={styles.timeText}>{item.timeLabel}</Text>
            </View>

            <View style={styles.titleRow}>
              <View style={styles.iconCircle}>
                <Ionicons name={item.icon} size={18} color="#ffd700" />
              </View>
              <Text style={styles.newsTitle} numberOfLines={2}>
                {item.title}
              </Text>
            </View>

            <Text style={styles.excerpt} numberOfLines={2}>
              {item.excerpt}
            </Text>
          </BlurView>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { marginBottom: 10 },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
    marginBottom: 12,
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "600",
  },
  expandBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  expandText: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 12,
    fontWeight: "700",
  },
  cardOuter: {
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.1)",
    marginBottom: 12,
  },
  card: { padding: 14 },
  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: "rgba(255,215,0,0.14)",
    borderWidth: 1,
    borderColor: "rgba(255,215,0,0.25)",
  },
  badgeText: {
    color: "#ffd700",
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
  timeText: { color: "rgba(255,255,255,0.6)", fontSize: 11, fontWeight: "700" },
  titleRow: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  iconCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255,0.08)",
    justifyContent: "center",
    alignItems: "center",
  },
  newsTitle: { color: "#fff", fontSize: 15, fontWeight: "800", flex: 1 },
  excerpt: { color: "rgba(255,255,255,0.7)", fontSize: 12, lineHeight: 18 },
});

