import React from 'react';
import {View,Text,StyleSheet,Alert}from 'react-native'
import { Button } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import FaceDetection from '@react-native-ml-kit/face-detection';
import { useState } from 'react';



const HomePage=()=>{
const [image,setImage]=useState<string|null>(null)
const [facecount,setfaceCount]=useState<number>(0)
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
        Facedetect(imageuri);

        })
    }
    const Facedetect = async (image:string)=>{
        const count = await FaceDetection.detect(image);
       const facecount = count.length;
        setfaceCount(facecount);
        if (facecount === 0) {
            Alert.alert("No Face Detected");
        } 
        else if (facecount > 1) {
                Alert.alert("Multiple Faces Detected");
        }   
        else {
        Alert.alert("One Face Detected");
    }

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