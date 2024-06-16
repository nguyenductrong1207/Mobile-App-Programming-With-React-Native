import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";


const UpdateCustomer = ({ navigation, route }) => {
    const { customerData } = route.params;
    const {id} = customerData;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [token, setToken] = useState('');

    useEffect(() => {
        setName(customerData?.name || '');
        setPhone(customerData?.phone || '');

        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userData');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };

        fetchToken();
    }, []);

    const handleUpdate = async () => {

        try {
            setToken(await AsyncStorage.getItem('userData'))
            const updateData = {
                name: name,
                phone: phone,
            }

            axios.put(`https://kami-backend-5rs0.onrender.com/Customers/${id}`, updateData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log('Response:', response.data);
                    navigation.goBack();

                })
        } catch (error) {
            console.log(error)
        };


    }

    return (
        <View style={styles.container}>
            <View style={styles.viewInput}>
                <Text style={styles.text}>Customer name*</Text>
                <TextInput style={styles.textInput} value={name} onChangeText={text => setName(text)}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Phone</Text>
                <TextInput style={styles.textInput} value={phone} onChangeText={text => setPhone(text)}></TextInput>
            </View>

            <Button style={styles.button} mode="contained" onPress={() => handleUpdate()}>
                Update
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
export default UpdateCustomer;