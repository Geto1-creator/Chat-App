import { doc, onSnapshot } from "firebase/firestore";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "./assets/css/messages.module.css";
import { db } from "./common/firebase";
import { ChatContext } from "./common/Provider/ChatProvider";
import { AuthContext } from "./common/Provider/AuthProvider";

export const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  const { user } = useContext(AuthContext);
  const ref = useRef();

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      console.log("message oorchlogdoh");
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  useEffect(() => {
    console.log("Scrolled");
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  console.log(messages);

  return (
    <div className={styles.overallContainer}>
      {messages.map((message) => {
        // console.log(message);
        return (
          <div
            key={message.id}
            ref={ref}
            className={
              message.senderId === user.user_id
                ? styles.ownerContainer
                : styles.Container
            }>
            {message.senderId === user.user_id ? (
              <>
                <span className={styles.usernameTexts}>You</span>
                <div className={styles.secondLine}>
                  <div className={styles.ownerMessageBorder}>
                    <span className={styles.messageTexts}>{message.text}</span>
                  </div>
                  <img
                    className={styles.userImg}
                    src={
                      message.senderId === user.user_id
                        ? user.picture
                        : data.user.photoURL
                    }></img>
                </div>
              </>
            ) : (
              <>
                <span className={styles.usernameTexts}>{data.user.name}</span>
                <div className={styles.secondLine}>
                  <img
                    className={styles.userImg}
                    src={
                      message.senderId === user.user_id
                        ? user.picture
                        : data.user.photoURL
                    }></img>
                  <div className={styles.messageBorder}>
                    <span className={styles.messageTexts}>{message.text}</span>
                  </div>
                </div>
              </>
            )}
          </div>
        );
      })}
    </div>
    // <div className={ message[1].senderId === user.user_id ? styles.ownerContainer : styles.Container}>
    //   {messages.map((message) => {
    //     return (
    //       <div key={message.id}>
    //         <span className={styles.usernameTexts}>Username</span>
    //         <div className={styles.secondLine}>
    //           <img className={styles.userImg} src={message.senderId === user.user_id ? user.picture : data.user.photoURL}></img>
    //           <div className={styles.messageBorder}>
    //             <span className={styles.messageTexts}>{message.text}</span>
    //           </div>
    //         </div>
    //       </div>
    //     );
    //   })}
    // </div>
  );
};
