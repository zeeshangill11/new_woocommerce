import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import CSafeAreaView from '../../../components/common/CSafeAreaView';
import CHeader from '../../../components/common/CHeader';
import strings from '../../../i18n/strings';
import MostPopularCategory from '../../../components/homeComponent/MostPopularCategory';
import {ratingData, reviewsData} from '../../../api/constant';
import {Search_Dark, Search_Light} from '../../../assets/svgs';
import {FlashList} from '@shopify/flash-list';
import ReviewUserComponent from '../../../components/homeComponent/ReviewUserComponent';
import {styles} from '../../../themes';
import {StackNav} from '../../../navigation/NavigationKeys';

export default function Reviews({navigation}) {
  const colors = useSelector(state => state.theme.theme);

  const onPressSearch = () => navigation.navigate(StackNav.Search);

  const RightIcon = () => {
    return (
      <TouchableOpacity onPress={onPressSearch}>
        {colors.dark ? <Search_Dark /> : <Search_Light />}
      </TouchableOpacity>
    );
  };

  const RenderFlashListItem = ({item, index}) => {
    return <ReviewUserComponent item={item} />;
  };

  const ListFlashListHeader = () => {
    return (
      <View style={styles.mb20}>
        <MostPopularCategory isStar={true} chipsData={ratingData} />
      </View>
    );
  };

  return (
    <CSafeAreaView>
      <CHeader title={strings.reviews} rightIcon={<RightIcon />} />
      <FlashList
        data={reviewsData}
        renderItem={RenderFlashListItem}
        keyExtractor={(item, index) => index.toString()}
        estimatedItemSize={10}
        contentContainerStyle={styles.ph20}
        ListHeaderComponent={<ListFlashListHeader />}
        showsVerticalScrollIndicator={false}
      />
    </CSafeAreaView>
  );
}

const localStyles = StyleSheet.create({});
