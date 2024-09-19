// Library Imports
import {StyleSheet, View,Text,ActivityIndicator } from 'react-native';
import React, {useRef, useState,useEffect} from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import ProductOrderComponent from '../../../components/ProductOrderComponent';
import {completedOrderData} from '../../../api/constant';
import LeaveReview from '../../../components/models/LeaveReview';
import RenderNullComponent from '../../../components/RenderNullComponent';

import {fetchCompletedOrders} from '../../../api/woocommerce'; 
import ProductOrderDiv from '../../../components/ProductOrderDiv';

import {getAsyncStorageData} from '../../../utils/helpers';


export default function Completed() {
  const leaveReviewRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState({});
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    const loadOrders = async () => {
      setLoading(true);
      var user_id =  await getAsyncStorageData('user_id');
      const data = await fetchCompletedOrders(user_id);
      console.log(data);
      setOrders(data);
      setLoading(false);
    };
    loadOrders();
  }, []);


  const onPressReview = item => {
    setSelectedItem(item);
    leaveReviewRef?.current?.show();
  };

  
  const renderItem = ({item}) => {
    return <ProductOrderDiv item={item} />;
  };


  return (
    <View style={localStyles.root}>
      {loading ? (
        <View style={localStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
          <Text style={localStyles.loadingText}>Loading Completed Orders...</Text>
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
          title1="No Completed Orders"
          title2="There are currently no orders completed."
        />
      )}
      <LeaveReview SheetRef={leaveReviewRef} item={selectedItem} />
    </View>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.flex,
  },
  contentContainerStyle: {
    ...styles.pb20,
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
