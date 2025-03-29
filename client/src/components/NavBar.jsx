// client/src/components/NavBar.jsx
import React from "react";
import styles from "./NavBar.module.css";

const navLinks = [
  { name: "Media Ranker", url: "/media_ranker" },
  { name: "Another App", url: "/another_app" },
];

const NavBar = () => {
  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {navLinks.map((link) => (
          <li key={link.name}>
            <a className={styles.link} href={link.url}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
