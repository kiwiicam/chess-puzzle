import { Text, View, StyleSheet, Alert, ImageBackground, Pressable } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useFonts, Barlow_600SemiBold, Barlow_700Bold } from "@expo-google-fonts/barlow";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import Board from "../../components/ChessBoard";

import backgroundimage from "../../assets/homescreenbg.png";

export default function PlayReflex() {
    const router = useRouter();
    const { fen, moves, elo, t } = useLocalSearchParams();
    const boardRef = useRef(null);

    //states
    const [playing, setPlaying] = useState(true);
    const [moveList, setMoveList] = useState([]);
    const [movePlayed, setMovePlayed] = useState(false);
    const [correctMove, setCorrectMove] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const [message, setMessage] = useState("")

    const [fontsLoaded] = useFonts({
        Barlow_600SemiBold,
        Barlow_700Bold,
    });

    useEffect(() => {
        setMoveList([
            { move: 'g2g4', Centipawn: 115, Mate: null },
            { move: 'c1b1', Centipawn: 111, Mate: null },
            { move: 'a2a3', Centipawn: 98, Mate: null },
            { move: 'h2h4', Centipawn: 94, Mate: null },
            { move: 'h1g1', Centipawn: 74, Mate: null }
        ]);
    }, []);

    useEffect(() => {
        setPlaying(true);
        setMovePlayed(false);
        setCorrectMove(false);
        setIsDisabled(false);
        setMessage("");
    }, [fen, t]);

    const userMakesMove = async (moveObject) => {
        const move = moveObject.move.from + moveObject.move.to;
        const isInList = moveList.some(item => item.move === move);
        setCorrectMove(isInList);
        setMessage(isInList ? "Congratulations your move was in the top 5 moves in this position!" : "Unlucky! your move was not in the top 5 moves!")
        setMovePlayed(true);
        setIsDisabled(true);
        setPlaying(false);
    };

    const undoMove = () => { };

    const nextPuzzle = () => {
        router.replace({
            pathname: `/reflex/${encodeURIComponent(fen)}`,
            params: { fen: fen, elo: "1500-1600", t: Date.now() },
        });
    };

    const outOfTime = () => {
        setTimeout(() => {
            setMessage("Unfortunately you ran out of time.")
            setCorrectMove(false)
            setMovePlayed(true);
            setIsDisabled(true);
            setPlaying(false);
        }, 100);
    };

    if (!fontsLoaded) return null; //MUST BE AFTER ANY USE EFFECT

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
                            onPress={() => nextPuzzle()}
                            style={({ pressed }) => [
                                styles.pauseBox,
                                pressed && styles.pauseBoxPressed,
                            ]}>
                            <Ionicons name="play-forward" size={30} color={"#fff"} />
                        </Pressable>
                        <Ionicons name="bulb-outline" size={30} color={"#fff"} />
                    </View>
                </View>

                <View style={styles.chessboardContainer} pointerEvents={isDisabled ? "none" : "auto"}>
                    <Board
                        FEN={fen}
                        parentFunc={userMakesMove}
                        ref={boardRef}
                    />
                </View>

                <View style={styles.bottomBox}>
                    <CountdownCircleTimer
                        isPlaying={playing}
                        duration={15}
                        colors={['#498a89']}
                        trailColor={"#66ddcd"}
                        size={100}
                        strokeLinecap={"square"}
                        strokeWidth={10}
                        onComplete={() => outOfTime()}
                    >
                        {({ remainingTime }) => {
                            const seconds = remainingTime % 60;
                            return <Text style={styles.timerText}>{seconds}</Text>;
                        }}
                    </CountdownCircleTimer>

                    <View style={{ flex: 1, justifyContent: "center" }}>
                        {movePlayed ? (
                            <LinearGradient
                                colors={correctMove ? ['#16a34a', '#4ade80'] : ['#ef4444', '#f87171']}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                style={{
                                    borderRadius: 12,
                                    padding: 12,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 5 }}>
                                    <Text style={styles.reflexPuzzleText}>
                                        {correctMove ? "Well done!" : "Bad Move!"}
                                    </Text>
                                    <View style={{ backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 8, padding: 5 }}>
                                        <Ionicons
                                            name={correctMove ? "checkmark-outline" : "close-outline"}
                                            size={25}
                                            color="#fff"
                                        />
                                    </View>
                                </View>
                                <Text style={{ color: "#fff", textAlign: "center", fontFamily: "Barlow_600SemiBold" }}>
                                    {message}
                                </Text>
                            </LinearGradient>
                        ) : (
                            <Text style={styles.reflexPuzzleText}>Your Turn (White)</Text>
                        )}
                    </View>
                </View>
            </ScrollView>
        </ImageBackground>
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
        height: 160,
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
        borderRadius: 8,
        paddingLeft: 2
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
