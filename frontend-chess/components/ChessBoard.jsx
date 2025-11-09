import React, { useEffect, useState, useRef } from "react";
import { View, StyleSheet, Image, Pressable, Animated } from "react-native";
import Chessboard from 'react-native-chessboard';

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
  return <Chessboard />
}

// export default function Board({ FEN, chessObj }) {
//   const [legalMoves, setLegalMoves] = useState([]);
//   const [selected, setSelected] = useState("");
//   const [boardFen, setBoardFen] = useState(FEN);
//   const [boardMatrix, setBoardMatrix] = useState([]);
//   const [movingPiece, setMovingPiece] = useState(null); // track moving piece

//   const animation = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;
//   const [animating, setAnimating] = useState(false);

//   const pieceMap = {
//     P: P2,
//     R: R2,
//     N: N2,
//     B: B2,
//     Q: Q2,
//     K: K2,
//     p: p,
//     r: r,
//     n: n,
//     b: b,
//     q: q,
//     k: k,
//   };

//   const squareSize = 47;
//   const dots = Array.from({ length: 6 });

//   useEffect(() => {
//     const FenArray = boardFen.split("/");
//     const boardMatrixTemp = FenArray.map((row) => {
//       const rowArr = [];
//       for (const char of row) {
//         if (!isNaN(char)) {
//           for (let i = 0; i < parseInt(char); i++) rowArr.push("");
//         } else {
//           rowArr.push(char);
//         }
//       }
//       return rowArr;
//     });
//     setBoardMatrix(boardMatrixTemp);
//   }, [boardFen]);

//   const legalMoveDisplay = (column, row) => {
//     const files = "abcdefgh";
//     const ranks = "87654321";
//     const file = files[column];
//     const rank = ranks[row];
//     const moves = chessObj.moves({ square: file + rank, verbose: true });
//     const allMoves = moves.map((m) => m.to);
//     const moveList = [];
//     setSelected(`${column},${row}`);
//     for (const move of allMoves) {
//       const file = move[0];
//       const rank = move.slice(1, 2);
//       const col = file.charCodeAt(0) - "a".charCodeAt(0);
//       const row = 8 - parseInt(rank);
//       moveList.push(`${col},${row}`);
//     }
//     setLegalMoves(moveList);
//   };

//   const makeMove = (col, row) => {
//     if (animating) return;

//     const files = "abcdefgh";
//     const ranks = "87654321";
//     const file = files[col];
//     const rank = ranks[row];

//     const [startCol, startRow] = selected.split(",").map(Number);
//     const startFile = files[startCol];
//     const startRank = ranks[startRow];

//     const movingPieceType = boardMatrix[startRow][startCol];
//     if (!movingPieceType) return;

//     setMovingPiece({ piece: movingPieceType, from: { col: startCol, row: startRow }, to: { col, row } });
//     setAnimating(true);

//     // Calculate pixel distances for animation
//     const dx = (col - startCol) * squareSize;
//     const dy = (row - startRow) * squareSize;

//     animation.setValue({ x: 0, y: 0 });
//     Animated.timing(animation, {
//       toValue: { x: dx, y: dy },
//       duration: 250,
//       useNativeDriver: true,
//     }).start(() => {
//       chessObj.move({ from: startFile + startRank, to: file + rank });
//       const newFen = chessObj.fen();
//       setBoardFen(newFen.split(" ")[0]);
//       setSelected("");
//       setLegalMoves([]);
//       setAnimating(false);
//       setMovingPiece(null);
//     });
//   };

//   return (
//     <View style={styles.wrapper}>
//       {/* Decorative Borders */}
//       <View style={[styles.border, styles.topBorder]}>
//         {dots.map((_, i) => (
//           <View key={`top-${i}`} style={styles.dot} />
//         ))}
//       </View>
//       <View style={[styles.border, styles.bottomBorder]}>
//         {dots.map((_, i) => (
//           <View key={`bottom-${i}`} style={styles.dot} />
//         ))}
//       </View>
//       <View style={[styles.border, styles.leftBorder]}>
//         {dots.map((_, i) => (
//           <View key={`left-${i}`} style={styles.dotVertical} />
//         ))}
//       </View>
//       <View style={[styles.border, styles.rightBorder]}>
//         {dots.map((_, i) => (
//           <View key={`right-${i}`} style={styles.dotVertical} />
//         ))}
//       </View>

