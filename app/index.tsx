
import {Alert, FlatList, ScrollView, StatusBar, StyleSheet, Text,  TextInput,  View } from 'react-native';
import List from '../components/List';
import { useEffect, useState } from 'react';
import { Link } from 'expo-router';
import { theme } from '../theme';
import { getData, storeData } from '../utils/storage';

type TodoListType = {
  id : string,
  message : string,
  isDone : boolean
}

// const staticTodo : TodoListType[] = [
//   {
//     id : '1',
//     message : 'hello world',
//     isDone : false
//   },
//   {
//     id : '2',
//     message : 'hello React Native',
//     isDone : false
//   },
// ]

// generate custom array for testing
// const tempoArray : TodoListType[] = new Array(500).fill(null).map((item,index)=>{
//   return {
//     id : String(index + 1),
//     message : String(index + 1),
//     isDone : false
//   }
// })

const KEY = 'todo-app'


export default function App() {
  const [todos,setTodos] = useState<TodoListType[]>([])
  const [inputVal,setInputVal] = useState<string>('')

  const changeStatus = async(id : string) =>{
    const updatedTodos = todos.map((td)=>td.id === id ? {...td, isDone : !td.isDone} : td)
    setTodos(updatedTodos)
    await storeData(todos)
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
          setTodos(updatedTodos),
          await storeData(todos)
          }
        }
      ]) 
  }

  
  return (
    //For ScrollView
    // ScrollView use yin contentContainerStyle={{alignItems: 'center',justifyContent: 'center',}} htae pay ya mal
    // styles htae mhr htae sa yar ma lo tot bu
    // <ScrollView 
    // contentContainerStyle={{alignItems: 'center',justifyContent: 'center',}} 
    // style={styles.container}
    // stickyHeaderIndices={[0]} 
    // >
    //   <View style={{width : '100%',paddingHorizontal : 20}}>
    //     <TextInput placeholder='eg. Go to Code' 
    //     // onChangeText={setInputVal} Or
    //     onChangeText={(val)=>setInputVal(val)} 
    //     enterKeyHint='next'
    //     onSubmitEditing={addNewTodo}
    //     style={styles.inputBox}
    //     />
    //   </View>
    //  <View style={styles.listContainer}>
    //   {/* {
    //     todos.map((td)=>(
    //       // <List key={td.id} {...td}/> Or
    //       <List undoStatus={undoStatus} changeStatus={changeStatus} key={td.id} id={td.id} message={td.message} isDone={td.isDone}/>
    //     ))
    //   } */}
    //   <FlatList
    //   data={todos}
    //   renderItem={({item})=>{
    //     return(
    //       <List 
    //       undoStatus={undoStatus} 
    //       changeStatus={changeStatus}
    //       {...item}
    //       />)
    //   }}
    //   keyExtractor={item=>item.id}
    //   />
    //  </View>

    //  {/* StatusBar ka screen paw ka battery percent menu paw ma yout ag use tr */}
    //  <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
    // </ScrollView>



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
  }
});
