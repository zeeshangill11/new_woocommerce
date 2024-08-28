// Library Imports
import {StyleSheet, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom Imports
import {styles} from '../../../themes';
import strings from '../../../i18n/strings';
import ProductOrderComponent from '../../../components/ProductOrderComponent';
import {onGoingData} from '../../../api/constant';
import RenderNullComponent from '../../../components/RenderNullComponent';

export default function OnGoing() {
  const renderItem = ({item}) => {
    return <ProductOrderComponent item={item} />;
  };

  return (
    <View style={localStyles.root}>
      {!!onGoingData && onGoingData.length ? (
        <FlashList
          data={onGoingData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          bounces={false}
          contentContainerStyle={localStyles.contentContainerStyle}
          estimatedItemSize={20}
        />
      ) : (
        <RenderNullComponent
          title1={strings.onGoingNullTitle}
          title2={strings.onGoingNullDesc}
        />
      )}
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
});
