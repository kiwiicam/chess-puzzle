import { Text, View, StyleSheet, Pressable } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";

export default function SignIn() {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <View style={[styles.test, styles.container]}>
      <Text style={styles.text}>Sign In Page</Text>

      <Pressable
        onPress={() => router.push("/")}
        style={({ pressed }) => [
          styles.button,
          { backgroundColor: pressed ? "#388E3C" : "#4CAF50" },
        ]}
      >
        <Text style={styles.buttonText}>Menu</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  test: {
    backgroundColor: "#111",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#fff",
    marginBottom: 20,
    fontSize: 18,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
