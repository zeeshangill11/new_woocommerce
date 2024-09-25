import {
  Image,
  SectionList,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import strings from '../../../i18n/strings';
import CHeader from '../../../components/common/CHeader';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import {styles} from '../../../themes';
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import {moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import {notificationData} from '../../../api/constant';

export default function Notification() {
  const colors = useSelector(state => state.theme.theme);

  const RightIcon = () => {
    return (
      <TouchableOpacity>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const RenderNotificationItem = ({item, index}) => {
    return (
      <TouchableOpacity
        key={index}
        style={[
          localStyles.renderContainer,
          {backgroundColor: colors.dark ? colors.inputBg : colors.grayScale1},
        ]}>
        <View
          style={[
            localStyles.iconBgContainer,
            {backgroundColor: colors.textColor},
          ]}>
          <Image
            source={item?.image}
            style={[
              localStyles.iconStyle,
              colors.dark && {tintColor: colors.dark3},
            ]}
          />
        </View>
        <View style={localStyles.textStyle}>
          <CText numberOfLines={1} type={'b18'}>
            {item?.title}
          </CText>
          <CText type={'s14'} numberOfLines={1} style={styles.mt5}>
            {item?.description}
          </CText>
        </View>
      </TouchableOpacity>
    );
  };

  const RenderSectionHeader = ({section: {title}}) => {
    return (
      <CText numberOfLines={1} style={[styles.ml20, styles.mb15]} type={'b18'}>
        {title}
      </CText>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.notification} rightIcon={<RightIcon />} />
      <SectionList
        sections={notificationData}
        keyExtractor={(item, index) => item + index}
        renderItem={RenderNotificationItem}
        renderSectionHeader={RenderSectionHeader}
        stickyHeaderHiddenOnScroll={true}
        showsVerticalScrollIndicator={false}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  renderContainer: {
    ...styles.p15,
    ...styles.mb15,
    ...styles.mh20,
    ...styles.flexRow,
    ...styles.alignCenter,
    borderRadius: moderateScale(10),
    ...styles.shadowStyle,
  },
  iconBgContainer: {
    ...styles.center,
    height: moderateScale(50),
    width: moderateScale(50),
    borderRadius: moderateScale(25),
  },
  iconStyle: {
    height: moderateScale(22),
    width: moderateScale(22),
    resizeMode: 'contain',
  },
  textStyle: {
    ...styles.mh10,
    ...styles.flex,
    ...styles.justifyCenter,
  },
});
