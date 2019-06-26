import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const prodConfig = {
    apiKey: 'AIzaSyA0wvNsqsw887CLcs7VQAXgjEZDN78OOTg',
    appId: '1:122779541361:web:73e0106a74e3df5d',
    authDomain: 'track-stack-f8069.firebaseapp.com',
    databaseURL: 'https://track-stack-f8069.firebaseio.com',
    messagingSenderId: '122779541361',
    projectId: 'track-stack-f8069',
    storageBucket: 'track-stack-f8069.appspot.com',
}

const devConfig = {
    apiKey: 'AIzaSyA0wvNsqsw887CLcs7VQAXgjEZDN78OOTg',
    appId: '1:122779541361:web:73e0106a74e3df5d',
    authDomain: 'track-stack-f8069.firebaseapp.com',
    databaseURL: 'https://track-stack-f8069.firebaseio.com',
    messagingSenderId: '122779541361',
    projectId: 'track-stack-f8069',
    storageBucket: 'track-stack-f8069.appspot.com',
}

const config = process.env.NODE_ENV === 'production' ? prodConfig : devConfig

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = async () => firebase.database()
const auth = firebase.auth()
const storage = firebase.storage()

export { db, auth, storage }
