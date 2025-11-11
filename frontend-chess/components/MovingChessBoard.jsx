import { useFocusEffect } from "expo-router";
import React, { useRef, useCallback } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chessboard from "react-native-chessboard";
import { View, StyleSheet, Text, Image } from "react-native";


import P2 from "../assets/ChessPieces/P2.png"; // pawn
import R2 from "../assets/ChessPieces/R2.png"; // rook
import N2 from "../assets/ChessPieces/N2.png"; // knight
import B2 from "../assets/ChessPieces/B2.png"; // bishop
import Q2 from "../assets/ChessPieces/Q2.png"; // queen
import K2 from "../assets/ChessPieces/K2.png"; // king

import p from "../assets/ChessPieces/p.png"; // pawn
import r from "../assets/ChessPieces/r.png"; // rook
import n from "../assets/ChessPieces/n.png"; // knight
import b from "../assets/ChessPieces/b.png"; // bishop
import q from "../assets/ChessPieces/q.png"; // queen
import k from "../assets/ChessPieces/k.png"; // king


export default function MovingBoard({ FEN }) {
  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];
  const chessboardRef = useRef(null);


  const pieceMap = {
    wp: P2, // white pawn
    wr: R2,
    wn: N2,
    wb: B2,
    wq: Q2,
    wk: K2,
    bp: p,  // black pawn
    br: r,
    bn: n,
    bb: b,
    bq: q,
    bk: k,
  };
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;

      const chessLoop = async () => {
        if (cancelled) return;
        chessboardRef.current?.resetBoard(FEN);
        await chessboardRef.current?.move({ from: "e2", to: "e4" });
        await chessboardRef.current?.move({ from: "e7", to: "e5" });
        await chessboardRef.current?.move({ from: "d1", to: "f3" });
        await chessboardRef.current?.move({ from: "a7", to: "a6" });
        await chessboardRef.current?.move({ from: "f1", to: "c4" });
        await chessboardRef.current?.move({ from: "a6", to: "a5" });
        await chessboardRef.current?.move({ from: "f3", to: "f7" });

        setTimeout(() => {
          if (!cancelled) {
            chessLoop();
          }
        }, 1000);
      };

      chessLoop();

      // cleanup when unfocused
      return () => {
        cancelled = true;
      };
    }, [FEN])
  );

  return (
    <GestureHandlerRootView>
      <View style={styles.wrapper} pointerEvents="none">
        <View style={styles.top} />
        <View style={styles.bottom}>
          {files.map((f, index) => (
            <Text key={`bottom-${index}`} style={[styles.label, { paddingTop: 4 }]}>
              {f}
            </Text>
          ))}
        </View>
        <View style={styles.left}>
          {ranks.map((r, index) => (
            <Text key={`left-${index}`} style={[styles.label, { paddingRight: 4 }]}>
              {r}
            </Text>
          ))}
        </View>
        <View style={styles.right} />
        <View style={styles.board}>
          <Chessboard
            fen={FEN}
            boardSize={300}
            colors={{
              black: "#5b7789",
              white: "#c2dce2",
              lastMoveHighlight: "rgba(255,255,0, 0.0)",
            }}
            ref={chessboardRef}
            durations={{ move: 500 }}
            withLetters={false}
            withNumbers={false}
          /*renderPiece={(piece) => {
            const image = pieceMap[piece];
            if (!image) return null; // fallback
            return <Image source={image} style={{ width: 35, height: 35 }} />;
          }*/
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
}


const styles = StyleSheet.create({
  wrapper: {
    width: 330,
    height: 330,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: 20,
    borderRadius: 8,
    backgroundColor: "#364959",
  },
  bottom: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 20,
    borderRadius: 8,
    backgroundColor: "#364959",
  },
  left: {
    justifyContent: "space-evenly",
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    left: 0,
    height: "100%",
    width: 20,
    borderRadius: 8,
    backgroundColor: "#364959",
  },
  right: {
    position: "absolute",
    right: 0,
    height: "100%",
    width: 20,
    borderRadius: 8,
    backgroundColor: "#364959",
  },
  board: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    color: "#6f8393",
    fontSize: 12,

  },
});
