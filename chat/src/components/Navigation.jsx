import styles from "./assets/css/navigation.module.css";
import { BsChatSquareDots } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AiFillRightCircle, AiOutlineClose } from "react-icons/ai";
import { useContext, useState } from "react";
import { SidebarData } from "./SidebarData";
import * as BsIcons from "react-icons/bs";
import { AuthContext } from "./common/Provider/AuthProvider";
import { signOut } from "firebase/auth";
import { auth } from "./common/firebase";

export const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful");
        window.localStorage.removeItem("token");
        setUser(null);
        
        setSidebar(true);
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
        console.log(error);
      });
  };

  const showSidebar = () => setSidebar(!sidebar);
  console.log(SidebarData);
  return (
    <>
      <div className={styles.container}>
        <div>
          <AiFillRightCircle
            className={styles.icons}
            onClick={() => setSidebar(true)}
          />
        </div>
      </div>
      <nav
        className={
          sidebar ? `${styles.navMenu} ${styles.active}` : styles.navMenu
        }>
        <ul className={styles.navMenuItems}>
          <li className={styles.navbarToggle}>
            <Link to="#" className={styles.menuBars}>
              <AiOutlineClose onClick={() => setSidebar(false)} />
            </Link>
          </li>
          {user && (
            <li className={styles.user}>
              <span className={styles.navTitles}>{user && user.name}</span>
              <button className={styles.logout} onClick={logOut}>
                Logout
              </button>
            </li>
          )}
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={styles.options}>
                <Link to={item.path}>
                  {item.icon}
                  <span className={styles.navTitles}>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
