import React, { useEffect, useMemo, useState } from "react";
import {
  Alert,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import BottomTabBar from "../components/BottomTabBar";

const SETTINGS_KEY = "app_settings_v1";

const defaultSettings = {
  notifications: true,
  trafficAlerts: true,
  eventAlerts: true,
  location: false,
  dataSaver: false,
};

export default function SettingsScreen() {
  const [settings, setSettings] = useState(defaultSettings);
  const [lang, setLang] = useState("hr");

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(SETTINGS_KEY);
        if (raw && mounted) setSettings({ ...defaultSettings, ...JSON.parse(raw) });
      } catch {}
      try {
        const storedLang = await AsyncStorage.getItem("app_lang");
        if (mounted && (storedLang === "hr" || storedLang === "en")) setLang(storedLang);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    AsyncStorage.setItem(SETTINGS_KEY, JSON.stringify(settings)).catch(() => {});
  }, [settings]);

  const t = useMemo(() => {
    const dict = {
      hr: {
        title: "Postavke",
        subtitle: "Prilagodite aplikaciju po sebi (demo).",
        back: "Nazad",
        sections: {
          alerts: "Obavijesti",
          privacy: "Privatnost",
          app: "Aplikacija",
        },
        labels: {
          notifications: "Push notifikacije",
          trafficAlerts: "Radovi i regulacije prometa",
          eventAlerts: "Eventi koji ometaju svakodnevicu",
          location: "Lokacija (preporuke u blizini)",
          dataSaver: "Ušteda podataka (manje slika)",
          privacyPolicy: "Politika privatnosti",
          terms: "Uvjeti korištenja",
          clearCache: "Očisti cache",
          about: "O aplikaciji",
          contact: "Kontakt",
          language: "Jezik",
        },
        values: { hr: "Hrvatski", en: "English" },
      },
      en: {
        title: "Settings",
        subtitle: "Personalize the app (demo).",
        back: "Back",
        sections: {
          alerts: "Notifications",
          privacy: "Privacy",
          app: "App",
        },
        labels: {
          notifications: "Push notifications",
          trafficAlerts: "Roadworks & traffic changes",
          eventAlerts: "Events that affect daily life",
          location: "Location (nearby recommendations)",
          dataSaver: "Data saver (fewer images)",
          privacyPolicy: "Privacy policy",
          terms: "Terms of use",
          clearCache: "Clear cache",
          about: "About",
          contact: "Contact",
          language: "Language",
        },
        values: { hr: "Croatian", en: "English" },
      },
    };
    return dict[lang] ?? dict.hr;
  }, [lang]);

  const toggle = (key) => setSettings((s) => ({ ...s, [key]: !s[key] }));

  const setLanguage = async (next) => {
    setLang(next);
    try {
      await AsyncStorage.setItem("app_lang", next);
    } catch {}
  };

  const clearCache = () => {
    Alert.alert(
      t.labels.clearCache,
      lang === "en"
        ? "This is a demo action. Clear locally stored settings?"
        : "Ovo je demo akcija. Očistiti lokalno spremljene postavke?",
      [
        { text: lang === "en" ? "Cancel" : "Odustani", style: "cancel" },
        {
          text: lang === "en" ? "Clear" : "Očisti",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem(SETTINGS_KEY);
              setSettings(defaultSettings);
            } catch {}
          },
        },
      ]
    );
  };

  return (
    <ImageBackground source={require("../assets/images/grad-bg.jpg")} style={styles.bg}>
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>{t.title}</Text>
          <Text style={styles.sub}>{t.subtitle}</Text>

          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.sectionTitle}>{t.sections.alerts}</Text>

            <SettingSwitchRow
              icon="notifications-outline"
              label={t.labels.notifications}
              value={settings.notifications}
              onValueChange={() => toggle("notifications")}
            />
            <SettingSwitchRow
              icon="construct-outline"
              label={t.labels.trafficAlerts}
              value={settings.trafficAlerts}
              onValueChange={() => toggle("trafficAlerts")}
              disabled={!settings.notifications}
            />
            <SettingSwitchRow
              icon="calendar-outline"
              label={t.labels.eventAlerts}
              value={settings.eventAlerts}
              onValueChange={() => toggle("eventAlerts")}
              disabled={!settings.notifications}
            />
          </BlurView>

          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.sectionTitle}>{t.sections.app}</Text>

            <SettingSwitchRow
              icon="location-outline"
              label={t.labels.location}
              value={settings.location}
              onValueChange={() => toggle("location")}
            />
            <SettingSwitchRow
              icon="cellular-outline"
              label={t.labels.dataSaver}
              value={settings.dataSaver}
              onValueChange={() => toggle("dataSaver")}
            />

            <View style={styles.divider} />

            <Text style={styles.miniTitle}>{t.labels.language}</Text>
            <View style={styles.langRow}>
              <LangButton
                label={`HR · ${t.values.hr}`}
                active={lang === "hr"}
                onPress={() => setLanguage("hr")}
              />
              <LangButton
                label={`EN · ${t.values.en}`}
                active={lang === "en"}
                onPress={() => setLanguage("en")}
              />
            </View>
          </BlurView>

          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.sectionTitle}>{t.sections.privacy}</Text>

            <SettingNavRow
              icon="shield-checkmark-outline"
              label={t.labels.privacyPolicy}
              onPress={() =>
                Alert.alert(
                  t.labels.privacyPolicy,
                  lang === "en"
                    ? "Demo placeholder. Here we would open a policy page."
                    : "Demo placeholder. Ovdje bi se otvorila stranica politike privatnosti."
                )
              }
            />
            <SettingNavRow
              icon="document-text-outline"
              label={t.labels.terms}
              onPress={() =>
                Alert.alert(
                  t.labels.terms,
                  lang === "en"
                    ? "Demo placeholder. Here we would open terms of use."
                    : "Demo placeholder. Ovdje bi se otvorili uvjeti korištenja."
                )
              }
            />

            <View style={styles.divider} />

            <SettingNavRow icon="trash-outline" label={t.labels.clearCache} danger onPress={clearCache} />
          </BlurView>

          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.sectionTitle}>{lang === "en" ? "Info" : "Info"}</Text>
            <SettingNavRow
              icon="information-circle-outline"
              label={t.labels.about}
              onPress={() =>
                Alert.alert(
                  t.labels.about,
                  lang === "en"
                    ? "Zadar App — demo build for client presentation."
                    : "Zadar App — demo build za prezentaciju klijentu."
                )
              }
            />
            <SettingNavRow
              icon="mail-outline"
              label={t.labels.contact}
              onPress={() =>
                Alert.alert(
                  t.labels.contact,
                  lang === "en" ? "hello@zadarapp.demo" : "hello@zadarapp.demo"
                )
              }
            />
          </BlurView>

        </ScrollView>
        <BottomTabBar />
      </View>
    </ImageBackground>
  );
}

