import { Text, View, StyleSheet, Alert, ImageBackground } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useEffect } from "react";

import Board from "../../components/ChessBoard";

import backgroundimage from "../../assets/homescreenbg.png";

export default function PlayReflex() {
    const router = useRouter();
    const { fen, elo } = useLocalSearchParams();

    return (
        <ImageBackground
            source={backgroundimage}
            style={styles.bgimage}
            resizeMode="fit"
        >
            <View style={styles.topBar}>

            </View>

            <View style={styles.chessboardContainer}>
                <Board />
            </View>

            <View style={styles.bottomBox}>

            </View>


        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    bgimage: {
        flex: 1,
        backgroundColor: "#111",
        alignItems: "center",
        justifyContent: "space-evenly",
    },
    topBar: {
        width: "94%",
        height: 65,
        backgroundColor: "#0b0d1080",
    },
    chessboardContainer: {
        width: 375,
        height: 375,
        alignItems: "center",
        justifyContent: "center"
    },
    bottomBox: {
        width: "94%",
        height: 200,
        backgroundColor: "#1e283580"    
    }
});
