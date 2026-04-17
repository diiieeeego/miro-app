import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BlurView } from "expo-blur";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data?.session) router.back();
    });
  }, []);

  const signInMagicLink = async () => {
    setLoading(true);
    setMessage("");
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email.trim(),
      });
      if (error) throw error;
      setMessage("Poslan je link na email (demo prijava).");
    } catch (e) {
      setMessage(e?.message ?? "Greška kod prijave.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/images/grad-bg.jpg")}
      style={styles.bg}
    >
      <View style={styles.overlay}>
        <View style={styles.topRow}>
          <TouchableOpacity
            onPress={() => router.back()}
            activeOpacity={0.85}
            style={styles.backBtn}
          >
            <Ionicons name="chevron-back" size={22} color="#fff" />
            <Text style={styles.backText}>Nazad</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.wrap}>
          <BlurView intensity={40} tint="dark" style={styles.card}>
            <Text style={styles.title}>Prijava</Text>
            <Text style={styles.sub}>Za demo koristimo prijavu preko email linka.</Text>

            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="email@example.com"
              placeholderTextColor="rgba(255,255,255,0.5)"
              autoCapitalize="none"
              keyboardType="email-address"
              style={styles.input}
            />

            <TouchableOpacity
              activeOpacity={0.9}
              onPress={signInMagicLink}
              disabled={loading || !email.trim()}
              style={[styles.btn, (loading || !email.trim()) && styles.btnDisabled]}
            >
              <Text style={styles.btnText}>{loading ? "Slanje…" : "Pošalji login link"}</Text>
            </TouchableOpacity>

            {message ? <Text style={styles.msg}>{message}</Text> : null}
          </BlurView>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: { flex: 1 },
  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)" },
  topRow: { paddingTop: 55, paddingHorizontal: 15, marginBottom: 14 },
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
  wrap: { flex: 1, paddingHorizontal: 15, paddingTop: 20, backgroundColor: "transparent" },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(0,0,0,0.15)",
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "900", marginBottom: 8 },
  sub: { color: "rgba(255,255,255,0.7)", fontSize: 14, lineHeight: 20, marginBottom: 14 },
  input: {
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: "#fff",
    backgroundColor: "rgba(255,255,255,0.06)",
    marginBottom: 12,
  },
  btn: {
    backgroundColor: "#3b82f6",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnDisabled: { opacity: 0.6 },
  btnText: { color: "#fff", fontWeight: "900" },
  msg: { marginTop: 12, color: "rgba(255,255,255,0.8)", fontWeight: "700" },
});

