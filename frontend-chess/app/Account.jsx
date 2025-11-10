import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);


  return (
    <View style={[styles.test, styles.container]}>
      <Text style={styles.title}>Account Screen</Text>
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
    paddingHorizontal: 20,
  },
  title: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  userList: {
    width: "100%",
    alignItems: "center",
    paddingBottom: 20,
  },
  userBox: {
    width: "90%",
    backgroundColor: "#1e2835",
    borderRadius: 8,
    padding: 15,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  userText: {
    color: "#40bab1",
    fontSize: 18,
    fontWeight: "bold",
  },
  emailText: {
    color: "#ccc",
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
  button: {
    marginTop: 25,
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
