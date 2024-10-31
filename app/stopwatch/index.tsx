import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { LayoutAnimation, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import EventInput from '../../components/EventInput';
import EventList from '../../components/EventList';
import CountDownTimer from '../../components/CountDownTimer';
import { getData, storeData } from '../../utils/storage';

const KEY = '@events';

export type Event = {
  id : string,
  name : string,
  date : Date
}

const stopwatch = () => {
  const [events,setEvents] = useState<Event[]>([]) 
  const [nearestEv,setNearestEv] = useState<Event>()

  const addNewEvent = async(event:Event)=>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const updatedEvents = [...events,event]
    setEvents(updatedEvents);
    await storeData(KEY,updatedEvents)
  }

  const deleteEvent = async(id : string) =>{
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    const updatedEvents = events.filter(ev=>ev.id !== id)
    setEvents(updatedEvents)
    await storeData(KEY,updatedEvents)
  }

  const nearestEvent = () =>{
    const currentDate = new Date();
    const upcomingEvent = events.filter(ev=>ev.date>currentDate)
    if(upcomingEvent.length === 0){
      setNearestEv(null)
      return;
    }
    const nearest = upcomingEvent .reduce((eventA,eventB)=>{
      return eventB.date < eventA.date ? eventB : eventA;
    })
    setNearestEv(nearest)
  }

  useEffect(()=>{
    const getEvent = async() =>{
      const eventData:Event[] = await getData(KEY)
      const parseData = eventData && eventData.map((ev:Event) => ({
        ...ev,
        date : new Date(ev.date)
      }))
      setEvents(parseData)
    }
    getEvent()
  },[])

  useEffect(()=>{
    if(events.length > 0){
      nearestEvent()
    }
  },[events])

 

  return(
    <View style={styles.container}>
      <EventInput addNewEvent={addNewEvent}/>
      {nearestEv && <CountDownTimer event={nearestEv} />}
      <EventList events={events} deleteEvent={deleteEvent}/>
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
