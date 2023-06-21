import PostsList from "../components/Post/Posts-List";

import React, { useState, useCallback, useRef, useEffect } from "react";

import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { NotificationContent, NotificationRequestInput } from 'expo-notifications';
import AsyncStorage from "@react-native-async-storage/async-storage";


async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    alert('Failed to get push token for push notification!');
    return;
  }

  const token = (await Notifications.getExpoPushTokenAsync()).data;
  return token;
}

const saveExpoPushTokenToServer = async (token) => {
  const authToken = 'F1Ken?hNDYZGHESZj5g908TmueOenPy8CWHx?JO?t1DL0Ytvh=L6taKnrRKxkNWD8b3nuPrYeEvxokqNPkgx34JSN!0OjK2od-vR/xvpdRhexpQFzyg3vbluUQoiBE3J3moCIbpwAOi6FPRtegYv=Fh24PXOAP7RLZaySu1ujygWYu6ag-6fEL1eG6AkL5JgNKRE=J1oxcx?10stFNiz=?eHddh?S3J?t0Mb9TkQIB!pPnq0=781vLXadw?BW66-'; 

  const headers = { 
    Authorization: `Bearer ${authToken}`,
    'Content-Type': 'application/json',
  };
  
  try {
    const serverURL = 'https://ratemycasino.ca/wp-json/myplugin/v1/save-token';
    const res = await (
      await fetch(
        serverURL + '?token=' + token, {
          method: "GET",
          headers: headers
        }
      )
    ).json(); 
    // console.log('Token saved successfully:', res);
  } catch (error) {
    console.error('Failed to save token to server:', error);
  } 
};


_storeData = async (expoPushToken) => {
  try {
    await AsyncStorage.setItem(
      'EXPOPushToken',
      expoPushToken
    );
  } catch (error) {
    // Error saving data
  }
};


 



const Home = ({ navigation, screenProps }) => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [asyncStorageKeyObject, setAsyncStorageKeyObject] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();


  retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('EXPOPushToken');
      if (value !== null) { 
        setAsyncStorageKeyObject(value);
        return true
      } 
    } catch (error) {
      console.log(error)
      // Error retrieving data
    }
    return false;
  };
  retrieveData()


  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const token = await registerForPushNotificationsAsync();
        saveExpoPushTokenToServer(token)
        setExpoPushToken(token);

        _storeData(expoPushToken)
      } catch (error) {
        console.error('Failed to register for push notifications:', error);
      }
    };

    console.log('_retrieveData(): ', asyncStorageKeyObject); 
    if(!asyncStorageKeyObject) {
      registerForPushNotifications();
      console.log('tokenEXPO: ', expoPushToken)
    }
    

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      const data = response.notification.request.content.data;
      if(data) {
        if(data.post_id) {
          return navigation.navigate('Article', { 
            id: data.post_id, 
            title: data.title, 
            date: data.date, 
            articleImage: data.image
            })
        }
      }
      // console.log(response.notification.request.content.data);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  // console.log(expoPushToken);

  return (

    <PostsList navigation={navigation} screenProps={screenProps} />
    
  );
};

export default Home;