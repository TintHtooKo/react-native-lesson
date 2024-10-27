
import {Alert, FlatList, LayoutAnimation, Platform, Pressable, ScrollView, StatusBar, StyleSheet, Text,  TextInput,  UIManager,  View } from 'react-native';
import List from '../components/List';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { theme } from '../theme';
import { getData, storeData } from '../utils/storage';
import * as Haptics from 'expo-haptics';

type TodoListType = {
  id : string,
  message : string,
  isDone : boolean
}

const KEY = 'todo-app'

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}


export default function App() {
  const [todos,setTodos] = useState<TodoListType[]>([])
  const [inputVal,setInputVal] = useState<string>('')

  const changeStatus = async(id : string) =>{
    const updatedTodos = todos.map((td)=>td.id === id ? {...td, isDone : !td.isDone} : td)
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
    setTodos(updatedTodos)
    await storeData(updatedTodos)
  }

   // for storage
   useEffect(()=>{
    const getTodoData = async() =>{
      const todoData = await getData(KEY)
      setTodos(todoData)
    }
    getTodoData()
  },[])

  const addNewTodo = async() =>{
    const newTodo = [...todos,{
      id : String(todos.length + 1),
      message : inputVal,
      isDone : false
    }]
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
    setTodos(newTodo)
    await storeData(newTodo)
    setInputVal('')
  }


 

  const undoStatus = (id : string) =>{
    Alert.alert(
      "Are you sure?",
      "Are you sure you want to undo this task?",
      [
        {
          text : "Cancel",
          onPress : () =>{},
          style : "cancel"
        },
        {
          text : "Yes",
          onPress : async() => {
          const updatedTodos = todos.map((td)=> td.id === id ? {...td, isDone : !td.isDone} : td)
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)
          setTodos(updatedTodos),
          await storeData(updatedTodos)
          }
        }
      ]) 
  }

  const deleteAllTodos = async() =>{
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    setTodos([])
    await storeData([])
  }

  
  return (
    //For FlatList

    <View style={styles.container}>
      <View style={{width : '100%',paddingHorizontal : 20}}>
        <TextInput placeholder='eg. Go to Code' 
        // onChangeText={setInputVal} Or
        onChangeText={(val)=>setInputVal(val)} 
        enterKeyHint='next'
        onSubmitEditing={addNewTodo}
        style={styles.inputBox}
        value={inputVal}
        />
      </View>
    <View style={styles.listContainer}>
      <FlatList
      ListEmptyComponent={<View><Text>No Todo Form</Text></View>}
      data={todos}
      renderItem={({item})=>{
        return(
          <List 
          undoStatus={undoStatus} 
          changeStatus={changeStatus}
          {...item}
          />)
      }}
      keyExtractor={item=>item.id}
      ListFooterComponent={
        <>
          {
            todos.length !== 0 && (
              <Pressable onPress={deleteAllTodos} style={styles.dangerContainer}>
              <Text style={styles.textDanger}>Delete All</Text>
            </Pressable>
            )
          }
        </>
      }
      />
    </View>

    {/* StatusBar ka screen paw ka battery percent menu paw ma yout ag use tr */}
    <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 10,
    backgroundColor: '#fff',
    paddingVertical : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText : {
    fontSize : 30,
    fontWeight : 'bold',
    textAlign : 'center',

  },
  listContainer : {
    flex : 1,
    gap : 20,
    marginTop : 10,
    marginHorizontal : 10,
  },
  inputBox : {
    borderColor : 'gray',
    borderWidth : 2,
    borderRadius : 8,
    padding : 6,
    marginVertical : 2,
    width : '100%',
    backgroundColor : 'white'
  },
  dangerContainer : {
    backgroundColor : 'red',
    paddingVertical : 10,
    marginVertical : 10,
    borderRadius : 8,
  },
  textDanger : {
    textAlign : "center",
    fontSize : 16,
    fontWeight : 'bold',
    color : 'white',
  }
});
