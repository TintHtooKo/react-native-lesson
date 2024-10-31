import React from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { Event } from '../app/stopwatch'
import { format } from 'date-fns';
import EvilIcons from '@expo/vector-icons/EvilIcons';

type EventItemProps = {
    event : Event;
    deleteEvent : (id:string) => void
}

const EventItem = ({event,deleteEvent}:EventItemProps) => {
    const {name,date,id} = event
    const deleteEventHandler = () => {
        deleteEvent(id)
    }
  return (
    <View style={styles.container}>
        <View style = {{flex : 1}}>
            <Text style={styles.label}>{name}</Text>
            <Text style={styles.date}>{format(date,"yyyy-MM-dd")}</Text>
        </View>
        <Pressable hitSlop={20} onPress={deleteEventHandler}>
        <EvilIcons name="trash" size={24} color="red" />
        </Pressable>
    </View>
  )
}

export default EventItem

const styles = StyleSheet.create({
    label : {
        fontSize : 20,
        fontWeight : 'bold',
        color : 'black',
        marginBottom : 6
    },
    date : {
        fontSize : 16,
        marginBottom : 6,
        color : 'gray'
    },
    container : {
        borderBottomColor : 'gray',
        borderBottomWidth : 1,
        paddingVertical : 6,
        flexDirection : 'row',
        alignItems: 'center',
    }
})
