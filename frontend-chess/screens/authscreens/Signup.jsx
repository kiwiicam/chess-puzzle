import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, ImageBackground, Image, Alert } from "react-native";
import backgroundimage from "../../assets/homescreenbg.png";
import knight from "../../assets/knight.png";
import * as WebBrowser from "expo-web-browser";
import * as AuthSession from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();

export default function SignUp({ setSignUpPage, onSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const COGNITO_DOMAIN = "ap-southeast-2ednlm3tex.auth.ap-southeast-2.amazoncognito.com";
const COGNITO_CLIENT_ID = "6922fp8fanlh6i04m1t7u1gsci";

const REDIRECT_URI = "frontendchess://auth";


console.log("Generated redirect URI:", REDIRECT_URI);

const discovery = {
  authorizationEndpoint: `https://${COGNITO_DOMAIN}/oauth2/authorize`,
  tokenEndpoint: `https://${COGNITO_DOMAIN}/oauth2/token`,
};

const [request, result, promptAsync] = AuthSession.useAuthRequest(
  {
    clientId: COGNITO_CLIENT_ID,
    redirectUri: REDIRECT_URI,
    responseType: "code",
    useProxy: false, // REQUIRED
    scopes: ["openid", "email", "profile"],
    extraParams: {
      identity_provider: "Google",
    },
  },
  discovery
);

console.log("Auth request object:", request);
console.log("FINAL LOGIN URL:", request?.url);



  const handleGoogleLogin = async () => {
  try {
    const res = await promptAsync();

    console.log("Google result:", res);

    if (res.type === "success") {
      const code = res.params.code;

      const response = await fetch("http://192.168.1.31:8000/api/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      console.log("Backend Google result:", data);
    }
  } catch (e) {
    console.log("Google login error:", e);
  }
};




  const handleSignUp = async () => {
  console.log("SIGNUP BUTTON PRESSED"); // Debug log

  if (!username || !email || !password) {
    return Alert.alert("Missing fields", "Please fill out all fields");
  }

  try {
    const response = await fetch("http://192.168.1.31:8000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        password,
      }),
    });

    const data = await response.json();
    console.log("Signup response:", data);

    if (response.ok) {
      Alert.alert(
        "Verify Your Email",
        "A verification code was sent to your email.",
        [{ text: "OK", onPress: () => onSuccess(email) }]
      );
    } else {
      Alert.alert("Sign Up Failed", data.error || "Something went wrong");
    }
  } catch (err) {
    console.error("Signup error:", err);
    Alert.alert("Network error", "Please try again later.");
  }
};


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

          <Pressable style={styles.signupButton} onPress={handleSignUp}>
            <Text style={styles.signupText}>SIGN UP</Text>
          </Pressable>

          <Text style={styles.orText}>OR</Text>

          <View style={styles.socialRow}>
            <Pressable style={styles.socialButton} onPress={handleGoogleLogin}>
  <Text style={styles.socialText}>G</Text>
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
