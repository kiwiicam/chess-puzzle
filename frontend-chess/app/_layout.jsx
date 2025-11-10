import { Tabs } from "expo-router";
import { Ionicons, MaterialCommunityIcons, SimpleLineIcons, FontAwesome, Entypo } from "@expo/vector-icons";




export default function TabsLayout() {
  return (

    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#4CAF50",
        tabBarStyle: { backgroundColor: "#121212", borderTopColor: "#333" },
        lazy: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons  name="chess-king" size={size} color={color} />
          ),
        }}
      />



      <Tabs.Screen
        name="Reflex"

        options={{

          title: "Reflex",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="flash-sharp" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Puzzles"

        options={{

          title: "Puzzles",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="puzzle-piece" size={size} color={color} />
          ),
        }}
      />

        <Tabs.Screen
        name="Judgement"
        options={{
          title: "Judgement",
          tabBarIcon: ({ color, size }) => (
            <Entypo name="gauge" size={size} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Account"
        options={{
          title: "Account",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-sharp" size={size} color={color} />
          ),
        }}
      />

        <Tabs.Screen
        name="Sandbox"
        options={{
          href: null,
          title: "Sandbox",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hammer-outline" size={size} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="Settings"
        options={{
          href: null,
          title: "Settings",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="Authentication"
        options={{
          href: null,
          title: "Authentication",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="options" size={size} color={color} />
          ),
        }}
      />



    </Tabs>



  );
}
