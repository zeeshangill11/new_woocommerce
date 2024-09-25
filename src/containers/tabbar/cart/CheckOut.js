import { Image, StyleSheet, TouchableOpacity, View,ActivityIndicator  } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import { Menu_Dark, Menu_Light, RightDark, RightLight } from '../../../assets/svgs';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import CDivider from '../../../components/common/CDivider';
import { styles } from '../../../themes';
import CartProductComponent from '../../../components/cartComponent/CartProductComponent';
import AddressComponent from '../../../components/cartComponent/AddressComponent';
import { AddressData } from '../../../api/constant';
import CText from '../../../components/common/CText';
import images from '../../../assets/images';
import { deviceWidth, moderateScale } from '../../../common/constants';
import CButton from '../../../components/common/CButton';
import CInput from '../../../components/common/CInput';
import { StackNav } from '../../../navigation/NavigationKeys';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchPromoDiscount } from '../../../api/woocommerce';

const RenderFlashListHeader = React.memo(() => {
  const navigation = useNavigation();

  const onPressAddress = () =>
    navigation.navigate(StackNav.AddAddress, {
      item: strings.shippingAddress,
    });

  return (
    <View>
      <View style={styles.ph20}>
        <CDivider style={styles.mb5} />
        <CText type={'b18'} style={[styles.mb15, styles.mt10]}>
          {strings.shippingAddress}
        </CText>
      </View>
      <AddressComponent item={AddressData[1]} onPressAddress={onPressAddress} />
      <View style={styles.ph20}>
        <CDivider style={styles.mb5} />
        <CText type={'b18'} style={styles.mt15}>
          {strings.orderList}
        </CText>
      </View>
    </View>
  );
});



const calculateFinalAmount = (total, shipping, discount) => {
  let finalAmount = total + shipping - discount;
  return finalAmount < 0 ? '0.00' : finalAmount.toFixed(2); // Ensure final amount is never negative
};

