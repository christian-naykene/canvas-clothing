import { createContext, useEffect, useState } from "react";
import { onAuthStateChangedListener, signOutUser } from "../utils/firebase/firebase.utils";

export const UserContext =  createContext({
  setCurrentUser: () => null,
  currentUser:null
})

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null)
  const value = { currentUser, setCurrentUser}

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      setCurrentUser(user)
      console.log(user)
    })

    return unsubscribe
  }, [])

  return <UserContext.Provider value={value}>
    {children}
  </UserContext.Provider>
}
