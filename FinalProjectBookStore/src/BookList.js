import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image, Dimensions } from "react-native";
import { Card } from "react-native-paper";

const windowWidth = Dimensions.get('window').width;

const keyExtractor = ({ id }) => id;

const LoadData = ({ data, onPress }) => {
    return (
        <TouchableOpacity onPress={onPress} style={styles.cardContainer}>
            <Card style={styles.card}>
                <Card.Cover source={{ uri: data.cover_image }} style={styles.cardImage} />
                <Card.Content style={styles.cardContent}>
                    <Text style={styles.cardTitle} numberOfLines={2}>{data.title}</Text>
                    <Text style={styles.cardAuthor}>{data.author}</Text>
                    <Text style={styles.cardYear}>{data.publication_year}</Text>
                </Card.Content>
            </Card>
        </TouchableOpacity>
    );
}

const BookList = ({ navigation }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                const response = await axios.get(`https://freetestapi.com/api/v1/books`);
                setData(response.data);
            } catch (error) {
                console.error('Error:', error);
            }
        }
        loadData();
    }, [])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Book List</Text>
            <FlatList
                data={data}
                keyExtractor={keyExtractor}
                numColumns={2}
                renderItem={({ item }) => (
                    <LoadData
                        data={item}
                        onPress={() => {
                            navigation.navigate('Book Details', { id: item.id })
                        }}
                    />
                )}
                contentContainerStyle={styles.list}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f0f0',
        paddingVertical: 16,
        paddingHorizontal: 12,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 16,
    },
    list: {
        flexGrow: 1,
    },
    cardContainer: {
        flex: 1,
        margin: 6,
    },
    card: {
        flex: 1,
        borderRadius: 10,
        elevation: 4, 
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        backgroundColor: '#fff',
    },
    cardImage: {
        height: 150,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 12,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    cardAuthor: {
        fontSize: 14,
        color: '#666',
        marginBottom: 4,
    },
    cardYear: {
        fontSize: 12,
        color: '#999',
    },
});

export default BookList;
