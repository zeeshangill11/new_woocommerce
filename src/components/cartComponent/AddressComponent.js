import {StyleSheet, TouchableOpacity, View,ActivityIndicator} from 'react-native';
import React ,{useState,useEffect,useCallback} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchUserAddress} from '../../api/woocommerce';

import {useFocusEffect} from '@react-navigation/native';

// Custom Imports
import {styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import {
  EditDark,
  EditLight,
  LocationDark,
  LocationLight,
} from '../../assets/svgs';
import CText from '../common/CText';
import {getAsyncStorageData} from '../../utils/helpers';


export default function AddressComponent(props) {
  const {item, selectedType, onPressAddress, isSelect} = props;
  const colors = useSelector(state => state.theme.theme);
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true); 
  // useEffect(() => {
  //   // Function to load address data
  //   const loadAddress = async () => {
  //     try {
  //       var userId =  await getAsyncStorageData('user_id');
  //       const addr = await fetchUserAddress(userId);
  //       setAddress(addr);
  //       setLoading(false); 
  //     } catch (error) {
  //       console.error('Failed to fetch address:', error);
  //       setLoading(false); 

  //     }
  //   };

  //   loadAddress();
  // }, []);
  
  useFocusEffect(
    useCallback(() => {
      const loadAddress = async () => {
        setLoading(true);
        try {
          var userId = await getAsyncStorageData('user_id');
          const addr = await fetchUserAddress(userId);
          setAddress(addr);
        } catch (error) {
          console.error('Failed to fetch address:', error);
        }
        setLoading(false);
      };

      loadAddress();
    }, [])
  );



  return (
    <TouchableOpacity
      onPress={onPressAddress}
      style={[
        localStyles.addressContainer,
        {backgroundColor: colors.dark ? colors.inputBg : colors.grayScale1},
      ]}>
      <View style={localStyles.innerContainer}>
        {colors.dark ? <LocationDark /> : <LocationLight />}
        <View style={localStyles.defaultTextContainer}>
          <View style={localStyles.titleStyle}>
            <CText type={'B18'}>Address</CText>
            {item?.isDefault && (
              <View
                style={[
                  localStyles.defaultContainer,
                  {backgroundColor: colors.dark3},
                ]}>
                <CText type={'s12'}>{strings.default}</CText>
              </View>
            )}
          </View>
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : (
              <CText type={'r14'} style={styles.mt2}>
                {address.address_1 ? address.address_1 : 'No address available'}
              </CText>
            )}
        </View>
      </View>
      {!!isSelect ? (
        <Ionicons
          name={
            item?.title === selectedType
              ? 'radio-button-on'
              : 'radio-button-off'
          }
          size={moderateScale(22)}
          color={colors.dark ? colors.white : colors.black}
        />
      ) : colors.dark ? (
        <EditDark />
      ) : (
        <EditLight />
      )}
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  addressContainer: {
    ...styles.p15,
    ...styles.mh20,
    ...styles.mb15,
    ...styles.rowSpaceBetween,
    borderRadius: moderateScale(15),
    ...styles.shadowStyle,
  },
  defaultTextContainer: {
    ...styles.mh10,
    ...styles.flex,
  },
  defaultContainer: {
    ...styles.ml10,
    ...styles.selfStart,
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  titleStyle: {
    ...styles.flexRow,
    ...styles.flex,
  },
  innerContainer: {
    ...styles.rowCenter,
    ...styles.flex,
  },
});
