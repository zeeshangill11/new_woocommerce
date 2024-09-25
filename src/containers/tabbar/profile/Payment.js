import { TouchableOpacity, View, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createOrder } from '../../../api/woocommerce'; // Import the createOrder function

// Local Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import { moderateScale } from '../../../common/constants';
import { styles } from '../../../themes';
import CText from '../../../components/common/CText';
import CButton from '../../../components/common/CButton';
import { StackNav } from '../../../navigation/NavigationKeys';
import { FlashList } from '@shopify/flash-list';
import PaymentSelect from '../../../components/cartComponent/PaymentSelect';
import { getAsyncStorageData } from '../../../utils/helpers';

import { fetchUserAddress } from '../../../api/woocommerce'; 


export default Payment = ({ navigation, route }) => {
  const colors = useSelector(state => state.theme.theme);
  const title = route.params?.title;
  const desc = route.params?.desc;
  const isWallet = route.params?.isWallet;
  const discount = route.params?.discount || 0; // Get the discount from route params
  const couponCode = route.params?.promoCode || ''; // Get the promo code from route params
  const [isSelected, setIsSelected] = useState('');
  const [extraData, setExtraData] = useState(false);
  const [cartTotal, setCartTotal] = useState(0); // Add cartTotal to keep track of total price
  const [finalAmount, setFinalAmount] = useState(0); // Final amount after applying discount
  const [loading, setLoading] = useState(false); // New loading state

  const paymentData = [
    {
      title: 'COD', // Cash on Delivery
      icon: colors.dark ? <Ionicons name="wallet-outline" size={26} color={colors.textColor} /> : <Ionicons name="wallet" size={26} color={colors.textColor} />
    },
    {
      title: 'Wallet',
      icon: colors.dark ? <Ionicons name="wallet-outline" size={26} color={colors.textColor} /> : <Ionicons name="wallet" size={26} color={colors.textColor} />
    },
    {
      title: 'Credit Card',
      icon: colors.dark ? <Ionicons name="card-outline" size={26} color={colors.textColor} /> : <Ionicons name="card" size={26} color={colors.textColor} />
    }
  ];

  useEffect(() => {
    setExtraData(!extraData);
    calculateTotal(); // Calculate total when component loads
  }, [isSelected]);

  useEffect(() => {
    calculateTotal(); // Recalculate when discount changes
  }, [discount]);

  // Calculate the cart total and subtract discount
  const calculateTotal = async () => {
    const cart = await AsyncStorage.getItem('cart');
    const parsedCart = cart ? JSON.parse(cart) : [];

    const total = parsedCart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    ).toFixed(2);

    const finalAmount = (total - discount).toFixed(2); // Apply the discount
    setCartTotal(total);
    setFinalAmount(finalAmount); // Set the final amount after discount
  };

  const onPressConfirmPayment = async () => {
    try {
      setLoading(true); // Start loading

      const userId = await getAsyncStorageData('user_id');
      const address = await fetchUserAddress(userId);

      // Fetch the cart data from AsyncStorage
      const cart = await AsyncStorage.getItem('cart');
      const parsedCart = cart ? JSON.parse(cart) : [];

      if (!address || parsedCart.length === 0) {
        alert('Address or cart data is missing!');
        setLoading(false); // Stop loading
        return;
      }

      const customer = await getAsyncStorageData('user_id');
      
      // Prepare the coupon data
      const couponLines = couponCode
        ? [
            {
              code: couponCode, // Promo code
              discount: discount.toString(), // Discount amount
              discount_tax: '0', // No tax on discount
              meta_data: [
                {
                  key: 'coupon_data',
                  value: {
                    id: '1234', // Optional, you can pass more metadata if needed
                    code: couponCode,
                    amount: discount.toString(),
                  }
                }
              ]
            }
          ]
        : []; 

      const orderData = {
        customer_id: customer,
        payment_method: isSelected === 'COD' ? 'cod' : 'other',
        payment_method_title: isSelected,
        set_paid: true,
        billing: {
          address_1: address.address_1,
          city: address.city,
          state: address.state,
          postcode: address.postcode,
        },
        line_items: parsedCart.map(item => ({
          product_id: item.id,
          quantity: item.quantity,
        })),
        coupon_lines: couponLines,
      };

      // Place the order
      const orderResponse = await createOrder(orderData);
      alert('Order placed successfully');

      await AsyncStorage.removeItem('cart');
      navigation.reset({
        index: 0,
        routes: [{ name: StackNav.TabBar }],
      });
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const onPressItem = item => setIsSelected(item.title);

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10}>
        <Ionicons
          name="scan"
          size={moderateScale(26)}
          color={colors.textColor}
        />
      </TouchableOpacity>
    );
  };

  const renderPaymentItem = ({ item, index }) => {
    return (
      <PaymentSelect
        item={item}
        isSelected={isSelected}
        onPressItem={() => onPressItem(item)}
      />
    );
  };

  const RenderFlashListHeader = () => {
    return (
      <View>
        {!!desc && (
          <CText type={'r16'} style={styles.mv10}>
            {desc}
          </CText>
        )}
      </View>
    );
  };

  const RenderFlashListFooter = () => {
    return (
      <View>
        {!!title && (
          <CButton
            title={strings.addNewCard}
            type={'S16'}
            color={!!colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            containerStyle={styles.mb20}
            onPress={() => alert('Not Active')}
          />
        )}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        title={!!title ? title : strings.payment}
        rightIcon={<RightIcon />}
      />
      <View style={styles.flex}>
        <FlashList
          data={!!isWallet ? paymentData : paymentData.slice(1)}
          extraData={extraData}
          renderItem={renderPaymentItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={styles.ph20}
          ListHeaderComponent={RenderFlashListHeader}
          ListFooterComponent={RenderFlashListFooter}
          estimatedItemSize={20}
        />
        <View style={{ marginVertical: 10 }}>
          <CText type="r16">{`Total: ${cartTotal} د.إ `}</CText>
          <CText type="r16">{`Discount: ${discount} د.إ `}</CText>
          <CText type="b16">{`Final Amount: ${finalAmount} د.إ `}</CText>
        </View>
      </View>
      <CButton
        title={loading ? 'Please wait...' : !!title ? strings.confirmPayment : strings.addNewCard} // Show "Please wait..." during loading
        type={'S16'}
        containerStyle={[styles.mh20, styles.mv10]}
        onPress={!!title && !loading ? onPressConfirmPayment : () => alert('Not Active')} // Disable button when loading
        disabled={loading} // Disable button while loading
        icon={loading && <ActivityIndicator size="small" color="#FFF" />} // Show loading spinner if loading
      />
    </CSafeAreaView>
  );
};
