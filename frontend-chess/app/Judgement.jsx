import { View, Text, Pressable, ImageBackground, ScrollView, StyleSheet, Image, Dimensions } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";
import { useState, useEffect } from "react";
import EvalBarMovable from "../components/EvalBarMovable";

import backgroundimage from "../assets/homescreenbg.png";

export default function Judgement() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const [fontsLoaded] = useFonts({
    Barlow_600SemiBold,
    Barlow_700Bold,
  });

  useEffect(() => {

  })

  if (!fontsLoaded) return null;//MUST BE AFTER ANY USE EFFECT

  return (
    <ImageBackground
      source={backgroundimage}
      style={styles.bgimage}
      resizeMode="fit"
    >

      <EvalBarMovable />

    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    backgroundColor: "#111",
    justifyContent: "center",
    alignItems: "center"
  },
})
