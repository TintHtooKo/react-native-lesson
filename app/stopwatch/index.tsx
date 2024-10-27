import { useRouter } from 'expo-router'
import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const stopwatch = () => {
    const router = useRouter()
    const goToOwnApp = () => {
        console.log('Lets go to own app')
        router.push('/creation')
    }
  return (
    <View style={styles.container}>
        <Text>Stop WATCH</Text>
        <TouchableOpacity onPress={goToOwnApp}>
            <Text>Go to Own App</Text>
        </TouchableOpacity>
    </View>
  )
}

export default stopwatch

const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
  }
})
