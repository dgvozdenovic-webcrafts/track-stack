import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

import configuration from '../const/config'

const config = process.env.NODE_ENV === 'production' ? configuration.firebase.prod : configuration.firebase.dev

if (!firebase.apps.length) {
    firebase.initializeApp(config)
}

const db = async () => firebase.database()
const storage = async () => firebase.storage()
const auth = firebase.auth()

export { db, auth, storage }
