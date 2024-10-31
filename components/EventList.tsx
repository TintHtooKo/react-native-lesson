import React from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'
import { Event } from '../app/stopwatch'
import EventItem from './EventItem'


type EventListProps = {
    events : Event[],
    deleteEvent :  (id:string) => void
}
const EventList = ({events, deleteEvent}:EventListProps) => {
    const sortedEvent = events.sort((a,b)=>a.date.getTime() - b.date.getTime())
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Events</Text>
        <FlatList
        data={sortedEvent}
        renderItem={({item})=>
            <EventItem event={item} deleteEvent={deleteEvent}/>
        }
        />
    </View>
  )
}

export default EventList

const styles = StyleSheet.create({
    title : {
        fontSize : 24,
        fontWeight : 'bold',
        textAlign : 'center',
        marginBottom : 10
    },
    container : {flex : 1, width : '100%', padding : 16}
})
