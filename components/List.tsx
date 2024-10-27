import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign'
import { theme } from '../theme'

type ListProps = {
  id : string
  message : string
  isDone : boolean
  changeStatus : (id : string) => void
  undoStatus : (id : string) => void
}

const List = ({id, message, isDone, changeStatus, undoStatus}: ListProps) => {
  return (
    <View style={[styles.container,{backgroundColor : theme.customColor}]}>
      <Text style={[
        styles.text,
        {
          color : isDone ? "gray" : "white",
          textDecorationLine : isDone ? "line-through" : undefined,
        }
        ]}>{message}</Text>
      {
        isDone ? 
        // style htae mhr condition sis yin array htae mhr object nae pyan sis
          <AntDesign onPress={() => undoStatus(id)} name="check" size={24} color="white" style={[
            {
              opacity : isDone ? 0.5 : 1,
              cursor : 'pointer'
            }
          ]} />
         : 
        <AntDesign name="close" size={24} color="white" onPress={() => changeStatus(id)}/>
        
      }
    </View>
  )
}

export default List

const styles = StyleSheet.create({
  container : {
    flexDirection : 'row',
    justifyContent : 'space-between',
    width : '100%',
    paddingHorizontal : 30,
    borderBottomColor : 'cyan',
    borderBottomWidth : 1,
  },
  text : {
    fontSize : 16,
    fontWeight : 'semibold',
    paddingBottom : 6,
  }
})

