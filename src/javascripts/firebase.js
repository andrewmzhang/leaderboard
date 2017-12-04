import * as firebase from 'firebase'
import sectionModel from '../models/section'
import todoModel from '../models/todo'

let database

export const init = () => {
    let config = {
        apiKey: "AIzaSyCYKmjs_yGy_wMgHgC17d_Bvq5nCbKpALo",
        authDomain: "calsol-leaderboard.firebaseapp.com",
        databaseURL: "https://calsol-leaderboard.firebaseio.com",
        projectId: "calsol-leaderboard",
        storageBucket: "calsol-leaderboard.appspot.com",
        messagingSenderId: "97809065365"
    };
    firebase.initializeApp(config);
    database = firebase.database();

}



// retrieve from firebase
// return promise object
export const getSectionsDB = () => {
    return database.ref('/').once('value')
}

// get specified section
export const getTodoDB = (sectionId) => {
    return database.ref('/${sectionId}').once('value')
}

// add new section
export const addSection = (name) => {
    let key = database.ref('/').push().key
    let model = sectionModel(key, name,
        firebase.database.ServerValue.TIMESTAMP)

    return database.ref('/' + key).set(model)
}

// add new todo item into specified section
export const addTodoItem = (id, name) => {

    return new Promise((resolve, reject) => {
        database.ref('/${id}').once('value').then((todo) => {
            let todos = todo.val().todos || []
            let key = database.ref('/${id}').push().key
            todos.push(todoModel(key, name, firebase.database.ServerValue.TIMESTAMP))
            database.ref('/${id}/todos').set(todos).then( res => {resolve(res)}).catch( error => {reject(error)})
        })
    })

}