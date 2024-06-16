import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import style from '../style';
import { useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
    const [phone, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        setPassword('123');
        setUsername('0373007856')

        const postData = {
            phone: phone,
            password: password,
        };

        fetchData(postData)

        console.log(postData);
    }

    const fetchData = async (postData) =>{
        await axios.post(`https://kami-backend-5rs0.onrender.com/auth`, postData)
            .then(async response => {
                const token = response.data.token;
                    try {
                        await AsyncStorage.setItem(
                            'userData', response.data.token 
                        )
                    } catch (error) {
                        console.log(error);
                    }

                    try {
                        console.log(await AsyncStorage.getItem('userData'))
                    } catch (error) {
                        
                    }

                navigation.navigate('TabNavigator', {token: token});
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }

    return (
            <View style={[style.container, {height:'100%'}]}>
                <Text style={style.header}>Welcome!</Text>
                <Text style={{ paddingTop: 10, fontSize: 25, color: 'black' }}>Sign in to continue</Text>
                {/* <TextInput style={style.input} placeholder='Phone number' onChangeText={text => { setUsername(text) }} />
                <TextInput style={style.input} placeholder='Password' secureTextEntry onChangeText={text => { setPassword(text) }} /> */}
                <TouchableOpacity style={style.button} onPress={() => handleLogin()}>
                    <Text style={style.buttonText}>Sign in</Text>
                </TouchableOpacity>
            </View>
    );
};

export default LoginScreen;