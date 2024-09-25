import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {styles} from '../themes';
import CText from './common/CText';

function SubHeader({title1, title2, onPressSeeAll, style}) {
  return (
    <View style={[localStyles.root, {...style}]}>
      <CText type={'b18'} style={styles.flex}>
        {title1}
      </CText>
      {!!title2 && (
        <TouchableOpacity onPress={onPressSeeAll}>
          <CText type={'s16'} style={styles.flex}>
            {title2}
          </CText>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default React.memo(SubHeader);

const localStyles = StyleSheet.create({
  root: {
    ...styles.rowSpaceBetween,
    ...styles.mv15,
  },
});
