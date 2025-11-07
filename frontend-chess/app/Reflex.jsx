import { View, Text, Button } from "react-native";
import { router } from "expo-router";
import Board from "../components/ChessBoard";

export default function BestMove() {

  const FEN = "r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R w KQkq e6 0 4"

  const FENClean = FEN.split(" ")

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
      <Board FEN={FENClean[0]} />
    </View>
  );
}
