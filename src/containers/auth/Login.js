// Library Imports
import {StyleSheet, View, TouchableOpacity,Alert} from 'react-native';
import React, {memo, useEffect,useState} from 'react';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Local Imports

import {axios} from 'axios';

import strings from '../../i18n/strings';
import {styles} from '../../themes';
import CText from '../../components/common/CText';
import {ACCESS_TOKEN, getHeight, moderateScale} from '../../common/constants';
import CHeader from '../../components/common/CHeader';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import {
  Google_Icon,
  Facebook_Icon,
  Apple_Light,
  Apple_Dark,
  AppLogoDark,
  AppLogoLight,
} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';
import CInput from '../../components/common/CInput';
import {validateEmail, validatePassword} from '../../utils/validators';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';
import {setAsyncStorageData} from '../../utils/helpers';
import CButton from '../../components/common/CButton';

const Login = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);

  const BlurredStyle = {
    backgroundColor: colors.inputBg,
    borderColor: colors.bColor,
  };
  const FocusedStyle = {
    borderColor: colors.textColor,
  };

  const BlurredIconStyle = colors.grayScale5;
  const FocusedIconStyle = colors.textColor;

  const socialIcon = [
    {
      icon: <Facebook_Icon />,
      onPress: () => console.log('Facebook'),
    },
    {
      icon: <Google_Icon />,
      onPress: () => console.log('Google'),
    },
    {
      icon: colors.dark === 'dark' ? <Apple_Light /> : <Apple_Dark />,
      onPress: () => console.log('Apple'),
    },
  ];

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [emailError, setEmailError] = React.useState('');
  const [passwordError, setPasswordError] = React.useState('');
  const [emailIcon, setEmailIcon] = React.useState(BlurredIconStyle);
  const [passwordIcon, setPasswordIcon] = React.useState(BlurredIconStyle);
  const [isSubmitDisabled, setIsSubmitDisabled] = React.useState(true);
  const [emailInputStyle, setEmailInputStyle] = React.useState(BlurredStyle);
  const [passwordInputStyle, setPasswordInputStyle] =
    React.useState(BlurredStyle);
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(true);
  const [isCheck, setIsCheck] = React.useState(false);


 
  const [buttonLabel, setButtonLabel] = useState(strings.signIn); // New state for button label




  const onFocusInput = onHighlight => onHighlight(FocusedStyle);
  const onFocusIcon = onHighlight => onHighlight(FocusedIconStyle);
  const onBlurInput = onUnHighlight => onUnHighlight(BlurredStyle);
  const onBlurIcon = onUnHighlight => onUnHighlight(BlurredIconStyle);

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      !emailError &&
      !passwordError
    ) {
      setIsSubmitDisabled(false);
    } else {
      setIsSubmitDisabled(true);
    }
  }, [email, password, emailError, passwordError]);

  const onChangedEmail = val => {
    const {msg} = validateEmail(val.trim());
    setEmail(val.trim());
    setEmailError(msg);
  };
  const onChangedPassword = val => {
    const {msg} = validatePassword(val.trim());
    setPassword(val.trim());
    setPasswordError(msg);
  };

  const RenderSocialBtn = memo(({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        onPress={item.onPress}
        style={[
          localStyles.socialBtn,
          {
            backgroundColor: colors.inputBg,
            borderColor: colors.bColor,
          },
        ]}>
        {item.icon}
      </TouchableOpacity>
    );
  });

  const EmailIcon = () => {
    return <Ionicons name="mail" size={moderateScale(20)} color={emailIcon} />;
  };

  const onFocusEmail = () => {
    onFocusInput(setEmailInputStyle);
    onFocusIcon(setEmailIcon);
  };
  const onBlurEmail = () => {
    onBlurInput(setEmailInputStyle);
    onBlurIcon(setEmailIcon);
  };

  const PasswordIcon = () => (
    <Ionicons
      name="lock-closed"
      size={moderateScale(20)}
      color={passwordIcon}
    />
  );

  const onFocusPassword = () => {
    onFocusInput(setPasswordInputStyle);
    onFocusIcon(setPasswordIcon);
  };
  const onBlurPassword = () => {
    onBlurInput(setPasswordInputStyle);
    onBlurIcon(setPasswordIcon);
  };
  const RightPasswordEyeIcon = () => (
    <TouchableOpacity
      onPress={onPressPasswordEyeIcon}
      style={localStyles.eyeIconContainer}>
      <Ionicons
        name={isPasswordVisible ? 'eye-off' : 'eye'}
        size={moderateScale(20)}
        color={passwordIcon}
      />
    </TouchableOpacity>
  );

  // const onPressSignWithPassword = async () => {
  //   await setAsyncStorageData(ACCESS_TOKEN, 'access_token');
  //   navigation.reset({
  //     index: 0,
  //     routes: [
  //       {
  //         name: StackNav.TabBar,
  //       },
  //     ],
  //   });
  // };

  const onPressSignWithPassword = async () => {
    if (!email || !password) {
      alert("Email and password are required.");
      return;
    }

    setIsSubmitDisabled(true); // Disable the button and change label during the request
    setButtonLabel("Please wait");
    //alert("email--")
    //alert(email);
    //alert("password--"+password);
    const url = `https://fashion.bcreative.ae/wp-json/jwt-auth/v1/token`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        
      },
      body: JSON.stringify({ username: email, password })
    };

    try {
      const response = await fetch(url, requestOptions);
      const result = await response.json(); // Parsing the JSON response
      
      

      if (result && result.token) {
        
        console.log(result);
        Alert.alert("Success", "You have been successfully logged in.");
        await setAsyncStorageData(ACCESS_TOKEN, result.token); 
        await setAsyncStorageData("display_name", result.user_display_name); 
        await setAsyncStorageData("user_email", result.user_email); 
        
        await setAsyncStorageData("guest", "0"); 
        await setAsyncStorageData("user_id", result.user_id); 
      
        navigation.reset({
          index: 0,
          routes: [{ name: StackNav.TabBar }],
        });
      } else {
        

        await setAsyncStorageData("guest", "1"); 
        await setAsyncStorageData("user_id", "0"); 
      

         throw new Error("Invalid credentials");

       
      }
    } catch (error) {
      Alert.alert("Login Failed", error.message || "An error occurred during login.");
    } finally {
      // Re-enable the button and reset the label regardless of the outcome
      setIsSubmitDisabled(false);
      setButtonLabel(strings.signIn);
    }
  };
  const onPressPasswordEyeIcon = () => setIsPasswordVisible(!isPasswordVisible);
  const onPressSignUp = () => navigation.navigate(StackNav.Register);
  const onPressForgotPassword = () =>
    navigation.navigate(StackNav.ForgotPassword);

  return (

    <CSafeAreaView style={localStyles.root}>
      <CHeader />
      <KeyBoardAvoidWrapper>
        <View style={localStyles.mainContainer}>
          <View style={styles.center}>
            {colors.dark === 'dark' ? (
              <AppLogoDark width={moderateScale(100)} height={getHeight(100)} />
            ) : (
              <AppLogoLight
                width={moderateScale(100)}
                height={getHeight(100)}
              />
            )}
          </View>
          <CText type={'b32'} align={'center'} style={styles.mv20}>
            {strings.loginYourAccount}
          </CText>

          <CInput
            placeHolder={strings.email}
            keyBoardType={'email-address'}
            _value={email}
            _errorText={emailError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <EmailIcon />}
            toGetTextFieldValue={onChangedEmail}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              emailInputStyle,
            ]}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusEmail}
            onBlur={onBlurEmail}
          />

          <CInput
            placeHolder={strings.password}
            keyBoardType={'default'}
            _value={password}
            _errorText={passwordError}
            autoCapitalize={'none'}
            insideLeftIcon={() => <PasswordIcon />}
            toGetTextFieldValue={onChangedPassword}
            inputContainerStyle={[
              {backgroundColor: colors.inputBg},
              localStyles.inputContainerStyle,
              passwordInputStyle,
            ]}
            _isSecure={isPasswordVisible}
            inputBoxStyle={[localStyles.inputBoxStyle]}
            _onFocus={onFocusPassword}
            onBlur={onBlurPassword}
            rightAccessory={() => <RightPasswordEyeIcon />}
          />

          <TouchableOpacity
            onPress={() => setIsCheck(!isCheck)}
            style={localStyles.checkboxContainer}>
            <Ionicons
              name={isCheck ? 'square-outline' : 'checkbox'}
              size={moderateScale(26)}
              color={colors.textColor}
            />
            <CText type={'s14'} style={styles.mh10}>
              {strings.rememberMe}
            </CText>
          </TouchableOpacity>

          <CButton
            title={buttonLabel}
            type={'S16'}
            color={isSubmitDisabled ? colors.white : undefined} // Adjust color based on state
            containerStyle={localStyles.signBtnContainer}
            onPress={onPressSignWithPassword}
            bgColor={isSubmitDisabled ? colors.disabledColor : undefined}
            disabled={isSubmitDisabled}
          />

          <TouchableOpacity
            onPress={onPressForgotPassword}
            style={localStyles.forgotPasswordContainer}>
            <CText
              type={'s16'}
              align={'center'}
              // color={colors.primary}
              style={styles.mh10}>
              {strings.forgotPassword}
            </CText>
          </TouchableOpacity>
          <View style={localStyles.divider}>
            <View
              style={[
                localStyles.orContainer,
                {backgroundColor: colors.bColor},
              ]}
            />
           
            <View
              style={[
                localStyles.orContainer,
                {backgroundColor: colors.bColor},
              ]}
            />
          </View>

         

          <TouchableOpacity
            onPress={onPressSignUp}
            style={localStyles.signUpContainer}>
            <CText
              type={'b16'}
              color={colors.dark ? colors.grayScale7 : colors.grayScale5}>
              {strings.dontHaveAccount}
            </CText>
            <CText type={'b16'}> {strings.signUp}</CText>
          </TouchableOpacity>
        </View>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default Login;

const localStyles = StyleSheet.create({
  mainContainer: {
    ...styles.ph20,
  },
  divider: {
    ...styles.rowCenter,
    ...styles.mv30,
  },
  orContainer: {
    height: getHeight(1),
    width: '30%',
  },
  signBtnContainer: {
    ...styles.center,
    width: '100%',
    ...styles.mv20,
  },
  signUpContainer: {
    ...styles.rowCenter,
    ...styles.mv10,
  },
  inputContainerStyle: {
    height: getHeight(60),
    borderRadius: moderateScale(12),
    borderWidth: moderateScale(1),
    ...styles.ph15,
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
  checkboxContainer: {
    ...styles.rowCenter,
    ...styles.mb20,
  },
  socialBtnContainer: {
    ...styles.rowCenter,
    ...styles.mv20,
  },
  socialBtn: {
    ...styles.center,
    height: getHeight(60),
    width: moderateScale(90),
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
    ...styles.mh10,
  },
});
