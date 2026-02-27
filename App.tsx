import React from "react";
import Homescreenpage  from './src/screens/Homescreenpage';
import Camera_screen from "./src/screens/CameraScreen";
import Signup from "./src/screens/Signup_page";
import Login from "./src/screens/Login_page";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  camera: undefined;
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App(){
return(
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreenpage} options={{headerShown:false}}/>
        <Stack.Screen name="camera" component={Camera_screen} options={{headerShown:false}}/>
        <Stack.Screen name="Signup" component={Signup} options={{headerShown:true}}/>
        <Stack.Screen name="Login" component={Login} options={{headerShown:true}}/>
    </Stack.Navigator>
   </NavigationContainer>     
)
}