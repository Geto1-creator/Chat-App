import { signInWithPopup } from "firebase/auth"
import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { auth, provider } from "../firebase"
import jwt_decode from "jwt-decode";

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate()
    const [token, setToken] = useState(window.localStorage.getItem('token'));
    const [user, setUser] = useState()

    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            console.log(result)
            const accessToken = result.user.accessToken
            localStorage.setItem("token", accessToken)
            setToken(accessToken)
            navigate('/chats')
        }).catch((err) => {
            console.log(err)
        })
    }

    useEffect(() => {
        if (token) {
            const decoded = jwt_decode(token)
            setUser(decoded)

        }
    }, [token]);

    const value = {
        signInWithGoogle,
        user
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )

}