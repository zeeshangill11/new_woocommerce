// Library import
import {TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';

// Local Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {moderateScale} from '../../../common/constants';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import {
  Apple_Dark,
  Apple_Light,
  Facebook_Icon,
  Google_Icon,
  Wallet_Dark,
  Wallet_Light,
} from '../../../assets/svgs';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';
import PaymentSelect from '../../../components/cartComponent/PaymentSelect';
import {FlashList} from '@shopify/flash-list';

export default Payment = ({navigation, route}) => {
  const colors = useSelector(state => state.theme.theme);
  const title = route.params?.title;
  const desc = route.params?.desc;
  const isWallet = route.params?.isWallet;
  const [isSelected, setIsSelected] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setExtraData(!extraData);
  }, [isSelected]);

  const paymentData = [
    {
      title: strings.wallet,
      icon: [colors.dark ? <Wallet_Dark /> : <Wallet_Light />],
    },
    {
      title: strings.paypal,
      icon: <Facebook_Icon />,
    },
    {
      title: strings.applePay,
      icon: [colors.dark ? <Apple_Light /> : <Apple_Dark />],
    },
    {
      title: strings.googlePay,
      icon: <Google_Icon />,
    },
  ];

  const onPressAddNewCard = () => navigation.navigate(StackNav.AddNewCard);

  const onPressConfirmPayment = () =>
    navigation.navigate(StackNav.SetPin, {
      title: strings.enterYourPIN,
      isWallet: isWallet,
    });

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

  const renderPaymentItem = ({item, index}) => {
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
            onPress={onPressAddNewCard}
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
      </View>
      <CButton
        title={!!title ? strings.confirmPayment : strings.addNewCard}
        type={'S16'}
        containerStyle={[styles.mh20, styles.mv10]}
        onPress={!!title ? onPressConfirmPayment : onPressAddNewCard}
      />
    </CSafeAreaView>
  );
};
