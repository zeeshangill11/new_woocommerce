import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {memo, useRef} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CInput from '../common/CInput';
import {FilterDark, FilterLight, Search_Icon} from '../../assets/svgs';
import strings from '../../i18n/strings';
import {moderateScale} from '../../common/constants';
import {styles} from '../../themes';
import SortAndFilter from '../models/SortAndFilter';

const SearchComponent = props => {
  const {onSearchInput, search} = props;
  const colors = useSelector(state => state.theme.theme);
  const sortAndFilterRef = useRef();

  const onPressFilter = () => sortAndFilterRef?.current?.show();

  const SearchRightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressFilter}>
        {colors.dark ? <FilterDark /> : <FilterLight />}
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <CInput
        placeHolder={strings.search}
        _value={search}
        keyBoardType={'default'}
        autoCapitalize={'none'}
        insideLeftIcon={() => <Search_Icon />}
        toGetTextFieldValue={onSearchInput}
        inputContainerStyle={[
          {backgroundColor: colors.inputBg},
          localStyles.inputContainerStyle,
        ]}
        inputBoxStyle={localStyles.inputBoxStyle}
        rightAccessory={SearchRightIcon}
      />
      <SortAndFilter SheetRef={sortAndFilterRef} />
    </View>
  );
};

const localStyles = StyleSheet.create({
  inputContainerStyle: {
    borderRadius: moderateScale(15),
    borderWidth: moderateScale(1),
  },
  inputBoxStyle: {
    ...styles.ph15,
  },
});

export default memo(SearchComponent);
