import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState,useEffect} from 'react';

import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {
  Menu_Dark,
  Menu_Light,
  RightDark,
  RightLight,
} from '../../../assets/svgs';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import CDivider from '../../../components/common/CDivider';
import {styles} from '../../../themes';
import CartProductComponent from '../../../components/cartComponent/CartProductComponent';
import AddressComponent from '../../../components/cartComponent/AddressComponent';
import {AddressData} from '../../../api/constant';
import CText from '../../../components/common/CText';
import images from '../../../assets/images';
import {deviceWidth, moderateScale} from '../../../common/constants';
import CButton from '../../../components/common/CButton';
import CInput from '../../../components/common/CInput';
import {StackNav} from '../../../navigation/NavigationKeys';
import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';


const RenderFlashListHeader = React.memo(() => {
  const navigation = useNavigation();
  const onPressAddress = () =>
    navigation.navigate(StackNav.Address, {
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
// order list
 calculateTotal =  async () => {
  
   const cart = await AsyncStorage.getItem('cart');
    const parsedCart = cart ? JSON.parse(cart) : [];
    //setCartData(parsedCart);
    var total=0;
    total = parsedCart.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
   
    return total;
};

const calculateFinalAmount = (total, shipping, discount) => {
  return (total + shipping - discount).toFixed(2);
};

//const [cartData, setCartData] = useState([]);
// useEffect(() => {
//   const fetchCartData = async () => {
//     try {
//       const cart = await AsyncStorage.getItem('cart');
//       const parsedCart = cart ? JSON.parse(cart) : [];
//       setCartData(parsedCart);
//     } catch (error) {
//       console.error('Failed to fetch cart data:', error);
//     }
//   };
//   fetchCartData();
// }, []);

const RenderFlashListFooter = () => {
  const colors = useSelector(state => state.theme.theme);
  // const navigation = useNavigation();
  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };
  
   const [chatStyle, setChatStyle] = useState(BlurredStyle);

   const onFocusInput = () => setChatStyle(FocusedStyle);


   const onBlurInput = () => setChatStyle(BlurredStyle);

   const onChangePromo = text => setPromoCode(text);

   const onPressShipping = () => navigation.navigate(StackNav.ChooseShipping);

   const onPressAddPromo = () => navigation.navigate(StackNav.AddPromo);

  

  
  const navigation = useNavigation();
  const [promoCode, setPromoCode] = useState('');
  const [cartData, setCartData] = useState([]);

  // Fetch cart data on component mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        const parsedCart = cart ? JSON.parse(cart) : [];
        setCartData(parsedCart);
      } catch (error) {
        console.error('Failed to fetch cart data:', error);
      }
    };
    fetchCartData();
  }, []);

  // Calculate the total price of the items in the cart
  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };

  // Assume no shipping costs and a fixed promo discount for demonstration
  const total = parseFloat(calculateTotal());
  const shipping = 0;
  const promoDiscount = 100; // Assuming a fixed promo discount for demonstration
  const finalAmount = (total + shipping - promoDiscount).toFixed(2);


  const InnerText = props => {
    const {text1, text2, isBottom = true} = props;
    return (
      <View style={[styles.rowSpaceBetween, isBottom && styles.pb15]}>
        <CText
          color={colors.dark ? colors.grayScale3 : colors.grayScale7}
          type={'s14'}>
          {text1}
        </CText>

        <CText type={'B16'}>{text2}</CText>
      </View>
    );
  };
  

  

  
  // var total = calculateTotal();
  // console.log("================>>>")
  // console.log(total)
  // const shipping = 0; 
  // const promoDiscount = 0; // Assuming a fixed promo discount for demonstration

  // const finalAmount = calculateFinalAmount(total, shipping, promoDiscount);

  return (

    <View style={styles.ph20}>
      <CDivider style={styles.mt20} />
      <CText type={'b18'} style={styles.mv10}>
        {strings.chooseShipping}
      </CText>
      <TouchableOpacity
        onPress={onPressShipping}
        style={[
          localStyles.shippingContainer,
          {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
        ]}>
        <View style={localStyles.imageContainer}>
          <Image
            source={images.shipping}
            style={[localStyles.shippingImg, {tintColor: colors.textColor}]}
          />
          <CText type={'b16'} style={styles.mh10}>
            {strings.chooseShippingType}
          </CText>
        </View>
        <Ionicons
          name={'chevron-forward-outline'}
          size={moderateScale(20)}
          color={colors.textColor}
        />
      </TouchableOpacity>
      <CDivider />
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
            {backgroundColor: colors.inputBg},
            localStyles.inputContainerStyle,
            chatStyle,
          ]}
          _onFocus={onFocusInput}
          onBlur={onBlurInput}
        />
        <TouchableOpacity
          onPress={onPressAddPromo}
          style={[localStyles.sendBtn, {backgroundColor: colors.textColor}]}>
          <Ionicons
            name={'add-sharp'}
            size={moderateScale(26)}
            color={colors.textRevertColor}
          />
        </TouchableOpacity>
      </View>
     <View style={styles.ph20}>
      <InnerText text1={strings.amount} text2={`$${total}`} />
      <InnerText text1={strings.shipping} text2={`$${shipping}`} />
      <InnerText text1={strings.promo} text2={`- $${promoDiscount}`} isBottom={false} />
      <CDivider style={styles.mv15} />
      <InnerText text1={strings.totalAmount} text2={`$${finalAmount}`} isBottom={false} />
    </View>
    </View>
  );
};

export default function CheckOut({navigation, route}) {
  const cartData = route?.params?.cartData;
  const colors = useSelector(state => state.theme.theme);

  const onPressPayment = () =>
    navigation.navigate(StackNav.Payment, {
      title: strings.paymentMethods,
      desc: strings.paymentDesc1,
      isWallet: true,
    });

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const renderItem = ({item}) => {
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
        <View style={localStyles.bottomContainer}>
          <CButton
            type={'b16'}
            title={strings.continueToPayment}
            style={styles.mr10}
            containerStyle={localStyles.addToCartContainer}
            icon={colors.dark ? <RightDark /> : <RightLight />}
            onPress={onPressPayment}
          />
        </View>
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
  innerContainer: {
    ...styles.mv20,
    ...styles.pv15,
    ...styles.ph20,
    borderRadius: moderateScale(12),
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
