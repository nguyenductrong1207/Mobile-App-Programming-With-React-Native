import {View} from 'react-native';
import styles from '../style/styles';

const ProfileContact = ({route}) => {
  const {contact} = route.params;
  const {id, avatar, name, email, phone, cell, favorite} = contact;

  return (
    <View style={styles.profileContactContainer}>
      <View style={styles.avatarSection}>
        <ContactThum avatar={avatar} name={name} phone={phone} />
      </View>
      <View style={styles.detailsSection}>
        <ContactListItem icon="mail" title="Email" subtitle={email} />
        <ContactListItem icon="phone" title="Work" subtitle={phone} />
        <ContactListItem icon="smartphone" title="Personal" subtitle={cell} />
        <View style={{alignItems: 'center'}}>
          <IconButton
            icon={favorite == true ? 'star-check' : 'star-check-outline'}
            iconColor="#663399"
            size={20}
            onPress={() => {}}
          />
        </View>
      </View>
    </View>
  );
};
export default ProfileContact;
