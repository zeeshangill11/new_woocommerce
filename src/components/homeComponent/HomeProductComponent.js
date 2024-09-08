import React, { useEffect, useState } from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import { View, Text, Image, StyleSheet } from 'react-native';
// Custom Imports
import {homeProductData} from '../../api/constant';
import ProductShortDetail from './ProductShortDetail';
import ProductShortDetail2 from './ProductShortDetail2';
import {StackNav} from '../../navigation/NavigationKeys';
import { fetchMostPopularProducts } from '../../api/woocommerce'; 
export default function HomeProductComponent() {
  const navigation = useNavigation();
  const onPressDetail = itm => navigation.navigate(StackNav.ProductDetail, {item: itm});



  
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getMostPopularProducts = async () => {
      const popularProducts = await fetchMostPopularProducts();
      setProducts(popularProducts);
    };

    getMostPopularProducts();
  }, []);



  const renderItem = ({item, index}) => {
    return (
      <ProductShortDetail2
        item={item}
        index={index}
        onPress={() => onPressDetail(item)}
      />
    );
  };


  return (
      <FlashList
        data={products}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={10}
      />
  );

}
