// Library Imports
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Alert } from 'react-native';
import { useSelector } from 'react-redux';
import { StackNav } from '../../navigation/NavigationKeys';

import axios from 'axios';

// Local Imports
import strings from '../../i18n/strings';
import { getHeight, moderateScale } from '../../common/constants';
import CHeader from '../../components/common/CHeader';
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CText from '../../components/common/CText';
import CInput from '../../components/common/CInput';
import CButton from '../../components/common/CButton';
import KeyBoardAvoidWrapper from '../../components/common/KeyBoardAvoidWrapper';


// Validation functions
const validateEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email) ? '' : 'Invalid email format';
};

const validatePassword = (password) => {
  return password.length < 8 ? 'Password must be at least 8 characters' : '';
};

const validateUsername = (username) => {
  if (username.length < 4) {
    return 'Username must be at least 4 characters';
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return 'Username must contain only letters, numbers, and underscores';
  }
  return '';
};

const validateFirstName = (firstName) => {
  return firstName.trim().length === 0 ? 'First name is required' : '';
};

// Validation function for last name
const validateLastName = (lastName) => {
  return lastName.trim().length === 0 ? 'Last name is required' : '';
};

// Updated validation function for confirm password
const validateConfirmPassword = (password, confirmPassword) => {
  if (confirmPassword.trim().length === 0) {
    return 'Confirm password is required';
  }
  return password !== confirmPassword ? 'Passwords do not match' : '';
};


const Register = ({ navigation }) => {
  const colors = useSelector(state => state.theme.theme);

  // State for each field and their errors
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [firstNameError, setFirstNameError] = useState('');
  const [lastNameError, setLastNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);

  useEffect(() => {
    setIsSubmitDisabled(
      !(email && password && confirmPassword && firstName && lastName && username &&
        !emailError && !passwordError && !confirmPasswordError && !firstNameError && !lastNameError && !usernameError)
    );
  }, [email, password, confirmPassword, firstName, lastName, username, emailError, passwordError, confirmPasswordError, firstNameError, lastNameError, usernameError]);

  const handleInputChange = (value, setter, validator) => {
    setter(value);
    return validator ? validator(value) : '';
  };

  const validateAllFields = () => {
    const emailErr = validateEmail(email);
    const usernameErr = validateUsername(username);
    const passwordErr = validatePassword(password);
    const confirmPasswordErr = password === confirmPassword ? '' : 'Passwords do not match';
    const firstNameErr = validateFirstName(firstName);
    const lastNameErr  = validateLastName(lastName);


    setEmailError(emailErr);
    setUsernameError(usernameErr);
    setFirstNameError(firstNameErr);
    setLastNameError(lastNameErr);
    setPasswordError(passwordErr);
    setConfirmPasswordError(confirmPasswordErr);

    return !emailErr && !usernameErr && !passwordErr && !confirmPasswordErr;
  };

  const handleRegister = async () => {
    if (!validateAllFields()) {
      Alert.alert("Error", "Please correct the errors before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append('email', email);
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('username', username);
    formData.append('password', password);

    try {
      const response = await axios.post('https://fashion.bcreative.ae/wp-json/wc/v3/customers', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': 'Basic Y2tfNzY1ODhiNTgyYzVmNDZmYmM0NWNkM2JhNWJjYTgwODViMGYzZjdjZTpjc19hMjBiZDQ0ZmU1ZjBiNjQ3YTdiMDQ4MTMwZmNkMzExNjBhYWU4ZmY0'  // Replace with your actual token
        }
      });
      if (response.data && response.data.id) {
        Alert.alert("Success", "Registration successful.");
        navigation.reset({
          index: 0,
          routes: [{ name: StackNav.Login }],  
        });

      }
    } catch (error) {
     
      console.error('Registration Error:', error);
      Alert.alert("Registration Error", error.response?.data?.message || "An error occurred during registration.");
    }
  };

  return (
    <CSafeAreaView>
      <CHeader title="Register" />
      <KeyBoardAvoidWrapper>
        <View style={styles.mainContainer}>
          {/* Input fields for each user attribute */}
          <CInput
            placeHolder="Username"
            _value={username}
            _errorText={usernameError}
            toGetTextFieldValue={(val) => setUsernameError(handleInputChange(val, setUsername, validateUsername))}
          />
          <CInput
            placeHolder="Email"
            _value={email}
            _errorText={emailError}
            toGetTextFieldValue={(val) => setEmailError(handleInputChange(val, setEmail, validateEmail))}
          />
          <CInput
            placeHolder="First Name"
            _value={firstName}
            _errorText={firstNameError}
            toGetTextFieldValue={(val) => setFirstNameError(handleInputChange(val, setFirstName, validateFirstName))}
          />

          <CInput
            placeHolder="Last Name"
            _value={lastName}
            _errorText={lastNameError}
            toGetTextFieldValue={(val) => setLastNameError(handleInputChange(val, setLastName, validateLastName))}
          />
          <CInput
            placeHolder="Password"
            _value={password}
            _errorText={passwordError}
            toGetTextFieldValue={(val) => setPasswordError(handleInputChange(val, setPassword, validatePassword))}
            isSecureTextEntry={true}
            _isSecure={true} 
          />
          <CInput
            placeHolder="Confirm Password"
            _value={confirmPassword}
            _errorText={confirmPasswordError}
            toGetTextFieldValue={(val) => setConfirmPasswordError(handleInputChange(val, setConfirmPassword, () => validateConfirmPassword(password, val)))}
            isSecureTextEntry={true}
            _isSecure={true} 
          />
          <CButton
            title="Register"
            onPress={handleRegister}
            
          />
        </View>
      </KeyBoardAvoidWrapper>
    </CSafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20
  },
});
