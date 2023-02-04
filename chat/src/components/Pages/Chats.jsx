import { useContext, useState } from "react";
import { AuthContext } from "../common/Provider/AuthProvider";
import styles from "../assets/css/chats.module.css";
import Button from "react-bootstrap/Button";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, db } from "../common/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, where } from "firebase/firestore";

export const Chats = () => {
  const { user } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [userr, setUserr] = useState(null);
  const [err, setErr] = useState(false);

  console.log(user);
  const navigate = useNavigate();

  const handleSearch = async () => {

    const q = query(
      collection(db, "user"),
      where("name", "==", username)
    );
    try {
        const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(q)
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

  console.log(userr)
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

                  <Button onClick={logOut}>Logout</Button>
                </div>
              
                <div className={styles.inputContainer}>
                  <input
                  className={styles.findInput}
                    onKeyDown={handleKey}
                    onChange={(e) => setUsername(e.target.value)}
                    type="text"
                    placeholder="Find a user"
                  ></input>
                   
                </div>
                <hr></hr>
                {err && <span>{err}</span>}
                {userr && (
                  <div>
                    <img src={userr.photoURL} />
                    <div>
                      <span>{userr.name}</span>
                    </div>
                  </div>
                )}
                
              </div>
              <div className={styles.chatSection}>
                <div className={styles.messageSection}></div>
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
