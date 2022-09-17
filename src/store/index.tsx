import { FC, useContext, useReducer } from 'react';

import UsersProvider, {
  usersReducer,
  defaultState as defaultUsersState,
  UsersContextType,
} from './users';
import DataProvider, {
  dataReducer,
  defaultState as defaultDataState,
  DataContextType,
  DataItemType,
} from './data';

type StoreTypes = 'users' | 'data';

const RootProvider: FC<{ children: any }> = ({ children }) => {
  const [usersState, dispatchUsers] = useReducer(
    usersReducer,
    defaultUsersState,
  );
  const [dataState, dispatchData] = useReducer(dataReducer, defaultDataState);

  return (
    <UsersProvider.Provider
      value={{
        ...usersState,
        dispatch: dispatchUsers,
      }}
    >
      <DataProvider.Provider
        value={{
          ...dataState,
          dispatch: dispatchData,
        }}
      >
        {children}
      </DataProvider.Provider>
    </UsersProvider.Provider>
  );
};

const useStore = (
  store: StoreTypes,
): UsersContextType | DataContextType | {} => {
  const usersStore = useContext(UsersProvider);
  const dataStore = useContext(DataProvider);

  switch (store) {
    case 'users':
      return usersStore;
    case 'data':
      let activeDataItem: DataItemType[] = [];

      if (usersStore.activeUserId) {
        activeDataItem = dataStore.data[usersStore.activeUserId];
      }
      return {
        ...dataStore,
        activeDataItem,
      };
    default:
      console.warn(`Requested store doesn't exist`);
      return {};
  }
};

export { useStore };
export type { UsersContextType };

export default RootProvider;
