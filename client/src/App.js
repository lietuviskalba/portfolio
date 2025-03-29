// client/src/App.js
import React from "react";
import NavBar from "./components/NavBar";
import styles from "./App.module.css";

function App() {
  return (
    <div>
      <NavBar />
      <main className={styles.main}>
        <h1>Under Construction</h1>
        <p>
          Welcome to my portfolio. This site is currently under development.
        </p>
      </main>
    </div>
  );
}

export default App;
