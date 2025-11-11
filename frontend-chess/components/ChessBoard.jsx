import React, { useRef } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chessboard from "react-native-chessboard"
import { Button, Pressable, View } from "react-native";

import P2 from "../assets/ChessPieces/P2.png"; // white pawn
import R2 from "../assets/ChessPieces/R2.png"; // white rook
import N2 from "../assets/ChessPieces/N2.png"; // white knight
import B2 from "../assets/ChessPieces/B2.png"; // white bishop
import Q2 from "../assets/ChessPieces/Q2.png"; // white queen
import K2 from "../assets/ChessPieces/K2.png"; // white king

import p from "../assets/ChessPieces/p.png"; // black pawn
import r from "../assets/ChessPieces/r.png"; // black rook
import n from "../assets/ChessPieces/n.png"; // black knight
import b from "../assets/ChessPieces/b.png"; // black bishop
import q from "../assets/ChessPieces/q.png"; // black queen
import k from "../assets/ChessPieces/k.png"; // black king


export default function Board({ FEN }) {

  const chessboardRef = useRef(null);

  const pieceImages = {
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

  const handleMove = ({ move, state }) => {
    console.log("Move made:", move);
    console.log("From:", move?.from);
    console.log("To:", move?.to);
    console.log("Piece:", move?.piece);
    console.log("Updated FEN:", state.fen);
  };


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Chessboard
          ref={chessboardRef}
          fen={FEN}
          boardSize={375}
          onMove={handleMove}
        />
      </View>
    </GestureHandlerRootView>

  );
}
