import { signInWithPopup, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase";
import jwt_decode from "jwt-decode";
import { doc, getDoc, setDoc } from "firebase/firestore";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(window.localStorage.getItem("token"));
  const [user, setUser] = useState();


  const signInWithGoogle = async () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result);
        const accessToken = result.user.accessToken;
        localStorage.setItem("token", accessToken);
        setToken(accessToken);
        navigate("/chats");
        const name = result.user.displayName;
        const email = result.user.email;
        console.log(name, 'name')
        console.log(result.user.uid)
        await setDoc(doc(db, "user", result.user.uid), {
          uid: result.user.uid,
          name,
          email,
          photoURL: result.user.photoURL
        });
        const res = await getDoc(doc(db, "userChats", result.user.uid));
        console.log(res)
        if (!res.exists()) {
          await setDoc(doc(db, 'userChats', result.user.uid), {})
        }

      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }
  }, [token]);

  const value = {
    signInWithGoogle,
    user,
    setUser,

  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
