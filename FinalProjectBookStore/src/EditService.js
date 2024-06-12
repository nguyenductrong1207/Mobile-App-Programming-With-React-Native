import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import { Button } from "react-native-paper";


const UpdateService = ({ navigation, route }) => {
    const [serviceName, setName] = useState('');
    const [servicePrice, setPrice] = useState('');
    const [token, setToken] = useState('');
    const { serviceData } = route.params;
    const { id } = serviceData;

    console.log(serviceData);

    useEffect(() => {
        setName(serviceData?.name || '');
        setPrice(serviceData?.price?.toString() || '');

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
                name: serviceName,
                price: servicePrice,
            }

            axios.put(`https://kami-backend-5rs0.onrender.com/services/${id}`, updateData,
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
                <Text style={styles.text}>Service name*</Text>
                <TextInput style={styles.textInput} value={serviceName} onChangeText={text => setName(text)}></TextInput>
            </View>
            <View>
                <Text style={styles.text}>Price</Text>
                <TextInput style={styles.textInput} value={servicePrice} onChangeText={text => setPrice(text)}></TextInput>
            </View>

            <Button style={styles.button} mode="contained" onPress={() => handleUpdate()}>
                Submit
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
export default UpdateService;