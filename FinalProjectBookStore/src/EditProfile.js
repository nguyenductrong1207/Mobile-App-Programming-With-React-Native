import React, {useContext, useState} from 'react';
import {StyleSheet, View, TextInput} from 'react-native';
import {Button, Card} from 'react-native-paper';
import {ProfileContext} from './ProfileContext';

const EditProfile = ({navigation}) => {
  const {profile, setProfile} = useContext(ProfileContext);
  const [name, setName] = useState(profile.name);
  const [email, setEmail] = useState(profile.email);
  const [phone, setPhone] = useState(profile.phone);
  const [address, setAddress] = useState(profile.address);

  const handleSave = () => {
    setProfile({name, email, phone, address});
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Title title="Edit Profile" />
        <Card.Content>
          <TextInput
            placeholder="Name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            style={styles.input}
          />
          <TextInput
            placeholder="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
          />
        </Card.Content>
        <Card.Actions>
          <Button
            mode="contained"
            color="#FF6347"
            onPress={handleSave}
            style={styles.saveButton}>
            Save
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  card: {
    width: '90%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    fontSize: 16,
  },
  saveButton: {
    marginTop: 20,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default EditProfile;
