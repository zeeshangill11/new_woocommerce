import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Button} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { saveAddressData} from '../../api/woocommerce';


export default function AddressForm() {
  const navigation = useNavigation();
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [postalCode, setPostalCode] = useState('');

	const submitAddress = async () => {
	  const userId = 1; // Replace with actual user ID
	  const addressData = {
	    address: '123 Main St',
	    city: 'New York',
	    state: 'NY',
	    postalCode: '10001',
	  };

	  try {
	    await saveAddressData(addressData, userId);
	    console.log('Address saved successfully!');
	  } catch (error) {
	    console.error('Error saving address:', error);
	  }
	};

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={address}
        onChangeText={setAddress}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={city}
        onChangeText={setCity}
      />
      <TextInput
        style={styles.input}
        placeholder="State"
        value={state}
        onChangeText={setState}
      />
      <TextInput
        style={styles.input}
        placeholder="Postal Code2"
        value={postalCode}
        onChangeText={setPostalCode}
      />
      <Button title="Submit" onPress={submitAddress} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingLeft: 8,
  },
});
