import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import style from '../style';
import {useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DefaultTheme} from 'react-native-paper';

const LoginScreen = ({navigation}) => {
  const [phone, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    setPassword('123');
    setUsername('0373007856');

    const postData = {
      phone: phone,
      password: password,
    };

    fetchData(postData);
    console.log(postData);
  };

  const fetchData = async postData => {
    await axios
      .post(`https://kami-backend-5rs0.onrender.com/auth`, postData)
      .then(async response => {
        const token = response.data.token;
        try {
          await AsyncStorage.setItem('userData', response.data.token);
        } catch (error) {
          console.log(error);
        }

        try {
          console.log(await AsyncStorage.getItem('userData'));
        } catch (error) {}

        navigation.navigate('TabNavigator', {token: token});
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={text => {
          setUsername(text);
        }}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={text => {
          setPassword(text);
        }}
      />

      <TouchableOpacity style={{}}>
        <Text style={styles.forgetPassword}>Forgot Password</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => handleLogin()}>
        <Text style={styles.buttontext}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.text}>Or connect by using</Text>

      <View>
        <TouchableOpacity style={styles.fbButton}>
          <Text style={styles.fbButtonText}>Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.ggButton}>
          <Text style={styles.ggButtonText}>Google</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.text}>
        Don't have an account? <Text style={styles.signUpText}>Sign Up</Text>
      </Text>
    </View>
  );
};

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0148A4',
    textColor: '#2A2C2D',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 48,
  },

  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: AppTheme.colors.primary,
    marginBottom: 24,
    marginTop: 72,
  },

  input: {
    borderColor: AppTheme.colors.border,
    borderWidth: 1,
    width: '100%',
    marginTop: 12,
    borderRadius: 30,
    paddingLeft: 12,
    active: '#3C91FE',
  },

  button: {
    backgroundColor: AppTheme.colors.primary,
    borderRadius: 30,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    marginTop: 16,
  },

  buttontext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
  },

  forgetPassword: {
    paddingTop: 10,
    color: AppTheme.colors.textColor,
  },

  text: {
    paddingTop: 40,
    color: AppTheme.colors.textColor,
  },

  fbButton: {
    backgroundColor: '#385C8E',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
    marginTop: 16,
  },

  fbButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    width: 100,
  },

  ggButton: {
    backgroundColor: '#F14436',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 12,
    marginTop: 16,
  },

  ggButtonText: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFF',
    width: 100,
  },

  signUpText: {
    color: '#024EC6',
  },
});

export default LoginScreen;
