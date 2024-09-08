import {
  Image,
  ImageBackground,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Alert, // Import Alert from react-native
} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import {RenderHTML} from "react-native-render-html";

export default function ProductDetail({navigation, route}) {
  const item = route?.params?.item; // Get the item from the route parameters
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

  // Function to handle adding the product to the cart
  const onAddToCart = async () => {
      try {
        const cart = await AsyncStorage.getItem('cart');
        const cartItems = cart ? JSON.parse(cart) : [];

        const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
       
        if (existingItemIndex >= 0) {
          cartItems[existingItemIndex].quantity += quantity;
        } else {
          var imageSrc = item.images?.[0]?.src || "";
          const itemToAdd = {
            id: item.id,
            name: item.name,
            price: item.price,
            images: imageSrc,
            quantity: quantity
          };
          cartItems.push(itemToAdd);
        }

        await AsyncStorage.setItem('cart', JSON.stringify(cartItems));
        console.log("Cart updated:", cartItems); // This should log the actual cart array
        //getCartItems();

        Alert.alert(strings.success, `${item?.name} Added to Cart`, [{ text: "OK" }]);
      } catch (error) {
        console.error('Error adding item to cart:', error);
        Alert.alert(strings.error, 'Failed to add item to cart. Please try again.', [{ text: "OK" }]);
      }
  };

  const getCartItems = async () => {

    try {
      const cart = await AsyncStorage.getItem('cart');

      console.log(cart);
      return cart ? (cart) : [];
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
    

  };

  const checkCartContents = async () => {
      try {
          const cart = await AsyncStorage.getItem('cart');
          const cartItems = cart ? JSON.parse(cart) : [];
          console.log("Cart contents:", cartItems); // This should log the actual contents of the cart
      } catch (error) {
          console.error('Error fetching cart contents:', error);
      }
  };

  const stripHtmlTags = (html) => {
    // Remove HTML tags
    const textWithoutHtml = html.replace(/<[^>]*>?/gm, '');
    // Replace multiple line breaks or spaces with a single space
    const normalizedText = textWithoutHtml.replace(/\n\s*\n+/g, '\n').trim(); 
    return normalizedText;  
  };

  const plainTextDescription = stripHtmlTags(item?.description); 
  
  return (
    <CSafeAreaView>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={{uri: item?.images[0]?.src}} style={localStyles.root}>
          <CHeader title={item?.name} />
        </ImageBackground>
        <View style={styles.mh20}>
          <View style={localStyles.productText}>
            <CText style={styles.flex} numberOfLines={1} type={'b26'}>
              {item?.name}
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
              <CText type={'s12'}>{item?.total_sales + ' ' + strings.sold}</CText>
            </View>
            <Image
              source={images.starFill}
              style={[localStyles.starStyle, {tintColor: colors.textColor}]}
            />
            <TouchableOpacity onPress={onPressReview}>
              <CText
                type={'s14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale7}>
                {item?.average_rating}
                {' (' + item?.rating_count + ' ' + strings.reviews + ')'}
              </CText>
            </TouchableOpacity>
          </View>
          <CDivider />
          <CText numberOfLines={1} type={'b18'}>
            {strings.description}
          </CText>
          <CText style={styles.mt5} type={'r14'}>
            {plainTextDescription}
          </CText>
          <View style={localStyles.sizeColorContainer}>
            <CText type={'b18'} style={styles.mb10}>
              {strings.color}
            </CText>
            <ColorComponent isSize={!item?.attributes?.find(attr => attr.name === 'Size')} />
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
            onPress={onAddToCart} // Updated to use the onAddToCart function
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
