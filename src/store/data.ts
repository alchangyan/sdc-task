import { createContext } from 'react';
import type { DataContextType, DataItemType } from '../types/global-types';

/**
 * Getting default state of the data store
 *
 * ##
 */
const defaultData: DataItemType[] = JSON.parse(
  localStorage.getItem('data') || '[]',
);

const DataContext = createContext<DataContextType>({
  data: defaultData,
  setData: () => {},
});

export { defaultData };
export default DataContext;
