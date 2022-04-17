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
import nookies from "nookies";


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
    if (typeof window !== "undefined") {
      window.nookies = nookies;
  }
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
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
    const token = await user.getIdToken();
    nookies.destroy(null, "token");
            nookies.set(null, "token", token, {});
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

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
        console.log(`refreshing token...`);
        const user = getAuth().currentUser;
        if (user)
            await user.getIdToken(true);
    }, 10 * 60 * 1000);
    return () => clearInterval(handle);
}, []);


  return (
    <AuthUserContext.Provider value={{ user, login, signup, logout }}>
      {loading ? null : children}
    </AuthUserContext.Provider>
  )
}