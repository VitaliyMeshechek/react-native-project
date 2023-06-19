import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DefaultScreenPosts from "../NestedScreen/DefaultScreenPosts";
import MapScreen from "../NestedScreen/MapScreen";
import CommentsScreen from "../NestedScreen/CommentsScreen";

const NestedNavigator = createNativeStackNavigator();

const PostsScreen = () => {
  return (
    <NestedNavigator.Navigator>
      <NestedNavigator.Screen
        name="DefaultScreen"
        component={DefaultScreenPosts}
        options={{ headerShown: false }}
      />
      <NestedNavigator.Screen
        name="Map"
        component={MapScreen}
        options={{
          title: "Карта",
          headerTitleAlign: "center",
        }}
      />
      <NestedNavigator.Screen
        name="Comments"
        component={CommentsScreen}
        options={{
          title: "Коментарі",
          headerTitleAlign: "center",
        }}
      />
    </NestedNavigator.Navigator>
  );
};

export default PostsScreen;