function SettingSwitchRow({ icon, label, value, onValueChange, disabled }) {
  return (
    <View style={[styles.row, disabled && { opacity: 0.5 }]}>
      <View style={styles.rowLeft}>
        <View style={styles.iconCircle}>
          <Ionicons name={icon} size={18} color="rgba(255,255,255,0.9)" />
        </View>
        <Text style={styles.rowText}>{label}</Text>
      </View>
      <Switch value={value} onValueChange={onValueChange} disabled={disabled} />
    </View>
  );
}

function SettingNavRow({ icon, label, onPress, danger }) {
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onPress} style={styles.navRow}>
      <View style={styles.rowLeft}>
        <View style={[styles.iconCircle, danger && { borderColor: "rgba(239,68,68,0.35)" }]}>
          <Ionicons name={icon} size={18} color={danger ? "rgba(239,68,68,0.95)" : "rgba(255,255,255,0.9)"} />
        </View>
        <Text style={[styles.rowText, danger && { color: "rgba(255,255,255,0.95)" }]}>{label}</Text>
      </View>
      <Ionicons name="chevron-forward" size={16} color="rgba(255,255,255,0.6)" />
    </TouchableOpacity>
  );
}

function LangButton({ label, active, onPress }) {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={onPress}
      style={[styles.langBtn, active && styles.langBtnActive]}
    >
      <Text style={[styles.langText, active && styles.langTextActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  topRow: { paddingTop: 55, paddingHorizontal: 15, marginBottom: 6 },
  backBtn: {
    alignSelf: "flex-start",
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  backText: { color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: "900" },
  scroll: { paddingHorizontal: 15, paddingTop: 60, paddingBottom: 90 },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(0,0,0,0.15)",
    marginTop: 12,
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "900", marginBottom: 8 },
  sub: { color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 20, marginBottom: 6 },
  sectionTitle: { color: "#fff", fontSize: 16, fontWeight: "900", marginBottom: 12 },
  miniTitle: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "900" },
  divider: { height: 1, backgroundColor: "rgba(255,255,255,0.1)", marginVertical: 12 },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  navRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  rowLeft: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1, paddingRight: 10 },
  rowText: { color: "#fff", fontSize: 14, fontWeight: "800", flex: 1 },
  iconCircle: {
    width: 34,
    height: 34,
    borderRadius: 17,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
    justifyContent: "center",
    alignItems: "center",
  },
  langRow: { flexDirection: "row", gap: 10, marginTop: 10 },
  langBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
    alignItems: "center",
  },
  langBtnActive: {
    borderColor: "rgba(255,215,0,0.35)",
    backgroundColor: "rgba(255,215,0,0.14)",
  },
  langText: { color: "rgba(255,255,255,0.85)", fontSize: 12, fontWeight: "900" },
  langTextActive: { color: "#ffd700" },
});

