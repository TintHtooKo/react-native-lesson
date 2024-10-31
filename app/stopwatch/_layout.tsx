import { Link, Stack } from 'expo-router'
import React from 'react'
import Octicons from '@expo/vector-icons/Octicons';
import { Pressable } from 'react-native';

const Layout = () => {
  return (
    <Stack>
      <Stack.Screen 
      name='index' 
      options={{
        title : "Event Countdown App",
        headerRight : () => (
        // regular so yin icon ko click yin icon ko ti ti kya kya hti mha ya mal,
        // ae lo ma phit ag Pressable use ya tal. ae dr so icon ye a nar ko click yin lae ya tal
        // Pressable use mal so yin Link mhr asChild htae pay ya tal. ma htae yin a lote ma lote 
        <Link href={"/stopwatch/record"} asChild>
            <Pressable hitSlop={20}>
                <Octicons name="history" size={24} color="black" />
            </Pressable>
        </Link>
    )
        }}/>
        <Stack.Screen 
        name='record'
        options={{
            title : "Record Page",
        }}
        />
    </Stack>
  )
}

export default Layout
