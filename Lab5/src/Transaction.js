import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from "react-native";
import { IconButton } from "react-native-paper";
const keyExtractor = ({ id }) => id;

const LoadData = ({ data, onPress }) => {
    let services = data.services;

    return (
        <TouchableHighlight onPress={onPress} underlayColor="#f0f0f0">
            <View style={style.viewData}>
                <View style={{ flex: 4 }}>
                    <Text style={style.serviceName}>{data.id}</Text>
                    <FlatList data={services}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => (
                            <Text>{item.name}</Text>
                        )} />
                    <Text style={style.serviceName}>{data.customer.name}</Text>
                    <Text style={style.serviceName}>{data.status}</Text>
                </View>
                <Text style={style.loyaltyText}>{data.price}đ</Text>
            </View>
        </TouchableHighlight>
    )
}
const Transaction = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [idService, setIdService] = useState('');

    useEffect(() => {
        const loadData = async () => {
            try {
                await axios.get(`https://kami-backend-5rs0.onrender.com/transactions`)
                    .then(response => {
                        setData(response.data);
                        setIdService(response.data.id);
                        console.log(data);

                    })
            } catch (error) {
                console.error('Error:', error);
            }

        }

        loadData();
    }, [])


    return (
        <View style={style.container} >

            <View style={style.viewContent}>
                <View style={style.serviceView}>
                    <Text style={[style.title, { fontWeight: 'bold' }]}>Transaction List</Text>
                    <IconButton
                        icon="plus"
                        style={style.addButton} size={30}
                        onPress={() => navigation.navigate('Add Transaction')}
                    />
                </View>
                <View>
                    <FlatList data={data}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => {
                            return (
                                <View>
                                    {item.status !== 'cancelled' &&
                                        <LoadData
                                            data={item}
                                            onPress={() => {
                                                navigation.navigate('Transaction Details', { id: item._id })
                                            }}
                                        />
                                        }
                                </View>
                            )
                        }} />
                </View>
            </View>



        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column-reverse',
        backgroundColor: '#FFD5C3'
    },

    viewContent: {
        height: '85%',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        backgroundColor: 'white',
    },
    serviceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        marginRight: 5,
    },
    title: {
        fontSize: 20,
        color: 'black',
        marginTop: 5,
    },

    addButton: {
        marginTop: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#FFD5C3'
    },
    serviceView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 15,
        marginRight: 5,
    },
    serviceName: {
        fontSize: 17,
        color: 'black',
        fontWeight: 'bold',
    },

    servicePrice: {
        fontSize: 17,
        color: 'black',
    },

    viewData: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F09078',
        width: '95%',
        flex: 1,
        alignItems: 'center'
    },

    loyalty: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'flex-end',
        marginTop: 5
    },

    loyaltyText: {
        color: '#F09078',
        fontWeight: 'bold',
        fontSize: 18,
    },
})
export default Transaction;