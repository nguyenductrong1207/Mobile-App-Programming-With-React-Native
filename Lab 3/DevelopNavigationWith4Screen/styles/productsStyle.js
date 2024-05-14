import {StyleSheet} from 'react-native';

export default productStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    height: 300,
    marginTop: 30,
  },

  heading: {
    marginTop: 20,
    justifyContent: 'center',
  },

  imgageBlock: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },

  imgage: {
    height: 90,
    width: 90,
  },

  contentBlock: {
    flex: 2,
  },

  title: {
    marginBottom: 3,
  },

  contentItem: {
    marginBottom: 10,
  },

  contentItemDiscount: {
    marginBottom: 10,
    color: '#228B22',
  },

  buttonBlock: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
});
