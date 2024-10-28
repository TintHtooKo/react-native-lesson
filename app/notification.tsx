
import React from 'react'
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native'
import { pushNotiAsync } from '../utils/pushNotiAsync'
import * as Notification from 'expo-notifications'

const Creation = () => {
  const pushNotification = async() =>{
    const result = await pushNotiAsync()
    // result ko a yin console.log htoke kyi
    // noti ko allow pay yin console ka granted ya mal 
    if(result === 'granted'){
      await Notification.scheduleNotificationAsync({
        content : {
          title : "I am the notification from the Expo go",         
        },
        trigger : {
          // date month year hour minute second milisecond kyite tr htae
          seconds : 5
        }
      })
    }else{
      Alert.alert("Permission Denied", "You need to enable notification in the app settings to use this feature!!!")
    }
  }
  return (
    <View style={styles.container}>
      <Pressable 
      style={styles.button}
      onPress={pushNotification}
      >
        <Text style={styles.label}>
          Send Notification
        </Text>
      </Pressable>
    </View>
  )
}

export default Creation
const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
    },
    button : {
      padding : 10,
      backgroundColor : 'black',
    },
    label : {
      color : 'white',
      fontWeight : 'bold'
    }
  })