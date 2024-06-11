import React from "react";
import axios from "axios";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const TransactionDetails = ({ route }) => {
    const { id } = route.params;
    const [data, setData] = useState('');
    const [customer, setCustomer] = useState('');
    const [services, setServices] = useState([]);

    console.log(route.params);

    useEffect(() => {
        axios.get(`https://kami-backend-5rs0.onrender.com/transactions/${id}`)
            .then(response => {
                setData(response.data);
                setCustomer(response.data.customer);
                setServices(response.data.services);
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }, [])

    return (
        <View style={styles.container}>

            <View style={styles.section}>
                <Text style={styles.title}>General information</Text>
                <View style={styles.row}>
                    <Text >Transaction code:</Text>
                    <Text style={styles.text}>{id}</Text>
                </View>
                <View style={styles.row}>
                    <Text >Customer:</Text>
                    <Text style={styles.text}>{customer.name}-{customer.phone}</Text>
                </View>
                <View style={styles.row}>
                    <Text >Creation time:</Text>
                    <Text style={styles.text}>{customer.createdAt}</Text>
                </View>
            </View>



            <View style={styles.section}>
                <Text style={styles.title}>Services list</Text>
                <FlatList data={services}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.row}>
                            <Text>{item.name}</Text>
                            <Text>x{item.quantity}</Text>
                            <Text style={styles.text}>{item.price}</Text>
                        </View>
                    )} />
                <View style={styles.row}>
                    <Text >Total:</Text>
                    <Text style={styles.text}>{data.priceBeforePromotion}</Text>
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.title}>Cost</Text>
                <View style={styles.row}>
                    <Text>Amount of money:</Text>
                    <Text style={styles.text}>{data.priceBeforePromotion}₫</Text>
                </View>

                <View style={styles.row}>
                    <Text >Discount:</Text>
                    <Text style={styles.text}>- {data.priceBeforePromotion - data.price}₫</Text>
                </View>

                <View style={styles.row}>
                    <Text >Total payment:</Text>
                    <Text style={styles.text}>{data.price}</Text>
                </View>
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#f0f0f0',
    },

    title: {
        color: '#CC313D',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    text: {
        color: 'black',
        fontWeight: 'bold'
    },

    section: {
        marginBottom: 20,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "white",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    }


})
export default TransactionDetails;