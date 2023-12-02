import React, { useSyncExternalStore } from "react";
import "./App.css";
import { Color, useRandomColor } from "./useRandomColor";

const testUrl = "http://localhost:5173/";

function App() {
  const { store, changeColor } = useRandomColor();

  const buttonColor = useSyncExternalStore<Color>(
    store.subscribe,
    store.getSnapshot
  );

  const openNewWindow = () => {
    window.open(testUrl + "?testStringForDifferentQueryString");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <button style={{ backgroundColor: buttonColor }} onClick={changeColor}>
        change color
      </button>
      <button onClick={openNewWindow}>open new window</button>
    </div>
  );
}

export default App;
