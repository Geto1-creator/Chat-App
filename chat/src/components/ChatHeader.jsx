import { useContext } from "react";
import styles from "./assets/css/chatheader.module.css";
import { ChatContext } from "./common/Provider/ChatProvider";

export const ChatHeader = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className={styles.Container}>
      <div className={styles.userSection}>
        <img className={styles.userImg} src={data.user?.photoURL}></img>
        <span className={styles.usernameText}>{data.user?.name}</span>
      </div>
    </div>
  );
};
