import React, { useEffect} from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Provider } from "react-redux";
import { store } from "./Redux/store";

import Main from "./Components/Main";

export default function App() {
  const [appIsReady] = useFonts({
    "Roboto-Bold": require("./assets/fonts/Roboto/Roboto-Bold.ttf"),
    "Roboto-Medium": require("./assets/fonts/Roboto/Roboto-Medium.ttf"),
    "Roboto-Regular": require("./assets/fonts/Roboto/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  if (!appIsReady) {
    return null;
  } else {
    SplashScreen.hideAsync();
  }

  return (
    <Provider store={store}>
      <Main />
    </Provider>
  );
}
