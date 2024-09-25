// Library Imports
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CText from '../../../components/common/CText';
import images from '../../../assets/images';
import {styles} from '../../../themes';
import {moderateScale} from '../../../common/constants';
import {
  AppLogoDark,
  AppLogoLight,
  Menu_Dark,
  Menu_Light,
  OrderIcon,
  Search_Dark,
  Search_Light,
  TopUpIcon,
  TopUpWalletDark,
  TopUpWalletLight,
} from '../../../assets/svgs';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import SubHeader from '../../../components/SubHeader';
import {walletData} from '../../../api/constant';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function WalletTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  const onPressSeeAll = () => navigation.navigate(StackNav.TransactionHistory);

  const onPressWallet = () => navigation.navigate(StackNav.TopUpEWallet);

  const onPressItem = itm =>
    navigation.navigate(StackNav.EReceipt, {item: itm});

  const onPressSearch = () => navigation.navigate(StackNav.Search);

  const RightIcon = () => {
    return (
      <View style={styles.rowCenter}>
        <TouchableOpacity onPress={onPressSearch}>
          {colors.dark ? <Search_Dark /> : <Search_Light />}
        </TouchableOpacity>
        <TouchableOpacity style={styles.ph10}>
          {colors.dark ? <Menu_Dark /> : <Menu_Light />}
        </TouchableOpacity>
      </View>
    );
  };

  const LeftIcon = () => {
    return (
      <View style={styles.pr10}>
        {colors.dark ? <AppLogoDark /> : <AppLogoLight />}
      </View>
    );
  };

  const renderHistoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressItem(item)}
        style={localStyles.renderItemContainer}>
        <View style={[styles.rowCenter, styles.flex]}>
          {item?.status === strings.topUp ? (
            colors.dark ? (
              <TopUpWalletDark />
            ) : (
              <TopUpWalletLight />
            )
          ) : (
            <Image
              source={item.productImage}
              style={[
                localStyles.productImage,
                {backgroundColor: colors.imageBg},
              ]}
            />
          )}
          <View style={[styles.mh10, styles.flex]}>
            <CText numberOfLines={1} type={'b16'}>
              {item.product}
            </CText>
            <CText numberOfLines={1} style={styles.mt5} type={'s14'}>
              {item.date}
            </CText>
          </View>
        </View>
        <View style={styles.itemsEnd}>
          <CText type={'b16'}>{item?.price}</CText>
          <View style={[styles.rowCenter, styles.mt5]}>
            <CText type={'s14'} style={[styles.mr5]}>
              {item?.status}
            </CText>
            {item?.status === strings.topUp ? <TopUpIcon /> : <OrderIcon />}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  const renderHeaderItem = () => {
    return (
      <View>
        <TouchableOpacity onPress={onPressWallet}>
          <Image
            source={images.walletCard}
            style={localStyles.creditCardImage}
          />
        </TouchableOpacity>
        <SubHeader
          title1={strings.transactionHistory}
          title2={strings.seeAll}
          onPressSeeAll={onPressSeeAll}
          style={styles.ph20}
        />
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader
        isHideBack={true}
        title={strings.wallet}
        isLeftIcon={<LeftIcon />}
        rightIcon={<RightIcon />}
      />

      <FlatList
        data={walletData}
        renderItem={renderHistoryItem}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={renderHeaderItem}
        showsVerticalScrollIndicator={false}
        bounces={false}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  creditCardImage: {
    width: moderateScale(380),
    height: moderateScale(220),
    resizeMode: 'cover',
    ...styles.selfCenter,
  },
  productImage: {
    width: moderateScale(55),
    height: moderateScale(55),
    borderRadius: moderateScale(28),
    resizeMode: 'contain',
  },
  renderItemContainer: {
    ...styles.rowSpaceBetween,
    ...styles.ph20,
    ...styles.mb15,
  },
});
