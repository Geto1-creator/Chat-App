import { signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase";
import jwt_decode from "jwt-decode";
import { doc, setDoc } from "firebase/firestore";
import { AuthContext } from "./AuthProvider";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {

    const { user } = useContext(AuthContext)
    const INITIAL_STATE = {
        chatId: "null",
        user: {}
    }

    const chatReducer = (state, action) => {
        switch (action.type) {
            case "CHANGE_USER":
                return {
                    user: action.payload,
                    chatId: user.user_id > action.payload.uid
                        ? user.user_id + action.payload.uid
                        : action.payload.uid + user.user_id
                }
            default:
                return state
        }
    }

    const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE)

    const value = {
        data: state,
        dispatch

    };
    return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
