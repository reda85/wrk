import { createContext, useContext, useEffect, useState } from 'react'
import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  getAuth
} from 'firebase/auth'
import { auth } from '../lib/clientApp'
import { findUserByUid } from '../queries/users/getUsers'
import { useLazyQuery } from '@apollo/client'


const AuthUserContext = createContext({})

export const useAuth = () => useContext(AuthUserContext)

export const AuthContextProvider = ({
  children,

}) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log("userereree", user)
  const [getUser, {data }] = useLazyQuery(findUserByUid)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        getUser({
            variables: {
              uid : user.uid
            },
          }).then( data => {
            setUser({
                uid: user.uid,
                email: user.email,
                FirstName : data.data.users[0].FirstName,
          LastName : data.data.users[0].LastName,
         
          id : data.data.users[0].id,
          organization_id : data.data.users[0].organization_id,
          organization : data.data.users[0].organization.name,
              })
      
    })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = async () => {
    setUser(null)
    await signOut(auth)
  }

  return (
    <AuthUserContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthUserContext.Provider>
  )
}