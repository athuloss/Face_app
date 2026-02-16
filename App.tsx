import React from "react";
import Homescreenpage  from './src/screens/Homescreenpage';
import Camera_screen from "./src/screens/CameraScreen";
import {NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Home: undefined;
  camera: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
export default function App(){
return(
   <NavigationContainer>
    <Stack.Navigator>
        <Stack.Screen name="Home" component={Homescreenpage}/>
        <Stack.Screen name="camera" component={Camera_screen}/>
    </Stack.Navigator>
   </NavigationContainer>     
)
}