import React from "react";
import styles from "./Footer.module.css";

const { footer, footer__link } = styles;

function Footer() {
  return (
    <footer className={footer}>
      <div className={footer__link}>StarWars</div>
    </footer>
  );
}

export default Footer;
