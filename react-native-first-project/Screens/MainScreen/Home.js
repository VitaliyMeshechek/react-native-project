import React from "react";
import PostsScreen from "./PostsScreen";
import { View, StyleSheet } from "react-native";

const Home = () => {
  return (
    <View style={styles.homeContainer}>
      <PostsScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
