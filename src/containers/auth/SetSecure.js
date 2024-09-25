// Libraries import
import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {useSelector} from 'react-redux';

// Local import
import CSafeAreaView from '../../components/common/CSafeAreaView';
import CHeader from '../../components/common/CHeader';
import strings from '../../i18n/strings';
import CText from '../../components/common/CText';
import {styles} from '../../themes';
import {FingerPrint, FingerPrintDark} from '../../assets/svgs';
import {StackNav} from '../../navigation/NavigationKeys';
import SuccessModal from '../../components/models/SuccessModal';
import CButton from '../../components/common/CButton';

const SetSecure = ({navigation}) => {
  const colors = useSelector(state => state.theme.theme);
  const [modalVisible, setModalVisible] = useState(false);

  const onPressContinue = () => {
    navigation.reset({
      index: 0,
      routes: [{name: StackNav.TabBar}],
    });
  };
  const onPressSkip = () => setModalVisible(true);
  const onPressModalClose = () => setModalVisible(false);

  return (
    <CSafeAreaView>
      <CHeader title={strings.setYourFingerprint} />
      <View style={localStyles.root}>
        <CText type={'r18'} align={'center'}>
          {strings.setYourFingerprintDesc1}
        </CText>
        {colors.dark ? (
          <FingerPrintDark style={styles.mv50} />
        ) : (
          <FingerPrint style={styles.mv50} />
        )}
        <CText type={'r18'} align={'center'}>
          {strings.setYourFingerprintDesc2}
        </CText>
      </View>
      <View style={localStyles.btnContainer}>
        <CButton
          title={strings.skip}
          type={'S16'}
          color={colors.dark ? colors.white : colors.primary}
          containerStyle={[localStyles.skipBtnContainer]}
          bgColor={colors.dark3}
          onPress={onPressSkip}
        />
        <CButton
          title={strings.continue}
          type={'S16'}
          containerStyle={[localStyles.skipBtnContainer]}
          onPress={onPressContinue}
        />
      </View>
      <SuccessModal
        visible={modalVisible}
        onPressModalClose={onPressModalClose}
      />
    </CSafeAreaView>
  );
};

export default SetSecure;

const localStyles = StyleSheet.create({
  root: {
    ...styles.flexCenter,
    ...styles.ph25,
  },
  btnContainer: {
    ...styles.mh20,
    ...styles.mb10,
    ...styles.rowSpaceAround,
  },
  skipBtnContainer: {
    width: '45%',
  },
});
