import React, { useContext } from "react";
import StarWarsContext from "../../../../context/swContext";
import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.css";
import { MENU_ITEMS } from "../../../../utils/constants/navbar.constants";

const {
  navbar,
  navbar__list,
  navbar__element,
  active,
  navbar__link,
  favorite_info,
} = styles;

const NavBar = () => {
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

  const menuLinks = MENU_ITEMS.map((link, index) => (
    <li className={navbar__element} key={index}>
      <NavLink
        to={link.path}
        className={({ isActive }) =>
          isActive ? active + " " + navbar__link : navbar__link
        }
      >
        {link.name}
      </NavLink>
      {favorite.length ? displayByHomeType(link) : null}
    </li>
  ));

  return (
    <nav className={navbar}>
      <ul className={navbar__list}>{menuLinks}</ul>
    </nav>
  );
};

export default NavBar;
