import React from "react";
import "./App.css";
import FlowDiagram from "./FlowDiagram";
import { initializeIcons } from "@fluentui/font-icons-mdl2";
initializeIcons();

function App() {
  return (
    <div className="App">
      <FlowDiagram />
    </div>
  );
}

export default App;
