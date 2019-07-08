import { db, storage } from './firebase'

const imagePath = 'images'

/**
 * Async Function - Store the image on the users private bucket
 * @param userId user ID
 * @param file image file to be uploaded
 */
const storeImage = async (userId: string, file: any) => {
    const path = `${userId}/${imagePath}`
    const newdb = await db()
    const store = await storage()
    const key = newdb.ref().child(path).push().key
    if (key) {
        const img = store.ref().child(path).child(key)

        return img.put(file).then(async (snap) => {
            const { contentType, name, size, fullPath, timeCreated, updated } = snap.metadata
            newdb.ref().child(path).child(key).set({
                contentType,
                fullPath,
                name,
                size,
                timeCreated,
                updated,
                url: await img.getDownloadURL(),
            })
        })
    }
}

/**
 * Async Function - Delete an image for the user by a given filename
 * @param userId user ID
 * @param fileName full name of the file
 */
const deleteImage = async (userId: string, fileName: string) => {
    const newdb = await db()
    const store = await storage()
    const path = `${userId}/${imagePath}`
    store.ref().child(path).child(fileName).delete()
    newdb.ref().child(path).child(fileName).remove()
}

/**
 * Async Function - Get all Images for a user
 * @param userId user ID
 */
const listImages = async (userId: string) => {
    const newdb = await db()
    const path = `${userId}/${imagePath}`
    return newdb.ref(path).once('value')
}

/**
 * Async Function - Stream users data, on change invoke callback
 * @param userId userID
 * @param callback callback funcition to be executed on every change on the users table
 */
const streamImages = async (userId: string, callback: (callback: firebase.database.DataSnapshot) => any) => {
    const newdb = await db()
    const path = `${userId}/${imagePath}`
    return newdb.ref(path).on('value', callback)
}

export {
    storeImage,
    deleteImage,
    listImages,
    streamImages,
}
