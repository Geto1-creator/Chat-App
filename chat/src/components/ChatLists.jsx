import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styles from "./assets/css/chatlists.module.css";
import { db } from "./common/firebase";
import { AuthContext } from "./common/Provider/AuthProvider";
import { ChatContext } from "./common/Provider/ChatProvider";

export const ChatLists = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    console.log("oorclogdoh");
    const getChats = async () => {
      const unsub = onSnapshot(doc(db, "userChats", user.user_id), (doc) => {
        console.log(doc.data());
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };
    getChats();
  }, [user.user_id]);

  const handleSelect = (u) => {
    console.log(u);
    dispatch({ type: "CHANGE_USER", payload: u });
  };

  // console.log(Object.entries(chats));
  return (
    <div className={styles.Container}>
      {chats &&
        Object.entries(chats)
          ?.sort((a, b) => b[1].date - a[1].date)
          .map((chat, index) => {
            return (
              <div
                className={styles.userChat}
                key={chat[0]}
                onClick={() => handleSelect(chat[1].userInfo)}>
                <img
                  className={styles.userImg}
                  src={chat[1].userInfo.photoURL}></img>
                <div className={styles.messageBorder}>
                  <span className={styles.usernameText}>
                    {chat[1].userInfo.name}
                  </span>
                  <span className={styles.messageTexts}>
                    {chat[1].lastMessage?.text}
                  </span>
                </div>
              </div>
            );
          })}
    </div>
  );
};
