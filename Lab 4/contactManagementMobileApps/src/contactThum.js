import styles from '../style/styles';
import 'react-native-gesture-handler';
import React from 'react';
import {Icon} from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';
import {Touchable, TouchableOpacity, View} from 'react-native';

const ContactThum = ({name, phone, avatar, textColor, onPress}) => {
  const colorStyle = {
    color: textColor,
  };

  const ImageContact = onPress ? TouchableOpacity : View;

  return (
    <View style={styles.contactThumContainer}>
      <ImageContact onPress={onPress}>
        <Image
          source={{
            uri: avatar,
          }}
          style={styles.contactThumAvatar}
        />
      </ImageContact>

      {name !== '' && (
        <Text style={[styles.contactThumName, colorStyle]}>{name}</Text>
      )}

      {phone !== '' && (
        <View style={styles.phoneSection}>
          <Icon name="phone" size={16} style={{color: textColor}} />
          <Text style={[styles.contactThumPhone, colorStyle]}>{phone}</Text>
        </View>
      )}
    </View>
  );
};

export default ContactThum;

ContactThum.PropTypes = {
  name: PropTypes.string,
  avatar: PropTypes.string,
  phone: PropTypes.string,
  onPress: PropTypes.func,
};
ContactThum.defaultProps = {
  name: '',
  avatar: '',
  phone: 'white',
  onPress: null,
};
