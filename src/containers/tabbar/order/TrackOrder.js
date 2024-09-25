// Library import
import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {FlashList} from '@shopify/flash-list';

// Custom import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {useSelector} from 'react-redux';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import ProductOrderComponent from '../../../components/ProductOrderComponent';
import {styles} from '../../../themes';
import CText from '../../../components/common/CText';
import images from '../../../assets/images';
import {getHeight, moderateScale} from '../../../common/constants';
import {orderStatus, orderStatusCategory} from '../../../api/constant';
import CDivider from '../../../components/common/CDivider';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function TrackOrder({route, navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const item = route?.params?.item;
  const textColor2 = colors.dark ? colors.grayScale3 : colors.grayScale7;

  const status = 2;

  const onPressSearch = () => navigation.navigate(StackNav.Search);

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  const RenderTracker = ({item, index}) => {
    return (
      <View style={localStyles.trackerContainer}>
        <Image
          source={item?.image}
          resizeMode={'contain'}
          style={[
            localStyles.iconStyle,
            {
              tintColor:
                status >= item?.position ? colors.primary4 : colors.inactive,
            },
          ]}
        />
        <View style={localStyles.bottomIconContainer}>
          {!!item?.isHide && (
            <View
              style={[
                localStyles.lineStyle,
                {
                  borderColor:
                    status >= item?.position
                      ? colors.primary4
                      : colors.inactive,
                },
              ]}
            />
          )}
          <Image
            source={images.checkActive}
            resizeMode={'contain'}
            style={[
              localStyles.checkIconStyle,
              {
                tintColor:
                  status >= item?.position ? colors.primary4 : colors.inactive,
              },
            ]}
          />
        </View>
      </View>
    );
  };

  const RenderProductss = ({item, index}) => {
  

    return (
      <View style={localStyles.statusContainer}>
          <ProductOrderComponent
            item={item}
            isButton={false}
            isCategory={false}
          />
       
      </View>
    );
  };

  const RenderHeader = ({item}) =>{
    //console.log("Item passed to RenderHeader:", item); 

    return (
      <View>
        
        <View style={localStyles.trackerContainer}>
          <CText type={'b16'}>{strings.tracker}</CText>
        </View>
        <View style={localStyles.trackOrderContainer}>
          <FlashList
            data={orderStatusCategory}
            renderItem={RenderTracker}
            keyExtractor={(item, index) => index.toString()}
            estimatedItemSize={20}
            horizontal={true}
          />
        </View>
        <CText type={'b16'} align={'center'} style={styles.mv15}>
          Order Status: {item.status}
        </CText>
     
        
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={'Order Details'} rightIcon={<RightIcon />} />
      <FlashList
        data={item.line_items}
        renderItem={RenderProductss}
        keyExtractor={(item, index) => index.toString()}
        ListHeaderComponent={() => <RenderHeader item={item} />} 

        contentContainerStyle={localStyles.root}
        showsVerticalScrollIndicator={false}
        estimatedItemSize={20}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  root: {
    ...styles.ph20,
  },
  iconStyle: {
    height: moderateScale(24),
    width: moderateScale(24),
    ...styles.mb10,
  },
  checkIconStyle: {
    height: moderateScale(20),
    width: moderateScale(20),
  },
  bottomIconContainer: {
    ...styles.rowCenter,
    ...styles.pb10,
  },
  lineStyle: {
    ...styles.mr10,
    borderWidth: moderateScale(1),
    width: moderateScale(50),
    borderStyle: 'dashed',
  },
  trackerContainer: {
    ...styles.itemsEnd,
    ...styles.mr10,
  },
  trackOrderContainer: {
    ...styles.mt15,
    ...styles.selfCenter,
    ...styles.flex,
  },
  statusText: {
    ...styles.rowSpaceBetween,
    ...styles.mb10,
    ...styles.flex,
  },
  statusContainer: {
    ...styles.flexRow,
  },
  statusOuterIcon: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),

    ...styles.mr10,
    ...styles.itemsCenter,
    ...styles.justifyCenter,
  },
  statusInnerIcon: {
    height: moderateScale(13),
    width: moderateScale(13),
    borderRadius: moderateScale(6),
  },
  statusLineStyle: {
    ...styles.mr10,
    borderWidth: moderateScale(1),
    width: moderateScale(1),
    height: getHeight(37),
    borderStyle: 'dashed',
  },
});
