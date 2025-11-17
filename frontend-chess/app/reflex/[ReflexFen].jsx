import { Text, View, StyleSheet, Alert, ImageBackground, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer"
import { ScrollView } from "react-native";


import Board from "../../components/ChessBoard";

import backgroundimage from "../../assets/homescreenbg.png";


export default function PlayReflex() {
    const router = useRouter();
    const { fen, moves, elo, t } = useLocalSearchParams();
    const boardRef = useRef(null);

    //states
    const [playing, setPlaying] = useState(true)
    const [userTurn, setUserTurn] = useState(true)
    const [wrongMove, setWrongMove] = useState(false)
    const [moveCount, setMoveCount] = useState(0)

    const [fontsLoaded] = useFonts({
        Barlow_600SemiBold,
        Barlow_700Bold,
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (!boardRef.current) return;

            const toMove = fen.split(" ")[1];
            if (toMove === "b") {
                const [first] = moves.split(" ");
                const from = first.slice(0, 2);
                const to = first.slice(2, 4);
                console.log(from, to);
                boardRef.current.makeMove({ from, to });
            }
        }, 400);

        return () => clearTimeout(timer);
    }, []);

    const userMakesMove = async (moveObject) => {

    }

    const undoMove = () => {

    }

    if (!fontsLoaded) return null;//MUST BE AFTER ANY USE EFFECT

    return (
        <ImageBackground
            source={backgroundimage}
            style={styles.bgimage}
            resizeMode="fit"
            key={t /* KEY COMPONENT FOR ENSURING THAT EXPO ROUTER REMOUNTS IT ALL!!! */}
        >
            <ScrollView contentContainerStyle={{ flex: 1, alignItems: "center", justifyContent: "center", gap: 30 }}>
                <View style={styles.topBar}>
                    <Text style={styles.reflexPuzzleText}>Reflex Puzzle</Text>
                    <View style={styles.leftTopBar}>
                        <Text style={styles.eloText}>ELO: {elo} </Text>
                        <Pressable
                            onPress={() => setPlaying((prev) => !prev)}
                            style={({ pressed }) => [
                                styles.pauseBox,
                                pressed && styles.pauseBoxPressed,
                            ]}>
                            {playing ? <Ionicons name="pause" size={30} color={"#fff"} /> : <Ionicons name="play" size={30} color={"#fff"} style={{ paddingLeft: 4 }} />}
                        </Pressable>
                        <Ionicons name="bulb-outline" size={30} color={"#fff"} />
                    </View>
                </View>

                <View style={styles.chessboardContainer}>
                    <Board
                        FEN={fen}
                        parentFunc={userMakesMove}
                        ref={boardRef}
                    />
                    {playing ?
                        <></> : <View style={styles.hiddenBox}><Text style={styles.reflexPuzzleText}>Un-pause to see the board!</Text></View>
                    }
                </View>

                <View style={styles.bottomBox}>
                    <CountdownCircleTimer
                        isPlaying={playing}
                        duration={180}
                        colors={['#498a89']}
                        trailColor={"#66ddcd"}
                        size={90}
                        strokeLinecap={"square"}
                        strokeWidth={10}
                    >
                        {({ remainingTime }) => {
                            const minutes = Math.floor(remainingTime / 60);
                            const seconds = remainingTime % 60;
                            return <Text style={styles.timerText}>{`${minutes}:${seconds < 10 ? '0' : ''}${seconds}`}</Text>;
                        }}
                    </CountdownCircleTimer>
                    <View>
                        {wrongMove
                            ?
                            <View style={styles.wrongMoveView}>
                                <Text style={styles.wrongMoveText}>Wrong Move!</Text>
                                <Pressable style={styles.undoButton} onPress={() => undoMove()}>
                                    <Text style={styles.undoText}>Undo?</Text>
                                </Pressable>
                            </View>
                            :
                            <Text style={userTurn ? styles.reflexPuzzleText : styles.reflexPuzzleTextBlack}>{userTurn ? "Your Turn (White)" : "Opponents Turn (Black)"}</Text>
                        }
                    </View>


                </View>

            </ScrollView>
        </ImageBackground >
    );
}

const styles = StyleSheet.create({
    bgimage: {
        flex: 1,
        backgroundColor: "#111",
        alignItems: "center",
    },
    topBar: {
        paddingLeft: 15,
        paddingRight: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "94%",
        height: 65,
        backgroundColor: "#0b0d1080",
        borderRadius: 8,
    },
    chessboardContainer: {
        width: 375,
        height: 375,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomBox: {
        width: "94%",
        height: 120,
        backgroundColor: "#1e283580",
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        gap: 50
    },
    reflexPuzzleText: {
        fontSize: 23,
        color: "#fff",
        fontFamily: "Barlow_700Bold",
    },
    eloText: {
        fontSize: 15,
        color: "#a19898ff",
        fontFamily: "Barlow_600SemiBold",
    },
    leftTopBar: {
        flexDirection: "row",
        gap: 15,
        height: "100%",
        alignItems: "center"
    },
    pauseBox: {
        width: 50,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#40bab1",
        borderRadius: 8
    },
    pauseBoxPressed: {
        backgroundColor: "#40a59eff",
    },
    timerText: {
        fontSize: 29,
        color: "#498a89",
        fontFamily: "Barlow_700Bold",

    },
    hiddenBox: {
        position: "absolute",
        width: 350,
        height: 350,
        backgroundColor: "#364959",
        top: 0,
        left: 0,
        zIndex: 20,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        marginLeft: 12
    },
    reflexPuzzleTextBlack: {
        fontSize: 23,
        color: "#000000ff",
        fontFamily: "Barlow_700Bold",
    },
    undoButton: {
        backgroundColor: "#40bab1",
        width: 100,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8
    },
    wrongMoveView: {
        height: "100%",
        gap: 20
    },
    wrongMoveText: {
        fontSize: 25,
        color: "#992929ff",
        fontFamily: "Barlow_600SemiBold",

    },
    undoText: {
        fontSize: 15,
        color: "#ffffffff",
        fontFamily: "Barlow_700Bold",
    }

});
