import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Pressable, ScrollView, ActivityIndicator } from "react-native";
import { useRouter } from "expo-router";

export default function Account() {
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ⚙️ Change this to your computer IP if testing on a physical device
  const API_URL = "http://192.168.1.31:8000/users";

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        if (response.ok) {
          setUsers(data.users || []);
        } else {
          console.error("Error fetching users:", data);
        }
      } catch (err) {
        console.error("Network error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  return (
    <View style={[styles.test, styles.container]}>
      <Text style={styles.title}>Account Screen</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#4CAF50" />
      ) : (
        <ScrollView contentContainerStyle={styles.userList}>
          {users.length > 0 ? (
            users.map((user, index) => (
              <View key={index} style={styles.userBox}>
                <Text style={styles.userText}>{user.username}</Text>
                <Text style={styles.emailText}>{user.email}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.emptyText}>No users found</Text>
          )}
        </ScrollView>
      )}

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
