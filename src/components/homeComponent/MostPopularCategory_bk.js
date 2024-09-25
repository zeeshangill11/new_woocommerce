import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {FlashList} from '@shopify/flash-list';
import {useSelector} from 'react-redux';

// Custom Imports
import CText from '../common/CText';
import {mostPopularData} from '../../api/constant';
import {styles} from '../../themes';
import {moderateScale} from '../../common/constants';
import strings from '../../i18n/strings';
import images from '../../assets/images';

export default function MostPopularCategory(props) {
  const {chipsData, isStar = false} = props;
  const colors = useSelector(state => state.theme.theme);
  const [selectedChips, setSelectedChips] = useState([strings.all]);
  const [extraData, setExtraData] = useState(true);

  useEffect(() => {
    setExtraData(!extraData);
  }, [selectedChips, colors]);

  const onPressChips = value => {
    if (selectedChips.includes(value)) {
      setSelectedChips(selectedChips.filter(item => item !== value));
    } else {
      setSelectedChips([...selectedChips, value]);
    }
  };

  const renderChips = ({item}) => {
    return (
      <TouchableOpacity
        onPress={() => onPressChips(item)}
        style={[
          localStyles.chipsContainer,
          {borderColor: colors.dark ? colors.dark3 : colors.black},
          {
            backgroundColor: selectedChips.includes(item)
              ? colors.dark
                ? colors.dark3
                : colors.black
              : colors.tranparent,
          },
        ]}>
        {!!isStar && (
          <Image
            source={images.starFill}
            style={[
              localStyles.starStyle,
              {
                tintColor: selectedChips.includes(item)
                  ? colors.dark
                    ? colors.white
                    : colors.white
                  : colors.dark
                  ? colors.white
                  : colors.black,
              },
            ]}
          />
        )}
        <CText
          type={'S16'}
          color={
            selectedChips.includes(item)
              ? colors.dark
                ? colors.white
                : colors.white
              : colors.dark
              ? colors.white
              : colors.black
          }>
          {item}
        </CText>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <FlashList
        data={!!chipsData ? chipsData : mostPopularData}
        renderItem={renderChips}
        extraData={extraData}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.mb15}
        estimatedItemSize={10}
      />
    </View>
  );
}

const localStyles = StyleSheet.create({
  chipsContainer: {
    ...styles.ph20,
    ...styles.pv10,
    borderWidth: moderateScale(1),
    borderRadius: moderateScale(25),
    ...styles.mh5,
    ...styles.rowCenter,
  },
  starStyle: {
    width: moderateScale(16),
    height: moderateScale(16),
    resizeMode: 'contain',
    ...styles.mr10,
  },
});
