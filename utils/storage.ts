import AsyncStorage from "@react-native-async-storage/async-storage";

const KEY = 'todo-app'

export const storeData = async(value : object) => {
    try {
        //object htae mhr moh json.stringify ko use tr
        await AsyncStorage.setItem(KEY,JSON.stringify(value))
    } catch (error) {
        return null
    }
}

export const getData = async(key : string) => {
    try {
        const data = await AsyncStorage.getItem(key)
        return data ? JSON.parse(data) : []
    } catch (error) {
        return null
    }
}