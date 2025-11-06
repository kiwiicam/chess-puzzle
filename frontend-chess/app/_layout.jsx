import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarStyle: { backgroundColor: "#121212", borderTopColor: "#333" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
  name="BestMove"
  options={{
    href: null, 
    title: "Best Move",
    tabBarIcon: ({ color, size }) => (
      <Ionicons name="game-controller" size={size} color={color} />
    ),
  }}
/>
      
    </Tabs>
  );
}
