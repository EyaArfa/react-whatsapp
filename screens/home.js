import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ListProfile from "./homeScreen/listProfile";
import Group from "./homeScreen/group";
import Account from "./homeScreen/account";
import Chat from "./homeScreen/Chat";
const tab = createMaterialBottomTabNavigator();
export default function Home(props) {
  const current = props.route.params.id;

  return (
    <tab.Navigator>
      <tab.Screen
        options={{
          tabBarIcon: "account",
        }}
        name="account"
        initialParams={{ current }}
        component={Account}
      ></tab.Screen>
      <tab.Screen
        options={{
          tabBarIcon: "account-multiple",
        }}
        name="listProfile"
        initialParams={{ current }}
        component={ListProfile}
      ></tab.Screen>
      <tab.Screen
        name="group"
        options={{
          tabBarIcon: "account-group",
        }}
        component={Group}
      ></tab.Screen>
    </tab.Navigator>
  );
}
