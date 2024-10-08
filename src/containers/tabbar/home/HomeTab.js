import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';
import { FlashList } from '@shopify/flash-list';
import { useNavigation } from '@react-navigation/native';

import { commonColor, styles } from '../../../themes';
import { getHeight, moderateScale } from '../../../common/constants';
import CText from '../../../components/common/CText';
import SearchComponent from '../../../components/homeComponent/SearchComponent';
import HomeHeader from '../../../components/homeComponent/HomeHeader';
import HomeBanner from '../../../components/homeComponent/HomeBanner';
import SubHeader from '../../../components/SubHeader';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import HomeProductComponent from '../../../components/homeComponent/HomeProductComponent';
import { StackNav } from '../../../navigation/NavigationKeys';
import images from '../../../assets/images';
import { getHomePageCategoryWithProducts } from '../../../api/woocommerce';

const RenderHeaderItem = React.memo(({ search, onSearchInput }) => {
  const colors = useSelector(state => state.theme.theme);
  const navigation = useNavigation();

  const onPressSpecialOffer = () => navigation.navigate(StackNav.SpecialOffers);

  const bannerImage = (() => {
    return colors.dark ? images.swiperImageDark2 : images.swiperImageLight2;
  }, [colors]);

  return (
    <View>
      <HomeHeader />
      <SearchComponent search={search} onSearchInput={onSearchInput} />
      <SubHeader
        title1={'Special Offers'}
        title2={'See All'}
        onPressSeeAll={onPressSpecialOffer}
        style={styles.mt5}
      />
      <HomeBanner image={bannerImage} isTop={false} />
    </View>
  );
});

const RenderFooterItem = React.memo(({ search }) => {
  const navigation = useNavigation();
  const [selectedCategory, setSelectedCategory] = useState('All'); 
  const onPressMostPopular = () => navigation.navigate(StackNav.MostPopular);

  return (
    <View style={styles.mv30}>
      <SubHeader
        title1={'Most Popular'}
        title2={'See All'}
        onPressSeeAll={onPressMostPopular}
      />
      <MostPopularCategory onCategorySelect={setSelectedCategory} />
      <HomeProductComponent search={search} selectedCategory={selectedCategory} />
    </View>
  );
});

export default function HomeTab({ navigation }) {
  const colors = useSelector(state => state.theme.theme);
  const [categoryData, setCategoryData] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      const data = await getHomePageCategoryWithProducts();
      setCategoryData(data);
    };
    loadCategories();
  }, []);

  const onPressItem = item => {
    navigation.navigate(StackNav.ProductCategory, {
      item: {
        title: item.name,
        data: item.products,
      },
    });
  };

  const renderCategoryItem = ({ item, index }) => {
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
            source={{ uri: item.icon_url ? item.icon_url : undefined }}
            style={[
              localStyles.iconStyle,
              { tintColor: colors.dark ? colors.white : colors.textColor },
            ]}
          />
        </View>
        <CText
          type="b16"
          numberOfLines={1}
          align={'center'}
          color={colors.primaryTextColor}
          style={styles.mt10}>
          {item.name}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View style={[localStyles.root, { backgroundColor: colors.backgroundColor }]}>
      <FlashList
        data={categoryData}
        extraData={colors}
        renderItem={renderCategoryItem}
        keyExtractor={(item, index) => item.id.toString()}
        numColumns={4}
        estimatedItemSize={10}
        ListHeaderComponent={
          <RenderHeaderItem search={search} onSearchInput={setSearch} />
        }
        ListFooterComponent={<RenderFooterItem search={search} />}
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
