import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  KeyboardAvoidingView,
  TextInput,
  Platform,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import colors from "../utils/colors";

const LoginScreen = ({ navigation }) => {
  const [emailInput, setEmailInput] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleEmailChange = (e) => {
    setEmailInput(e.trim());
  };
  const handlePasswordChange = (e) => {
    setPasswordInput(e.trim());
  };

  const checkIfEmailIsValid = () => {
    const res = String(emailInput)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

    if (res == null) {
      setEmailInput("");
      return "Email is not valid, Try Again";
    }

    return "valid";
  };

  const checkIfPasswordIsValid = () => {
    if (passwordInput.length <= 5) {
      setPasswordInput("");
      return "Password must be greater than 5 characters";
    } else return "valid";
  };

  const handleSubmit = async () => {
    const emailValid = checkIfEmailIsValid();
    const passwordValid = checkIfPasswordIsValid();

    if (emailValid == "valid" && passwordValid == "valid") {
      await AsyncStorage.setItem("myAppUser", "user");

      navigation.replace("HomeScreen");
      setPasswordInput("");
      setEmailInput("");
    }
    if (emailValid !== "valid") {
      setEmailError(emailValid);
    }

    if (passwordValid !== "valid") {
      setPasswordError(passwordValid);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <Text style={styles.header}>Login</Text>
          <View>
            <TextInput
              placeholder="email"
              placeholderTextColor={colors.primary}
              type="email"
              style={styles.textInput}
              autoFocus={true}
              value={emailInput}
              keyboardType="email-address"
              onChangeText={(e) => handleEmailChange(e)}
            />
            <View>
              <Text style={styles.error}>{emailError ? emailError : ""}</Text>
            </View>
          </View>
          <View>
            <TextInput
              placeholder="password"
              placeholderTextColor={colors.primary}
              style={styles.textInput}
              value={passwordInput}
              type="password"
              secureTextEntry={true}
              onChangeText={(e) => handlePasswordChange(e)}
            />
            <View>
              <Text style={styles.error}>
                {passwordError ? passwordError : ""}
              </Text>
            </View>
          </View>

          <TouchableOpacity style={styles.btnContainer} onPress={handleSubmit}>
            <Text style={styles.btnText}>Login</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    padding: 24,
    flex: 1,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
    color: colors.primary,
    textAlign: "center",
  },
  textInput: {
    height: 40,
    borderColor: colors.primary,
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 36,
    color: colors.primary,
  },
  btnContainer: {
    borderRadius: 5,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    height: 50,
  },
  btnText: {
    color: colors.white,
    fontWeight: "bold",
    fontSize: 15,
  },

  error: {
    color: "red",
  },
});
