// Library Imports
import { StyleSheet, TouchableOpacity, View, Alert } from 'react-native';
import React, { useEffect, useRef, useState,useCallback  } from 'react';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlashList } from '@shopify/flash-list';
import { useFocusEffect } from '@react-navigation/native';
// Custom Imports
import CText from '../../../components/common/CText';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import { styles } from '../../../themes';
import {
  AppLogoDark,
  AppLogoLight,
  RightDark,
  RightLight,
  Search_Dark,
  Search_Light,
} from '../../../assets/svgs';
import RenderNullComponent from '../../../components/RenderNullComponent';
import CartProductComponent from '../../../components/cartComponent/CartProductComponent';
import CButton from '../../../components/common/CButton';
import { deviceWidth, getHeight, moderateScale } from '../../../common/constants';
import { StackNav } from '../../../navigation/NavigationKeys';
import TrashItem from '../../../components/models/TrashItem';

export default function CartTab({ navigation }) {
  const colors = useSelector(state => state.theme.theme);
  const trashSheetRef = useRef(null);
  const [trashData, setTrashData] = useState({});
  const [cartData, setCartData] = useState([]);

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



  useFocusEffect(
    useCallback(() => {
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
    }, [])
  );


    useEffect(() => {
    const updateStorage = async () => {
      try {
        const jsonValue = JSON.stringify(cartData);
        await AsyncStorage.setItem('cart', jsonValue);

        await AsyncStorage.removeItem('promoCode');
        await AsyncStorage.removeItem('discount');

      } catch (error) {
        console.error('Failed to save cart data:', error);
      }
    };

    if (cartData.length > 0) {
      updateStorage();
    }
  }, [cartData]);
    

  const onDeleteItem = (itemId) => {
    const updatedCartData = cartData.filter(item => item.id !== itemId);
    setCartData(updatedCartData);
    AsyncStorage.setItem('cart', JSON.stringify(updatedCartData));
  };

  const onPressSearch = () => navigation.navigate(StackNav.Search);
  const onPressTrash = item => {
    
    setTrashData(item);
    trashSheetRef.current?.show();
  };
  const onPressCheckout = () => {
    navigation.navigate(StackNav.CheckOut, { cartData });
  };

  const LeftIcon = () => (
    <View style={styles.pr10}>
      {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
    </View>
  );

  const RightIcon = () => (
    <TouchableOpacity style={styles.ph10} onPress={onPressSearch}>
      {colors.dark ? <Search_Dark /> : <Search_Light />}
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <CartProductComponent
      item={item}
      onPressTrash={() => onPressTrash(item)}
       onQuantityChange={handleQuantityChange}
       
    />

  );

  const handleQuantityChange = (id, newQuantity) => {
    const updatedItems = cartData.map(item => {
      if (item.id === id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCartData(updatedItems);
  };
  const calculateTotal = () => {
    return cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);
  };



  const totalPrice = cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2);

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.cart}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      {cartData.length > 0 ? (
        <View style={localStyles.root}>
          <FlashList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={item => item.id.toString()}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={localStyles.contentContainerStyle}
            estimatedItemSize={20}
          />
          <View style={localStyles.bottomContainer}>
            <View style={localStyles.priceContainer}>
              <CText type={'m14'} color={colors.dark ? colors.grayScale3 : colors.grayScale6}>
                {strings.totalPrice}
              </CText>
              <CText type={'b20'}>{`${totalPrice}`} د.إ </CText>
            </View>
            <CButton
              type={'b16'}
              title={strings.checkOut}
              style={styles.mr10}
              containerStyle={localStyles.addToCartContainer}
              icon={colors.dark ? <RightDark /> : <RightLight />}
              onPress={onPressCheckout}
            />
          </View>
        </View>
      ) : (
        <RenderNullComponent
          title1={strings.onGoingNullTitle}
          title2={strings.onGoingNullDesc}
        />
      )}
      <TrashItem SheetRef={trashSheetRef} onQuantityChange={handleQuantityChange} item={trashData} onDeleteItem={onDeleteItem} />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  contentContainerStyle: {
    ...styles.pb20,
  },
  bottomContainer: {
    ...styles.pv10,
    ...styles.ph20,
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
