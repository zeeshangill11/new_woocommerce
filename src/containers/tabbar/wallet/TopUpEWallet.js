// Library Imports
import {
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import CText from '../../../components/common/CText';
import {getHeight, moderateScale} from '../../../common/constants';
import typography from '../../../themes/typography';
import {styles} from '../../../themes';
import KeyBoardAvoidWrapper from '../../../components/common/KeyBoardAvoidWrapper';
import CButton from '../../../components/common/CButton';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function TopUpEWallet({navigation, route}) {
  const colors = useSelector(state => state.theme.theme);
  const [amount, setAmount] = useState('');
  const [extraData, setExtraData] = useState(false);

  useEffect(() => {
    setExtraData(!extraData);
  }, [amount]);

  const onChangeText = val => setAmount(val);

  const onPressContinue = () =>
    navigation.navigate(StackNav.Payment, {
      title: strings.topUpEWallet,
      desc: strings.paymentDesc2,
    });

  const renderItem = ({item}) => {
    return (
      <View style={localStyles.renderItemContainer}>
        <TouchableOpacity
          onPress={() => onChangeText(item)}
          style={[
            localStyles.amountContainer,
            {borderColor: colors.dark ? colors.dark3 : colors.black},
          ]}>
          <CText type={'s16'}>
            {'$'}
            {item}
          </CText>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.topUpEWallet} />
      <KeyBoardAvoidWrapper>
        <CText type={'m16'} align={'center'}>
          {strings.enterTheAmount}
        </CText>
        <View style={styles.m20}>
          <TextInput
            placeholder={'$0'}
            value={amount}
            onChangeText={onChangeText}
            placeholderTextColor={colors.placeHolderColor}
            style={[
              localStyles.inputStyle,
              {
                color: colors.textColor,
                borderColor: colors.dark ? colors.bColor : colors.black,
              },
            ]}
            keyboardType={'numeric'}
          />
          <FlatList
            data={[10, 20, 50, 100, 200, 250, 500, 750, 1000]}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            numColumns={3}
            extraData={extraData}
            contentContainerStyle={styles.mt20}
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </KeyBoardAvoidWrapper>
      <CButton
        type={'S16'}
        title={strings.continue}
        onPress={onPressContinue}
        containerStyle={localStyles.buttonContainer}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  inputStyle: {
    height: getHeight(120),
    width: '100%',
    borderWidth: moderateScale(2),
    borderRadius: moderateScale(20),
    textAlign: 'center',
    ...typography.fontSizes.f46,
    ...typography.fontWeights.SemiBold,
  },
  renderItemContainer: {
    width: '33%',
    ...styles.itemsCenter,
  },
  amountContainer: {
    height: getHeight(40),
    width: moderateScale(100),
    borderRadius: moderateScale(20),
    borderWidth: moderateScale(2),
    ...styles.center,
    ...styles.mb10,
  },
  buttonContainer: {
    ...styles.mh20,
    ...styles.mb10,
  },
});
