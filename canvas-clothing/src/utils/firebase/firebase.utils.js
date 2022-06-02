import { initializeApp } from "firebase/app";
import {
  getAuth,
  SignInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore'
const firebaseConfig = {
  apiKey: "AIzaSyD34QaIsjjncCNvwNqA8fQMt7groAw146w",
  authDomain: "canvas-clothing-db.firebaseapp.com",
  projectId: "canvas-clothing-db",
  storageBucket: "canvas-clothing-db.appspot.com",
  messagingSenderId: "849885383406",
  appId: "1:849885383406:web:7d483880563fddffb101ff"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid )
  console.log(userDocRef)

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot)
  console.log(userSnapshot.exists)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt
      })
    } catch (error) {
      console.log('Error whilst creating the user', error.message)
    }
  }

  return userDocRef
}

