import { Text, View, ImageBackground, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";
import { useRouter } from "expo-router";

import backgroundimage from "../assets/homescreenbg.png"
import pfp_knight from "../assets/flipped_knight.png"
import knight from "../assets/knight.png"
import chessboard from "../assets/chessboard.png"
import puzzle from "../assets/nobg_board.png"

export default function Index() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);
  const [time, setTime] = useState(86400);
  const [topPlayers, setTopPlayers] = useState([]);

  const [fontsLoaded] = useFonts({
    Barlow_600SemiBold,
    Barlow_700Bold,
  });

  useEffect(() => {
    setLoggedIn(false);

    setTopPlayers([
      { username: "kiwicam", elo: 1560, pfp: "https://cdn.pfps.gg/pfps/2301-default-2.png" },
      { username: "karlos", elo: 1430, pfp: "https://cdn.pfps.gg/pfps/2301-default-2.png" },
      { username: "jez", elo: 2100, pfp: "https://cdn.pfps.gg/pfps/2301-default-2.png" },
    ]);
  }, []);

  useEffect(() => {
    if (time <= 0) return;

    const timer = setTimeout(() => {
      setTime(prev => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [time]);

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={backgroundimage}
      style={styles.bgimage}
      resizeMode="fit"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.defaultView}>
          {/* HEADER */}
          <View style={styles.header}>
            <Pressable style={styles.accountStyle} onPress={() => router.push("/Authentication")} >
              <View style={styles.knightParent}>
                <Image source={pfp_knight} style={styles.knight} />
              </View>
              <Text style={styles.accountText}>Sign in</Text>
            </Pressable>
            <View style={styles.accountStyle}>
              <Ionicons name="notifications-outline" size={35} color={"#435457ff"} />
              <Pressable
                onPress={() => router.push("/Settings")}
              >
                <Ionicons name="settings-outline" size={35} color={"#435457ff"} />
              </Pressable>
            </View>
          </View>

          {/* MAIN CONTENT */}
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
              <Pressable
                style={({ pressed }) => [
                  styles.subButtons,
                  pressed && styles.subButtonPressed,
                ]}
                onPress={() => console.log("Pressed Move analysis")}
              >
                <Ionicons name="extension-puzzle" size={25} color={"#435457ff"} />
                <Text style={styles.subButtonText}>SANDBOX</Text>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.subButtons,
                  pressed && styles.subButtonPressed,
                ]}
                onPress={() => console.log("Pressed Lessons")}
              >
                <Ionicons name="book" size={25} color={"#435457ff"} />
                <Text style={styles.subButtonText}>LESSONS</Text>
              </Pressable>
            </View>
          </View>

          {/* BOTTOM CONTENT */}
          <View style={styles.bottomContent}>
            {/* TOP PUZZLERS */}
            <View style={styles.topPuzzlers}>
              <View style={styles.topPuzzlersBox}>
                <Text style={styles.topPuzzlersText}>TOP PUZZLERS</Text>
                <Image source={chessboard} style={styles.boardImage} />
              </View>

              <View style={styles.topPlayerArea}>
                {/* Map top players here */}
                {topPlayers.map((player, index) => (
                  <View key={index} style={styles.topPlayersBox}>
                    <View style={styles.playerInfo}>
                      <Image source={{ uri: player.pfp }} style={styles.playerPfp} />
                      <Text style={styles.playerText}>{player.username}</Text>
                    </View>
                    <Text style={styles.playerText}>{player.elo}</Text>
                  </View>
                ))}

                {/* View button */}
                <Pressable style={styles.viewMore}>
                  <Text style={styles.viewMoreText}>View </Text>
                  <Ionicons name="chevron-forward" size={18} color={"#fff"} />
                </Pressable>
              </View>
            </View>

            {/* DAILY CHALLENGE */}
            <View style={styles.dailyChallenge}>
              <View style={styles.topPuzzlersBox}>
                <Text style={styles.DailyText}>DAILY CHALLENGE</Text>
                <Image source={puzzle} style={styles.dailyBoardImage} />
              </View>
              <View style={styles.dailyVertical}>
                <View style={styles.timeBox}>
                  <Text style={styles.timeText}>
                    {Math.floor(time / 3600).toString().padStart(2, "0")}:
                    {Math.floor((time % 3600) / 60).toString().padStart(2, "0")}:
                    {(time % 60).toString().padStart(2, "0")}
                  </Text>
                  <Text style={styles.viewMoreText}>
                    Play <Ionicons name="chevron-forward" size={18} color={"#fff"} />
                  </Text>
                </View>
              </View>
            </View>

            {/* NEWS AND UPDATES */}
            <View style={styles.newsAndUpdates}></View>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
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
    height: 84,
    width: "100%",
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 10,
    paddingRight: 5
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
  knightImg: {
    width: 200,
    height: 200,
    resizeMode: "cover"
  },
  mainButton: {
    alignItems: "center",
    justifyContent: "center",
    width: 290,
    height: 75,
    backgroundColor: "#40bab1",
    borderRadius: 8
  },
  mainButtonPressed: {
    backgroundColor: "#40a59eff"
  },
  centerButtons: {
    flexDirection: "row",
    gap: 15
  },
  subButtons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: 130,
    height: 55,
    backgroundColor: "#1e2835",
    borderRadius: 8,
    gap: 8
  },
  subButtonPressed: {
    backgroundColor: "#334357ff",
  },
  subButtonText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Barlow_600SemiBold"
  },
  bottomContent: {
    marginTop: 15,
    width: "100%",
    alignItems: "center",
    gap: 20,
  },
  topPuzzlers: {
    padding: 10,
    width: "94%",
    height: 200,
    backgroundColor: "#1e283580",
    borderRadius: 8,
    flexDirection: "row",
    gap: 22
  },
  topPuzzlersBox: {
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  topPuzzlersText: {
    color: "#fff",
    fontSize: 30,
    fontFamily: "Barlow_700Bold",
    marginBottom: -20,
  },
  boardImage: {
    width: 150,
    height: 150,
    resizeMode: "contain"
  },
  topPlayerArea: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 10,
  },
  topPlayersBox: {
    width: 180,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 3,
    paddingBottom: 3
  },
  playerInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  playerPfp: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  playerText: {
    fontSize: 18,
    color: "#fff",
    fontFamily: "Barlow_700Bold"
  },
  viewMore: {
    flexDirection: "row",
    width: 180,
    height: 39,
    backgroundColor: "#40bab1",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 8,
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Barlow_700Bold",
  },
  dailyChallenge: {
    padding: 10,
    width: "94%",
    height: 150,
    backgroundColor: "#1e283580",
    borderRadius: 8,
    gap: 40,
    flexDirection: "row",
  },
  dailyVertical: {
    height: "100%",
    justifyContent: "center",
    gap: 20,
  },
  timeBox: {
    width: 100,
    padding: 10,
    backgroundColor: "#516171ff",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  timeText: {
    fontSize: 22,
    color: "#fff",
    fontFamily: "Barlow_600SemiBold",
  },
  dailyBoardImage: {
    width: 130,
    height: 130,
    resizeMode: "contain",
  },
  DailyText: {
    marginBottom: -10,
    color: "#fff",
    fontSize: 30,
    fontFamily: "Barlow_700Bold",
  },
  newsAndUpdates: {
    width: "94%",
    height: 150,
    backgroundColor: "#1e283580",
    borderRadius: 8
  },
});
