import { createContext } from 'react';

export interface CardItem {
    id: number;
    content?: string;
    labels?: string[];
    user?: string;
  }

export interface CardProps  {
    title: string;
    creatable?: boolean;
    done?: boolean;
    cards?: CardItem[];
  }

export default createContext({
    lists: [] as any,
    move: (fromList: number, toList: number, from: number, to: number) => {}
});