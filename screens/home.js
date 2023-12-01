import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import ListProfile from "./homeScreen/listProfile";
import Group from "./homeScreen/group";
import Account from "./homeScreen/account";
const tab = createMaterialBottomTabNavigator();
export default function Home() {
  return (
    <tab.Navigator>
      <tab.Screen name="account" component={Account}></tab.Screen>
      <tab.Screen name="listProfile" component={ListProfile}></tab.Screen>
      <tab.Screen name="group" component={Group}></tab.Screen>
    </tab.Navigator>
  );
}
