import React, { useEffect, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { SimpleLineIcons, EvilIcons } from "@expo/vector-icons";

import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";

const DefaultScreenPosts = ({ route }) => {
  const [posts, setPosts] = useState([]);
  const [avatar, setAvatar] = useState({});
  console.log("route.params", route.params);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);
  console.log("posts", posts);
  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleText}>Публікації</Text>
        <TouchableOpacity onPress={() => logOut}>
          <MaterialIcons
            style={{ marginRight: 10 }}
            name="logout"
            size={24}
            color="#BDBDBD"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.postsContainer}>
        {/* <View style={styles.userContainer}>
          {avatar ? (
            <Image style={styles.userAvatar} source={{ uri: avatar }} />
          ) : (
            <Image style={styles.userAvatar} source={photo} />
          )}
          <View style={styles.dataUserContainer}>
            <Text style={styles.userName}>name</Text>
            <Text style={styles.userEmail}>email</Text>
          </View>
        </View> */}
        <View style={{ flex: 1 }}>
          <FlatList
            data={posts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: item.photo }} />
                <Text
                  style={{
                    ...styles.placeName,
                    fontFamily: "Roboto-Medium",
                  }}
                >
                  {item.placeName}
                </Text>
                <View style={styles.locationContainer}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", {
                        postId: item.id,
                        photo: item.photo,
                      })
                    }
                  >
                    <View style={styles.commentIconContainer}>
                      <EvilIcons
                        style={styles.commentIcon}
                        name="comment"
                        size={24}
                        color="black"
                      />
                      <Text style={styles.commentText}>{item.comments}</Text>
                    </View>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Map", {
                        location: item.location,
                      })
                    }
                  >
                    <View style={styles.locationIconContainer}>
                      <EvilIcons name="location" size={24} color="black" />
                      <Text
                        style={{
                          ...styles.locationText,
                          fontFamily: "Roboto-Regular",
                        }}
                      >
                        {item.placeName}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    flexDirection: "row",
    paddingLeft: 16,
    paddingTop: 55,
    paddingBottom: 11,
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0, 0, 0, 0.3)",
  },
  headerTitleText: {
    marginRight: 109,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  postsContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  userContainer: {
    flexDirection: "row",
    marginTop: 32,
    marginBottom: 32,
  },
  userAvatar: {
    width: 60,
    height: 60,
    marginRight: 8,
    borderRadius: 4,
  },
  dataUserContainer: {
    paddingTop: 15,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "rgba(33, 33, 33, 0.8)",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  imageContainer: {
    marginBottom: 34,
  },
  image: {
    height: 240,
    width: "100%",
    borderRadius: 8,
    marginBottom: 8,
  },
  placeName: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    color: "#212121",
    marginBottom: 11,
  },
  locationContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 8,
  },
  commentIconContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  commentIcon: {
    marginRight: 6,
  },
  commentText: {
    fontSize: 16,
    color: "#BDBDBD",
  },
  locationIconContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    textDecorationLine: "underline",
    color: "#212121",
  },
});

export default DefaultScreenPosts;
