import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import { API_CALL } from '../constants/APICalls';

// Example server, implemented in Rails: https://git.io/vKHKv
const PUSH_ENDPOINT = `${API_CALL}users/hook-push/token`;

export default (async function registerForPushNotificationsAsync() {
  // Android remote notification permissions are granted during the app
  // install, so this will only ask on iOS
  const { existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  let finalStatus = existingStatus;

  // If the answer is no to existing status, let's ask again.
  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  // Stop here if the user did not grant permissions
  if (finalStatus !== 'granted') {
    return;
  }

  let pushNotif = (await AsyncStorage.getItem('@pushNotif') == "true");

  // Get the token that uniquely identifies this device
  let token = await Notifications.getExpoPushTokenAsync();

  // POST the token to our backend so we can use it to send pushes from there
  return fetch(PUSH_ENDPOINT, {
    method: 'PUT',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: {
        value: token,
        enableNotifs: pushNotif
      }
    }),
  });
});