const RenderFlashListFooter = () => {
  const colors = useSelector(state => state.theme.theme);
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const [chatStyle, setChatStyle] = useState(BlurredStyle);
  const [promoCode, setPromoCode] = useState('');
  const [promoCodeOk, setPromoCodeOk] = useState('');
  const [discount, setDiscount] = useState(0); // Hold the discount value
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [cartData, setCartData] = useState([]);

  const onFocusInput = () => setChatStyle(FocusedStyle);
  const onBlurInput = () => setChatStyle(BlurredStyle);

  const onChangePromo = text => {
    setPromoCode(text);
    setDiscount(0);  // Reset the discount when promo code changes
  };

  const onPressAddPromo = async () => {
    setLoading(true);
    setErrorMessage('');
    try {
      const promoDetails = await fetchPromoDiscount(promoCode);

      if (promoDetails) {
        const total = parseFloat(calculateTotal()); // Get total before discount
        const { type, value } = promoDetails;
        let discountValue = 0;

        if (type === 'percent') {
          discountValue = (total * value) / 100; // Calculate percentage discount
        } else if (type === 'fixed_cart') {
          discountValue = value; 
        }

        // Ensure discount doesn't exceed total
        if (discountValue > total) {
            discountValue = total; // Limit discount to cart total
        }



        alert(`Discount Applied: ${discountValue} د.إ `);
        setDiscount(discountValue);
        setPromoCodeOk(promoCode);

        // Store promo code and discount in AsyncStorage
        await AsyncStorage.setItem('promoCode', promoCode);
        await AsyncStorage.setItem('discount', JSON.stringify(discountValue));

      } else {
        setErrorMessage('Promo code not found or invalid.');
        setDiscount(0);  // Reset discount if promo code is invalid
        setPromoCodeOk('');
      }
    } catch (err) {
      setErrorMessage('Failed to apply promo code. Please try again.');
      setDiscount(0);  // Reset discount if there's an error
      setPromoCodeOk('');
    } finally {
      setLoading(false);
    }
  };

  // Fetch cart data and promo code from AsyncStorage
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        const parsedCart = cart ? JSON.parse(cart) : [];
        setCartData(parsedCart);
        
        // Fetch stored promo code and discount
        const storedPromoCode = await AsyncStorage.getItem('promoCode');
        const storedDiscount = await AsyncStorage.getItem('discount');
        
        if (storedPromoCode && storedDiscount) {
          setPromoCode(storedPromoCode);
          setPromoCodeOk(storedPromoCode);
          setDiscount(JSON.parse(storedDiscount));
        }
      } catch (error) {
        console.error('Failed to fetch cart data or promo info:', error);
      }
    };
    fetchCartData();
  }, []);

  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  const total = parseFloat(calculateTotal());
  const shipping = 0; // Assuming no shipping charge for now
  const finalAmount = calculateFinalAmount(total, shipping, discount);

  const InnerText = props => {
    const { text1, text2, isBottom = true } = props;
    return (
      <View style={[styles.rowSpaceBetween, isBottom && styles.pb15]}>
        <CText color={colors.dark ? colors.grayScale3 : colors.grayScale7} type={'s14'}>
          {text1}
        </CText>
        <CText type={'B16'}>{text2}</CText>
      </View>
    );
  };

  const navigation = useNavigation();

  const onPressPayment = () => {
    navigation.navigate(StackNav.Payment, {
      title: strings.paymentMethods,
      desc: strings.paymentDesc1,
      isWallet: true,
      discount: discount, 
      promoCode: promoCodeOk,
    });
  };

  return (
    <View style={styles.ph20}>
      <CDivider style={styles.mt20} />
      <CText type={'b18'} style={styles.mv10}>
        {strings.promoCode}
      </CText>
      <View style={styles.rowCenter}>
        <CInput
          placeHolder={strings.enterPromoCode}
          keyBoardType={'default'}
          _value={promoCode}
          autoCapitalize={'none'}
          toGetTextFieldValue={onChangePromo}
          inputContainerStyle={[
            { backgroundColor: colors.inputBg },
            localStyles.inputContainerStyle,
            chatStyle,
          ]}
          _onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
        <TouchableOpacity
          onPress={onPressAddPromo}
          style={[localStyles.sendBtn, { backgroundColor: colors.textColor }]}
          disabled={loading} // Disable the button while loading
        >
          {loading ? (
            <ActivityIndicator size="small" color={colors.textRevertColor} />
          ) : (
            <Ionicons name={'add-sharp'} size={moderateScale(26)} color={colors.textRevertColor} />
          )}
        </TouchableOpacity>
      </View>

      {errorMessage ? (
        <CText type={'s14'} style={{ color: 'red', marginTop: 5 }}>
          {errorMessage}
        </CText>
      ) : null}

      <InnerText text1={strings.amount} text2={`${total} د.إ `} />
      <InnerText text1={strings.shipping} text2={`${shipping} د.إ `} />
      <InnerText text1={strings.promo} text2={`- ${discount} د.إ `} isBottom={false} />
      <CDivider style={styles.mv15} />
      <InnerText text1={strings.totalAmount} text2={`${finalAmount} د.إ `} isBottom={false} />

      <CButton
        type={'b16'}
        title={strings.continueToPayment}
        style={styles.mr10}
        containerStyle={localStyles.addToCartContainer}
        icon={colors.dark ? <RightDark /> : <RightLight />}
        onPress={onPressPayment}
      />
    </View>
  );
};

export default function CheckOut({ navigation, route }) {
  const cartData = route?.params?.cartData;
  const colors = useSelector(state => state.theme.theme);

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const renderItem = ({ item }) => {
    return <CartProductComponent item={item} isTrash={true} />;
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.checkOut} rightIcon={<RightIcon />} />
      <View style={styles.flex}>
        <FlashList
          data={cartData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          ListHeaderComponent={RenderFlashListHeader}
          ListFooterComponent={RenderFlashListFooter}
          estimatedItemSize={20}
        />
      </View>
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  imageContainer: {
    ...styles.flexRow,
    ...styles.itemsCenter,
  },
  shippingImg: {
    width: moderateScale(26),
    height: moderateScale(26),
    resizeMode: 'contain',
  },
  shippingContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.pv15,
    ...styles.mv10,
    borderRadius: moderateScale(14),
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.ph20,
  },
  addToCartContainer: {
    width: '100%',
    ...styles.shadowStyle,
  },
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.ph15,
    ...styles.flexGrow1,
    width: deviceWidth - moderateScale(100),
  },
  sendBtn: {
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
    ...styles.rowCenter,
    ...styles.ml10,
  },
});

