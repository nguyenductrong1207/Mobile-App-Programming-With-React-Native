import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import styles from '../style'; 

const LoginScreen = ({navigation}) => {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); 
  const [error, setError] = useState(null); 

  const handleLogin = async () => {
    setLoading(true); 
    setError(null); 

    setPassword('123');
    setPhone('0373007856');

    const postData = {
      phone: phone,
      password: password,
    };

    try {
      const response = await axios.post(
        `https://kami-backend-5rs0.onrender.com/auth`,
        postData,
      );
      const token = response.data.token;
      await AsyncStorage.setItem('userData', token);
      navigation.navigate('TabNavigator', {token: token});
    } catch (error) {
      console.error('Error:', error);
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Text style={styles.header}>Welcome!</Text>
      <Text style={styles.text}>Sign in to continue</Text>

      <TextInput
        style={styles.input}
        placeholder="Phone number"
        value={phone}
        onChangeText={text => setPhone(text)}
        keyboardType="phone-pad"
        autoCapitalize="none"
        autoCompleteType="tel"
        textContentType="telephoneNumber"
        maxLength={10} 
        editable={!loading} 
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
        autoCapitalize="none"
        autoCompleteType="password"
        textContentType="password"
        editable={!loading} 
      />

      {error && <Text style={styles.errorText}>{error}</Text>}

      <TouchableOpacity
        style={[styles.button, loading && styles.disabledButton]} 
        onPress={handleLogin}
        disabled={loading} 
      >
        {loading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.buttonText}>Sign in</Text>
        )}
      </TouchableOpacity>

      <TouchableOpacity style={styles.bottomButton}>
        <Text style={styles.bottomText}>Forgot Password?</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
