import { useContext, useRef, useState } from "react";
import { AuthContext } from "../common/Provider/AuthProvider";
import styles from "../assets/css/chats.module.css";
import Button from "react-bootstrap/Button";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../common/firebase";
import { useNavigate } from "react-router-dom";
import { RiImage2Fill, RiSendPlaneFill } from "react-icons/ri";
import { AiOutlineSearch } from "react-icons/ai";
import {
  collection,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
  doc,
  getDoc,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";
import { Messages } from "../Messages";
import { ChatContext } from "../common/Provider/ChatProvider";
import { ChatHeader } from "../ChatHeader";
import { ChatLists } from "../ChatLists";
import { v4 as uuid } from "uuid";

export const Chats = () => {
  const { user } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const [username, setUsername] = useState("");
  const [userr, setUserr] = useState();
  const [err, setErr] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const ref = useRef();
  const navigate = useNavigate();

  const handleSearch = async () => {
    const q = query(collection(db, "user"), where("name", "==", username));
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.data());
        setUserr(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };
  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
    // console.log(e.code)
  };
  console.log(userr);
  const handleSelect = async () => {
    //Check wheter the group(chats in firestore) exists, if not create

    const combinedId =
      user.user_id > userr.uid
        ? user.user_id + userr.uid
        : userr.uid + user.user_id;
    try {
      const res = await getDoc(doc(db, "userChats", user.user_id));
      const res2 = await getDoc(doc(db, "chats", combinedId));

      console.log(res.exists(), res2.exists());
      if (!res.exists() || !res2.exists()) {
        console.log("orsn");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        console.log(user.user_id);
        //Create user chats
        await updateDoc(doc(db, "userChats", user.user_id), {
          [combinedId + ".userInfo"]: {
            uid: userr.uid,
            name: userr.name,
            photoURL: userr.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", userr.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.user_id,
            name: user.name,
            photoURL: user.picture,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        console.log("yube");
      } else {
        await updateDoc(doc(db, "userChats", user.user_id), {
          [combinedId + ".userInfo"]: {
            uid: userr.uid,
            name: userr.name,
            photoURL: userr.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}

    setUserr(null);
    setUsername("");
  };

  const handleSend = async () => {
    if (text) {
      if (img) {
        return;
      } else {
        // console.log(text, user.user_id);
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: user.user_id,
            date: Timestamp.now(),
          }),
        });
      }

      console.log(data.user);
      await updateDoc(doc(db, "userChats", user.user_id), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
    }

    setText("");
    setImg(null);
  };

  return (
    <div className={styles.container}>
      <div>
        {user && (
          <>
            <div className={styles.chatContainer}>
              <div className={styles.friendsSection}>
                <p className={styles.topTitle}>Chats</p>

                <div className={styles.findInputContainer}>
                  <input
                    className={styles.findInput}
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    value={username}
                    placeholder="Find a user..."></input>
                  <button className={styles.searchButton}>
                    <AiOutlineSearch className={styles.searchIcon} />
                  </button>
                </div>

                {userr && (
                  <>
                    <div
                      className={styles.friendsChatSection}
                      onClick={handleSelect}>
                      <img className={styles.proPic} src={userr.photoURL} />
                      <div>
                        <span className={styles.searchName}>{userr.name}</span>
                      </div>
                    </div>
                    <hr></hr>
                  </>
                )}
                <p className={styles.midTitle}>DIRECT MESSAGES</p>
                <ChatLists />
              </div>
              <div className={styles.chatSection}>
                <ChatHeader />
                <Messages />
                <div className={styles.inputContainer}>
                  <RiImage2Fill className={styles.imgIcon} />
                  <input
                    className={styles.input}
                    type="text"
                    value={text}
                    placeholder="Chatting..."
                    onChange={(e) => setText(e.target.value)}></input>
                  <Button className={styles.sendButton}>
                    <RiSendPlaneFill
                      className={styles.sendIcon}
                      onClick={handleSend}
                    />
                  </Button>{" "}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
