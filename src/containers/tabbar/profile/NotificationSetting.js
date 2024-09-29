// Library import
import {StyleSheet, Switch, View, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import CText from '../../../components/common/CText';
import {styles} from '../../../themes';

const STORAGE_KEY = '@notification_settings';





import OneSignal from 'react-native-onesignal';
import axios from 'axios';


// Call this function when the user subscribes to notifications
const storePlayerId = async (userId) => {
  // Get the player's OneSignal Player ID
  const playerState = await OneSignal.getDeviceState();
  const playerId = playerState.userId;
  alert(playerId);
  // Store Player ID in AsyncStorage
  
  // await AsyncStorage.setItem('@onesignal_player_id', playerId);

  // // Send the Player ID to your WooCommerce site to save in user meta
  // axios.post('https://your-woocommerce-site.com/wp-json/wc/v3/customers/' + userId, {
  //   meta_data: [
  //     {
  //       key: 'onesignal_player_id',
  //       value: playerId
  //     }
  //   ]
  // }, {
  //   auth: {
  //     username: 'your_consumer_key',
  //     password: 'your_consumer_secret'
  //   }
  // });
};




export default NotificationSetting = () => {
  const colors = useSelector(state => state.theme.theme);
  
  const [isEnabled, setIsEnabled] = useState({
    generalNotification: false,
    orderNotification: false,
    promoNotification: false,
  });

  useEffect(() => {
    // Fetch settings from AsyncStorage on mount
    const fetchSettings = async () => {
      try {
        const savedSettings = await AsyncStorage.getItem(STORAGE_KEY);
        if (savedSettings !== null) {
          setIsEnabled(JSON.parse(savedSettings));
        }
      } catch (e) {
        console.error('Failed to load notification settings.', e);
      }
    };
    fetchSettings();
  }, []);

  const saveNotificationSetting = async (updatedSettings) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedSettings));
      Alert.alert('Success', 'Notification settings updated!');
    } catch (e) {
      console.error('Failed to save notification settings.', e);
    }
  };

  const toggleSwitch = (key) => {
    const updatedSettings = {
      ...isEnabled,
      [key]: !isEnabled[key],
    };
    setIsEnabled(updatedSettings);
    saveNotificationSetting(updatedSettings);
  };

  const NotificationData = [
    {
      title: 'General Notification', // Replace with `strings.generalNotification` if needed
      value: isEnabled.generalNotification,
      onPress: () => toggleSwitch('generalNotification'),
    },
    {
      title: 'Order Notification', // Replace with `strings.orderNotification` if needed
      value: isEnabled.orderNotification,
      onPress: () => toggleSwitch('orderNotification'),
    },
    {
      title: 'Promotion Notification', // Replace with `strings.promoNotification` if needed
      value: isEnabled.promoNotification,
      onPress: () => toggleSwitch('promoNotification'),
    },
  ];

  return (
    <CSafeAreaView>
      <CHeader title={strings.notification} />
      <View style={localStyles.root}>
        {NotificationData.map((item, index) => {
          return (
            <View style={localStyles.mainContainer} key={index}>
              <CText type={'s18'}>{item.title}</CText>
              <Switch
                trackColor={{
                  false: colors.grayScale3,
                  true: colors.dark ? colors.grayScale5 : colors.primary,
                }}
                thumbColor={colors.white}
                onValueChange={item.onPress}
                value={item.value}
              />
            </View>
          );
        })}
      </View>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph25,
    ...styles.mt20,
  },
  mainContainer: {
    ...styles.rowSpaceBetween,
    ...styles.mb20,
  },
});
