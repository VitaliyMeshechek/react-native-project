import React from "react";
import { View, Text, StyleSheet } from "react-native";

const CommentsScreen = () => {
  return (
    <View style={styles.commentsContainer}>
      <Text>CommentsScreen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  commentsContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CommentsScreen;
