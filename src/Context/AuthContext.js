import React, { useEffect, useState, createContext } from 'react'
import { auth, onAuthStateChanged} from '../firebase'

export const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [user, setUser] = useState({})
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
          setUser(user);
        });
        }
    )
  return (
    <AuthContext.Provider value={{user}}>
        {children}
    </AuthContext.Provider>
  )
}

