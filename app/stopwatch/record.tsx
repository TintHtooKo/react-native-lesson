import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const Record = () => {
  return (
    <View style={styles.container}>
        <Text>Record page</Text>       
    </View>
  )
}

export default Record


const styles = StyleSheet.create({
    container : {
      flex : 1,
      justifyContent : 'center',
      alignItems : 'center',
    }
  })
