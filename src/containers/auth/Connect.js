// Library Imports
import {StyleSheet, View, TouchableOpacity, Image, Alert} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Local Imports
import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import {getHeight, isIOS, moderateScale} from '../../common/constants';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {
  Apple_Dark,
  Apple_Light,
  Connect_Dark,
  Connect_Light,
  Facebook_Icon,
  Google_Icon,
} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';
import CButton from '../../components/common/CButton';

export default Connect = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const onPressSignWithPassword = () => navigation.navigate(StackNav.Login);
  const onPressSignUp = () => navigation.navigate(StackNav.Register);

  const SocialBtn = ({title, frontIcon, onPress = () => {}}) => {
    return (
      <TouchableOpacity
        style={[
          localStyles.btnContainer,
          {borderColor: colors.bColor, backgroundColor: colors.backgroundColor},
        ]}
        onPress={onPress}>
        {frontIcon}
        <CText style={styles.ml10} type={'S16'} color={colors.textColor}>
          {title}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <CSafeAreaView style={styles.flexCenter}>
      {colors.dark === 'dark' ? (
        <Connect_Dark width={moderateScale(200)} height={getHeight(150)} />
      ) : (
        <Connect_Light width={moderateScale(200)} height={getHeight(150)} />
      )}
      <CText type={'B32'} style={styles.mv20}>
        {strings.letsYouIn}
      </CText>

    


      <CButton
        title={strings.signWithPassword}
        type={'S16'}
        containerStyle={localStyles.signBtnContainer}
        bgColor={colors.btnColor}
        onPress={onPressSignWithPassword}
      />

      <TouchableOpacity
        onPress={onPressSignUp}
        style={localStyles.signUpContainer}>
        <CText color={colors.grayScale5} type={'M16'}>
          {strings.dontHaveAccount}
        </CText>
        <CText type={'b16'} style={styles.ml10} color={colors.textColor}>
          {strings.signUp}
        </CText>
      </TouchableOpacity>
    </CSafeAreaView>
  );
};

const localStyles = StyleSheet.create({
  btnContainer: {
    ...styles.mt15,
    ...styles.center,
    ...styles.p15,
    width: '85%',
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(2),
    ...styles.rowCenter,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv30,
  },
  orContainer: {
    height: moderateScale(1),
    width: '40%',
  },
  signBtnContainer: {
    width: '85%',
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv30,
  },
});
