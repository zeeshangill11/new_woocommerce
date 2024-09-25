import React, { useEffect, useState } from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import ProductShortDetail2 from './ProductShortDetail2';
import {StackNav} from '../../navigation/NavigationKeys';
import { fetchMostPopularProducts } from '../../api/woocommerce'; 

export default function HomeProductComponent(props) {
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1); // Track the current page
  const [loading, setLoading] = useState(false); // Track loading state
  const [hasMore, setHasMore] = useState(true); // Track if more products can be loaded

  const debounceTimeout = 500; 
  
  const fetchProducts = async (search, pageNumber = 1) => {
    setLoading(true);
    const popularProducts = await fetchMostPopularProducts(search, pageNumber);
    if (popularProducts.length === 0) {
      setHasMore(false); // No more products to load
    } else {
      setProducts(prevProducts => [...prevProducts, ...popularProducts]); // Append new products
      setPage(pageNumber); // Update the current page
    }
    setLoading(false);
  };

  // Initial product fetch
  useEffect(() => {
    fetchProducts(props.search);
  }, []); 

  // Fetch products based on search input
  useEffect(() => {
    const handler = setTimeout(() => {
      if (props.search) {  
        setProducts([]); // Clear current products when searching
        fetchProducts(props.search, 1); // Fetch the first page of search results
      }
    }, debounceTimeout);

    return () => {
      clearTimeout(handler);
    };
  }, [props.search]);

  // Load more products when scrolling to the bottom
  const handleLoadMore = () => {
    if (!loading && hasMore) {
      fetchProducts(props.search, page + 1); // Fetch next page of products
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
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={10}
        onEndReached={handleLoadMore} // Trigger when scrolled to the end
        onEndReachedThreshold={0.5} // Load more when the user scrolls 50% to the bottom
        ListFooterComponent={loading && <ActivityIndicator size="large" color="#0000ff" />} // Show a loading spinner at the end
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
