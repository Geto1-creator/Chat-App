import { useContext, useState } from "react";
import { AuthContext } from "../common/Provider/AuthProvider";
import styles from "../assets/css/chats.module.css";
import Button from "react-bootstrap/Button";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../common/firebase";
import { useNavigate } from "react-router-dom";
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
} from "firebase/firestore";
import { Messages } from "../Messages";

export const Chats = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [userr, setUserr] = useState(null);
  const [err, setErr] = useState(false);

  // console.log(user);
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
        console.log(user.user_id, userr.uid);
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
      }
    } catch (err) {}

    setUserr(null);
    setUsername("");
  };

  // console.log(userr, "friend");
  // console.log(user && user.user_id);
  // console.log(username)
  return (
    <div className={styles.container}>
      <div>
        {user && (
          <>
            <div className={styles.chatContainer}>
              <div className={styles.friendsSection}>
                <div className={styles.mySection}>
                  <img className={styles.proPic} src={user.picture}></img>
                  <div className={styles.nameCont}>
                    <span className={styles.nameFont}>{user.name}</span>
                    <span className={styles.emailFont}>{user.email}</span>
                  </div>

                  <Button className={styles.logout} onClick={logOut}>
                    Logout
                  </Button>
                </div>

                <div className={styles.inputContainer}>
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
                  <div
                    className={styles.friendsChatSection}
                    onClick={handleSelect}>
                    <img className={styles.proPic} src={userr.photoURL} />
                    <div>
                      <span>{userr.name}</span>
                    </div>
                  </div>
                )}
              </div>
              <div className={styles.chatSection}>
                <Messages />
                <div className={styles.inputContainer}>
                  <input className={styles.input} type="text"></input>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
