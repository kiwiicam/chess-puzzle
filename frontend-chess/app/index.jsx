import { Text, View, ImageBackground, StyleSheet, Image, Pressable, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";

//img imports
import backgroundimage from "../assets/homescreenbg.png"
import pfp_knight from "../assets/flipped_knight.png"
import knight from "../assets/knight.png"
import chessboard from "../assets/chessboard.png"

export default function Index() {

  const [loggedIn, setLoggedIn] = useState(false);

  const [topPlayers, setTopPlayers] = useState([])

  const [fontsLoaded] = useFonts({
    Barlow_600SemiBold,
    Barlow_700Bold,
  });

  useEffect(() => {
    setLoggedIn(false);

    setTopPlayers([
      { username: "kiwicam", elo: 1560, pfp: "https://cdn.pfps.gg/pfps/2301-default-2.png" },
      { username: "karlos", elo: 1, pfp: "https://cdn.pfps.gg/pfps/2301-default-2.png" },
      { username: "jez", elo: 0, pfp: "https://cdn.pfps.gg/pfps/2301-default-2.png" },
    ])
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ImageBackground
      source={backgroundimage}
      style={styles.bgimage}
      resizeMode="fit"
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                <Ionicons name="extension-puzzle" size={25} color={"#435457ff"} />
                <Text style={styles.subButtonText}>SANDBOX</Text>
              </Pressable>
              <Pressable style={({ pressed }) => [
                styles.subButtons,
                pressed && styles.mainButtonPressed,
              ]}
                onPress={() => console.log("Pressed Lessons")}>
                <Ionicons name="book" size={25} color={"#435457ff"} />
                <Text style={styles.subButtonText}>LESSONS</Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.bottomContent}>
            <View style={styles.topPuzzlers}>
              <View style={styles.topPuzzlersBox}>
                <Text style={styles.topPuzzlersText}>TOP PUZZLERS</Text>
                <Image source={chessboard} style={styles.boardImage} />
              </View>
              <View style={styles.topPlayerArea}>
                <Pressable style={styles.viewMore}>
                  <Text style={styles.viewMoreText}>View More</Text>
                  <Ionicons name="chevron-forward" size={18} color={"#fff"} />
                </Pressable>
                {topPlayers.map((item, index) => {
                  return (
                    <View key={index} style={styles.topPlayersBox}>
                      <Text style={styles.playerText}>
                        {item.username}
                      </Text>
                      <Text style={styles.playerText}>
                        Elo:
                        {" " + item.elo}
                      </Text>
                    </View>
                  );

                })}
              </View>
            </View>

            <View style={styles.dailyChallenge}>

            </View>

            <View style={styles.newsAndUpdates}>

            </View>
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
    padding: 15,
    width: "94%",
    height: 150,
    backgroundColor: "#1e283580",
    borderRadius: 8,
    flexDirection: "row",
    gap: 22
  },
  dailyChallenge: {
    width: "94%",
    height: 150,
    backgroundColor: "#1e283580",
    borderRadius: 8
  },
  newsAndUpdates: {
    width: "94%",
    height: 150,
    backgroundColor: "#1e283580",
    borderRadius: 8
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
  viewMore: {
    flexDirection: "row",
    width: 170,
    height: 30,
    backgroundColor: "#516171ff",
    borderRadius: 8,
    justifyContent: "space-between",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginBottom: 4,
  },
  viewMoreText: {
    color: "#fff",
    fontSize: 18,
    fontFamily: "Barlow_700Bold",
  },
  topPlayersBox: {
    width: 170,
    height: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 30,
    paddingLeft: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: "#8b8484ff",
    marginTop: 3,
    marginBottom: 3

  },
  playerText: {
    fontSize: 15,
    color: "#fff",
    fontFamily: "Barlow_600SemiBold"

  },
  topPlayerArea: {
    gap: 5,
  }



})
