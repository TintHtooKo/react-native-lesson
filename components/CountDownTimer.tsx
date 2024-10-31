import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Event } from '../app/stopwatch'

type CountDownTimerProps = {
    event: Event
}

const CountDownTimer = ({event}:CountDownTimerProps) => {
    const {name,date:eventDate} = event
    const [daysRemain,setDaysRemain] = useState<number>(0)
    useEffect(()=>{
        const calculateDaysRemain = () =>{
            const now = new Date()
            const difference = eventDate.getTime() - now.getTime()
            const days = Math.ceil(difference / (1000 * 60 * 60 * 24))
            setDaysRemain(days)
        }
        calculateDaysRemain()

        const interval = setInterval(calculateDaysRemain,(1000 * 60 * 60 * 24))
        return ()=>clearInterval(interval)
    },[])
  return (
    <View style={styles.container}>
        <Text style={styles.dateMuted}>Upcoming Nearest Event</Text>
      <Text style={styles.bigTitle}>{name}</Text>
      <Text style={styles.date}>{daysRemain === 0 ? "Event is Over" : daysRemain + " Day Remaining"}</Text>
    </View>
  )
}

export default CountDownTimer

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent : 'center',
        alignItems : 'center',
    },
    bigTitle : {
        fontSize : 40,
        fontWeight : 'bold',
        textAlign : 'center',
    },
    date : {
        fontSize : 16,
        marginVertical : 6
    },
    dateMuted : {
        fontSize : 14,
        marginVertical : 6,
        color : 'gray'
    }
})
