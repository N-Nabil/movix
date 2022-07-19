import React from "react";
import "./App.css";
import "antd/dist/antd.min.css";

import Movies from "./components/Movies/Movies";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Movies />
    </div>
  );
}

export default App;
