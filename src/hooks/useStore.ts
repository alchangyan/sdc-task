import { useCallback, useContext, useMemo } from 'react';

import { createUser, setActiveUser, deleteUser } from '../store/actions/users';
import { addCard } from '../store/actions/data';
import {
  CREATE_USER,
  SET_ACTIVE_USER,
  DELETE_USER,
  ADD_CARD,
} from '../store/actionTypes';
import DataProvider from '../store/data';
import UsersProvider from '../store/users';

import {
  StoreType,
  UseStoreType,
  CustomDispatchType,
  SettersType,
} from '../types/global-types';

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

  const userCards = useMemo(() => {
    return data.filter(({ user }) => user === activeUserId);
  }, [activeUserId, data]);

  return {
    ...store,
    userCards,
    dispatch,
  };
};

export default useStore;
