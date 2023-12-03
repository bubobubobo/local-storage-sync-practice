import React from "react";
import "./App.css";
import { useRandomColor } from "./useRandomColor";

const testUrl = "http://localhost:5173/";

function App() {
  const { color, changeColor } = useRandomColor();

  const openNewWindow = () => {
    window.open(testUrl + "?testStringForDifferentQueryString");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <button style={{ backgroundColor: color }} onClick={changeColor}>
        change color
      </button>
      <button onClick={openNewWindow}>open new window</button>
    </div>
  );
}

export default App;
