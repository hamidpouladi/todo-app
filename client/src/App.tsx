import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import StateProvider from "./stateProvider";
import Board from "./components/Board";

function App() {
  return (
    <StateProvider>
      <DndProvider backend={HTML5Backend}>
        <Board />
      </DndProvider>
    </StateProvider>
  );
}

export default App;
