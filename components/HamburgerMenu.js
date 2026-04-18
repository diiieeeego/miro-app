import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";

const LANG_KEY = "app_lang";

function MenuBars() {
  return (
    <View style={styles.menuBars} accessibilityRole="image" accessibilityLabel="Menu">
      <View style={styles.menuBar} />
      <View style={[styles.menuBar, styles.menuBarMid]} />
      <View style={styles.menuBar} />
    </View>
  );
}

export default function HamburgerMenu() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState("hr");
  const [session, setSession] = useState(null);

  const isLoggedIn = !!session?.user;

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const stored = await AsyncStorage.getItem(LANG_KEY);
        if (mounted && (stored === "hr" || stored === "en")) setLang(stored);
      } catch {}
    })();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let sub;
    supabase.auth.getSession().then(({ data }) => setSession(data?.session ?? null));
    const { data } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession ?? null);
    });
    sub = data?.subscription;
    return () => sub?.unsubscribe?.();
  }, []);

  const label = useMemo(() => {
    const t = {
      hr: {
        menu: "Izbornik",
        settings: "Postavke",
        login: "Prijava",
        logout: "Odjava",
        profile: "Profil korisnika",
        language: "Jezik",
        close: "Zatvori",
      },
      en: {
        menu: "Menu",
        settings: "Settings",
        login: "Sign in",
        logout: "Sign out",
        profile: "Profile",
        language: "Language",
        close: "Close",
      },
    };
    return t[lang] ?? t.hr;
  }, [lang]);

  const setLanguage = async (next) => {
    setLang(next);
    try {
      await AsyncStorage.setItem(LANG_KEY, next);
    } catch {}
  };

  const go = (path) => {
    setOpen(false);
    router.push(path);
  };

  const signOut = async () => {
    setOpen(false);
    try {
      await supabase.auth.signOut();
    } catch {}
  };

  return (
    <>
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={() => setOpen(true)}
        style={styles.fab}
      >
        <BlurView intensity={40} tint="dark" style={styles.fabPill}>
          <MenuBars />
        </BlurView>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <BlurView
          intensity={55}
          tint="dark"
          style={[
            styles.fullSheet,
            {
              paddingTop: Math.max(insets.top, 12) + 8,
              paddingBottom: Math.max(insets.bottom, 12),
              paddingHorizontal: 22,
            },
          ]}
        >
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{label.menu}</Text>
            <TouchableOpacity
              onPress={() => setOpen(false)}
              activeOpacity={0.85}
              style={styles.closeBtn}
            >
              <Ionicons name="close" size={22} color="rgba(255,255,255,0.95)" />
              <Text style={styles.closeText}>{label.close}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.section}>
            <TouchableOpacity
              activeOpacity={0.9}
              onPress={() => go("/settings")}
              style={styles.rowBtn}
            >
              <Ionicons name="settings-outline" size={22} color="#fff" />
              <Text style={styles.rowText}>{label.settings}</Text>
            </TouchableOpacity>

            {!isLoggedIn ? (
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => go("/login")}
                style={styles.rowBtn}
              >
                <Ionicons name="log-in-outline" size={22} color="#fff" />
                <Text style={styles.rowText}>{label.login}</Text>
              </TouchableOpacity>
            ) : (
              <>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => go("/profile")}
                  style={styles.rowBtn}
                >
                  <Ionicons name="person-outline" size={22} color="#fff" />
                  <Text style={styles.rowText}>{label.profile}</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={signOut}
                  style={styles.rowBtn}
                >
                  <Ionicons name="log-out-outline" size={22} color="#fff" />
                  <Text style={styles.rowText}>{label.logout}</Text>
                </TouchableOpacity>
              </>
            )}
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{label.language}</Text>
            <View style={styles.langRow}>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setLanguage("hr")}
                style={[styles.langBtn, lang === "hr" && styles.langBtnActive]}
              >
                <Text style={[styles.langText, lang === "hr" && styles.langTextActive]}>
                  HR
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.9}
                onPress={() => setLanguage("en")}
                style={[styles.langBtn, lang === "en" && styles.langBtnActive]}
              >
                <Text style={[styles.langText, lang === "en" && styles.langTextActive]}>
                  EN
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </BlurView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  menuBars: {
    width: 28,
    height: 22,
    justifyContent: "space-between",
    alignItems: "stretch",
  },
  menuBar: {
    height: 3,
    borderRadius: 2,
    backgroundColor: "#fff",
    width: "100%",
  },
  menuBarMid: {
    width: "68%",
    alignSelf: "center",
  },
  fab: {
    position: "absolute",
    top: 55,
    left: 15,
    zIndex: 20,
  },
  fabPill: {
    width: 56,
    height: 50,
    borderRadius: 18,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.18)",
    justifyContent: "center",
    alignItems: "center",
  },
  fullSheet: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(8, 12, 18, 0.72)",
  },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },
  sheetTitle: { color: "#fff", fontSize: 22, fontWeight: "900", letterSpacing: 0.3 },
  closeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.16)",
    backgroundColor: "rgba(255,255,255,0.08)",
  },
  closeText: { color: "rgba(255,255,255,0.92)", fontSize: 13, fontWeight: "800" },
  section: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.12)",
    paddingTop: 16,
    marginTop: 16,
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
  },
  rowText: { color: "#fff", fontSize: 17, fontWeight: "800" },
  sectionTitle: { color: "rgba(255,255,255,0.78)", fontSize: 13, fontWeight: "900" },
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
  langText: { color: "rgba(255,255,255,0.85)", fontSize: 13, fontWeight: "900" },
  langTextActive: { color: "#ffd700" },
});

