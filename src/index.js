import {StatusBar} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import AppNavigator from './navigation';
import {styles} from './themes';
import CSafeAreaView from './components/common/CSafeAreaView';
import RemoteNotification from './RemoteNotification';
const App = () => {
  const colors = useSelector(state => state.theme.theme);

  return (
    <CSafeAreaView style={styles.flex}>
      <RemoteNotification />
      <StatusBar
        barStyle={colors.dark == 'dark' ? 'light-content' : 'dark-content'}
      />
      <AppNavigator />

    </CSafeAreaView>
  );
};

export default App;
