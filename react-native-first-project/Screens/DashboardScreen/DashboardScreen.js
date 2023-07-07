import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { authFirebase } from "../../Firebase/config";
import { useDispatch } from "react-redux";
import { authVerifyEmail } from "../../Redux/auth/authOperations";

const initialState = {
  emailVerified: false,
};

const DashboardScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [state, setState] = useState(initialState);

  const dispatch = useDispatch();

  const submitVerify = async () => {
    try {
      dispatch(authVerifyEmail(state));
      setState(initialState);
      if(!emailVerified) {
        navigation.navigate("CreatePosts");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.dashboardContainer}>
        <Text style={styles.headerTitleText}>dashboard</Text>
      </View>
      <TouchableOpacity style={styles.btn} onPress={submitVerify}>
        <Text style={styles.btnTitle}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  dashboardContainer: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingTop: 55,
    paddingBottom: 11,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTitleText: {
    marginLeft: 100,
    // textAlign: "center",
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  btn: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    marginTop: 43,
    marginHorizontal: 100,
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
});

export default DashboardScreen;
