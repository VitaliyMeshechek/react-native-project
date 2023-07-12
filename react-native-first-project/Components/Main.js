import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import useRoute from "../Router/router";
import { authStateChangeUser } from "../Redux/auth/authOperations";
import { authFirebase, db } from "../Firebase/config";
// import { collection } from "firebase/firestore";
import DashboardScreen from "../Screens/DashboardScreen/DashboardScreen";

const Main = () => {
  const { stateChange } = useSelector((state) => state.auth);
  const { emailVerified } = useSelector((state) => state.auth);
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    // const usersCollectionRef = collection(db, 'users');
    // authFirebase
    //   .collection(db, "users")
    //   .doc(authFirebase.currentUser.uid)
    //   .get()
    //   .then((snapshot) => {
    //     if (snapshot.exists) {
    //       setName(snapshot.data);
    //     } else {
    //       console.log("user doesn't exist");
    //     }
    //   });
    dispatch(authStateChangeUser());
  }, []);

  const routing = useRoute(stateChange, emailVerified);
  // const verify = useRoute(emailVerified);

  return (
    <NavigationContainer>
      {routing}
      {/* <DashboardScreen /> */}
    </NavigationContainer>
  );
};

export default Main;

// rnfe

// export const authSignUpUser =
//   ({ avatar, login, email, password, verify }) =>
//   async (dispatch, getState) => {
//     try {
//       dispatch(fetchingInProgress());
//       if (!login || !email || !password) {
//         Toast.show(`Всі поля обов'язкові до заповнення!`, {
//           duration: 3000,
//           position: 50,
//         });
//         return;
//       }

//       const [emailVerified, setEmailVerified] = useState("false");

//       const user = await createUserWithEmailAndPassword(
//         authFirebase,
//         email,
//         password
//       )
//         .then(() => {
//           sendEmailVerification(authFirebase.currentUser)
//             .then(() => {
//               alert("Email verification sent!");
//               // handleCodeInApp: true,
//               // url: "htps://react-native-first-proje-4c227.firebaseapp.com",
//               // alert("Verification link has been sent to your email");
//             })
//             .catch((error) => {
//               alert(error.message);
//             });
//         })
//         .catch((error) => {
//           Toast.show("error verification", error, {
//             duration: 3000,
//             position: 50,
//           });
//         });

//       // Toast.show("You not verification", error, {
//       //   duration: 3000,
//       //   position: 50,
//       // });

//       // setIsEmailVerified(true);
//       Toast.show(`Реєстрація успішна!`, {
//         duration: 3000,
//         position: 50,
//       });

//       console.log("user-authSignUpUser", user);

//       await updateProfile(authFirebase.currentUser, {
//         displayName: login,
//         userId: user.uid,
//         photoURL: avatar,
//       });

//       const { displayName, uid, photoURL } = await authFirebase.currentUser;

//       const userUpdateProfile = {
//         userName: displayName,
//         userId: uid,
//         userAvatar: photoURL,
//         userEmail: email,
//       };

//       dispatch(updateUserProfile(userUpdateProfile));

//       // const isEmailVerified = false;

//       // dispatch(authVerifyEmail(checkVerifyEmail));
//     } catch (error) {
//       console.log("error.message", error.message);
//     }
//   };

// createUserWithEmailAndPassword(authFirebase, email, password).then(
//   async ({ user }) => {
//     if (user.emailVerified === false) {
//       await sendEmailVerification(authFirebase.currentUser).then(
//         async () => {
//           await authSignOutUser();
//         }
//       );
//     }
//   }
// );
