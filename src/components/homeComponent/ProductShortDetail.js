import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CText from '../common/CText';
import images from '../../assets/images';
import {LikeWithBg, UnLikeWithBg} from '../../assets/svgs';
import {deviceWidth, moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import strings from '../../i18n/strings';

export default function ProductShortDetail(props) {
  const colors = useSelector(state => state.theme.theme);
  const [isLiked, setIsLiked] = useState(false);
  const {item, index, onPress} = props;

  const onPressLike = () => setIsLiked(!isLiked);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[
        localStyles.productContainer,
        index % 2 === 0 ? styles.mr5 : styles.ml5,
      ]}>
      <TouchableOpacity style={localStyles.likeContainer} onPress={onPressLike}>
        {isLiked ? <LikeWithBg /> : <UnLikeWithBg />}
      </TouchableOpacity>
      <Image
        source={item?.productImage}
        style={[
          localStyles.productImageStyle,
          {backgroundColor: colors.dark ? colors.imageBg : colors.grayScale1},
        ]}
      />
      <CText style={[styles.flex, styles.mt10]} numberOfLines={1} type={'b16'}>
        {item?.product}
      </CText>
      <View style={localStyles.subItemStyle}>
        <Image
          source={images.starFill}
          style={[localStyles.starStyle, {tintColor: colors.textColor}]}
        />
        <CText
          type={'s14'}
          style={styles.mr5}
          color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
          {item?.rating}
          {'  | '}
        </CText>
        <View
          style={[localStyles.paidContainer, {backgroundColor: colors.dark3}]}>
          <CText type={'s12'}>{item?.sold + ' ' + strings.sold}</CText>
        </View>
      </View>
      <CText type={'b16'}>{item?.price}</CText>
    </TouchableOpacity>
  );
}

const localStyles = StyleSheet.create({
  productContainer: {
    width: (deviceWidth - moderateScale(50)) / 2,
    ...styles.mt15,
  },
  subItemStyle: {
    ...styles.mt5,
    ...styles.mb5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  starStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    ...styles.mr5,
  },
  paidContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  productImageStyle: {
    width: (deviceWidth - moderateScale(50)) / 2,
    height: (deviceWidth - moderateScale(50)) / 2,
    borderRadius: moderateScale(15),
    resizeMode: 'contain',
    ...styles.selfCenter,
  },
  likeContainer: {
    position: 'absolute',
    top: moderateScale(10),
    right: moderateScale(10),
    zIndex: 1,
  },
});
