import React from "react";
import axios from "axios";
import { View, Text, StyleSheet, Modal, TouchableOpacity, Alert } from "react-native";
import { useState, useEffect } from "react";
import { IconButton } from "react-native-paper";
import { useLayoutEffect } from "react";
import { FlatList } from "react-native";
import { Menu, MenuTrigger, MenuOption, MenuOptions } from "react-native-popup-menu";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CustomerDetails = ({ navigation, route }) => {
    const { id } = route.params;
    const [data, setData] = useState('');
    const [transaction, setTransaction] = useState([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
              const response = await axios.get(`https://kami-backend-5rs0.onrender.com/Customers/${id}`);
              setData(response.data);
              setTransaction(response.data.transactions);
            } catch (error) {
              console.error('Error fetching data:', error);
            } finally {
              setIsDeleting(false);
            }
          };

        const fetchToken = async () => {
            try {
                const storedToken = await AsyncStorage.getItem('userData');
                setToken(storedToken);
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        };
        
        fetchData();
        fetchToken();
    }, []);


    const navigateToUpdateService = async () => {
        try {
            navigation.navigate('Edit Customer', {
                customerData: {
                    id: id, 
                    name: data.name,
                    phone: data.phone,
                  }
            });
        } catch (error) {
            console.error('Error fetching token:', error);
        }
    };

    const deleteFile = async () => {
        setIsDeleting(true);
        try {
            const response = await axios.delete(`https://kami-backend-5rs0.onrender.com/Customers/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
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

                        <MenuOption onSelect={() => navigateToUpdateService()} text="Edit">
                        </MenuOption>

                        <MenuOption onSelect={() => setShowModal(true)} text="Delete">
                        </MenuOption>

                    </MenuOptions>
                </Menu>
            ),
        });
    }, [navigation, id]);

    return (
        <View style={styles.container}>
            <View style={styles.subView}>
                <Text style={styles.title}>General Information</Text>

                <View style={styles.row}>
                    <Text style={styles.label}>Customer name: </Text>
                    <Text style={styles.text}>{data.name}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Phone: </Text>
                    <Text style={styles.text}>{data.phone}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Total spent: </Text>
                    <Text style={[styles.text, { color: '#CC313D', fontWeight: 'bold' }]}>{data.totalSpent}đ</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Time: </Text>
                    <Text>{data.createdAt}</Text>
                </View>

                <View style={styles.row}>
                    <Text style={styles.label}>Last update: </Text>
                    <Text>{data.updatedAt}</Text>
                </View>
            </View>

            <View style={styles.subView} >
                <Text style={styles.title}>Transaction History</Text>
                <View >
                    <FlatList data={transaction}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <View style={styles.viewFlatlist}>
                                <Text style={{ fontWeight: 'bold', color: 'black' }}>{item.id} - {item.createdAt}</Text>
                                <FlatList
                                    data={item.services}
                                    keyExtractor={(item) => item._id}
                                    renderItem={({ item }) => {
                                        const serviceName = item.name;
                                        return (
                                            <View>
                                                <Text>- {serviceName}</Text>
                                            </View>
                                        )
                                    }}
                                />
                            </View>
                        )}>
                    </FlatList>
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
        backgroundColor: '#f0f0f0',
    },

    label: {
        color: 'black',
        fontSize: 17,
        fontWeight: 'bold',
    },
    text: {
        color: 'black',
        fontSize: 17,
    },
    subView: {
        margin: 5,
        padding: 5,
        backgroundColor: 'white',
        borderRadius: 10,
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },

    title: {
        color: '#CC313D',
        fontSize: 17,
        fontWeight: 'bold',
        marginBottom: 10,
    },

    viewFlatlist: {
        margin: 5,
        padding: 5,
        borderRadius: 10,
        borderColor: 'grey',
        borderWidth: 1,
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
export default CustomerDetails;