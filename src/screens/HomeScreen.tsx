import React from 'react';
import {View,Text,StyleSheet}from 'react-native'
import { Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import FaceDetection from '@react-native-ml-kit/face-detection';
import { useState } from 'react';



const HomePage=()=>{
const [image,setImage]=useState<string|null>(null)
const [count,setCount]=useState<number>(0)
    const start_camera =()=>{
       launchCamera({
        'mediaType':'photo',
        cameraType:'front',
       },
     async (response)=>{
        if(response.didCancel || !response.assets){
            return;
        }
        const imageuri = response.assets[0].uri!;
        setImage(imageuri)

        })
    }
    return(
        <View style={styles.container}>
            <Text style ={styles.textstyle}>Hai Athul welcome home</Text>
            <Button title='Open camera' onPress={start_camera}/>
        </View>
       
        

    
    )
}
export default HomePage;

const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'white',
    }
    ,textstyle:{
        fontSize:20,
        fontWeight :'600',
        color:'black',
        
    }
})