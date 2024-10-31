import React, { useState } from 'react'
import { Alert, Button, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Event } from '../app/stopwatch';
import { set } from 'date-fns';
import AntDesign from '@expo/vector-icons/AntDesign';

type EventInputProps = {
    addNewEvent : ({name,date}:Event)=>void
}

const EventInput = ({addNewEvent}:EventInputProps) => {
    const [eventName,setEventName] = useState<string>('')
    const [date,setDate] = useState<Date>(new Date())
    const [show,setShow] = useState<boolean>(false)


    const datePickerHandler = (e : DateTimePickerEvent,d : Date | undefined) =>{
        if(e.type === 'set'){
            const currentDate = d || date
            if(currentDate > new Date()){
                setDate(currentDate)
            }else{
                Alert.alert('Invalid Date', 'Please select a future date')
            }
        }
        setShow(false)
    }

    const addNewEventHandler = () =>{
        if(eventName.trim().length === 0){
            Alert.alert('Invalid Event Name', 'Please enter a valid event name')
            return
        }
        addNewEvent({name : eventName, date, id: Math.random().toString()})
        setEventName('')
        setDate(new Date())
    }

  return (
    <View style={styles.container}>
        <Text style={styles.title}>ADD NEW EVENT</Text>
      <View style={styles.inputContainer}>
      <TextInput 
      placeholder='Enter Event Name'
      value={eventName}
      onChangeText={setEventName}
      style={styles.eventInput}
      />
      <Pressable hitSlop={20} onPress={() => setShow(true)}>
      <AntDesign name="calendar" size={45} color="gray" />
      </Pressable>
      </View>
      {
        show && <DateTimePicker
        value={date}
        mode='date'
        display='default'
        onChange={datePickerHandler}
        />
      }
      <Pressable style={styles.btnSubmit}
      onPress={addNewEventHandler}
      >
        <Text style={[styles.btnText]}>Add Event</Text>
      </Pressable>
    </View>
  )
}

export default EventInput

const styles = StyleSheet.create({
    container : {
        flex : 1,
        width : '100%',
        paddingHorizontal : 16,
    },
    btn : {
        padding :10,
        backgroundColor : 'black',

    },
    btnSubmit : {
        padding :10,
        borderWidth : 1,
        backgroundColor : 'black',
        borderRadius : 6,
        marginVertical : 10,
        
    },
    btnText:{
        color : 'white',
        fontWeight : 'bold',
        fontSize : 14,
        textAlign : 'center'
    },
    eventInput : {
        padding : 10,
        borderWidth : 1,
        borderColor : '#ccc',
        borderRadius : 6,
        marginVertical : 10,
        flex : 1,
    },
    title : {
        fontSize: 20,
        fontWeight : 'bold',
        marginVertical : 10
    },
    inputContainer : {
        flexDirection : 'row',
        alignItems : 'center',
        width : '100%',
        gap : 6
    }
})
