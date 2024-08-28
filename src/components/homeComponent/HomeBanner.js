import {StyleSheet} from 'react-native';
import React, {memo} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import {styles} from '../../themes';
import {deviceWidth, getHeight, moderateScale} from '../../common/constants';
import {SliderBox} from 'react-native-image-slider-box';

const HomeBanner = ({image, isTop = true}) => {
  const colors = useSelector(state => state.theme.theme);
  return (
    <SliderBox
      images={[image, image, image]}
      sliderBoxHeight={getHeight(170)}
      dotColor={colors.dark ? colors.grayScale4 : colors.dark2}
      inactiveDotColor={colors.dark ? colors.dark2 : colors.grayScale4}
      paginationBoxVerticalPadding={getHeight(12)}
      autoplay={true}
      circleLoop={true}
      autoplayInterval={5000}
      resizeMethod={'resize'}
      resizeMode={'cover'}
      parentWidth={deviceWidth - moderateScale(40)}
      paginationBoxStyle={localStyles.paginationStyleItem}
      dotStyle={{
        ...localStyles.paginationStyleItemActive,
        backgroundColor: colors.dark ? colors.grayScale4 : colors.dark2,
      }}
      inactiveDotStyle={{
        ...localStyles.paginationStyleItemInactive,
        backgroundColor: colors.dark ? colors.dark2 : colors.grayScale4,
      }}
      ImageComponentStyle={[localStyles.swiperStyle, isTop && styles.mt15]}
      imageLoadingColor={colors.dark ? colors.grayScale4 : colors.dark2}
    />
  );
};

const localStyles = StyleSheet.create({
  paginationStyleItem: {
    alignItems: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    ...styles.pv10,
    width: moderateScale(20),
  },
  paginationStyleItemActive: {
    height: getHeight(6),
    width: moderateScale(16),
    borderRadius: moderateScale(3),
  },
  paginationStyleItemInactive: {
    height: moderateScale(6),
    width: moderateScale(6),
    borderRadius: moderateScale(3),
  },
  swiperStyle: {
    borderRadius: moderateScale(20),
    overflow: 'hidden',
  },
  swiperImageStyle: {
    width: deviceWidth - moderateScale(40),
    height: getHeight(170),
    resizeMode: 'cover',
    borderRadius: moderateScale(20),
  },
});

export default memo(HomeBanner);
