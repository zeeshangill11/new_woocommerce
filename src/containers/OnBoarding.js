import React, { useState, useRef, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, Image, View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Local Imports
import { deviceWidth, getHeight, moderateScale } from '../common/constants';
import CButton from '../components/common/CButton';
import CSafeAreaView from '../components/common/CSafeAreaView';
import strings from '../i18n/strings';
import { StackNav } from '../navigation/NavigationKeys';
import { styles } from '../themes';
import { setOnBoarding } from '../utils/asyncstorage';
import CText from '../components/common/CText';

const OnBoarding = ({ navigation }) => {
  const colors = useSelector(state => state.theme.theme);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [onBoardingData, setOnBoardingData] = useState([]);
  const [loading, setLoading] = useState(true);
  const slideRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fashion.bcreative.ae/wp-json/website/v1/onboarding_screens');
        setOnBoardingData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch onboarding data:', error);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const _onViewableItemsChanged = useCallback(({ viewableItems }) => {
    setCurrentIndex(viewableItems[0]?.index);
  }, []);

  const _viewabilityConfig = { itemVisiblePercentThreshold: 50 };

  const onPressRightArrow = async () => {
    if (currentIndex === 2) {
      await setOnBoarding(true);
      navigation.reset({
        index: 0,
        routes: [{ name: StackNav.Auth }],
      });
    } else {
      slideRef.current.scrollToIndex({ index: currentIndex + 1 });
    }
  };

  const RenderOnboardingItem = useCallback(
    ({ item, index }) => {
      return (
        <View style={localStyles.rendetItemConatiner}>
          <Image
            source={{ uri: item.image.url }}
            resizeMode="contain"
            style={localStyles.imageStyle}
          />
          <View style={{ height: '20%', ...styles.center }}>
            <CText type={'B30'} align={'center'}>
              {item.title}
            </CText>
          </View>
        </View>
      );
    },
    [],
  );

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <CSafeAreaView style={styles.flex}>
      <FlatList
        data={onBoardingData}
        ref={slideRef}
        renderItem={RenderOnboardingItem}
        keyExtractor={(item, index) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        bounces={false}
        horizontal
        onViewableItemsChanged={_onViewableItemsChanged}
        viewabilityConfig={_viewabilityConfig}
        pagingEnabled
      />

      <View style={styles.rowCenter}>
        {onBoardingData.map((_, index) => (
          <View
            style={[
              localStyles.bottomIndicatorStyle,
              {
                width: index !== currentIndex ? moderateScale(10) : moderateScale(20),
                backgroundColor: index !== currentIndex ? (colors.dark ? colors.dark3 : colors.grayScale3) : colors.btnColor,
              },
            ]}
          />
        ))}
      </View>

      <CButton
        title={currentIndex === 2 ? strings.getStarted : strings.next}
        containerStyle={localStyles.submitButton}
        type={'S18'}
        onPress={onPressRightArrow}
      />
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  submitButton: {
    ...styles.mb15,
    ...styles.mh25,
  },
  rendetItemConatiner: {
    width: deviceWidth,
    ...styles.ph20,
    ...styles.center,
  },
  imageStyle: {
    height: '80%',
    width: deviceWidth,
    resizeMode: 'cover',
  },
  bottomIndicatorStyle: {
    height: getHeight(10),
    ...styles.mb30,
    ...styles.mt10,
    borderRadius: moderateScale(10),
    ...styles.mh5,
  },
});

export default OnBoarding;
