import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { app } from "../firebase/firebase.config.";


export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading , setLoading] = useState(true)

    // authentication provider setup
    const auth = getAuth(app);
    const provider = new GoogleAuthProvider()

    const signInPopup = () =>{
        setLoading(true)
        return signInWithPopup(auth , provider)
    }



    // user auth info
    const authInfo = {
        user,
        loading,
        signInPopup
    }
    // user information set state
    useEffect(()=>{
        const unSubscribe = onAuthStateChanged(auth , async(currentUser)=>{
            setLoading(false)
            setUser(currentUser)
            console.log(currentUser)
        })

        return ()=>{
           return unSubscribe()
        }
    },[auth])
    return (
        <AuthContext.Provider value={authInfo}>
            {/* render all components */}
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider
