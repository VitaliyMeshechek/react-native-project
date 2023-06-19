import React, { useState, useEffect } from "react";
import { Camera } from "expo-camera";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as Location from "expo-location";
import Toast from "react-native-root-toast";
import uuid from "react-native-uuid";

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const initialState = {
  placeName: "",
  name: "",
  comments: 0,
  id: "",
};

const CreatePostsScreen = ({ navigation }) => {
  const [isShowKeyboard, setIsShowKeyboard] = useState(false);
  const [isCameraSavePhoto, setIsCameraSavePhoto] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [state, setState] = useState(initialState);
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const { name, placeName } = state;
  const postId = uuid.v4();

  const takePhoto = async () => {
    try {
      id = postId;
      const options = { quality: 0.5, base64: true, skipProcessing: true };
      const photo = await isCameraSavePhoto.takePictureAsync(options);
      let location = await Location.getCurrentPositionAsync();
      setLocation(location);

      console.log("photo", photo);
      setPhoto(photo.uri);
    } catch (error) {
      console.warn(error.message);
    }
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const onCameraReady = () => {
    setIsCameraReady(true);
  };

  const keyboardHide = () => {
    setIsShowKeyboard(false);
    Keyboard.dismiss();

    setState(initialState);
  };

  const [dimensions, setDimensions] = useState(
    Dimensions.get("window").width - 16 * 2
  );

  useEffect(() => {
    const onChange = () => {
      const width = Dimensions.get("window").width - 16 * 2;
      setDimensions(width);
    };
    const listener = Dimensions.addEventListener("change", onChange);
    return () => {
      listener.remove();
    };
  }, []);

  const onFocus = () => {
    setIsShowKeyboard(true);
  };

  const createNewPost = name === "" || placeName === "";

  const sendPublication = () => {
    navigation.navigate("DefaultScreen", { photo });
    setPhoto(false);
  };

  return (
    <TouchableWithoutFeedback onPress={keyboardHide}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("DefaultScreen");
            }}
          >
            <AntDesign
              name="arrowleft"
              size={24}
              color="rgba(33, 33, 33, 0.8)"
            />
          </TouchableOpacity>

          <Text style={styles.headerTitleText}>Створити публікацію</Text>
        </View>
        <View style={styles.createPostsContainer}>
          {photo ? (
            <View style={styles.addPhotoCamera}>
              <Image
                style={styles.imageBackgroundPhoto}
                source={{ uri: photo }}
              />
              <TouchableOpacity style={styles.photoIcon} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </View>
          ) : (
            <Camera
              style={{ ...styles.addPhotoCamera, width: dimensions }}
              ref={setIsCameraSavePhoto}
              onCameraReady={onCameraReady}
            >
              <TouchableOpacity style={styles.photoIcon} onPress={takePhoto}>
                <MaterialIcons name="photo-camera" size={24} color="#BDBDBD" />
              </TouchableOpacity>
            </Camera>
          )}
          {photo ? (
            <Text style={styles.textUnderPhoto}>Редагувати фото</Text>
          ) : (
            <Text style={styles.textUnderPhoto}>Завантажте фото</Text>
          )}
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              onChangeText={(value) =>
                setState((prevState) => ({ ...prevState, name: value }))
              }
              value={name}
              placeholder="Назва..."
              placeholderColor="#BDBDBD"
              onFocus={onFocus}
            />

            <TextInput
              style={{ ...styles.input, marginBottom: 32 }}
              onChangeText={(value) =>
                setState((prevState) => ({
                  ...prevState,
                  placeName: value,
                }))
              }
              value={placeName}
              placeholder="Місцевість..."
              onFocus={onFocus}
            />
          </View>
          {!photo ? (
            <TouchableOpacity
              style={styles.btnPublicationDisabled}
              disabled={createNewPost}
            >
              <Text style={styles.btnPublicationTextDisabled}>
                Опублікувати
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.btnPublicationEnabled}
              onPress={sendPublication}
            >
              <Text style={styles.btnPublicationTextEnabled}>Опублікувати</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
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
    marginLeft: 64,
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
  },
  createPostsContainer: {
    flex: 1,
    marginHorizontal: 16,
    position: "relative",
  },
  addPhotoCamera: {
    height: 240,
    backgroundColor: "#F6F6F6",
    position: "relative",
    marginTop: 32,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackgroundPhoto: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 240,
  },
  photoIcon: {
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  textUnderPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginBottom: 48,
  },
  form: {
    width: "100%",
  },
  input: {
    borderBottomWidth: 1,
    paddingBottom: 16,
    borderBottomColor: "#E8E8E8",
    backgroundColor: "#ffffff",
    marginBottom: 47,
    color: "#212121",
    fontSize: 16,
  },
  btnPublicationDisabled: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnPublicationEnabled: {
    backgroundColor: "#FF6C00",
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 16,
    paddingTop: 16,
  },
  btnPublicationTextDisabled: {
    color: "#BDBDBD",
  },
  btnPublicationTextEnabled: {
    color: "#ffffff",
  },
});

export default CreatePostsScreen;
