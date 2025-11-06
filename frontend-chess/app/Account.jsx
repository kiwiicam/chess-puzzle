import { Text, View, StyleSheet } from "react-native";

export default function Account() {
  return (
    <View
      style={[styles.test, {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }]}
    >
      <Text style={{ color: "#fff" }}>Account screen</Text>
    </View>
  );
}

export const styles = StyleSheet.create({
  test: {
    backgroundColor: "#111"
  }
})

