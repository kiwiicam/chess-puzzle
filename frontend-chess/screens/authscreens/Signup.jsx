import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import backgroundimage from "../../assets/homescreenbg.png";
import knight from "../../assets/knight.png";

export default function SignUp({ setSignUpPage, onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <ImageBackground source={backgroundimage} style={styles.bgimage} resizeMode="cover">
      <View style={styles.overlay}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image source={knight} style={styles.knightImg} />
          <Text style={styles.logoTitle}>UNLIMITED CHESS</Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.createTitle}>CREATE YOUR ACCOUNT</Text>

          <TextInput
            style={styles.input}
            placeholder="USERNAME"
            placeholderTextColor="#aaa"
            value={username}
            onChangeText={setUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="EMAIL"
            placeholderTextColor="#aaa"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="PASSWORD"
            placeholderTextColor="#aaa"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Pressable style={styles.signupButton} >
            <Text style={styles.signupText}>SIGN UP</Text>
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

        {/* Footer */}
        <Text style={styles.footerText}>
          Already have an account?{" "}
          <Text style={styles.loginLink} onPress={() => setSignUpPage(false)}>
            Log In
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
  createTitle: {
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
  signupButton: {
    width: "100%",
    backgroundColor: "#40bab1",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12,
  },
  signupText: {
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
  loginLink: {
    color: "#40bab1",
    fontWeight: "600",
  },
});
