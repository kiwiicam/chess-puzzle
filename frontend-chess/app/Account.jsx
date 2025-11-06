import { Text, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";


export default function Account() {

  const router = useRouter();

  const [loggedIn, setLoggedIn] = useState(false);

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

