import {
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Styles from './style';

const LoginScreen = () => {
  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={Styles.container}>
        <Text style={Styles.title}>Login</Text>
        <TextInput placeholder="Phone" style={Styles.input} />
        <TextInput
          placeholder="Password"
          style={Styles.input}
          secureTextEntry
        />
        <TouchableOpacity style={{}}>
          <Text style={Styles.forgetPassword}>Forgot Password</Text>
        </TouchableOpacity>

        <TouchableOpacity style={Styles.button}>
          <Text style={Styles.buttontext}>Login</Text>
        </TouchableOpacity>

        <Text style={Styles.text}>Or connect by using</Text>

        <View>
          <TouchableOpacity style={Styles.fbButton}>
            <Text style={Styles.fbButtonText}>Facebook</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Styles.ggButton}>
            <Text style={Styles.ggButtonText}>Google</Text>
          </TouchableOpacity>
        </View>

        <Text style={Styles.text}>
          Don't have an account? <Text style={Styles.signUpText}>Sign Up</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
