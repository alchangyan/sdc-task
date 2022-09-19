import { useCallback, useContext, useMemo } from 'react';

import { createUser, setActiveUser, deleteUser } from '../store/actions/users';
import { addCard, moveCard } from '../store/actions/data';
import {
  CREATE_USER,
  SET_ACTIVE_USER,
  DELETE_USER,
  ADD_CARD,
  MOVE_CARD,
  SET_DRAGGING_ACTIVE,
  SET_DRAGGING_INACTIVE,
  SET_DRAGGING_CARD_ID,
  ADD_COLUMN,
  SET_CARD_DESTINATION,
} from '../store/actionTypes';
import DataProvider from '../store/data';
import UsersProvider from '../store/users';
import DragNDropProvider from '../store/dragNDrop';

import type {
  StoreType,
  UseStoreType,
  CustomDispatchType,
  SettersType,
} from '../types/global-types';

/**
 * Custom hook to have everything related to store in one place.
 * Whole store is returned by using it.
 * Also I am returning current user card and dispatch function which is explained below.
 *
 * ##
 */
const useStore = (): UseStoreType => {
  const { activeUserId, users, setActiveUserId, setUsers } =
    useContext(UsersProvider);
  const { data, setData } = useContext(DataProvider);
  const {
    isDraggingActive,
    draggingCardId,
    columns,
    newDestination,
    setIsDraggingActive,
    setDraggingCardId,
    setColumns,
    setNewDestination,
  } = useContext(DragNDropProvider);

  const setters: SettersType = useMemo(
    () => ({
      setActiveUserId,
      setUsers,
      setData,
      setIsDraggingActive,
      setDraggingCardId,
      setColumns,
      setNewDestination,
    }),
    [
      setActiveUserId,
      setUsers,
      setData,
      setIsDraggingActive,
      setDraggingCardId,
      setColumns,
      setNewDestination,
    ],
  );

  const store: StoreType = useMemo(
    () => ({
      activeUserId,
      users,
      data,
      isDraggingActive,
      draggingCardId,
      columns,
      newDestination,
    }),
    [
      activeUserId,
      users,
      data,
      isDraggingActive,
      draggingCardId,
      columns,
      newDestination,
    ],
  );

  /**
   * Redux-like reducer.
   * Special actions are used for more complex operations (like createUser, moveCard, etc.).
   *
   * ##
   */
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
        case MOVE_CARD:
          moveCard(store, setters, data);
          break;
        case SET_DRAGGING_ACTIVE:
          setIsDraggingActive(true);
          break;
        case SET_DRAGGING_INACTIVE:
          setIsDraggingActive(false);
          break;
        case SET_DRAGGING_CARD_ID:
          setDraggingCardId(data);
          break;
        case ADD_COLUMN:
          setColumns(prevState => [...prevState, data]);
          break;
        case SET_CARD_DESTINATION:
          setNewDestination(data);
          break;
        default:
          break;
      }
    },
    [
      setters,
      store,
      setIsDraggingActive,
      setDraggingCardId,
      setColumns,
      setNewDestination,
    ],
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
