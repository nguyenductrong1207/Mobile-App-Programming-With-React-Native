import React from 'react';
import {Image, Text, TouchableHighlight, View} from 'react-native';
import styles from '../style/styles';

const ContactListItem = ({name, avatar, phone, onPress}) => {
  return (
    <TouchableHighlight
      underlayColor="grey"
      style={styles.contactListItemContainer}
      onPress={onPress}>
      <View style={styles.contactInfo}>
        <Image source={{uri: avatar}} style={styles.fileContactAvatar} />

        <View style={styles.details}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.subTitle}>{phone}</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
};

export default ContactListItem;
