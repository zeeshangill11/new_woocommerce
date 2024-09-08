import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// custom imports
import {styles} from '../../themes';
import {
  HeartDark,
  HeartLight,
  NotificationDark,
  NotificationLight,
} from '../../assets/svgs';
import CText from '../common/CText';
import {moderateScale} from '../../common/constants';
import {StackNav} from '../../navigation/NavigationKeys';
import {TabRoute} from '../../navigation/NavigationRoutes';
import {getAsyncStorageData} from '../../utils/helpers';
function HomeHeader() {
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressNotification = () => navigation.navigate(StackNav.Notification);
  const onPressLike = () => navigation.navigate(StackNav.MyWishlist);
  const onPressImage = () => navigation.navigate(TabRoute.ProfileTab);

   const [username, setUsername] = React.useState('');
   const [LoginType, setLoginType] = React.useState('');
   const [greeting, setGreeting] = React.useState('');


   React.useEffect(() => {
    const get_user_name = async () => {
      const display_name = await getAsyncStorageData('display_name');

      if (display_name && display_name!="") {
       
       setUsername(display_name);
       setLoginType("1");

      } else {
       setUsername("Guest");
       setLoginType("1");
      }
    };

    get_user_name();
  }, []);

  React.useEffect(() => {
    const determineGreeting = () => {
      const hour = new Date().getHours(); 
      if (hour < 12) {
        return "Good Morning";
      } else if (hour < 18) {
        return "Good Afternoon";
      } else {
        return "Good Evening";
      }
    };

    setGreeting(determineGreeting()); // Set the greeting based on the current time
  }, []); 
 
  return (
    <View style={localStyles.headerContainer}>
      <TouchableOpacity onPress={onPressImage}>
        <Image
          source={require('../../assets/images/user.png')}
          style={localStyles.userImageStyle}
        />
      </TouchableOpacity>
      <View style={localStyles.textContainer}>
        <CText type="m16" numberOfLines={1} color={colors.primaryTextColor}>
          {greeting}{' 👋'}
        </CText>
        <CText type="B20" numberOfLines={1} color={colors.primaryTextColor}>
          {username}
        </CText>
      </View>
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPressNotification} style={styles.mh10}>
          {colors.dark ? <NotificationDark /> : <NotificationLight />}
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressLike}>
          {colors.dark ? (
            <HeartDark height={moderateScale(23)} width={moderateScale(23)} />
          ) : (
            <HeartLight height={moderateScale(23)} width={moderateScale(23)} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(HomeHeader);

const localStyles = StyleSheet.create({
  headerContainer: {
    ...styles.rowSpaceBetween,
    ...styles.flex,
    ...styles.mt15,
  },
  userImageStyle: {
    width: moderateScale(50),
    height: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  textContainer: {
    ...styles.mh10,
    ...styles.flex,
  },
});
