import React from "react";
import { StyleSheet, Text, View, ImageBackground } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("./assets/image/mountains.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.containerRegister}></View>
        {/* <Text>Hello!</Text> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    justifyContent: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  containerRegister: {
    position: "absolute",
    width: 375,
    height: 405,
    left: 0,
    top: 263,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
});
