// Library Imports
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect, useMemo, useCallback} from 'react';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {commonColor, styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {homeCategoryData} from '../../../api/constant';
import SearchComponent from '../../../components/homeComponent/SearchComponent';
import HomeHeader from '../../../components/homeComponent/HomeHeader';
import HomeBanner from '../../../components/homeComponent/HomeBanner';
import SubHeader from '../../../components/SubHeader';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import HomeProductComponent from '../../../components/homeComponent/HomeProductComponent';
import {StackNav} from '../../../navigation/NavigationKeys';
import images from '../../../assets/images';

const RenderHeaderItem = React.memo(() => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();
  const [search, setSearch] = useState('');

  const onPressSpecialOffer = useCallback(
    () => navigation.navigate(StackNav.SpecialOffers),
    [],
  );

  const onSearchInput = useCallback(text => setSearch(text), []);

  const bannerImage = useMemo(() => {
    return colors.dark ? images.swiperImageDark2 : images.swiperImageLight2;
  }, [colors]);

  return (
    <View>
      <HomeHeader />
      <SearchComponent search={search} onSearchInput={onSearchInput} />
      <SubHeader
        title1={strings.specialOffers}
        title2={strings.seeAll}
        onPressSeeAll={onPressSpecialOffer}
        style={styles.mt5}
      />
      <HomeBanner image={bannerImage} isTop={false} />
    </View>
  );
});

const RenderFooterItem = React.memo(() => {
  const navigation = useNavigation();

  const onPressMostPopular = () => navigation.navigate(StackNav.MostPopular);

  return (
    <View style={styles.mv30}>
      <SubHeader
        title1={strings.mostPopular}
        title2={strings.seeAll}
        onPressSeeAll={onPressMostPopular}
      />
      <MostPopularCategory />
      <HomeProductComponent />
    </View>
  );
});

export default function HomeTab({navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const [extraData, setExtraData] = useState(true);

  useEffect(() => {
    setExtraData(!extraData);
  }, [colors]);

  const onPressItem = item =>
    navigation.navigate(StackNav.ProductCategory, {item: item});

  const renderCategoryItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={() => onPressItem(item)}
        style={localStyles.categoryRoot}>
        <View
          style={[
            localStyles.iconContainer,
            {
              backgroundColor: colors.dark
                ? colors.dark3
                : colors.transparentSilver,
            },
          ]}>
          <Image
            source={item?.image}
            style={[
              localStyles.iconStyle,
              {tintColor: colors.dark ? colors.white : colors.textColor},
            ]}
          />
        </View>
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {item.title}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[localStyles.root, {backgroundColor: colors.backgroundColor}]}>
      <FlashList
        data={homeCategoryData}
        extraData={extraData}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={4}
        estimatedItemSize={10}
        ListHeaderComponent={<RenderHeaderItem />}
        ListFooterComponent={<RenderFooterItem />}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
    ...styles.flex,
  },
  iconStyle: {
    width: moderateScale(28),
    height: moderateScale(28),
  },
  iconContainer: {
    width: moderateScale(60),
    height: moderateScale(60),
    borderRadius: moderateScale(30),
    backgroundColor: commonColor.grayScale3,
    ...styles.center,
  },
  categoryRoot: {
    width: '100%',
    height: getHeight(100),
    ...styles.itemsCenter,
    ...styles.mt40,
  },
});
