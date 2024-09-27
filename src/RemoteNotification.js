import { useEffect } from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';

const checkApplicationPermission = async () => {
    if (Platform.OS === 'android') {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log('Notification permission granted.');
            } else {
                console.log('Notification permission denied.');
            }
        } catch (error) {
            console.error('Error requesting notification permission:', error);
        }
    }
};

const RemoteNotification = () => {
    useEffect(() => {
        checkApplicationPermission();

        // Delete existing notification channels to avoid duplication
        PushNotification.getChannels(function (channel_ids) {
            channel_ids.forEach((id) => {
                PushNotification.deleteChannel(id);
            });
        });

        PushNotification.configure({
            // Called when a token is generated (iOS and Android)
            onRegister: function (token) {
                console.log('TOKEN:', token);
            },

            // Called when a remote or local notification is opened or received
            onNotification: function (notification) {
                const { message, title, id } = notification;

                let cleanTitle = JSON.stringify(title).replace(/"/g, '');
                let cleanMessage = JSON.stringify(message).replace(/"/g, '');
                let cleanId = JSON.stringify(id).replace(/"/g, '');

                PushNotification.createChannel(
                    {
                        channelId: cleanId, // must be unique
                        channelName: "Remote Message", // Channel name
                        channelDescription: "Notification channel for remote messages", // Optional description
                        importance: 4, // Notification importance (max priority)
                        vibrate: true, // Vibration enabled
                    },
                    (created) => console.log(`Channel created: ${created}`) // Callback to log if channel was created
                );

                PushNotification.localNotification({
                    channelId: cleanId, // Should match with the created channelId
                    title: cleanTitle,
                    message: cleanMessage,
                });

                console.log('Received notification:', title, message, id, notification);
            },

            senderID: '1006829691514', // Your sender ID from Firebase Console
            popInitialNotification: true,
            requestPermissions: true, // Request permissions
        });
    }, []);

    return null;
};

export default RemoteNotification;
