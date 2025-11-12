import { View, Text, Pressable, ImageBackground, ScrollView, StyleSheet, Image, Dimensions } from "react-native";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";

import MovingBoard from "../components/MovingChessBoard"

import backgroundimage from "../assets/homescreenbg.png";
import pfp_knight from "../assets/flipped_knight.png";
import knight from "../assets/knight.png";
import { useEffect, useState } from "react";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Reflex() {

  const [fontsLoaded] = useFonts({
    Barlow_600SemiBold,
    Barlow_700Bold,
  });
  const fenList = [
    "qnbrkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1",
    "7q/p2p2P1/3P2K1/1Pnp4/2p5/r2pn3/1r3k2/7b w - - 0 1",
    "3n1Nb1/r2QRnP1/pB1P3p/Ppp1PpP1/1Nq2pr1/pPp1bK2/2R2P1P/3Bk3 w - - 0 1"
  ]
  if (!fontsLoaded) return null;//MUST BE AFTER ANY USE EFFECT

  return (
    <ImageBackground
      source={backgroundimage}
      style={styles.bgimage}
      resizeMode="fit"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.defaultView}>
          <View style={styles.header}>
            <View style={styles.rightGroup}>
              <Image source={knight} style={styles.knightLeft} />
            </View>

            <View style={styles.rightGroup}>
              <Pressable style={styles.accountStyle} onPress={() => router.push("/Authentication")}>
                <View style={styles.knightParent}>
                  <Image source={pfp_knight} style={styles.knight} />
                </View>
                <Text style={styles.accountText}>Sign in</Text>
              </Pressable>

              <Ionicons name="notifications-outline" size={35} color={"#435457ff"} />
              <Pressable onPress={() => router.push("/Settings")}>
                <Ionicons name="settings-outline" size={35} color={"#435457ff"} />
              </Pressable>
            </View>
          </View>
          <View style={styles.mainContentReflex}>
            <Text style={styles.logoFont}>REFLEX</Text>
            <View style={styles.chessboardContainer}>
              <MovingBoard />
            </View>
            <Pressable
              style={({ pressed }) => [
                styles.playReflex,
                pressed && styles.PlayReflexPressed,
              ]}
              onPress={() => {
                const randomFenNum = Math.floor(Math.random() * fenList.length);
                router.push({
                  pathname: `/reflex/${encodeURIComponent(fenList[randomFenNum])}`,
                  params: { fen: fenList[randomFenNum], elo: "1500-1600", t: Date.now() },
                });
              }}
            >
              <Text style={styles.playReflexText}>Play Reflex</Text>
            </Pressable>
            <View style={styles.infoBox}>
              <Text style={styles.infoBoxTitle}>Reflex:</Text>
              <Text style={styles.infoBoxText}>Your Task: Find the most well balanced move (or 2-move sequence) to maintain equality or gain a slight positional advantage. With a 3 minute time per move will your reflexes be enough? </Text>
            </View>
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.topSection}>
              <View style={styles.accuracyRating}></View>
              <View style={styles.reflexStreak}></View>
            </View>
            <View style={styles.keyPositionalIdeas}></View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground >
  );
}

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    backgroundColor: "#111"
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  defaultView: {
    width: "100%",
    alignItems: "center"
  },
  header: {
    height: SCREEN_HEIGHT * 0.085,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15
  },
  knightLeft: {
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
  rightGroup: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 10,
    height: "100%",
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
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center"
  },
  accountStyle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10
  },
  accountText: {
    color: "#435457ff",
    fontSize: 20,
    fontFamily: "Barlow_600SemiBold",
  },
  logoFont: {
    fontSize: 35,
    color: "#fff",
    fontFamily: "Barlow_700Bold"
  },
  mainContentReflex: {
    alignItems: "center",
    gap: 40,
    marginTop: 30,

  },
  playReflex: {
    width: 200,
    height: 65,
    backgroundColor: "#40bab1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  PlayReflexPressed: {
    backgroundColor: "#40a59eff"
  },
  playReflexText: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "Barlow_700Bold"
  },
  chessboardContainer: {
    width: 300,
    height: 300,
    alignItems: "center",
    justifyContent: "center"
  },
  infoBox: {
    width: 300,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
    outlineColor: "#40bab1",
    outlineWidth: 5,
    borderRadius: 8,
    backgroundColor: "#1e283580",
  },
  infoBoxTitle: {
    fontSize: 30,
    color: "#fff",
    fontFamily: "Barlow_700Bold"

  },
  infoBoxText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Barlow_600SemiBold",
    textAlign: "center"
  },
  accuracyRating: {
    padding: 10,
    width: "45%",
    height: 300,
    backgroundColor: "#1e283580",
    borderRadius: 8,
    gap: 22
  },
  reflexStreak: {
    padding: 10,
    width: "45%",
    height: 300,
    backgroundColor: "#1e283580",
    borderRadius: 8,
    gap: 22
  },
  bottomContent: {
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    gap: 20
  },
  topSection: {
    alignItems: "center",
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row"
  },
  keyPositionalIdeas: {
    padding: 10,
    width: "92.5%",
    height: 200,
    backgroundColor: "#1e283580",
    borderRadius: 8,
    flexDirection: "row",
    gap: 22

  }
});
