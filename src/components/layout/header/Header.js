import React, { useState, useEffect } from "react";
import { FaBars } from "react-icons/fa";
import styles from "./Header.module.css";
import Navbar from "../navigation/NavBar/NavBar";
import NavBarMobile from "../navigation/NavBarMobile/NavBarMobile";

const { header, navbar__wrapper, header__icon, icon } = styles;

const Header = () => {
  const [menuIsActive, setMenuIsActive] = useState(true);
  const [toggleMenuMobile, setToggleMenuMobile] = useState(false);

  const handleResize = () => {
    window.innerWidth <= 650 ? setMenuIsActive(false) : setMenuIsActive(true);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenuMobile = () => {
    setToggleMenuMobile(!toggleMenuMobile);
  };

  return (
    <header className={header}>
      <div className={navbar__wrapper}>
        {menuIsActive ? (
          <Navbar />
        ) : (
          <NavBarMobile isActive={toggleMenuMobile} />
        )}
        {!menuIsActive && (
          <div className={header__icon} onClick={handleMenuMobile}>
            <FaBars className={icon} />
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
