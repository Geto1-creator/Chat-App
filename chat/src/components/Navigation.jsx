import styles from "./assets/css/navigation.module.css";
import { BsChatSquareDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import { AiFillRightCircle, AiOutlineClose } from "react-icons/ai";
import { useState } from "react";
import { SidebarData } from "./SidebarData";

export const Navigation = () => {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar(!sidebar);
  console.log(SidebarData);
  return (
    <>
      <div className={styles.container}>
        <div>
          <AiFillRightCircle className={styles.icons} onClick={() => setSidebar(true)}/>
        </div>
      </div>
      <nav
        className={
          sidebar ? `${styles.navMenu} ${styles.active}` : styles.navMenu
        }>
        <ul className={styles.navMenuItems}>
          <li className={styles.navbarToggle}>
            <Link to="#" className={styles.menuBars}>
              <AiOutlineClose onClick={() => setSidebar(false)}/>
            </Link>
          </li>
          {SidebarData.map((item, index) => { 
            return (
              <li key={index} className={styles.options}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
};
