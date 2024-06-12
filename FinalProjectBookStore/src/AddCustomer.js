import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";


const AddCustomer = ({ navigation, route }) => {
    const [customerName, setName] = useState('');
    const [customerPhone, setPhone] = useState('');
    const [token, setToken] = useState('');

    const handleAdd = async () => {
        const postData = {
            name: customerName,
            phone: customerPhone,
        }

        try {
            setToken(await AsyncStorage.getItem('userData'))
        } catch (error) {
            console.log(error)
        };
        
        axios.post(`https://kami-backend-5rs0.onrender.com/customers`, postData,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then(response => {
                console.log('Response:', response.data);
                navigation.goBack();

            })
            .catch(error => {
                console.log('Error:', error);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.viewInput}>
                <Text style={styles.text}>Customer name*</Text>
                <TextInput style={styles.textInput} placeholder="Input name" onChangeText={text => { setName(text) }}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Phone</Text>
                <TextInput style={styles.textInput} placeholder="0" onChangeText={text => setPhone(text)}></TextInput>
            </View>

            <Button style={styles.button} mode="contained" onPress={handleAdd}>
                ADD
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 25,
    },

    viewInput: {
        marginBottom: 15,
    },

    text: {
        color: 'black',
        marginBottom: 5,
        fontSize: 15,
    },

    textInput: {
        borderWidth: 1,
        borderColor: '#E3D4CF',
        borderRadius: 10,
        backgroundColor: '#f0f0f0',
        color: 'black'
    },

    button: {
        marginTop: 20,
        backgroundColor: '#EDB3A8',
    }
})
export default AddCustomer;