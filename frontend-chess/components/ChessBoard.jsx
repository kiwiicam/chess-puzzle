import React, { useRef, forwardRef, useImperativeHandle, useEffect } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Chessboard from 'react-native-chessboard';

const Board = forwardRef(({ FEN }, ref) => {

  const ranks = ["8", "7", "6", "5", "4", "3", "2", "1"];
  const files = ["a", "b", "c", "d", "e", "f", "g", "h"];

  const chessboardRef = useRef(null);
  const moveStack = useRef([]);

  useEffect(() => {
    moveStack.current.push(FEN);
  }, []);

  useImperativeHandle(ref, () => ({
    undo: () => {
      console.log(moveStack.current)
      moveStack.current.pop()
      const newFen = moveStack.current[moveStack.current.length - 1]
      chessboardRef.current?.resetBoard(newFen);
    },
    getMoveStack: () => moveStack.current,
  }));

  const updateMoveStack = () => {
    const state = chessboardRef.current?.getState()
    moveStack.current.push(state.fen);
  };

  return (
    <GestureHandlerRootView>
      <View style={styles.wrapper}>
        <View style={styles.top} />
        <View style={styles.bottom}>
          {files.map((f, index) => (
            <Text key={`bottom-${index}`} style={[styles.label, { paddingTop: 5 }]}>
              {f}
            </Text>
          ))}
        </View>
        <View style={styles.left}>
          {ranks.map((r, index) => (
            <Text key={`left-${index}`} style={[styles.label, { paddingRight: 5 }]}>
              {r}
            </Text>
          ))}
        </View>
        <View style={styles.right} />
        <View style={styles.board}>
          <Chessboard
            fen={FEN}
            boardSize={320}
            colors={{
              black: "#5b7789",
              white: "#c2dce2",
              lastMoveHighlight: "rgba(255,255,0, 0.0)",
            }}
            ref={chessboardRef}
            withLetters={false}
            withNumbers={false}
            onMove={() => updateMoveStack()}
          />
        </View>
      </View>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  wrapper: {
    width: 350,
    height: 350,
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


export default Board;
