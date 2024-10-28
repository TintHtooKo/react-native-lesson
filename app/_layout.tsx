// import { Stack } from 'expo-router'
// import React from 'react'

// const Layout = () => {
//   return (
//     <Stack>
//       <Stack.Screen name='index' options={{title : "Todo App"}} />
//       <Stack.Screen name='stopwatch' options={{title : "Stop Watch App"}} />
//       <Stack.Screen name='creation' options={{title : "Creation App", presentation : 'modal',animation:'slide_from_bottom'}} />
//     </Stack>
//   )
// }

// export default Layout


import { Tabs } from 'expo-router'
import React from 'react'
import Entypo from '@expo/vector-icons/Entypo';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { BackHandler } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';


const Layout = () => {
  return (
    <Tabs screenOptions={{tabBarActiveTintColor : 'black'}}>
      <Tabs.Screen 
      name='index' 
      options={{
        title : "Todo App",
        tabBarIcon : ({color,size}) => <Entypo name="list" size={size} color={color} />
    }}
      />

      <Tabs.Screen 
      name='stopwatch' 
      options={{
        title : "Stop Watch",
        headerShown : false,
        tabBarIcon : ({color,size}) => <Entypo name="stopwatch" size={size} color={color} />}}
      />

      <Tabs.Screen 
      name='notification' 
      options={{
        title : "Notification",
        tabBarIcon : ({color,size}) => <Ionicons name="notifications-outline" size={size} color={color} />
    }}
      />

    </Tabs>
  )
}

export default Layout

