import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function TabLayout() {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
            source={require('../../assets/images/grad-bg.jpg')}
            style={StyleSheet.absoluteFill}
            // Za test ostavi: style={[StyleSheet.absoluteFill, {backgroundColor: 'red'}]}
         />

      <Tabs
        screenOptions={{
          // PROZIRNOST SCENE
          sceneContainerStyle: { backgroundColor: "transparent" },

          tabBarStyle: {
            backgroundColor: "rgba(10, 15, 20, 0.9)",
            position: "absolute",
            borderTopWidth: 0,
          },
          headerTransparent: true,
          headerTintColor: "#fff",
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => (
              <Ionicons name="home" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="popusti"
          options={{
            title: "Popusti",
            tabBarIcon: ({ color }) => (
              <Ionicons name="pricetag" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="dogadaji"
          options={{
            title: "Događaji",
            tabBarIcon: ({ color }) => (
              <Ionicons name="calendar-outline" size={24} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="grad"
          options={{
            title: "Grad",
            tabBarIcon: ({ color }) => (
              <Ionicons name="business" size={24} color={color} />
            ),
          }}
        />
      </Tabs>
    </View>
  );
}
