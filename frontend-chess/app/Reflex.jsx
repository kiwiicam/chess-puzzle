import { View, Text, Button } from "react-native";
import { router } from "expo-router";

export default function BestMove() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#121212" }}>
      <Text style={{ color: "white", fontSize: 22, marginBottom: 20 }}>Reflex Screen</Text>
      <Button title="Menu" onPress={() => router.push("/")} />
    </View>
  );
}
