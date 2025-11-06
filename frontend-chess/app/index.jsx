import { Text, View, ImageBackground, StyleSheet, Image, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";


//img imports
import backgroundimage from "../assets/homescreenbg.png"
import pfp_knight from "../assets/flipped_knight.png"
import knight from "../assets/knight.png"

export default function Index() {

  const [loggedIn, setLoggedIn] = useState(false);


  const [fontsLoaded] = useFonts({
    Barlow_600SemiBold,
    Barlow_700Bold,
  });



  useEffect(() => {

    //check if logged in
    setLoggedIn(false);

  }, [])

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={backgroundimage}
      style={styles.bgimage}
      resizeMode="fit"
    >
      <View style={styles.defaultView}>
        <View style={styles.header}>
          <View style={styles.accountStyle}>

            <View style={styles.knightParent}>
              <Image source={pfp_knight} style={styles.knight} />
            </View>
            <Text style={styles.accountText}>Sign in</Text>

          </View>
          <View style={styles.accountStyle}>
            <Ionicons name="notifications-outline" size={35} color={"#435457ff"} />

            <Ionicons name="settings-outline" size={35} color={"#435457ff"} />
          </View>
        </View>
        <View style={styles.mainContent}>
          <View style={styles.logoName}>
            <Image source={knight} style={styles.knightImg} />
            <Text style={styles.logoFont}>UNLIMITED CHESS</Text>
          </View>
          <Pressable
            style={({ pressed }) => [
              styles.mainButton,
              pressed && styles.mainButtonPressed,
            ]}
            onPress={() => console.log("Pressed!")}
          >
            <Text style={styles.logoFont}>Play Puzzles</Text>
          </Pressable>
          <View style={styles.centerButtons}>
            <Pressable style={({ pressed }) => [
              styles.subButtons,
              pressed && styles.mainButtonPressed,
            ]}
              onPress={() => console.log("Pressed Move analysis")}>
              <Ionicons name="help" />
              <Text>MOVE ANALYSIS</Text>
            </Pressable>
            <Pressable style={({ pressed }) => [
              styles.subButtons,
              pressed && styles.mainButtonPressed,
            ]}
              onPress={() => console.log("Pressed Lessons")}>
              <Ionicons name="book" />
              <Text>LESSONS</Text>
            </Pressable>
          </View>
        </View>

      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111"

  },
  defaultView: {
    width: "100%",
    height: "100%",
    flex: 1,
    alignItems: "center"
  },
  header: {
    height: 84,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
    paddingRight: "5"
  },
  knight: {
    width: 32,
    height: 32,
    resizeMode: "contain",
    marginBottom: 5,
  },
  knightParent: {
    backgroundColor: "#435457ff",
    width: 35,
    height: 35,
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center"
  },
  accountStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10
  },
  accountText: {
    color: "#435457ff",
    fontSize: 20,
    fontFamily: "Barlow_600SemiBold",
  },
  mainContent: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
    gap: 20
  },
  logoName: {
    width: "100%",
    alignItems: "center",
    gap: 10
  },
  logoFont: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "Barlow_700Bold"
  },
  knightImg:
  {
    width: 200,
    height: 200,
    resizeMode: "cover"
  },
  mainButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 260,
    height: 75,
    backgroundColor: "#40bab1",
    borderRadius: 12
  },
  mainButtonPressed: {
    backgroundColor: "#40a59eff"
  },
  centerButtons: {
    flexDirection: "row"
  },
  subButtons: {
    width: 90,
    height: 55,
    backgroundColor: "#1e2835"
  }


})
