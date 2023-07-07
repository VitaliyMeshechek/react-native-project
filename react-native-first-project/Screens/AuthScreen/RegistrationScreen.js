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
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";

import { authSignUpUser } from "../../Redux/auth/authOperations";

const initialState = {
  login: "",
  email: "",
  password: "",
  avatar: "",
};

const RegistrationScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setState(initialState);
  };

  const [dimensions, setDimensions] = useState(Dimensions.get("window").width);

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width;
      setDimensions(width);
    };
    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener.remove();
    };
  }, []);

  const submitRegisterForm = async () => {
    try {
      setIsShowKeyboard(false);
      Keyboard.dismiss();

      dispatch(authSignUpUser(state));
      setState(initialState);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.appContainer}>
      <TouchableWithoutFeedback onPress={keyboardHide}>
        <ImageBackground
          source={require("../../assets/image/mountains.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={-138}
          >
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
                    source={require("../../assets/image/addUserImage.svg")}
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
                      setState((prevState) => ({
                        ...prevState,
                        login: value,
                      }))
                    }
                    placeholder="Логін"
                    value={state.login}
                  />
                  <TextInput
                    style={styles.input}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        email: value,
                      }))
                    }
                    value={state.email}
                    placeholder="Адреса електронної пошти"
                  />
                  <TextInput
                    style={{ ...styles.input, marginBottom: 0 }}
                    onFocus={() => setIsShowKeyboard(true)}
                    onChangeText={(value) =>
                      setState((prevState) => ({
                        ...prevState,
                        password: value,
                      }))
                    }
                    placeholder="Пароль"
                    value={state.password}
                    secureTextEntry={isShowPassword}
                  />
                  <TouchableOpacity
                    style={styles.showBtn}
                    onPress={() => {
                      setIsShowPassword((prevState) => !prevState);
                    }}
                  >
                    <Text style={styles.textShowBtn}>Показати</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btn}
                  onPress={submitRegisterForm}
                >
                  <Text style={styles.btnTitle}>Зареєструватися</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.navigationContainer}>
                <Text style={styles.fastBtnLogin}>Вже є акаунт? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.fastBtnLogin}>Увійти</Text>
                </TouchableOpacity>
              </View>
            </View>
          </KeyboardAvoidingView>
        </ImageBackground>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
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
    color: "#212121",
  },
  showBtn: {
    position: "absolute",
    top: 162,
    right: 40,
  },
  textShowBtn: {
    color: "#1B4371",
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
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
  navigationContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  fastBtnLogin: {
    marginTop: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

export default RegistrationScreen;
