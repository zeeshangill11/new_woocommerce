// Library Imports
import {Image, StyleSheet, View,Text} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import CText from './common/CText';
import CButton from './common/CButton';
import strings from '../i18n/strings';
import {deviceWidth, getHeight, moderateScale} from '../common/constants';
import {styles} from '../themes';
import {StackNav} from '../navigation/NavigationKeys';

export default function ProductOrderComponent(props) {
  const {
    item,
    isCompleted = false,
    isCategory = true,
    isButton = true,
    onPressComplete,

  } = props;
  console.log(item);
  const navigation = useNavigation();
  const colors = useSelector(state => state.theme.theme);

  const onPressBtn = () => {
    if (isCompleted) {
      onPressComplete(item);
    } else {
      navigation.navigate(StackNav.TrackOrder, {item: item});
    }
  };
  

  var imageSource ='';
  
  if(typeof item.image?.src === 'string' && item?.image?.src && item?.image?.src!= "" && item?.image?.src.trim() !== '') {
    imageSource = { uri: item.image.src };
  } else {
    imageSource = { uri: 'https://placehold.co/600x400.png' };
  }
  console.log(imageSource);

  return (
    <View
      style={[
        localStyles.productContainer,
        {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
      ]}>
     <Image
        source={imageSource}
        style={[
          localStyles.productImageStyle,
          {backgroundColor: colors.dark ? colors.imageBg : colors.white},
        ]}
        resizeMode="cover" 
        onError={(e) => console.log("Image loading error: ", e.nativeEvent.error)} 
      />
      <View style={localStyles.rightContainer}>
        <CText numberOfLines={1} type={'b16'}>
           {item?.name}
        </CText>
        <View style={[localStyles.subItemStyle]}>
          <View
            style={[
              localStyles.circleContainer,
              {backgroundColor: item?.color},
            ]}
          />
   
            <View
              style={[
                localStyles.paidContainer,
                {backgroundColor: colors.dark3},
              ]}>
              <Text >
              QTY:
              </Text>
              <CText type={'s12'}>
                
                {item?.quantity}

              </CText>
            </View>
        
        </View>
        <View style={localStyles.btnContainer}>
          <CText type={'b16'}>{item?.total} د.إ </CText>
          {!!isButton && (
            <CButton
              title={isCompleted ? strings.leaveReview : strings.trackOrder}
              type={'S14'}
              style={styles.ph10}
              color={!!colors.dark && colors.white}
              bgColor={colors.dark && colors.dark3}
              containerStyle={localStyles.orderContainer}
              onPress={onPressBtn}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    ...styles.p15,
    ...styles.flexRow,
    ...styles.mt15,
    borderRadius: moderateScale(20),
    ...styles.shadowStyle,
    ...styles.selfCenter,
    width: deviceWidth - moderateScale(40),
    minHeight: moderateScale(130),
  },
  productImageStyle: {
    height: '100%',
    width: moderateScale(90),
    borderRadius: moderateScale(20),
    resizeMode: 'contain',
    marginRight: moderateScale(15),
  },
  rightContainer: {
    ...styles.flex,
    ...styles.justifyBetween,
  },
  circleContainer: {
    width: moderateScale(13),
    height: moderateScale(13),
    borderRadius: moderateScale(13) / 2,
    backgroundColor: '#7A5548',
    ...styles.mr10,
  },
  subItemStyle: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  paidContainer: {
    ...styles.selfStart,
    ...styles.ph10,
    ...styles.pv5,
    ...styles.ml15,
    borderRadius: moderateScale(6),
  },
  orderContainer: {
    height: getHeight(30),
    borderRadius: moderateScale(15),
    width: moderateScale(110),
  },
  btnContainer: {
    ...styles.rowSpaceBetween,
  },
});
