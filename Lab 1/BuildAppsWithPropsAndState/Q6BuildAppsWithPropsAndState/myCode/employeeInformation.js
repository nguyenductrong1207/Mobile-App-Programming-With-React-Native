import {Alert, Button, StyleSheet, Text, View} from 'react-native';

export default function EmployeeInformation(props) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'green',
      color: 'white',
    },

    block: {
      marginLeft: 50,
      marginBottom: 10,
      marginTop: 10,
    },

    text: {
      color: 'white',
      paddingBottom: 10,
    },

    title: {
      fontSize: 20,
      fontWeight: 'bold',
      textAlign: 'center',
      margin: 10,
      color: 'white',
      marginTop: 40,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.tilte}</Text>
      <View style={styles.block}>
        <Text style={styles.text}>Full Name: {props.name}</Text>
        <Text style={styles.text}>Age: {props.occupation}</Text>
        <Text style={styles.text}>Occupation: {props.training}</Text>
      </View>
      <Button
        title="Update"
        onPress={() => {
          alert('Update Successful');
        }}></Button>
    </View>
  );
}
