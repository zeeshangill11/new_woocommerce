import React from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';

// Custom Imports
import {homeProductData} from '../../api/constant';
import ProductShortDetail from './ProductShortDetail';
import {StackNav} from '../../navigation/NavigationKeys';

export default function HomeProductComponent() {
  const navigation = useNavigation();
  const onPressDetail = itm =>
    navigation.navigate(StackNav.ProductDetail, {item: itm});

  const renderItem = ({item, index}) => {
    return (
      <ProductShortDetail
        item={item}
        index={index}
        onPress={() => onPressDetail(item)}
      />
    );
  };

  return (
    <FlashList
      data={homeProductData}
      renderItem={renderItem}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      estimatedItemSize={10}
    />
  );
}
