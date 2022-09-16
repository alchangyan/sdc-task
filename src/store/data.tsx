import { createContext, Dispatch } from 'react';

type DataItemType = {
  type: string;
  status: string;
  description: string;
  user: number;
};

type DataStoreType = {
  data: DataItemType[];
};

interface DataContextType extends DataStoreType {
  dispatch: Dispatch<any>;
}

const storedData: DataItemType[] = JSON.parse(
  localStorage.getItem('data') || '[]',
);

const defaultState: DataStoreType = {
  data: storedData,
};

const DataContext = createContext<DataContextType>({
  ...defaultState,
  dispatch: () => {},
});

const dataReducer = (store: DataStoreType, action: any) => {
  console.log(action);
  return store;
};

export type { DataStoreType, DataItemType, DataContextType };
export { defaultState, dataReducer };
export default DataContext;
