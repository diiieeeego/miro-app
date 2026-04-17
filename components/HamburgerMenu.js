import React, { useEffect, useMemo, useState } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BlurView } from "expo-blur";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { supabase } from "../lib/supabase";

const LANG_KEY = "app_lang";

export default function HamburgerMenu() {
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
        settings: "Postavke",
        login: "Prijava",
        logout: "Odjava",
        profile: "Profil korisnika",
        language: "Jezik",
        close: "Zatvori",
      },
      en: {
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
        <BlurView intensity={35} tint="dark" style={styles.fabPill}>
          <Ionicons name="menu" size={20} color="#fff" />
        </BlurView>
      </TouchableOpacity>

      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <Pressable style={styles.backdrop} onPress={() => setOpen(false)}>
          <Pressable style={styles.sheetWrap} onPress={() => {}}>
            <BlurView intensity={45} tint="dark" style={styles.sheet}>
              <View style={styles.sheetHeader}>
                <Text style={styles.sheetTitle}>Menu</Text>
                <TouchableOpacity
                  onPress={() => setOpen(false)}
                  activeOpacity={0.85}
                  style={styles.closeBtn}
                >
                  <Ionicons name="close" size={18} color="rgba(255,255,255,0.9)" />
                  <Text style={styles.closeText}>{label.close}</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.section}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => go("/settings")}
                  style={styles.rowBtn}
                >
                  <Ionicons name="settings-outline" size={18} color="#fff" />
                  <Text style={styles.rowText}>{label.settings}</Text>
                </TouchableOpacity>

                {!isLoggedIn ? (
                  <TouchableOpacity
                    activeOpacity={0.9}
                    onPress={() => go("/login")}
                    style={styles.rowBtn}
                  >
                    <Ionicons name="log-in-outline" size={18} color="#fff" />
                    <Text style={styles.rowText}>{label.login}</Text>
                  </TouchableOpacity>
                ) : (
                  <>
                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={() => go("/profile")}
                      style={styles.rowBtn}
                    >
                      <Ionicons name="person-outline" size={18} color="#fff" />
                      <Text style={styles.rowText}>{label.profile}</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.9}
                      onPress={signOut}
                      style={styles.rowBtn}
                    >
                      <Ionicons name="log-out-outline" size={18} color="#fff" />
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
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    top: 55,
    left: 15,
    zIndex: 20,
  },
  fabPill: {
    width: 44,
    height: 36,
    borderRadius: 14,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    justifyContent: "center",
    alignItems: "center",
  },
  backdrop: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    padding: 18,
    justifyContent: "flex-start",
  },
  sheetWrap: {
    marginTop: 55,
    width: "86%",
    maxWidth: 360,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
  },
  sheet: { padding: 14 },
  sheetHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  sheetTitle: { color: "#fff", fontSize: 16, fontWeight: "900" },
  closeBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    backgroundColor: "rgba(255,255,255,0.06)",
  },
  closeText: { color: "rgba(255,255,255,0.9)", fontSize: 12, fontWeight: "800" },
  section: {
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    paddingTop: 10,
    marginTop: 10,
  },
  rowBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 12,
  },
  rowText: { color: "#fff", fontSize: 14, fontWeight: "800" },
  sectionTitle: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "900" },
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

