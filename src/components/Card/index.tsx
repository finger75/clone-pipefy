import React, { useRef, useContext } from 'react';
import { Container, Label } from './styles';
import { useDrag, useDrop } from 'react-dnd';

import BoardContext from '../Board/context';

export interface CardItem {
  id: number;
  content?: string;
  labels?: string[];
  user?: string;
  index?: number;
  listIndex: number;
}

interface DropItem {
  type: string;
  id: number;
  index: number;
  content: string;
  listIndex: number;
}

const Card: React.FC<CardItem> = ({ id, content, labels, user, index, listIndex }) => {
  const ref = useRef() as React.MutableRefObject<HTMLDivElement>;

  const { move } = useContext(BoardContext);

  const [{ isDragging }, dragRef] = useDrag({
    item: { type: 'CARD', id: id, index: index, content: content, listIndex: listIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'CARD',
    hover(item: DropItem, monitor) {
      const draggedIndex = item.index;
      const targetIndex = index!;
      const draggedListIndex = item.listIndex;
      const targetListIndex = listIndex;

      if (draggedIndex === targetIndex && draggedListIndex === targetListIndex) {
        return;
      }

      const targetSize = ref.current?.getBoundingClientRect();
      const targetCenter = (targetSize!.bottom - targetSize!.top) / 2;
      const draggedOffset = monitor.getClientOffset();
      const draggedTop = draggedOffset!.y - targetSize!.top;

      if (draggedIndex < targetIndex! && draggedTop < targetCenter) {
        return;
      }

      if (draggedIndex > targetIndex && draggedTop > targetCenter) {
        return;
      }

      move(draggedListIndex, targetListIndex, draggedIndex, targetIndex!);

      item.index = targetIndex;
      item.listIndex = targetListIndex;

    },
  });

  dragRef(dropRef(ref));

  return (
    <Container ref={ref} isDragging={isDragging}>
      <header>
        {labels && labels.map((label) => <Label key={label} color={label} />)}
      </header>
      <p>{content}</p>

      {user && <img src={user} alt='Adorable avatar' />}
    </Container>
  );
};

export default Card;
