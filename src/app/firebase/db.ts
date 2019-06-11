import { db } from './firebase'

// User API
/**
 * Async Function - Create a new User, generates a new user node
 * @param id user id
 * @param username username
 * @param email email
 */
export const doCreateUser = async (id: string, username: string, email: string) => {
    const newdb = await db()
    return newdb.ref(`users/${id}`).set({
        email,
        username,
    })
}

/**
 * Async Function - Get all users
 */
export const onceGetUsers = async () => {
    const newdb = await db()
    return newdb.ref('users').once('value')
}

/**
 * Async Function - Stream users data, on change invoke callback
 * @param callback callback funcition to be executed on every change on the users table
 */
export const streamGetUsers = async (callback: (callback: firebase.database.DataSnapshot) => any) => {
    const newdb = await db()
    return newdb.ref('users').on('value', callback)
}

// Other db APIs ...
