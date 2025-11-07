import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import Board from "../components/ChessBoard";
import { Chess } from 'chess.js'

export default function BestMove() {

  const FEN = "r1bqkbnr/ppp2ppp/2n5/3pp3/3PP3/5N2/PPP2PPP/RNBQKB1R w KQkq - 0 4"

  const FENClean = FEN.split(" ");
  const chess = new Chess(FEN)
  
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
      <Board FEN={FENClean[0]} chessObj={chess} />
    </View>
  );
}
