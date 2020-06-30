import React, { useState } from 'react';
import BoardContext from './context';

import produce from 'immer';

import { Container } from './styles';
import List from '../List';
import { loadLists } from '../../services/api';

export interface CardItem {
  id: number;
  content?: string;
  labels?: string[];
  user?: string;
}

export interface CardProps {
  title: string;
  creatable?: boolean;
  done?: boolean;
  cards?: CardItem[];
}

const data = loadLists();

const Board: React.FC = () => {
  const [lists, setLists] = useState(data);

  function move(fromList: number, toList: number, from: number, to: number) {
    setLists(produce(lists, draft => {
      const dragged = draft[fromList].cards[from];
      draft[fromList].cards.splice(from, 1);
      draft[toList].cards.splice(to, 0, dragged);
    }))
  }

  return (
    <BoardContext.Provider value={{ lists, move }}>
      <Container>
        {lists.map((list: CardProps, index: number) => (
          <List key={list.title} cardProps={list} listIndex={index} />
        ))}
      </Container>
    </BoardContext.Provider>
  );
};
export default Board;
