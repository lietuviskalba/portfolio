// client/src/App.js
import React from "react";
import { Routes, Route } from "react-router-dom"; // Import Routes and Route
import NavBar from "./components/NavBar";
import styles from "./App.module.css";

// Define a Home component for the default route
function Home() {
  return (
    <main className={styles.main}>
      <h1>Under Construction</h1>
      <p>Welcome to my portfolio. This site is currently under development.</p>
    </main>
  );
}

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* In the future, add additional routes here */}
      </Routes>
    </div>
  );
}

export default App;
