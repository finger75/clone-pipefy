import React from 'react';
import GlobalStyles from './styles/GlobalStyles';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Header from './components/Header';
import Board from './components/Board';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GlobalStyles />
      <Header />
      <Board />
    </DndProvider>
  );
}

export default App;
