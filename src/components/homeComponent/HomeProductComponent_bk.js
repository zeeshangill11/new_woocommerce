import React, { useEffect, useState } from 'react';
import {FlashList} from '@shopify/flash-list';
import {useNavigation} from '@react-navigation/native';
import { View, Text, Image, StyleSheet } from 'react-native';
// Custom Imports
import {homeProductData} from '../../api/constant';
import ProductShortDetail from './ProductShortDetail';
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
      <ProductShortDetail
        item={item}
        index={index}
        onPress={() => onPressDetail(item)}
      />
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Most Popular Products</Text>
      <FlashList
        data={products}
        renderItem={({ item }) => (
          <View style={styles.productItem}>
            <Image source={{ uri: item.images[0].src }} style={styles.productImage} />
            <Text style={styles.productName}>{item.name}  </Text>
            <Text style={styles.productPrice}>{item.price} {item.currency} </Text>
          </View>
        )}
        numColumns={2}
        keyExtractor={(item) => item.id.toString()}
        estimatedItemSize={10}
      />
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productItem: {
    flex: 1,
    margin: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  productImage: {
    width: '100%',
    height: 150,
    resizeMode: 'contain',
    marginBottom: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 14,
    color: '#888',
  },
});