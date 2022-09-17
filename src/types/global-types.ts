import { Dispatch, SetStateAction } from 'react';

// Data
export type DataItemType = {
  id: string;
  type: string;
  status: string;
  description: string;
  user: string;
};

export type DataStoreType = {
  data: DataItemType[];
};

export interface DataContextType extends DataStoreType {
  setData: Dispatch<SetStateAction<DataItemType[]>>;
}

// User
export type UserType = {
  id: string;
  name: string;
};

export type UsersStoreType = {
  activeUserId: string | null;
  users: UserType[];
};

export interface UsersContextType extends UsersStoreType {
  setActiveUserId: Dispatch<SetStateAction<string | null>>;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
}

// Store
export interface StoreType extends UsersStoreType, DataStoreType {}

export type CustomDispatchType = (action: string, payload: any) => void;

export type SettersType = {
  setData: Dispatch<SetStateAction<DataItemType[]>>;
  setActiveUserId: Dispatch<SetStateAction<string | null>>;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
};

export type UseStoreType = UsersStoreType &
  DataStoreType & {
    currentUserCards: DataItemType[];
    dispatch: CustomDispatchType;
  };
