import {DefaultTheme} from '@react-navigation/native';
import {StyleSheet} from 'react-native';

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0148A4',
    textColor: '#2A2C2D',
  },
};

export default styles = StyleSheet.create({
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
