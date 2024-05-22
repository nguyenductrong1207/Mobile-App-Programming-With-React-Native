import {StyleSheet} from 'react-native';

export default productStyles = StyleSheet.create({
  // Screen 1
  fileContactContainer: {
    justifyContent: 'center',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
  },

  contactListItemContainer: {
    paddingLeft: 50,
    marginTop: 0,
  },

  contactInfo: {
    flex: 1,
    flexDirection: 'row',
    paddingTop: 24,
    paddingBottom: 24,
    borderBottomColor: 'grey',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  fileContactAvatar: {
    borderRadius: 50,
    width: 50,
    height: 50,
  },

  details: {
    justifyContent: 'center',
    flex: 1,
    marginLeft: 25,
  },

  title: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 16,
  },

  subTitle: {
    color: 'blue',
    fontSize: 14,
    marginTop: 4,
  },
  // end Screen 1

  // Screen 2
  profileContactContainer: {
    flex: 1,
  },

  avatarSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },

  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
  },

  // Contact Thum
  contactThumContainer: {
    paddingVertical: 30,
    marginHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactThumAvatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderColor: 'white',
    borderWidth: 2,
  },

  contactThumName: {
    fontSize: 20,
    marginTop: 24,
    marginBottom: 2,
    fontWeight: 'bold',
  },

  phoneSection: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactThumPhone: {
    marginLeft: 4,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Favorites
  favoritesContainer: {
    backgroundColor: 'while',
    justifyContent: 'center',
    flex: 1,
  },
  favoritesList: {
    alignItems: 'center',
  },
});
