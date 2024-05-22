import React from 'react';
import {useEffect} from 'react';
import {fetchContactSuccess, mapContacts} from '../src/store';
import styles from '../style/styles';
import 'react-native-get-random-values';
import {FlatList, View} from 'react-native';
import {useDispatch, useSelector} from 'reac-redux';
import ContactListItem from '../src/contactListItem';

const keyExtractor = ({phone}) => phone;

const fetchContacts = async () => {
  const data = await fetch('https://randomuser.me/api/?results=50');
  const ContactData = await data.json();
  return ContactData.results.map(mapContacts);
};

const Contacts = ({navigation}) => {
  const {contacts} = useSelector(state => state);
  const dispatch = useDispatch();
  useEffect(() => {
    fetchContacts()
      .then(contacts => {
        dispatch(fetchContactSuccess(contacts));
      })
      .catch(e => {});
  }, []);

  // const contactSorted = contacts
  //   .slice()
  //   .sort((a, b) => a.name.LocaleCompare(b.name));
  const renderContacts = ({item}) => {
    const {name, avatar, phone} = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('ProfileContact', {contact: item})}
      />
    );
  };

  return (
    <View style={styles.fileContactContainer}>
      <FlatList
        data={contacts}
        keyExtractor={keyExtractor}
        renderItem={renderContacts}
      />
    </View>
  );
};

export default Contacts;
