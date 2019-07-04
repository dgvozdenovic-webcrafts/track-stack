import { db, storage } from './firebase'

const imagePath = 'images'

const storeImage = async (userId: string, file) => {
    const path = `${userId}/${imagePath}`
    const newdb = await db()
    const key = newdb.ref().child(path).push().key
    if (key) {
        const img = storage.ref().child(path).child(key)
        return img.put(file).then((snap) => {
            newdb.ref().child(path).child(key).set({
                url: snap.metadata.downloadURLs[0],
            })
        })
    }
}

const deleteUploadedImage = () => {
    return false
}

export {
    storeImage,
    deleteUploadedImage,
}
