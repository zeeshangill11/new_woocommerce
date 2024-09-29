import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { name as appName } from './app.json';
import App from './src';
import store from './src/redux/store';
import { OneSignal } from 'react-native-onesignal'; // Ensure correct import
import { useEffect } from 'react';

const ONE_SIGNAL_APP_ID = 'e940b293-c98f-42d0-9f7a-7eea9dba9376';

const RNRoot = () => {

  useEffect(() => {
    // Set log level for debugging (Debug namespace)
    OneSignal.Debug.setLogLevel(6); // 6 is for DEBUG level

    // Initialize OneSignal with your app ID
    OneSignal.initialize(ONE_SIGNAL_APP_ID);

    // Request notification permissions
    OneSignal.Notifications.requestPermission(true);
    // OneSignal.Session.

    // Handle notification opened
    OneSignal.Notifications.addEventListener('click', notification => {
      console.log('Notification opened: ', notification);
    });

  }, []);

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => RNRoot);
