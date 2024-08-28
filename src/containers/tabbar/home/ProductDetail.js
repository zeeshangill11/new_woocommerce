import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import {
  deviceHeight,
  deviceWidth,
  getHeight,
  moderateScale,
} from '../../../common/constants';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  CartIconDark,
  CartIconLight,
  LikeWithBg,
  UnLikeWithBg,
} from '../../../assets/svgs';
import images from '../../../assets/images';
import strings from '../../../i18n/strings';
import CDivider from '../../../components/common/CDivider';
import CButton from '../../../components/common/CButton';
import ColorComponent from '../../../components/homeComponent/ColorComponent';
import {StackNav, TabNav} from '../../../navigation/NavigationKeys';

export default function ProductDetail({navigation, route}) {
  const item = route?.params?.item;
  const colors = useSelector(state => state.theme.theme);
  const [isLiked, setIsLiked] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const onPressLike = () => setIsLiked(!isLiked);

  const onPressRemove = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const onPressAdd = () => setQuantity(prev => prev + 1);

  const onPressReview = () => navigation.navigate(StackNav.Reviews);

  const onPressOffer = () => navigation.navigate(TabNav.CartTab);

  return (
    <CSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={item?.productImage} style={localStyles.root}>
          <CHeader title={item?.title} />
        </ImageBackground>
        <View style={styles.mh20}>
          <View style={localStyles.productText}>
            <CText style={styles.flex} numberOfLines={1} type={'b26'}>
              {item?.product}
            </CText>
            <TouchableOpacity onPress={onPressLike}>
              {isLiked ? (
                <LikeWithBg
                  width={moderateScale(28)}
                  height={moderateScale(28)}
                />
              ) : (
                <UnLikeWithBg
                  width={moderateScale(28)}
                  height={moderateScale(28)}
                />
              )}
            </TouchableOpacity>
          </View>
          <View style={localStyles.subItemStyle}>
            <View
              style={[
                localStyles.paidContainer,
                {backgroundColor: colors.dark3},
              ]}>
              <CText type={'s12'}>{item?.sold + ' ' + strings.sold}</CText>
            </View>
            <Image
              source={images.starFill}
              style={[localStyles.starStyle, {tintColor: colors.textColor}]}
            />
            <TouchableOpacity onPress={onPressReview}>
              <CText
                type={'s14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
                {item?.rating}
                {' (' + item?.review + ' ' + strings.reviews + ')'}
              </CText>
            </TouchableOpacity>
          </View>
          <CDivider />
          <CText numberOfLines={1} type={'b18'}>
            {strings.description}
          </CText>
          <CText style={styles.mt5} type={'r14'}>
            {strings.descText}
          </CText>
          <View style={localStyles.sizeColorContainer}>
            <CText type={'b18'} style={styles.mb10}>
              {strings.color}
            </CText>
            <ColorComponent isSize={!item?.size?.length} />
          </View>
          <View style={localStyles.quantityContainer}>
            <CText type={'b18'}>{strings.quantity}</CText>
            <View
              style={[
                localStyles.quantityButton,
                {backgroundColor: colors.dark3},
              ]}>
              <TouchableOpacity onPress={onPressRemove}>
                <Ionicons
                  name={'remove'}
                  size={moderateScale(24)}
                  color={colors.dark ? colors.white : colors.black}
                  style={styles.mr5}
                />
              </TouchableOpacity>
              <CText
                type={'b18'}
                align={'center'}
                style={localStyles.quantityText}>
                {quantity}
              </CText>
              <TouchableOpacity onPress={onPressAdd}>
                <Ionicons
                  name={'add'}
                  size={moderateScale(24)}
                  color={colors.dark ? colors.white : colors.black}
                  style={styles.ml5}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.ph20}>
        <View style={localStyles.bottomContainer}>
          <View style={localStyles.priceContainer}>
            <CText
              type={'m14'}
              color={colors.dark ? colors.grayScale3 : colors.grayScale6}>
              {strings.totalPrice}
            </CText>
            <CText type={'b20'}>{item?.price}</CText>
          </View>
          <CButton
            type={'b16'}
            title={strings.addToCart}
            style={styles.ml10}
            containerStyle={localStyles.addToCartContainer}
            onPress={onPressOffer}
            frontIcon={colors.dark ? <CartIconLight /> : <CartIconDark />}
          />
        </View>
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    height: deviceHeight / 2 - moderateScale(50),
    width: '100%',
    resizeMode: 'contain',
  },
  productText: {
    ...styles.rowSpaceBetween,
    ...styles.mt10,
  },
  subItemStyle: {
    ...styles.mv5,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  starStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: 'contain',
    ...styles.mh10,
  },
  paidContainer: {
    ...styles.ph10,
    ...styles.pv5,
    borderRadius: moderateScale(6),
  },
  sizeColorContainer: {
    ...styles.mt15,
  },
  quantityContainer: {
    ...styles.mt20,
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  quantityButton: {
    height: getHeight(40),
    ...styles.ph10,
    ...styles.ml10,
    ...styles.rowCenter,
    borderRadius: moderateScale(45) / 2,
  },
  quantityText: {
    width: moderateScale(30),
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.rowSpaceBetween,
  },
  addToCartContainer: {
    width: deviceWidth / 2 + moderateScale(30),
    ...styles.shadowStyle,
  },
  priceContainer: {
    height: getHeight(50),
    ...styles.justifyEvenly,
  },
});
