import { createContext } from 'react';
import { DataContextType, DataItemType } from '../types/global-types';

const defaultData: DataItemType[] = JSON.parse(localStorage.getItem('data') || '[]');

const DataContext = createContext<DataContextType>({
  data: defaultData,
  setData: () => {},
});

export { defaultData };
export default DataContext;
