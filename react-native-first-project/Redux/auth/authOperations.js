import { authFirebase, db } from "../../Firebase/config";
import { authSlice } from "./authReducer";
// import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
  sendEmailVerification,
} from "firebase/auth";

const {
  updateUserProfile,
  authStateChange,
  authSignOut,
  authVerifyEmail,
  fetchingInProgress,
} = authSlice.actions;

import Toast from "react-native-root-toast";

const isSendEmailVerification = async () => {
  const user = authFirebase.currentUser;
  console.log("user", user);

  try {
    await sendEmailVerification(user)
      .then(() => {
        alert("Email verification sent!");
      })
      .catch((error) => {
        alert(error.message);
      });
  } catch (error) {
    console.error(error);
  }
};

export const authSignUpUser =
  ({ avatar, login, email, password, emailVerified }) =>
  async (dispatch, getState) => {
    // const [isEmailVerified, setIsEmailVerified] = state(false);
    try {
      dispatch(fetchingInProgress());
      if (!login || !email || !password) {
        Toast.show(`Всі поля обов'язкові до заповнення!`, {
          duration: 3000,
          position: 50,
        });
        return;
      }

      const user = await createUserWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      // const actionCodeSettings = {
      //   url: "htps://react-native-first-proje-4c227.firebaseapp.com",
      //   iOS: {
      //     bundleId: "com.example.ios",
      //   },
      //   android: {
      //     packageName: "com.example.android",
      //     installApp: true,
      //     minimumVersion: "12",
      //   },
      //   handleCodeInApp: true,
      // };

      await isSendEmailVerification();
      Toast.show(`Реєстрація успішна!`, {
        duration: 3000,
        position: 50,
      });

      console.log("user-authSignUpUser", user);
      // const newUser = authFirebase.currentUser;

      await updateProfile(authFirebase.currentUser, {
        displayName: login,
        userId: uid,
        photoURL: avatar,
        emailVerified: verify,
      });
      const { displayName, uid, photoURL } = await authFirebase.currentUser;
      const userUpdateProfile = {
        login: displayName,
        userId: uid,
        avatar: photoURL,
        userEmail: email,
        verify: emailVerified,
      };
      // const checkVerifyEmail = {
      //   verify: emailVerified,
      // };
      dispatch(updateUserProfile(userUpdateProfile));
      // dispatch(authVerifyEmail(checkVerifyEmail));
    } catch (error) {
      console.log("error.message", error.message);
    }
  };

export const authSignInUser =
  ({ email, password }) =>
  async (dispatch, getState) => {
    // if (email) {
    //   Toast.show(`${email}, - не зареєстрований!`, {
    //     duration: 3000,
    //     position: 50,
    //   });
    // }
    // dispatch(authVerifyEmail());
    try {
      const user = await signInWithEmailAndPassword(
        authFirebase,
        email,
        password
      );
      if (user) {
        Toast.show(`Вхід успішний!`, {
          duration: 3000,
          position: 50,
        });
        return;
      } else {
        alert("Please verify your email");
        return false;
      }
    } catch (error) {
      console.log("error.message", error.message);
    }
    console.log("user-authSignInUser", user);
  };

export const authSignOutUser = () => async (dispatch, getState) => {
  try {
    await signOut(authFirebase);
    dispatch(authSignOut());
  } catch (error) {
    console.log("error.message", error.message);
  }
  Toast.show(`До скорої зустрічі!`, {
    duration: 3000,
    position: 50,
  });
};

export const authStateChangeUser = () => async (dispatch, getState) => {
  try {
    await onAuthStateChanged(authFirebase, (user) => {
      if (user) {
        const userUpdateProfile = {
          userName: user.displayName,
          userId: user.uid,
          userAvatar: user.photoURL,
          userEmail: user.email,
          emailVerified: user.emailVerified,
        };

        // dispatch(authVerifyEmail({ emailVerified: true }));
        dispatch(authStateChange({ stateChange: true }));
        dispatch(updateUserProfile(userUpdateProfile));
      }
    });
  } catch (error) {
    console.log("error.message", error.message);
  }
};

// const isSendEmailVerification = async () => {
//   const user = authFirebase;
//   console.log("user", user);

//   const actionCodeSettings = {
//     // URL you want to redirect back to. The domain (www.example.com) for this
//     // URL must be in the authorized domains list in the Firebase Console.
//     url: "https://www.example.com/finishSignUp?cartId=1234",
//     // This must be true.
//     handleCodeInApp: true,
//     iOS: {
//       bundleId: "com.example.ios",
//     },
//     android: {
//       packageName: "com.example.android",
//       installApp: true,
//       minimumVersion: "12",
//     },
//     dynamicLinkDomain: "example.page.link",
//   };

//   await sendSignInLinkToEmail(user, email, actionCodeSettings)
//     .then(() => {
//       window.localStorage.setItem("emailForSignIn", email);
//       alert("Email verification sent!");
//     })
//     .catch((error) => {
//       alert(error.message);
//     });

//   if (isSignInWithEmailLink(user, window.location.href)) {
//     let email = window.localStorage.getItem("emailForSignIn");
//     if (!email) {
//       email = window.prompt("Please provide your email for confirmation");
//     }
//     signInWithEmailLink(user, email, window.location.href)
//       .then((result) => {
//         // Clear email from storage.
//         window.localStorage.removeItem("emailForSignIn");
//       })
//       .catch((error) => {
//         alert(error.message);
//       });
//   }
// };
