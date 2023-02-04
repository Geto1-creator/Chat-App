import { useContext } from "react";
import { AuthContext } from "../common/Provider/AuthProvider";
import styles from "../assets/css/chats.module.css";
export const Chats = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return (
    <div className={styles.container}>
      <div>
        {user && (
          <>
            <span>{user.name}</span>
            <span>{user.email}</span>
          </>
        )}
      </div>
    </div>
  );
};
