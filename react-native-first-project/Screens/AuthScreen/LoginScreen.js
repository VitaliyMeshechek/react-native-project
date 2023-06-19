import React, { useState, useEffect } from "react";
import {
  View,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
  Keyboard,
  Dimensions,
  ImageBackground,
  TouchableWithoutFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import { authSignInUser } from "../../Redux/auth/authOperations";

const initialState = {
  email: "",
  password: "",
};

const LoginScreen = ({ navigation }) => {
  const [state, setState] = useState(initialState);
  const [isShowPassword, setIsShowPassword] = useState(true);
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);

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

  const submitLoginForm = async () => {
    try {
      setIsShowKeyboard(false);
      Keyboard.dismiss();

      dispatch(authSignInUser(state));
      setState(initialState);
      console.log("submit", state);
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
                ...styles.loginContainer,
                paddingBottom: isShowKeyboard ? 32 : 111,
                width: dimensions,
              }}
            >
              <Text style={styles.loginTitle}>Увійти</Text>
              <View style={styles.form}>
                <View style={styles.inputContainer}>
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
                  onPress={submitLoginForm}
                >
                  <Text style={styles.btnTitle}>Увійти</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.navigationContainer}>
                <Text style={styles.fastBtnRegister}>Немає акаунту?</Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("Register")}
                >
                  <Text style={styles.fastBtnRegister}>Зареєструватися</Text>
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
  loginContainer: {
    position: "relative",
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  loginTitle: {
    lineHeight: 35,
    fontSize: 30,
    fontFamily: "Roboto-Medium",
    marginTop: 32,
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
    top: 97,
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
  fastBtnRegister: {
    marginTop: 16,
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    textAlign: "center",
    color: "#1B4371",
  },
});

export default LoginScreen;
