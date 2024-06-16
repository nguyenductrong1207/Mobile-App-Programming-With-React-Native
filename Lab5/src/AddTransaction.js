import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { Button, IconButton } from "react-native-paper";

const LoadData = ({ data, setSelectedServices }) => {
    const [isFocus, setIsFocus] = useState(false);

    return (
        <View>
            <View>
                <Text style={styles.text}>Customer*</Text>
                <Dropdown style={[styles.dropdown, , isFocus && { borderColor: 'black' }]}
                    onFocus={() => setIsFocus(true)} data={data} labelField="name" valueField="_id" placeholder="Select Customer" onChange={item => {
                        setSelectedServices(item._id);
                    }} />
            </View>
        </View>
    )
}

const ServiceItem = ({ service, updateService }) => {
    const [isSelected, setSelected] = useState(service.defaultSelected || false);
    const [quantity, setQuantity] = useState(service.defaultQuantity || 1);
    
    const handleCheck = () => {
        const newSelectedState = !isSelected;
        setSelected(newSelectedState);
        updateService(service, newSelectedState, quantity);
    }

    const handleQuantityChange = (change) => {
        const newQuantity = quantity + change;
        if (newQuantity > 0) {
            setQuantity(newQuantity);
            if (isSelected) {
                updateService(service, isSelected, newQuantity);
            }
        }
    };

    return (
        <View style={styles.serviceItem}>
            <BouncyCheckbox
                isChecked={isSelected}
                onPress={handleCheck}
                fillColor="#EDB3A8"
            />
            <Text>{service.name}</Text>
            <View style={styles.quantityContainer}>
                <IconButton
                    icon="minus"
                    size={20}
                    onPress={() => handleQuantityChange(-1)}
                />
                <Text>{quantity}</Text>
                <IconButton
                    icon="plus"
                    size={20}
                    onPress={() => handleQuantityChange(1)}
                />
            </View>
            <Text>Price: {service.price} đ</Text>
            <Dropdown
                data={service.executors}
                labelField="name"
                valueField="_id"
                placeholder="Executor"
                style={styles.dropdown}
            />
        </View>
    )
}

const AddTransaction = () => {
    const [token, setToken] = useState('');
    const [customers, setCustomers] = useState([]);
    const [services, setServices] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [selectedService, setSelectedService] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            setToken(await AsyncStorage.getItem('userData'));
            
            try {
               await axios.get('https://kami-backend-5rs0.onrender.com/customers', {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(reponse => {
                    setCustomers(reponse.data);

                })

              await axios.get(`https://kami-backend-5rs0.onrender.com/services`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }).then(response => {
                    setServices(response.data)

                })
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [])

    const updateService = (service, checked, quantity) => {
        setSelectedService((preService) => {
            if (checked) {
                // Add service with quantity only if it's not already selected
                const existingService = preService.find(s => s._id === service._id);
                return existingService ? preService : [...preService, { ...service, quantity }];
            } else {
                // Filter out deselected service
                return preService.filter(s => s._id !== service._id);
            }
        })

    };

    const handleAdd = async () => {
        const postData = {
            customersId: selectedCustomer?._id,
            services: selectedService?.map(s => ({
                _id: s._id,
                quantity: s.quantity || 1,
                userId: s.userId,
            })),
        }

        await axios.post(`https://kami-backend-5rs0.onrender.com/transactions`, postData, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log('Response: ', response.data)
        }).catch(error => {
            console.log('Error: ', error)
        })
    }
    const calculateTotal = () => {
        return selectedService.reduce((total, service) => total + (service.price * service.quantity), 0);
    };

    return (
        <ScrollView style={styles.container}>
            <LoadData data={customers} setSelectedCustomer={setSelectedCustomer} />
            {services.map(service => (
                <ServiceItem key={service._id} service={service} updateService={updateService} />
            ))}
            <Button style={styles.button} mode="contained" onPress={handleAdd}>
                See summary: ({calculateTotal()} đ)
            </Button>
        </ScrollView>
    );
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
        fontWeight: 'bold',
        fontSize: 15,
    },
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        paddingHorizontal: 8,
    },

    checkboxContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    checkbox: {
        alignSelf: 'center',
    },
    serviceItem: {
        marginBottom: 15,
    },
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        margin: 8,
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
export default AddTransaction;