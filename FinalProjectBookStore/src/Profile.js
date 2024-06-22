import React, {useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, Text, Card, Avatar, IconButton} from 'react-native-paper';
import {ProfileContext} from './ProfileContext';

const Profile = ({navigation}) => {
  const {profile} = useContext(ProfileContext);

  return (
    <View style={styles.container}>
      <Card elevation={5} style={styles.card}>
        <Card.Title
          title={profile.name}
          titleStyle={styles.title}
          subtitleStyle={styles.subtitle}
          left={() => (
            <Avatar.Image
              size={50}
              style={styles.avatar}
              source={{uri: 'https://fakeimg.pl/667x1000/cc6600'}}
            />
          )}
          right={() => (
            <IconButton
              icon="pencil"
              size={24}
              color="#555"
              onPress={() => navigation.navigate('EditProfile')}
            />
          )}
        />
        <Card.Content>
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Phone" value={profile.phone} />
          <InfoRow label="Address" value={profile.address} />
        </Card.Content>
        <Card.Actions style={styles.actions}>
          <Button
            mode="contained"
            color="#FF6347"
            onPress={() => navigation.navigate('Login')}
            style={styles.logoutButton}
            icon="logout">
            Logout
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
};

const InfoRow = ({label, value}) => (
  <View style={styles.infoRow}>
    <Text style={styles.infoLabel}>{label}:</Text>
    <Text style={styles.infoText}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 20,
  },
  card: {
    width: '100%',
    borderRadius: 15,
    backgroundColor: '#ffffff',
    padding: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  avatar: {
    borderColor: '#FF6347',
    borderWidth: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    color: '#555',
    fontSize: 16,
  },
  infoText: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },
  actions: {
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  logoutButton: {
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});

export default Profile;
