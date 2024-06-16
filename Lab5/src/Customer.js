import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableHighlight } from "react-native";
import { IconButton, Icon } from "react-native-paper";
const keyExtractor = ({ id }) => id;

const LoadData = ({ data, onPress }) => {
    return (
        <TouchableHighlight onPress={onPress} underlayColor="#f0f0f0">
            <View style={style.viewData}>
                <View style={{flex:4}}>
                    <Text style={style.serviceName}>Customer: {data.name}</Text>
                    <Text style={style.serviceName}>Phone: {data.phone}</Text>
                    <Text style={style.serviceName}>Total money: {data.totalSpent}đ</Text>
                </View>
                <View style={style.loyalty}>
                    <Icon
                        source="crown" color="#F09078"
                        size={30}
                    />
                    <Text style={style.loyaltyText}>{data.loyalty}</Text>
                </View>
            </View>
        </TouchableHighlight>
    )
}
const Customer = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                await axios.get(`https://kami-backend-5rs0.onrender.com/customers`)
                    .then(response => {
                        setData(response.data);
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
                <View>
                    <View style={style.serviceView}>
                        <Text style={style.title}>Customer List</Text>
                        <IconButton
                            icon="plus"
                            style={style.addButton} size={30}
                            onPress={() => navigation.navigate('AddCustomer')}
                        />
                    </View>

                    <FlatList data={data}
                        keyExtractor={keyExtractor}
                        renderItem={({ item }) => (
                            <LoadData
                                data={item}
                                onPress={() => {
                                    navigation.navigate('Customer Details', { id: item._id })
                                }}
                            />
                        )} />
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
        flexDirection:'row',
        // justifyContent: 'center',
        margin: 10,
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#F09078',
        width:'95%', 
        flex: 1,
        alignItems:'flex-start'
    },

    loyalty: {
        flex:1,
        alignItems: 'center',
        marginTop: 5
    },

    loyaltyText: {
        color: '#F09078',
        fontWeight: 'bold',
    },
})
export default Customer;