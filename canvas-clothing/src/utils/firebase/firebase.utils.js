import { initializeApp } from "firebase/app";
import {
  getAuth,
  SignInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection
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

const googleProvider = new GoogleAuthProvider()
googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)

export const db = getFirestore()

export const addCollectionAndDocuments = (collectionKey, documentsToAdd) => {
//Refer to the right collection
const collectionRef = collection(db, collectionKey)
//Transaction is a successful unit of work on a db

}

export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInfo = {}
  ) => {
  if(!userAuth) return

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
        createdAt,
        ...additionalInfo
      })
    } catch (error) {
      console.log('Error whilst creating the user', error.message)
    }
  }

  return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if(!email || !password) return

  return await signInWithEmailAndPassword(auth, email, password)
}

export const signOutUser = async () => signOut(auth)

//An open function that constantly listens for state change in auth and call callback
export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback)
