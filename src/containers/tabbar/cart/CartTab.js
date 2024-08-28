// Library Imports
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useRef, useState} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import CText from '../../../components/common/CText';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {styles} from '../../../themes';
import {
  AppLogoDark,
  AppLogoLight,
  RightDark,
  RightLight,
  Search_Dark,
  Search_Light,
} from '../../../assets/svgs';
import {onGoingData} from '../../../api/constant';
import RenderNullComponent from '../../../components/RenderNullComponent';
import CartProductComponent from '../../../components/cartComponent/CartProductComponent';
import CButton from '../../../components/common/CButton';
import {deviceWidth, getHeight, moderateScale} from '../../../common/constants';
import {StackNav} from '../../../navigation/NavigationKeys';
import TrashItem from '../../../components/models/TrashItem';

export default function CartTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const trashSheetRef = useRef(null);
  const [trashData, setTrashData] = useState({});
  const [cartData, setCartData] = useState(onGoingData);

  const onPressSearch = () => navigation.navigate(StackNav.Search);
  const onPressTrash = item => {
    setTrashData(item);
    trashSheetRef?.current?.show();
  };

  const onPressCheckout = () =>
    navigation.navigate(StackNav.CheckOut, {
      cartData: cartData,
    });

  const RightIcon = () => {
    return (
      <TouchableOpacity style={styles.ph10} onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
      </View>
    );
  };

  const renderItem = ({item}) => {
    return (
      <CartProductComponent
        item={item}
        onPressTrash={() => onPressTrash(item)}
      />
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.cart}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />
      {!!cartData && cartData.length ? (
        <View style={localStyles.root}>
          <FlashList
            data={cartData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            bounces={false}
            contentContainerStyle={localStyles.contentContainerStyle}
            estimatedItemSize={20}
          />
          <View style={localStyles.bottomContainer}>
            <View style={localStyles.priceContainer}>
              <CText
                type={'m14'}
                color={colors.dark ? colors.grayScale3 : colors.grayScale6}>
                {strings.totalPrice}
              </CText>
              <CText type={'b20'}>{'$1256.00'}</CText>
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
      <TrashItem SheetRef={trashSheetRef} item={trashData} />
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
