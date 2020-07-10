import React from "react";
import "./App.css";
import logo from "./logo.svg";
import Home from "./Components/Home/Home";

function App() {
  return (
    <div>
      <header className="header">
        <div className="label">
          <img className="logo" src={logo} alt="Logo" />
          YT Downloader
        </div>
      </header>
      <Home />
    </div>
  );
}

export default App;
