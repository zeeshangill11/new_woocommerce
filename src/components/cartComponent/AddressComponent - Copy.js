import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

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

export default function AddressComponent(props) {
  const {item, selectedType, onPressAddress, isSelect} = props;
  const colors = useSelector(state => state.theme.theme);

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
            <CText type={'B18'}>{item?.title}</CText>
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
          <CText type={'r14'} style={styles.mt2}>
            {item?.address}
          </CText>
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
