// Library import
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import ActionSheet from 'react-native-actions-sheet';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

// Local import
import {deviceWidth, getHeight, moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import CText from '../common/CText';
import strings from '../../i18n/strings';
import CButton from '../common/CButton';
import CDivider from '../common/CDivider';
import MostPopularCategory from '../homeComponent/MostPopularCategory';
import {
  carConditionData,
  ratingData,
  sortAndFilterData,
} from '../../api/constant';

const SortAndFilter = props => {
  const {SheetRef, onPressCancel, onPressLogOut} = props;
  const colors = useSelector(state => state.theme.theme);

  const customMarker = event => {
    return (
      <View style={localStyles.markerContainer}>
        <View
          style={[
            localStyles.sliderLength,
            {
              backgroundColor: colors.dark ? colors.dark3 : colors.imageBg,
              borderColor: colors.dark ? colors.white : colors.textColor,
            },
          ]}
        />
        <CText color={colors.darkGray} type={'r16'} style={styles.mt5}>
          {'$' + event.currentValue}
        </CText>
      </View>
    );
  };

  return (
    <ActionSheet
      ref={SheetRef}
      gestureEnabled={true}
      indicatorStyle={{
        backgroundColor: colors.dark ? colors.dark3 : colors.grayScale3,
        ...styles.actionSheetIndicator,
      }}
      containerStyle={[
        localStyles.actionSheetContainer,
        {backgroundColor: colors.backgroundColor},
      ]}>
      <View style={localStyles.bottomContainer}>
        <CText type={'B22'} style={styles.mt5} align={'center'}>
          {strings.sortAndFilter}
        </CText>
        <CDivider style={styles.mv20} />
        <CText type={'b18'} style={localStyles.textStyles}>
          {strings.carBrands}
        </CText>
        <View style={localStyles.categoryContainer}>
          <MostPopularCategory />
        </View>
        <View style={styles.mb30}>
          <CText type={'b18'} style={styles.mb10}>
            {strings.priceRange}
          </CText>
          <MultiSlider
            sliderLength={deviceWidth - moderateScale(24) * moderateScale(2)}
            values={[100, 500]}
            min={0}
            max={1000}
            onValuesChange={values => console.log(values)}
            step={1}
            markerOffsetY={20}
            selectedStyle={{backgroundColor: colors.textColor}}
            trackStyle={[
              localStyles.sliderContainer,
              {backgroundColor: colors.dark ? colors.dark3 : colors.imageBg},
            ]}
            minMarkerOverlapDistance={50}
            customMarker={customMarker}
          />
        </View>
        <CText type={'b18'} style={localStyles.textStyles}>
          {strings.sortBy}
        </CText>
        <View style={localStyles.categoryContainer}>
          <MostPopularCategory chipsData={sortAndFilterData} />
        </View>
        <CText type={'b18'} style={localStyles.textStyles}>
          {strings.rating}
        </CText>
        <View style={localStyles.categoryContainer}>
          <MostPopularCategory isStar={true} chipsData={ratingData} />
        </View>
        <CDivider style={styles.mb20} />
        <View style={localStyles.btnContainer}>
          <CButton
            title={strings.reset}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            color={colors.dark ? colors.white : colors.primary}
            bgColor={colors.dark3}
            onPress={onPressCancel}
          />
          <CButton
            title={strings.apply}
            type={'S16'}
            containerStyle={localStyles.skipBtnContainer}
            onPress={onPressLogOut}
          />
        </View>
      </View>
    </ActionSheet>
  );
};

const localStyles = StyleSheet.create({
  actionSheetContainer: {
    ...styles.ph20,
  },
  textStyles: {
    ...styles.mb15,
  },
  categoryContainer: {
    ...styles.mb15,
  },
  btnContainer: {
    ...styles.pb30,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
  bottomContainer: {
    ...styles.pv10,
  },
  sliderContainer: {
    height: moderateScale(6),
    borderRadius: moderateScale(6),
  },
  sliderLength: {
    height: moderateScale(24),
    width: moderateScale(24),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(6),
    top: moderateScale(-5),
  },
  markerContainer: {
    height: getHeight(55),
    ...styles.center,
    ...styles.justifyStart,
  },
});

export default SortAndFilter;
