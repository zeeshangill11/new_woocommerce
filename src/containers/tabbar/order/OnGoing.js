import React, {useEffect, useState} from 'react';
import {StyleSheet, View,Text,ActivityIndicator } from 'react-native';
import {FlashList} from '@shopify/flash-list';
import {fetchOngoingOrders} from '../../../api/woocommerce'; // Import your API function
import RenderNullComponent from '../../../components/RenderNullComponent';
import ProductOrderComponent from '../../../components/ProductOrderComponent';
import ProductOrderDiv from '../../../components/ProductOrderDiv';

import {getAsyncStorageData} from '../../../utils/helpers';

export default function OnGoing() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      var user_id =  await getAsyncStorageData('user_id');
      const data = await fetchOngoingOrders(user_id);
      console.log(data);
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);

  const renderItem = ({item}) => {
    return <ProductOrderDiv item={item} />;
  };

  const renderItem2 = ({ item }) => {
    const { id, number, billing, total, payment_method, status, line_items } = item;

    return (
      <View key={id} style={{ padding: 10, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text>Order ID: {number}</Text>
        <Text>Status: {status}</Text>
        <Text>Billing Address: {billing.address_1}, {billing.city}, {billing.state}</Text>
        <Text>Total Amount: {total}</Text>
        <Text>Payment Method: {payment_method}</Text>
        
        {/* Display Line Items */}
        <Text>Items:</Text>
        {line_items && line_items.map((item, index) => (
          <Text key={index}>{item.name} - {item.quantity}</Text>
        ))}
      </View>
    );
  };

  return (
    <View style={localStyles.root}>
      {loading ? (
        <View style={localStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={localStyles.loadingText}>Loading Orders...</Text>
        </View>
      ) : orders.length > 0 ? (
        <FlashList
          data={orders}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={localStyles.contentContainerStyle}
          estimatedItemSize={20}
        />
      ) : (
        <RenderNullComponent
          title1="No Ongoing Orders"
          title2="There are currently no orders in progress."
        />
      )}
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  contentContainerStyle: {
    paddingBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  }

});
