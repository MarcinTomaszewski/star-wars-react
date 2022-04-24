import React, { useContext } from "react";
import StarWarsContext from "../../../../context/swContext";
import { NavLink } from "react-router-dom";
import { MENU_ITEMS } from "../../../../utils/constants/navbar.constants";
import styles from "./NavBarMobile.module.css";

const {
  mobile,
  mobile__menu,
  mobile__element,
  mobile__link,
  favorite_info,
  active,
} = styles;

const NavBarMobile = ({ isActive }) => {
  const { favorite, serviceFavorite } = useContext(StarWarsContext);
  const { filteredFavoriteByType } = serviceFavorite;

  const displayByType = (link) => {
    const favoriteLength = filteredFavoriteByType(link.type).length;
    return link.type === "favorite" ? (
      <span className={favorite_info}>{favorite.length}</span>
    ) : favoriteLength ? (
      <span className={favorite_info}>
        {favoriteLength ? favoriteLength : null}
      </span>
    ) : null;
  };

  const displayByHomeType = (link) => {
    return link.type === "home" ? null : displayByType(link);
  };

  const mobileMenu = MENU_ITEMS.map((link, index) => (
    <li className={mobile__element} key={index}>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          isActive ? active + " " + mobile__link : mobile__link
        }
      >
        {link.name}
      </NavLink>
      {favorite.length ? displayByHomeType(link) : null}
    </li>
  ));

  const active = isActive ? { left: 0, transition: "left 0.5s" } : null;
  return (
    <nav className={mobile}>
      <ul className={mobile__menu} style={active}>
        {mobileMenu}
      </ul>
    </nav>
  );
};

export default NavBarMobile;
