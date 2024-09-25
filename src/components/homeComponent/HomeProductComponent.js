import React, { useEffect, useState } from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ProductShortDetail2 from './ProductShortDetail2';
import {StackNav} from '../../navigation/NavigationKeys';
import { fetchMostPopularProducts } from '../../api/woocommerce'; 

export default function HomeProductComponent(props) {
  const navigation = useNavigation();
  const { search, selectedCategory } = props; 

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // Track if more products can be loaded

  const debounceTimeout = 500; 
  
  const fetchProducts = async (category, search, pageNumber = 1) => {
    setLoading(true);
    const fetchedProducts = await fetchMostPopularProducts(category, search, pageNumber);
   
    if (fetchedProducts.length === 0) {
      //setHasMore(false); // No more products to load
    } else {
      if (pageNumber === 1) {
        // Reset products when fetching the first page (e.g., on category change or new search)
        setProducts(fetchedProducts);
      } else {
        // Append new products for subsequent pages
        setProducts(prevProducts => [...prevProducts, ...fetchedProducts]);
      }
      setPage(pageNumber); // Update the current page
    }
    setLoading(false);
  };

  // Fetch products based on the selected category or search term
  useEffect(() => {
    const handler = setTimeout(() => {
      setProducts([]);
      setPage(1); // Reset page to 1 when search or category changes
      console.log(selectedCategory);
      fetchProducts(selectedCategory, search, 1); // Fetch products based on search and category
    }, debounceTimeout); // Add debounce delay to API calls
    
    return () => {
      clearTimeout(handler); // Clear timeout when effect is cleaned up
    };
  }, [search, selectedCategory]);

 
  const handleLoadMore = () => {
    console.log("zzzzzzzzzzz");
    if (!loading ) {
      
      fetchProducts(selectedCategory, search, page + 1); // Fetch next page of products
    }
  };

  const renderItem = ({item, index}) => {
    return (
      <ProductShortDetail2
        item={item}
        index={index}
        onPress={() => navigation.navigate(StackNav.ProductDetail, { item })}
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
        keyExtractor={(item) => (item.id ? item.id.toString() : Math.random().toString())}
        estimatedItemSize={100}
        onEndReached={handleLoadMore} // Trigger when scrolled to the end
        onEndReachedThreshold={0.5} // Load more when the user scrolls 50% to the bottom
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />} // Show loading spinner when fetching more products
      />
    </View>
  );
}

const styles = StyleSheet.create({
  searchText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
