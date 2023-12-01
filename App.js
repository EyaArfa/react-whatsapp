// import Authenticate from "./screens/authenticate";
import { NavigationContainer } from "@react-navigation/native";
import SignUp from "./screens/singup";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/home";
import Authenticate from "./screens/authenticate";
const stack = createNativeStackNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{ headerShown: false }}>
        <stack.Screen name="home" component={Home}></stack.Screen>
        <stack.Screen name="auth" component={Authenticate}></stack.Screen>
        <stack.Screen name="sign_up" component={SignUp}></stack.Screen>
      </stack.Navigator>
    </NavigationContainer>
  );
}