//       {/* Chess Board */}
//       <View style={styles.container}>
//         {boardMatrix.map((rowArr, rowIndex) => (
//           <View key={rowIndex} style={styles.row}>
//             {rowArr.map((piece, colIndex) => {
//               const isDark = (rowIndex + colIndex) % 2 === 1;
//               const isLegal = legalMoves.includes(`${colIndex},${rowIndex}`);
//               const isMovingPiece =
//                 movingPiece &&
//                 movingPiece.from.col === colIndex &&
//                 movingPiece.from.row === rowIndex;

//               return (
//                 <Pressable
//                   key={colIndex}
//                   style={[
//                     styles.square,
//                     isDark ? styles.darkSquare : styles.lightSquare,
//                   ]}
//                   onPress={() =>
//                     isLegal
//                       ? makeMove(colIndex, rowIndex)
//                       : legalMoveDisplay(colIndex, rowIndex)
//                   }
//                 >
//                   {/* Render stationary piece */}
//                   {piece && !isMovingPiece && (
//                     <Image
//                       source={pieceMap[piece]}
//                       style={{ width: 40, height: 40, zIndex: 2 }}
//                     />
//                   )}
//                   {/* Legal move highlights */}
//                   {!piece && isLegal && <View style={styles.legalDot} />}
//                   {piece && isLegal && <View style={styles.legalCircle} />}
//                 </Pressable>
//               );
//             })}
//           </View>
//         ))}

//         {/* Animated moving piece overlay */}
//         {movingPiece && (
//           <Animated.View
//             style={{
//               position: "absolute",
//               left: movingPiece.from.col * squareSize,
//               top: movingPiece.from.row * squareSize,
//               transform: animation.getTranslateTransform(),
//               zIndex: 10,
//             }}
//           >
//             <Image
//               source={pieceMap[movingPiece.piece]}
//               style={{ width: 40, height: 40 }}
//             />
//           </Animated.View>
//         )}
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   wrapper: {
//     alignSelf: "center",
//     marginTop: 20,
//     position: "relative",
//   },
//   container: {
//     flexDirection: "column",
//     zIndex: 1,
//   },
//   row: {
//     flexDirection: "row",
//   },
//   square: {
//     width: 47,
//     height: 47,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   lightSquare: {
//     backgroundColor: "#c0dae0",
//   },
//   darkSquare: {
//     backgroundColor: "#597788",
//   },
//   border: {
//     position: "absolute",
//     backgroundColor: "#37495a",
//     zIndex: 5,
//   },
//   topBorder: {
//     top: -13,
//     left: -6,
//     right: -6,
//     height: 13,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   bottomBorder: {
//     bottom: -13,
//     left: -6,
//     right: -6,
//     height: 13,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   leftBorder: {
//     top: -13,
//     bottom: -13,
//     left: -13,
//     width: 13,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   rightBorder: {
//     top: -13,
//     bottom: -13,
//     right: -13,
//     width: 13,
//     flexDirection: "column",
//     alignItems: "center",
//     justifyContent: "space-evenly",
//   },
//   dot: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#8ea0ac",
//   },
//   dotVertical: {
//     width: 6,
//     height: 6,
//     borderRadius: 3,
//     backgroundColor: "#8ea0ac",
//   },
//   legalDot: {
//     position: "absolute",
//     width: 14,
//     height: 14,
//     borderRadius: 7,
//     backgroundColor: "rgba(0,0,0,0.4)",
//     zIndex: 1,
//   },
//   legalCircle: {
//     position: "absolute",
//     width: 42,
//     height: 42,
//     borderRadius: 21,
//     borderWidth: 3,
//     borderColor: "rgba(0,0,0,0.5)",
//     zIndex: 1,
//   },
// });
