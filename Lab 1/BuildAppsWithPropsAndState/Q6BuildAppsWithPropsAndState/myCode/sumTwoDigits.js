import {useState} from 'react';
import {Text, View, StyleSheet, TextInput} from 'react-native';

export default function SumTwoDigits() {
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

  const [text, setText] = useState(0);
  const arr = String(text).split('');

  let sum = 0;
  if (text.length < 2) {
    sum = 'Uncorrect';
  } else {
    sum = parseInt(arr[0]) + parseInt(arr[arr.length - 1]);
  }

  //   handleChangeInput = text => {
  //     setText(text);
  //   };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        Please enter a number to have a sum of the first digit and the last
        digit of a number
      </Text>
      <View style={styles.block}>
        <TextInput
          style={styles.text}
          placeholder="Enter a number"
          keyboardType="numeric"
          onChangeText={text => {
            setText(text);
          }}></TextInput>
        <Text style={styles.text}>Your sum number is: {sum}</Text>
      </View>
    </View>
  );
}
