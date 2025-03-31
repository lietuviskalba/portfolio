// client/src/components/NavBar.jsx
import React, { useState, useEffect } from "react";
import styles from "./NavBar.module.css";

// Define the initial navigation links
const initialNavLinks = [
  { name: "Media Ranker", url: "https://lingaitis.com/media_ranker" },
  { name: "Another App", url: "/another_app" },
];

const NavBar = () => {
  // Initialize links state from localStorage if available; otherwise, use the initial order
  const [links, setLinks] = useState(() => {
    const storedLinks = localStorage.getItem("navLinks");
    return storedLinks ? JSON.parse(storedLinks) : initialNavLinks;
  });

  // Whenever the links change, update localStorage to persist the order
  useEffect(() => {
    localStorage.setItem("navLinks", JSON.stringify(links));
  }, [links]);

  const handleLinkClick = (clickedLink, event) => {
    event.preventDefault();

    // Reorder the links: place the clicked link at the beginning
    const newLinks = [
      clickedLink,
      ...links.filter((link) => link.name !== clickedLink.name),
    ];
    setLinks(newLinks);

    // Use a slight delay to allow the state (and localStorage) to update before navigation.
    setTimeout(() => {
      window.location.href = clickedLink.url;
    }, 50);
  };

  return (
    <nav className={styles.nav}>
      <ul className={styles.navList}>
        {links.map((link) => (
          <li key={link.name}>
            <a
              className={styles.link}
              href={link.url}
              onClick={(e) => handleLinkClick(link, e)}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
