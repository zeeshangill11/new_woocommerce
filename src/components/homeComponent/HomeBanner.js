import {StyleSheet, View, Alert } from 'react-native';
import React, {memo,useState ,useEffect} from 'react';
import {useSelector} from 'react-redux';

// Custom Imports
import {styles} from '../../themes';
import {deviceWidth, getHeight, moderateScale} from '../../common/constants';
import {SliderBox} from 'react-native-image-slider-box';
import { fetchBannerData,fetchCategories } from '../../api/woocommerce';


const HomeBanner = () => {
    const colors = useSelector(state => state.theme.theme);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const loadImages = async () => {
            try {
                const fetchedImages = await fetchBannerData();
                setImages(fetchedImages);
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        };

        loadImages();
    }, []);

    return (
        <View>
            {images.length > 0 ? (
                <SliderBox
                    images={images}
                    sliderBoxHeight={getHeight(170)}
                    dotColor={colors.dark ? colors.grayScale4 : colors.dark2}
                    inactiveDotColor={colors.dark ? colors.dark2 : colors.grayScale4}
                    paginationBoxVerticalPadding={getHeight(12)}
                    autoplay={true}
                    circleLoop={true}
                    autoplayInterval={5000}
                    resizeMethod={'resize'}
                    resizeMode={'cover'}
                    parentWidth={deviceWidth - moderateScale(40)}
                    paginationBoxStyle={localStyles.paginationStyleItem}
                    dotStyle={{
                        ...localStyles.paginationStyleItemActive,
                        backgroundColor: colors.dark ? colors.grayScale4 : colors.dark2,
                    }}
                    inactiveDotStyle={{
                        ...localStyles.paginationStyleItemInactive,
                        backgroundColor: colors.dark ? colors.dark2 : colors.grayScale4,
                    }}
                    ImageComponentStyle={localStyles.swiperStyle}
                    imageLoadingColor={colors.dark ? colors.grayScale4 : colors.dark2}
                />
            ) : null}
        </View>
    );
};

const localStyles = StyleSheet.create({
    paginationStyleItem: {
        alignItems: 'center',
        alignSelf: 'center',
        justifyContent: 'center',
        ...styles.pv10,
        width: moderateScale(20),
    },
    paginationStyleItemActive: {
        height: getHeight(6),
        width: moderateScale(16),
        borderRadius: moderateScale(3),
    },
    paginationStyleItemInactive: {
        height: moderateScale(6),
        width: moderateScale(6),
        borderRadius: moderateScale(3),
    },
    swiperStyle: {
        borderRadius: moderateScale(20),
        overflow: 'hidden',
    },
});

export default HomeBanner;
