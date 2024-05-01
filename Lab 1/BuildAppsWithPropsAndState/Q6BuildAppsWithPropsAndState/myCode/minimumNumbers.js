import {useState} from 'react';
import {Text, TextInput, View, StyleSheet} from 'react-native';

export default function MinimumNumbers() {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      backgroundColor: 'green',
      color: 'white',
    },

    block: {
      marginLeft: 30,
      marginBottom: 10,
      marginTop: 10,
      marginRight: 30,
    },

    text: {
      backgroundColor: 'white',
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 10,
      marginBottom: 30,
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

  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(0);
  const [third, setThird] = useState(0);

  const minimum = Math.min(first, second, third);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        PLease enter your number in all 3 text field
      </Text>
      <View style={styles.block}>
        <TextInput
          style={styles.text}
          placeholder="Your first number"
          keyboardType="numeric"
          onChangeText={first => {
            setFirst(first);
          }}></TextInput>

        <TextInput
          style={styles.text}
          placeholder="Your second number"
          keyboardType="numeric"
          onChangeText={second => {
            setSecond(second);
          }}></TextInput>

        <TextInput
          style={styles.text}
          placeholder="Your third number"
          keyboardType="numeric"
          onChangeText={third => {
            setThird(third);
          }}></TextInput>

        <Text style={styles.text}>
          The minimum between three numbers is: {minimum}
        </Text>
      </View>
    </View>
  );
}
