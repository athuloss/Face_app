import React from 'react';
import { View,Text,StyleSheet,TouchableOpacity  } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';


type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Home'
>;
export default function Homescreenpage(){
const navigation = useNavigation<HomeScreenNavigationProp>();

    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.menuicon}>
                    <Ionicons name='menu' size={25} color='black'/>
                </View>
                <View>
                    <Text style={styles.faceapptext}>FaceApp</Text>
                </View>
                <View style={styles.menuicon}>
                    <Ionicons name='notifications-outline' size={20} color='black'/>
                </View>
            </View>
            <View style={styles.floating_label}>
                <Text style={styles.floating_text}>Ready to Capture</Text>
            </View>
            <View style={styles.mainheading}> 
                <Text style={styles.capture_text}>Capture the{"\n"}<Text style={styles.capture_text_sub}>Movement</Text></Text>
                <Text style={styles.capture_subheading}>Simple fast, and beautiful captures{"\n"}<Text>for your daily inspiration</Text></Text>
            </View>

           <TouchableOpacity onPress={() => navigation.navigate('camera')}>
  <View style={styles.wrapper}>
    <View style={styles.camera_section}>
      <Ionicons name="camera" size={28} color="black" />
    </View>
    <Text style={styles.taptext}>Tap to Start</Text>
  </View>
</TouchableOpacity>

        </SafeAreaView>
    )
}
const styles = StyleSheet.create({

    container:{
        flex:1,
        padding:10,
        gap:50,
    },
    header:{
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    menuicon:{
        borderRadius:100,
        backgroundColor:'#FAF9F6',
        alignItems:'center',
        justifyContent:'center',
        height:40,
        width:40
    },
    faceapptext:{
       
        fontSize:18,
        fontWeight:'500',
        color:'black'
    },
    floating_text:{
        color:'black',
        fontSize:12,
        fontWeight:'500',
        padding:10,
        backgroundColor:'#FAF9F6',
        borderRadius:20,
        alignItems:'center',
        justifyContent:'center'
    },
    floating_label:{
        alignItems:'center',
        justifyContent:'center',
       
    },
    mainheading:{
        alignItems:'center',
        justifyContent:'center',
        gap:10
    },
    capture_text:{
        textAlign:'center',
        fontSize:25,
        fontWeight:'400',
        color:'black'
    },
    capture_text_sub:{
        fontSize:25,
        fontWeight:'700',
        color:'black',
        textAlign:'center'
    },
    capture_subheading:{
        textAlign:'center',
        fontSize:15,
        fontWeight:'400',
        color:'#767676'
    },
    camera_section:{
        borderWidth:2,
        borderColor:'#767676',
        borderRadius:100,
        height:100,
        width:100,
        backgroundColor:'white',
        shadowColor:'#3b82f6',
        shadowOpacity:0.5,
        shadowRadius:20,
        shadowOffset:{ width:0, height:0 },
        elevation:12,
        alignItems:'center',
        justifyContent:'center',
    },
    wrapper:{
        alignItems:'center',
        justifyContent:'center',
        gap:10
    },
    taptext:{
        fontSize:12,
        fontWeight:'500',
        color:'grey',
        textAlign:'center'
    }
})