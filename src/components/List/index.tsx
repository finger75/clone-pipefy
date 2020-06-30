import React from 'react';
import { Container } from './styles';
import { MdAdd } from 'react-icons/md';
import Card from '../Card';

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

type Props = {
  cardProps: CardProps;
  listIndex: number;
};

const List: React.FC<Props> = ({ cardProps, listIndex }) => {
  return (
    <Container done={cardProps.done}>
      <header>
        <h2>{cardProps.title}</h2>

        {cardProps.creatable && (
          <button type='button'>
            <MdAdd size={24} color='#FFF' />
          </button>
        )}
      </header>

      <ul>
        {cardProps.cards?.map((card, index) => (
          <Card
            key={card.id}
            id={card.id}
            content={card.content}
            user={card.user}
            labels={card.labels}
            index={index}
            listIndex={listIndex}
          />
        ))}
      </ul>
    </Container>
  );
};

export default List;
