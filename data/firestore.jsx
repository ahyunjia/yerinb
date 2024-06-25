import { create } from "domain";
import { initializeApp } from "firebase/app";
import { getDoc, query, doc, collection, getDocs, addDoc, updateDoc, getFirestore, increment, Timestamp, orderBy } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID
  };

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addWishCount() {
    const docRef = doc(db, "wish-count", `${process.env.WISH_COUNT_ID}`);

    await updateDoc(docRef, {
        count: increment(1)
    });

    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

export async function fetchPhotoCard(idx) {
    const docRef = doc(db, "photo-card", `${idx}`);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return docSnap.data()
    } else {
        return null
    }
}

export async function fetchLetters() {
    const q = query(collection(db, "dear-yerin"), orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q)

    if (!querySnapshot) {
        return null
    }

    var letters = []
    querySnapshot.forEach((doc) => {
    letters.push(doc.data())
});
    return letters

}

export async function addLetter(data) {
    const createdAtTimestamp = Timestamp.fromDate(new Date());
    const newLetter = {
        ...data,
        created_at: createdAtTimestamp
    }

    const addedLetter = await addDoc(collection(db, "dear-yerin"), newLetter);

    if (!addedLetter) { 
        return null
    }

    return {id: addedLetter.id}
}