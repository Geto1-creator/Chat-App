import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useState } from "react";
import styles from "./assets/css/messages.module.css";
import { db } from "./common/firebase";
import { AuthContext } from "./common/Provider/AuthProvider";
import { ChatContext } from "./common/Provider/ChatProvider";

export const Messages = () => {
  const { user } = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const getChats = () => {
      console.log('gagaagagaga')
      const unsub = onSnapshot(doc(db, "userChats", user.user_id), (doc) => {
        console.log(doc.data())
        setChats(doc.data());
      });

      return () => {
        unsub();
      };
    };

    user.user_id && getChats();
  }, [user.user_id]);

  const handleSelect = (u) => {
    dispatch({type: "CHANGE_USER", payload: u})
  }

  console.log(Object.entries(chats));
  return (
    <div className={styles.Container} onClick={handleSelect}>
      {Object.entries(chats)?.map((chat) => (
        <div className={styles.userChat} key={chat[1]}>
            <img
              className={styles.userImg}
              src={chat[1].userInfo.photoURL}></img>
            <div className={styles.messageBorder}>
            <span className={styles.usernameText}>{chat[1].userInfo.name}</span>
              <span className={styles.messageTexts}>
                {chat[1].lastMessage?.text}
              </span>
            </div>
          </div>
        
      ))}
    </div>
  );
};
