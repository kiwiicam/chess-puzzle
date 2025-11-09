import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import Chessboard from 'react-native-chessboard';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import P2 from "../assets/ChessPieces/P2.png";
import R2 from "../assets/ChessPieces/R2.png";
import N2 from "../assets/ChessPieces/N2.png";
import B2 from "../assets/ChessPieces/B2.png";
import Q2 from "../assets/ChessPieces/Q2.png";
import K2 from "../assets/ChessPieces/K2.png";

import p from "../assets/ChessPieces/p.png";
import r from "../assets/ChessPieces/r.png";
import n from "../assets/ChessPieces/n.png";
import b from "../assets/ChessPieces/b.png";
import q from "../assets/ChessPieces/q.png";
import k from "../assets/ChessPieces/k.png";


export default function Board({ FEN, chessObj }) {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Chessboard fen={FEN} />
    </GestureHandlerRootView>
  );
}
