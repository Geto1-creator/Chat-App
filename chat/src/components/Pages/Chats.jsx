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
  const [userr, setUserr] = useState(null);
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
        console.log(q);
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

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        window.localStorage.removeItem("token");
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const handleSelect = async () => {
    //Check wheter the group(chats in firestore) exists, if not create

    const combinedId =
      user.user_id > userr.uid
        ? user.user_id + userr.uid
        : userr.uid + user.user_id;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      console.log(res);
      console.log(res.exists());

      if (!res.exists()) {
        console.log("orsn");
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

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
      } else {
      }
    } catch (err) {}

    setUserr(null);
    setUsername("");
  };

  // console.log(userr, "friend");
  // console.log(user && user.user_id);
  // console.log(username)

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
                {/* <div className={styles.mySection}>
                  <img className={styles.proPic} src={user.picture}></img>
                  <div className={styles.nameCont}>
                    <span className={styles.nameFont}>{user.name}</span>
                    <span className={styles.emailFont}>{user.email}</span>
                  </div>

                  <Button className={styles.logout} onClick={logOut}>
                    Logout
                  </Button>
                </div> */}

                <div className={styles.findInputContainer}>
                  <AiOutlineSearch className={styles.searchIcon} />
                  <input
                    className={styles.findInput}
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    value={username}
                    placeholder="Find a user"></input>
                </div>
                <hr></hr>
                {err && <span>{err}</span>}
                {userr && (
                  <>
                    <div
                      className={styles.friendsChatSection}
                      onClick={handleSelect}>
                      <img className={styles.proPic} src={userr.photoURL} />
                      <div>
                        <span>{userr.name}</span>
                      </div>
                    </div>
                    <hr></hr>
                  </>
                )}

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
                  {/* <button className={styles.sendButton} onClick={handleSend}> */}
                  <RiSendPlaneFill className={styles.sendIcon} />
                  {/* </button> */}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
