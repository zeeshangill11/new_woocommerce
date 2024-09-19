// Library import
import {StyleSheet, TouchableOpacity, View,Modal,ActivityIndicator} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import CInput from '../../../components/common/CInput';
import CButton from '../../../components/common/CButton';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CDivider from '../../../components/common/CDivider';
import {saveAddressData, fetchUserAddress} from '../../../api/woocommerce'; // Import the fetchUserAddress function
import {getAsyncStorageData} from '../../../../src/utils/helpers';
export default function AddAddress({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [addressStyle, setAddressStyle] = useState(BlurredStyle);
  const [cityStyle, setCityStyle] = useState(BlurredStyle);
  const [stateStyle, setStateStyle] = useState(BlurredStyle);
  const [postalCodeStyle, setPostalCodeStyle] = useState(BlurredStyle);
  const [isCheck, setIsCheck] = useState(false);

  // Fetch address from WooCommerce and populate the form
  useEffect(() => {
    const loadUserAddress = async () => {
      setLoading(true);

      const userId = await getAsyncStorageData('user_id'); // Replace with the actual user ID
      try {
        const billingAddress = await fetchUserAddress(userId);
        setAddress(billingAddress.address_1 || '');
        setCity(billingAddress.city || '');
        setState(billingAddress.state || '');
        setPostalCode(billingAddress.postcode || '');
      } catch (error) {
        console.error('Error fetching user address:', error);
      }
      setLoading(false);

    };

    loadUserAddress();
  }, []);

  const onFocusInput = (setStyle) => setStyle(FocusedStyle);
  const onBlurInput = (setStyle) => setStyle(BlurredStyle);

  const submitAddress = async () => {
    const userId = await getAsyncStorageData('user_id');

    const addressData = {
      address,
      city,
      state,
      postalCode,
    };

    try {
      await saveAddressData(addressData, userId);
      console.log('Address saved successfully!');
      
      await AsyncStorage.setItem('user_address', JSON.stringify(addressData));

      navigation.goBack(); // Go back after submission
    } catch (error) {
      console.error('Error saving address:', error);
    }
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.addNewAddress} />
      <KeyBoardAvoidWrapper contentContainerStyle={styles.flexGrow1}>

        <Modal
          visible={loading}
          transparent
          animationType="none"
        >
          <View style={localStyles.loadingOverlay}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        </Modal>

        <View
          style={[
            localStyles.bottomContainer,
            {backgroundColor: colors.backgroundColor},
          ]}
        >
          <CText
            type={'B20'}
            style={localStyles.titleContainer}
            align={'center'}
          >
            {strings.addressDetail}
          </CText>
          <CDivider style={styles.mv5} />

          {/* Address Field */}
          <CInput
            label="Address"
            placeHolder="Enter your address"
            _value={address}
            autoCapitalize={'none'}
            toGetTextFieldValue={setAddress}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              addressStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={() => onFocusInput(setAddressStyle)}
            onBlur={() => onBlurInput(setAddressStyle)}
          />

          {/* City Field */}
          <CInput
            label="City"
            placeHolder="Enter your city"
            _value={city}
            autoCapitalize={'none'}
            toGetTextFieldValue={setCity}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              cityStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={() => onFocusInput(setCityStyle)}
            onBlur={() => onBlurInput(setCityStyle)}
          />

          {/* State Field */}
          <CInput
            label="State"
            placeHolder="Enter your state"
            _value={state}
            autoCapitalize={'none'}
            toGetTextFieldValue={setState}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              stateStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={() => onFocusInput(setStateStyle)}
            onBlur={() => onBlurInput(setStateStyle)}
          />

          {/* Postal Code Field */}
          <CInput
            label="Postal Code2"
            placeHolder="Enter your postal code"
            _value={postalCode}
            autoCapitalize={'none'}
            toGetTextFieldValue={setPostalCode}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              postalCodeStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={() => onFocusInput(setPostalCodeStyle)}
            onBlur={() => onBlurInput(setPostalCodeStyle)}
          />

          {/* Checkbox */}
          <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={localStyles.checkboxContainer}
          >
            <Ionicons
              name={isCheck ? 'square-outline' : 'checkbox'}
              size={moderateScale(26)}
              color={colors.textColor}
            />
            <CText type={'r18'} style={styles.mh10}>
              {strings.makeDefault}
            </CText>
          </TouchableOpacity>

          {/* Submit Button */}
          <CButton
            title={strings.add}
            type={'S16'}
            containerStyle={styles.mv10}
            onPress={submitAddress}
          />
        </View>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  bottomContainer: {
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    ...styles.ph20,
  },
  titleContainer: {
    ...styles.p20,
  },
  checkboxContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
    ...styles.mt20,
  },
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.flexGrow1,
  },
  loadingOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
});
