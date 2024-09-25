// Library import
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {createRef} from 'react';
import {useSelector} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

// Local import
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import {Menu_Dark, Menu_Light} from '../../../assets/svgs';
import images from '../../../assets/images';
import {commonColor, styles} from '../../../themes';
import {getHeight, moderateScale} from '../../../common/constants';
import CText from '../../../components/common/CText';
import EReceiptMenu from '../../../components/models/EReceiptMenu';
import CDivider from '../../../components/common/CDivider';

export default function EReceipt({route, navigation}) {
  const colors = useSelector(state => state.theme.theme);
  const item = route?.params?.item;
  const textColor2 = colors.dark ? colors.grayScale3 : colors.grayScale7;
  const eReceiptSheetRef = createRef();

  const onPressMenu = () => eReceiptSheetRef?.current?.show();

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressMenu} style={styles.ph10}>
        {colors.dark ? <Menu_Dark /> : <Menu_Light />}
      </TouchableOpacity>
    );
  };

  const InnerContainer = ({children}) => {
    return (
      <View
        style={[
          localStyles.innerContainer,
          {backgroundColor: colors.dark ? colors.dark2 : colors.grayScale1},
        ]}>
        {children}
      </View>
    );
  };

  const InnerText = props => {
    const {
      text1,
      text2,
      isBottom = true,
      isPaid = true,
      isCopy = false,
    } = props;
    return (
      <View style={[styles.rowSpaceBetween, isBottom && styles.pb15]}>
        <CText color={textColor2} type={'s14'}>
          {text1}
        </CText>
        {!!isPaid ? (
          <View style={[styles.flexRow, styles.itemsCenter]}>
            <CText type={'B16'}>{text2}</CText>
            {isCopy && (
              <TouchableOpacity>
                <MaterialIcons
                  name="content-copy"
                  size={moderateScale(18)}
                  color={colors.textColor}
                  style={styles.ml5}
                />
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <View
            style={[
              localStyles.paidContainer,
              {backgroundColor: colors.dark ? colors.dark3 : colors.black},
            ]}>
            <CText color={!colors.dark && colors.white} type={'s12'}>
              {strings.paid}
            </CText>
          </View>
        )}
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.eReceipt} rightIcon={<RightIcon />} />
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image
          source={colors.dark ? images.barcodeImage : images.barcodeImageLight}
          style={localStyles.barCodeImageStyle}
        />
        <InnerContainer>
          <View style={localStyles.renderItemContainer}>
            <View style={[styles.rowCenter, styles.flex]}>
              <Image
                source={item.productImage}
                style={[
                  localStyles.productImage,
                  {
                    backgroundColor: colors.dark
                      ? colors.imageBg
                      : colors.white,
                  },
                ]}
              />
              <View style={[styles.mh10, styles.flex]}>
                <CText numberOfLines={1} type={'b16'}>
                  {item.product}
                </CText>
                <View style={[styles.flexRow, styles.itemsCenter, styles.mt10]}>
                  <CText type={'s14'} color={textColor2}>
                    {strings.color}
                  </CText>
                  <View style={localStyles.circleContainer} />
                </View>
              </View>
            </View>
          </View>
        </InnerContainer>
        <InnerContainer>
          <InnerText text1={strings.amount} text2={item?.price} />
          <InnerText text1={strings.promo} text2={'- $100'} isBottom={false} />
          <CDivider style={styles.mv15} />
          <InnerText
            text1={strings.amount}
            text2={item?.price}
            isBottom={false}
          />
        </InnerContainer>
        <InnerContainer>
          <InnerText text1={strings.paymentMethods} text2={strings.myEWallet} />
          <InnerText text1={strings.date} text2={item?.date} />
          <InnerText
            text1={strings.transactionId}
            isCopy={true}
            text2={'SK7263727399'}
          />
          <InnerText text1={strings.status} isPaid={false} isBottom={false} />
        </InnerContainer>
        <InnerContainer>
          <InnerText
            text1={strings.category}
            text2={strings.order}
            isBottom={false}
          />
        </InnerContainer>
      </ScrollView>
      <EReceiptMenu SheetRef={eReceiptSheetRef} />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({
  barCodeImageStyle: {
    width: '100%',
    height: getHeight(130),
    ...styles.selfCenter,
    ...styles.mv10,
  },
  innerContainer: {
    ...styles.mv10,
    ...styles.pv15,
    ...styles.ph20,
    ...styles.mh20,
    borderRadius: moderateScale(12),
    ...styles.shadowStyle,
  },
  productImage: {
    width: moderateScale(80),
    height: moderateScale(80),
    borderRadius: moderateScale(16),
    resizeMode: 'contain',
  },
  renderItemContainer: {
    ...styles.rowSpaceBetween,
  },
  circleContainer: {
    width: moderateScale(13),
    height: moderateScale(13),
    borderRadius: moderateScale(13) / 2,
    backgroundColor: '#7A5548',
    ...styles.ml10,
  },
  paidContainer: {
    ...styles.ph10,
    paddingVertical: moderateScale(4),
    borderRadius: moderateScale(7),
  },
  root: {
    ...styles.p30,
    ...styles.mh30,
    borderRadius: moderateScale(15),
  },
  modalMainContainer: {
    ...styles.flex,
    ...styles.center,
    backgroundColor: commonColor.modalBg,
  },
});
