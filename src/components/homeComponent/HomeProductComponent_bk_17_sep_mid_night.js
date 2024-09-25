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
export default function HomeProductComponent(props) {
  const navigation = useNavigation();
  const onPressDetail = itm => navigation.navigate(StackNav.ProductDetail, {item: itm});

  //const [debounceTimeout, setDebounceTimeout] = useState(null);

  
  const [products, setProducts] = useState([]);
  const debounceTimeout = 500; 
  
  useEffect(() => {
    // Fetch popular products on page load
    const fetchInitialProducts = async () => {
      const popularProducts = await fetchMostPopularProducts(props.search);
      setProducts(popularProducts);
    };

    fetchInitialProducts();
  }, []); // Empty dependency array ensures this runs only on initial load

  useEffect(() => {
    // Debounced fetch based on search input
    const handler = setTimeout(() => {
      if (props.search) {  // Only call if search input is not empty
        const fetchDebouncedProducts = async () => {
          const popularProducts = await fetchMostPopularProducts(props.search);
          setProducts(popularProducts);
        };

        fetchDebouncedProducts();
      }
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [props.search]); 



  

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
      <View>
      
      {props.search !== "" && (
        <Text style={styles.searchText}>Search Result(s): {props.search}</Text>
      )}
      <FlashList
        data={products}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={10}
      />
      </View>
  );

}


const styles = StyleSheet.create({
  searchText: {
    marginTop: 10, // Add some top margin
    fontSize: 16,
    fontWeight: 'bold',
  },
})
