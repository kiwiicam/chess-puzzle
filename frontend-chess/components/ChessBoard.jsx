import React from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";

//pieces import
import P2 from "../assets/ChessPieces/P2.png"; // pawn
import R2 from "../assets/ChessPieces/R2.png"; // rook
import N2 from "../assets/ChessPieces/N2.png"; // knight
import B2 from "../assets/ChessPieces/B2.png"; // bishop
import Q2 from "../assets/ChessPieces/Q2.png"; // queen
import K2 from "../assets/ChessPieces/K2.png"; // king

// Black pieces
import p from "../assets/ChessPieces/p.png"; // pawn
import r from "../assets/ChessPieces/r.png"; // rook
import n from "../assets/ChessPieces/n.png"; // knight
import b from "../assets/ChessPieces/b.png"; // bishop
import q from "../assets/ChessPieces/q.png"; // queen
import k from "../assets/ChessPieces/k.png"; // king

export default function Board({ FEN }) {

  const pieceMap = {
    P: P2,
    R: R2,
    N: N2,
    B: B2,
    Q: Q2,
    K: K2,
    p: p,
    r: r,
    n: n,
    b: b,
    q: q,
    k: k
  };
  const boardSize = Array.from({ length: 8 }, (_, i) => i);
  const dots = Array.from({ length: 6 });

  const FenArray = FEN.split("/");

  const boardMatrix = FenArray.map((row) => {
    const rowArr = [];
    for (const char of row) {
      if (!isNaN(char)) {
        for (let i = 0; i < parseInt(char); i++) rowArr.push("");
      } else {
        rowArr.push(char);
      }
    }
    return rowArr;
  });

  return (
    <View style={styles.wrapper}>
      <View style={[styles.border, styles.topBorder]}>
        {dots.map((_, i) => (
          <View key={`top-${i}`} style={styles.dot} />
        ))}
      </View>
      <View style={[styles.border, styles.bottomBorder]}>
        {dots.map((_, i) => (
          <View key={`bottom-${i}`} style={styles.dot} />
        ))}
      </View>
      <View style={[styles.border, styles.leftBorder]}>
        {dots.map((_, i) => (
          <View key={`left-${i}`} style={styles.dotVertical} />
        ))}
      </View>
      <View style={[styles.border, styles.rightBorder]}>
        {dots.map((_, i) => (
          <View key={`right-${i}`} style={styles.dotVertical} />
        ))}
      </View>
      <View style={styles.container}>
        {boardMatrix.map((rowArr, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {rowArr.map((piece, colIndex) => {
              const isDark = (rowIndex + colIndex) % 2 === 1;
              return (
                <Pressable
                  key={colIndex}
                  style={[
                    styles.square,
                    isDark ? styles.darkSquare : styles.lightSquare,
                  ]}
                  onPress={() => console.log("The square that was pressed was ", colIndex + "," + rowIndex, " and it was a " + piece)}
                >
                  <Image source={pieceMap[piece]} style={{ width: 40, height: 40 }} />
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    alignSelf: "center",
    marginTop: 20,
    position: "relative",
  },
  container: {
    flexDirection: "column",
    zIndex: 1,
  },
  row: {
    flexDirection: "row",
  },
  square: {
    width: 47,
    height: 47,
    justifyContent: "center",
    alignItems: "center",
  },
  lightSquare: {
    backgroundColor: "#c0dae0",
  },
  darkSquare: {
    backgroundColor: "#597788",
  },
  pieceText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
  },
  border: {
    position: "absolute",
    backgroundColor: "#37495a",
    zIndex: 5,
  },
  topBorder: {
    top: -13,
    left: -6,
    right: -6,
    height: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  bottomBorder: {
    bottom: -13,
    left: -6,
    right: -6,
    height: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  leftBorder: {
    top: -13,
    bottom: -13,
    left: -13,
    width: 13,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  rightBorder: {
    top: -13,
    bottom: -13,
    right: -13,
    width: 13,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8ea0ac",
  },
  dotVertical: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#8ea0ac",
  },
});
