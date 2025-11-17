import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import backgroundimage from "../../assets/homescreenbg.png";
import knight from "../../assets/knight.png";

export default function Login({ setSignUpPage, onSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      return Alert.alert("Missing fields", "Please enter email and password.");
    }

    try {
      const response = await fetch("http://192.168.1.31:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login response:", data);

      if (response.ok) {
        Alert.alert("Success", "Login successful!", [
          { text: "OK", onPress: () => onSuccess(data.tokens) },
        ]);
      } else {
        Alert.alert("Login Failed", data.error || "Incorrect email or password.");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Network Error", "Unable to connect to the server.");
    }
  };

  return (
    <ImageBackground source={backgroundimage} style={styles.bgimage} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.logoContainer}>
          <Image source={knight} style={styles.knightImg} />
          <Text style={styles.logoTitle}>UNLIMITED CHESS</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.title}>LOG IN TO YOUR ACCOUNT</Text>

          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            placeholderTextColor="#aaa"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
          />

          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.loginButton} onPress={handleLogin}>
            <Text style={styles.loginText}>LOG IN</Text>
          </Pressable>

          <Text style={styles.orText}>OR</Text>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialButton}>
              <Text style={styles.socialText}>G</Text>
            </Pressable>

            <Pressable style={styles.socialButton}>
              <Text style={styles.socialText}>f</Text>
            </Pressable>
          </View>
        </View>

        <Text style={styles.footerText}>
          Don't have an account?{" "}
          <Text style={styles.signUpLink} onPress={() => setSignUpPage(true)}>
            Sign Up
          </Text>
        </Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgimage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    width: "100%",
    backgroundColor: "rgba(0,0,0,0.65)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  knightImg: {
    width: 70,
    height: 70,
    resizeMode: "contain",
  },
  logoTitle: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    letterSpacing: 1,
    marginTop: 8,
  },
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "rgba(20,25,35,0.85)",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  title: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 18,
  },
  input: {
    width: "100%",
    height: 45,
    borderWidth: 1,
    borderColor: "#40bab1",
    borderRadius: 6,
    paddingHorizontal: 12,
    color: "#fff",
    marginVertical: 6,
    fontSize: 15,
  },
  loginButton: {
    width: "100%",
    backgroundColor: "#40bab1",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    color: "#888",
    marginVertical: 10,
    fontSize: 14,
  },
  socialRow: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
  },
  socialButton: {
    width: 45,
    height: 45,
    borderRadius: 25,
    backgroundColor: "#1e2835",
    alignItems: "center",
    justifyContent: "center",
  },
  socialText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  footerText: {
    color: "#aaa",
    fontSize: 14,
    marginTop: 20,
  },
  signUpLink: {
    color: "#40bab1",
    fontWeight: "600",
  },
});
