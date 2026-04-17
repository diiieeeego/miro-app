import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BlurView } from "expo-blur";
import { supabase } from "../lib/supabase";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [email, setEmail] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      const userEmail = data?.user?.email ?? "";
      setEmail(userEmail);
      if (!data?.user) router.replace("/login");
    });
  }, []);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
    } finally {
      router.replace("/login");
    }
  };

  return (
    <View style={styles.wrap}>
      <BlurView intensity={40} tint="dark" style={styles.card}>
        <Text style={styles.title}>Profil korisnika</Text>
        <Text style={styles.sub}>Email: {email || "—"}</Text>

        <TouchableOpacity activeOpacity={0.9} onPress={signOut} style={styles.btn}>
          <Text style={styles.btnText}>Odjavi se</Text>
        </TouchableOpacity>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, paddingTop: 120, paddingHorizontal: 15, backgroundColor: "transparent" },
  card: {
    borderRadius: 20,
    overflow: "hidden",
    padding: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.12)",
    backgroundColor: "rgba(0,0,0,0.2)",
  },
  title: { color: "#fff", fontSize: 22, fontWeight: "900", marginBottom: 8 },
  sub: { color: "rgba(255,255,255,0.75)", fontSize: 14, lineHeight: 20, marginBottom: 14 },
  btn: {
    backgroundColor: "rgba(239,68,68,0.95)",
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "900" },
});

