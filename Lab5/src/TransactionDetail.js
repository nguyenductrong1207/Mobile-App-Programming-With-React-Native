import React from "react";
import axios from "axios";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect, useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { IconButton } from "react-native-paper";

const TransactionDetails = ({ navigation, route }) => {
    const { id } = route.params;
    const [data, setData] = useState('');
    const [customer, setCustomer] = useState('');
    const [services, setServices] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState('')

    useEffect(async () => {
        setToken(await AsyncStorage.getItem('userData'));

        await axios.get(`https://kami-backend-5rs0.onrender.com/transactions/${id}`, {
        }).then(response => {
            setData(response.data);
            setCustomer(response.data.customer);
            setServices(response.data.services);
        }).catch(error => {
            console.error('Error fetching data:', error);
            Alert.alert('Error', 'Failed to fetch transaction data.');
        })

    }, []);

    const deleteFile = async () => {
        setIsDeleting(true);
        const updatedData = {status: "cancelled"}
        
        await axios.put(`https://kami-backend-5rs0.onrender.com/transactions/${id}`,updatedData, {
            headers: { Authorization: `Bearer ${token}` }
        }).then(response => {
            console.log('DELETE Response:', response.data.status);
            Alert.alert("Success", "Service cancelled successfully!");
            navigation.goBack();
        }).catch(error => {
            console.error('Error deleting data:', error);
            Alert.alert("Error", "Failed to cancel service.");
        })
        setIsDeleting(false);
        setShowModal(false);

    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Menu>
                    <MenuTrigger>
                        <IconButton icon="dots-vertical" />
                    </MenuTrigger>
                    <MenuOptions>

                        <MenuOption onSelect={() => console.log("Detail")} text="See more detail">
                        </MenuOption>

                        <MenuOption onSelect={() => setShowModal(true)} text="Cancel transaction">
                        </MenuOption>

                    </MenuOptions>
                </Menu>
            ),
        });
    }, [navigation]);


    return (
        <View style={styles.container}>

            <View style={styles.section}>
                <Text style={styles.title}>General information</Text>
                <View style={styles.row}>
                    <Text >Transaction code:</Text>
                    <Text style={styles.text}>{data.id}</Text>
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

            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.warningText}>Warning</Text>
                        <Text>Are you sure you want to cancel this transaction? This will affect the customer transaction information.</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.deleteButton} onPress={deleteFile} disabled={isDeleting}>
                                <Text style={styles.buttonText}>YES</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setShowModal(false)}>
                                <Text style={styles.buttonText}>CANCEL</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
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
    },
    // Menu Options
    menuOptions: {
        optionsContainer: {
            borderRadius: 8,
            padding: 5,
            backgroundColor: "#FFFFFF",
            elevation: 5, // Shadow for Android
        },
    },
    menuOptionText: {
        color: "red", // Delete option text color
    },

    // Modal Container
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
    },
    modalContent: {
        backgroundColor: "white",
        padding: 25,
        borderRadius: 10,
        elevation: 5, // Shadow for Android
        width: "80%",
    },

    // Warning Text
    warningText: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 10,
    },

    // Button Container
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: 20,
    },
    deleteButton: {
        backgroundColor: "red",
        padding: 10,
        borderRadius: 5,
    },
    cancelButton: {
        backgroundColor: "gray",
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: "white",
        fontWeight: "bold",
    },


})
export default TransactionDetails;