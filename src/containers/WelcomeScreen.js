import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import {styles} from '../themes';
import {deviceHeight, deviceWidth} from '../common/constants';
import images from '../assets/images';
import CText from '../components/common/CText';
import {useSelector} from 'react-redux';
import {StackNav} from '../navigation/NavigationKeys';

export default function WelcomeScreen({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  useEffect(() => {
    setTimeout(() => {
      navigation.replace(StackNav.onBoarding);
    }, 3000);
  }, []);

  return (
    <View style={styles.flex}>
      <Image
        source={images.splash}
        style={localStyles.imageStyle}
        resizeMode="cover"
      />
      <View style={localStyles.bottomTextContainer}>
        <CText color={colors.white} type={'M26'}>
          {'Welcome to 👋'}
        </CText>
        <CText color={colors.white} type={'B66'}>
          {'Furnia'}
        </CText>
        <CText style={styles.mt15} color={colors.white} type={'R18'}>
          {
            'The best furniture e-commerce app of the century for your daily needs!'
          }
        </CText>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  imageStyle: {
    width: deviceWidth,
    height: deviceHeight,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 0,
    ...styles.ph20,
    ...styles.pb30,
  },
});
