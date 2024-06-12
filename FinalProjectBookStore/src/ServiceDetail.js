import React from "react";
import axios from "axios";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { useLayoutEffect } from "react";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ServiceDetails = ({ navigation, route }) => {
    const { id } = route.params;
    const [data, setData] = useState('');
    const [name, setName] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        axios.get(`https://kami-backend-5rs0.onrender.com/services/${id}`)
            .then(response => {
                setData(response.data);
                setName(response.data.user.name)
            })
            .catch(error => {
                console.error('Error:', error);
            })
    }, [])

    const navigateToUpdateService = async () => {
        console.log(data);
        try {
            navigation.navigate('EditService', {
                serviceData: {
                    id : id,
                    name: data.name,
                    price: data.price
                }
            });
          } catch (error) {
            console.error('Error fetching token:', error);
          }
    };
    
    const deleteFile = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`https://kami-backend-5rs0.onrender.com/services/${id}`);
            console.log('DELETE Response:', response.data);
            Alert.alert("Success", "Service deleted successfully!");
            navigation.goBack();
        } catch (error) {
            console.error('Error deleting data:', error);
            Alert.alert("Error", "Failed to delete service.");
        } finally {
            setIsDeleting(false);
            setShowModal(false);
        }
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
                <Menu>
                    <MenuTrigger>
                        <IconButton icon="dots-vertical" />
                    </MenuTrigger>
                    <MenuOptions>
                        <MenuOption onSelect={() => setShowModal(true)} text="Delete">
                            {/* <Text style={{ color: "red" }}>Delete</Text> */}
                        </MenuOption>

                        <MenuOption onSelect={() => navigateToUpdateService()} text="Edit">
                            {/* <Text>Edit</Text> */}
                        </MenuOption>
                    </MenuOptions>
                </Menu>
            ),
        });
    }, [navigation, id]);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Service name: {data.name}</Text>
            <Text style={styles.text}>Price: {data.price}</Text>
            <Text style={styles.text}>Creator: {name}</Text>
            <Text style={styles.text}>Time: {data.createdAt}</Text>
            <Text style={styles.text}>Final update: {data.updatedAt}</Text>


            <Modal
                animationType="fade"
                transparent={true}
                visible={showModal}
                onRequestClose={() => setShowModal(false)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.warningText}>Warning</Text>
                        <Text>Are you sure you want to remove this service? This operation cannot be returned.</Text>

                        <View style={styles.buttonContainer}>
                            <TouchableOpacity style={styles.deleteButton} onPress={deleteFile} disabled={isDeleting}>
                                <Text style={styles.buttonText}>DELETE</Text>
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
        backgroundColor: '#FFD5C3',
    },

    text: {
        color: 'black',
        fontSize: 17,
    },

    ellipsisButton: {
        padding: 10,
        borderRadius: 5,
    },
    ellipsisText: {
        fontSize: 20,
        fontWeight: "bold",
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
export default ServiceDetails;