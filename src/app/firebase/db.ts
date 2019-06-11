import { db } from './firebase'

// User API

export const doCreateUser = async (id, username, email) => {
    const newdb = await db()
    return newdb.ref(`users/${id}`).set({
        email,
        username,
    })
}

export const onceGetUsers = async () => {
    const newdb = await db()
    return newdb.ref('users').once('value')
}

// Other db APIs ...
