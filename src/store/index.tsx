import { FC, useCallback, useContext, useMemo, useState } from 'react';

import UsersProvider, { defaultActiveUserId, defaultUsers } from './users';

import { createUser, setActiveUser, deleteUser } from './actions/users';
import { addCard } from './actions/data';
import {
  CREATE_USER,
  SET_ACTIVE_USER,
  DELETE_USER,
  ADD_CARD,
} from './actionTypes';
import DataProvider, { defaultData } from './data';

import {
  StoreType,
  UseStoreType,
  CustomDispatchType,
  SettersType,
} from '../types/global-types';

const RootProvider: FC<{ children: any }> = ({ children }) => {
  const [activeUserId, setActiveUserId] = useState(defaultActiveUserId);
  const [users, setUsers] = useState(defaultUsers);
  const [data, setData] = useState(defaultData);

  return (
    <UsersProvider.Provider
      value={{
        users,
        activeUserId,
        setUsers,
        setActiveUserId,
      }}
    >
      <DataProvider.Provider
        value={{
          data,
          setData,
        }}
      >
        {children}
      </DataProvider.Provider>
    </UsersProvider.Provider>
  );
};

const useStore = (): UseStoreType => {
  const { activeUserId, users, setActiveUserId, setUsers } =
    useContext(UsersProvider);
  const { data, setData } = useContext(DataProvider);

  const setters: SettersType = useMemo(
    () => ({
      setActiveUserId,
      setUsers,
      setData,
    }),
    [setActiveUserId, setUsers, setData],
  );

  const store: StoreType = useMemo(
    () => ({
      activeUserId,
      users,
      data,
    }),
    [activeUserId, users, data],
  );

  const dispatch: CustomDispatchType = useCallback(
    (action, data) => {
      switch (action) {
        case CREATE_USER:
          createUser(store, setters, data);
          break;
        case SET_ACTIVE_USER:
          setActiveUser(setters, data);
          break;
        case DELETE_USER:
          deleteUser(store, setters, data);
          break;
        case ADD_CARD:
          addCard(store, setters, data);
          break;
        default:
          break;
      }
    },
    [setters, store],
  );

  const currentUserCards = useMemo(() => {
    console.log(data);
    return data.filter(({ user }) => user === activeUserId);
  }, [activeUserId, data]);

  return {
    ...store,
    currentUserCards,
    dispatch,
  };
};

export { useStore };

export default RootProvider;
