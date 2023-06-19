import { authFirebase } from "../../Firebase/config";
import { authSlice } from "./authReducer";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import Toast from "react-native-root-toast";

export const authSignUpUser =
  ({ avatar, login, email, password }) =>
  async (dispatch, getState) => {
    try {
      // dispatch(fetchingInProgress());
      const user = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );

      Toast.show(`Реєстрація успішна!`, {
        duration: 4000,
        position: 50,
      });

      console.log("user", user);

      await updateProfile(authFirebase.currentUser, {
        displayName: login,
        userId: user.uid,
        photoURL: avatar,
      });

      const { displayName, uid, photoURL } = await authFirebase.currentUser;

      const userUpdateProfile = {
        userName: displayName,
        userId: uid,
        userAvatar: photoURL,
        userEmail: email,
      };

      dispatch(authSlice.actions.updateUserProfile(userUpdateProfile));
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
  };
export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      console.log("user", user);
    } catch (error) {
      console.log("error", error);
      console.log("error.code", error.code);
      console.log("error.message", error.message);
    }
    Toast.show(`Вхід успішний!`, {
      duration: 4000,
      position: 50,
    });
  };
export const authSignOutUser = async (dispatch, getState) => {};
