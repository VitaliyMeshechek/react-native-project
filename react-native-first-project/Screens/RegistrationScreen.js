import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Dimensions,
} from "react-native";

const initialState = {
  login: "",
  email: "",
  password: "",
};

const RegistrationScreen = () => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();
    console.log(state);
    setState(initialState);
  };

  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  }, []);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" && "padding"}>
      <View
        style={{
          ...styles.registerContainer,
          paddingBottom: isShowKeyboard ? 32 : 45,
          width: dimensions,
        }}
      >
        <View style={styles.avatarContainer}>
          <TouchableOpacity style={styles.addAvatar}>
            <Image
              style={styles.avatar}
              source={require("../assets/image/add.svg")}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.registerTitle}>Реєстрація</Text>
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, login: value }))
              }
              placeholder="Логін"
              value={state.login}
            />
            <TextInput
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, email: value }))
              }
              value={state.email}
              placeholder="Адреса електронної пошти"
            />
            <TextInput
              style={styles.input}
              onFocus={() => setIsShowKeyboard(true)}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, password: value }))
              }
              placeholder="Пароль"
              value={state.password}
              secureTextEntry={true}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.btn}
            onPress={() => keyboardHide()}
          >
            <Text style={styles.btnTitle}>Зареєстуватися</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.fastLogin}>Вже є акаунт? Увійти</Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  registerContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  avatarContainer: {
    position: "relative",
    width: 120,
    height: 120,
    left: 128,
    top: -60,
    backgroundColor: "#F6F6F6",
    borderRadius: 16,
  },
  addAvatar: {
    position: "absolute",
    right: -12.5,
    bottom: 14,
  },
  avatar: {
    width: 25,
    height: 25,
    borderRadius: 16,
  },
  registerTitle: {
    lineHeight: 35,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    // marginTop: 32,
    color: "#212121",
    textAlign: "center",
  },
  form: {
    marginHorizontal: 16,
  },
  inputContainer: {
    width: "100%",
    marginTop: 16,
  },
  input: {
    height: 50,
    marginTop: 16,
    marginHorizontal: 16,
    paddingLeft: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    padding: 16,
    color: "#BDBDBD",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 43,
    marginHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  btnTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "Roboto-Regular",
    lineHeight: 19,
  },
  fastLogin: {
    marginTop: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

export default RegistrationScreen;
