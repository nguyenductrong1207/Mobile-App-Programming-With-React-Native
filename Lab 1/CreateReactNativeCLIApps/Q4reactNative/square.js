import {Alert, Button, Text, View} from 'react-native';
import styles from './style';

function ClickOnTheSquare(value) {
  Alert.alert(value);
}

export default square = ({text}) => (
  <View style={[styles.box, {backgroundColor: '#7ce0f9'}]}>
    <Text>{text}</Text>
    <Button title="Click" onPress={() => ClickOnTheSquare(text)}></Button>
  </View>
);
