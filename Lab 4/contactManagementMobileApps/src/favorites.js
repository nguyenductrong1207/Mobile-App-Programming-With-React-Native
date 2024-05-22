import 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import React from 'react';
import {View, FlatList } from 'react-native';
import ContactThumbnail from '../src/contactThum';
import styles from '../style/styles';

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
    const { contacts } = useSelector((state) => state);
    const renderFavoriteThumbnail = ({ item }) => {
        const { avatar } = item;
        return (
            <ContactThumbnail
                avatar={avatar}
                onPress={() => navigation.navigate('ProfileContact', { contact: item })}
            />
        );
    };
    const favorites = contacts.filter((contact) => contact.favorite);
    return (
        <View style={styles.favoritesContainer}>
            <FlatList
                data={favorites}
                keyExtractor={keyExtractor}
                numColumns={3}
                contentContainerStyle={styles.favoritesList}
                renderItem={renderFavoriteThumbnail}
            />
        </View>
    );
};

export default Favorites;