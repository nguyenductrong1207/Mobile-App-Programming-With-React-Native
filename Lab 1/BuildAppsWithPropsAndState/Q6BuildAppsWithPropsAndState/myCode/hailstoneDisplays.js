import {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

export default function HailstoneDisplays() {
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

  let [text, setText] = useState(0);
  let str = '';
  let number = parseInt(text);

  while (number !== 0 && number !== 1) {
    if (number % 2 === 0) {
      number /= 2;
      str += number + ' ';
    } else {
      number = number * 3 + 1;
      str += number + ' ';
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please enter a positive number to displays the Hailstone sequence
      </Text>
      <View style={styles.block}>
        <TextInput
          style={styles.text}
          placeholder="Enter a number"
          keyboardType="numeric"
          onChangeText={text => {
            setText(text);
          }}></TextInput>
        <Text style={styles.text}>Hailstone sequence: {str}</Text>
      </View>
    </View>
  );
}
