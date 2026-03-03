import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import { saveToken } from '../auth';
import * as Keychain from 'react-native-keychain';
type HomeScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>;
export default function Login() {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [name, setName] = React.useState('');
  const [password, setPassword] = React.useState('');



const handleLogin = async() => {
    if(!name || !password){
        Alert.alert('Error', 'Please fill in all fields');
        return;
    }
    const response = await fetch('http://192.168.1.3:3000/login',{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body:
            JSON.stringify({
                username:name, 
                password:password
            })    
    })
    const data =await response.json();
    Alert.alert(data.msg)
    if (data.msg === "Login successful") {
 await Keychain.setGenericPassword('user', name);    navigation.navigate("Home");
}
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome Back</Text>
      <TextInput
        placeholder="Username or Email"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.inputPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
        <Text onPress={()=>navigation.navigate('Signup')}>Don't have an account? Sign Up</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputPassword: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 25,
  },
  button: {
    backgroundColor: '#0066cc',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
