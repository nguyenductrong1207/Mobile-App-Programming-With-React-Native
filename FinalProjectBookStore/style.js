import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7E4E4',
    paddingHorizontal: 40,
    paddingTop: 10,
  },
  header: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    borderColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 5,
    width: '100%',
    marginTop: 20,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#F09078',
    borderRadius: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 30,
  },
  disabledButton: {
    opacity: 0.6,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
  },
  bottomButton: {
    backgroundColor: '#FFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#F09078',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 20,
  },
  bottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F09078',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
    marginTop: 10,
  },
});
