import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert, ImageBackground } from "react-native";
import backgroundimage from "../../assets/homescreenbg.png";

export default function VerifyCode({ email, onVerified, goBack }) {
  const [code, setCode] = useState("");

  const handleVerify = async () => {
    if (!code) {
      return Alert.alert("Missing Code", "Please enter the verification code.");
    }

    try {
      const response = await fetch("http://192.168.1.31:8000/api/auth/confirm-signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      const data = await response.json();
      console.log("Verify response:", data);

      if (response.ok) {
        Alert.alert(
          "Account Verified",
          "Your account has been successfully verified. You can now log in.",
          [{ text: "OK", onPress: onVerified }]
        );
      } else {
        Alert.alert("Verification Failed", data.error || "Invalid verification code.");
      }
    } catch (err) {
      console.error("Verification error:", err);
      Alert.alert("Network Error", "Please try again later.");
    }
  };

  return (
    <ImageBackground source={backgroundimage} style={styles.bgimage} resizeMode="cover">
      <View style={styles.overlay}>
        <View style={styles.card}>
          <Text style={styles.title}>VERIFY YOUR EMAIL</Text>
          <Text style={styles.subtitle}>
            Enter the 6-digit code sent to:
            {"\n"}
            <Text style={{ fontWeight: "bold", color: "#fff" }}>{email}</Text>
          </Text>

          <TextInput
            style={styles.input}
            placeholder="ENTER CODE"
            placeholderTextColor="#aaa"
            keyboardType="number-pad"
            maxLength={6}
            value={code}
            onChangeText={setCode}
          />

          <Pressable style={styles.verifyButton} onPress={handleVerify}>
            <Text style={styles.verifyText}>VERIFY</Text>
          </Pressable>

          <Pressable style={styles.backButton} onPress={goBack}>
            <Text style={styles.backText}>Back to Sign Up</Text>
          </Pressable>
        </View>
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
  card: {
    width: "100%",
    maxWidth: 350,
    backgroundColor: "rgba(20,25,35,0.85)",
    borderRadius: 12,
    paddingVertical: 25,
    paddingHorizontal: 20,
    alignItems: "center",
  },
  title: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    color: "#ddd",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#40bab1",
    borderRadius: 6,
    paddingHorizontal: 12,
    color: "#fff",
    fontSize: 18,
    letterSpacing: 4,
    textAlign: "center",
    marginBottom: 20,
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#40bab1",
    paddingVertical: 12,
    borderRadius: 6,
    alignItems: "center",
    marginBottom: 15,
  },
  verifyText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    paddingVertical: 6,
  },
  backText: {
    color: "#40bab1",
    fontSize: 14,
    fontWeight: "600",
  },
});
