import { Dispatch, SetStateAction } from 'react';
// Global
export type ColumnStatusType = 'to do' | 'doing' | 'done' | null;

// Data
export type DataItemType = {
  id: string;
  type: string;
  status: ColumnStatusType;
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

// Drag'N'Drop
export type DragNDropStoreType = {
  isDraggingActive: boolean;
  draggingCardId: string | null;
  columns: any[];
  newDestination: ColumnStatusType;
};

export interface DragNDropContextType extends DragNDropStoreType {
  setIsDraggingActive: Dispatch<SetStateAction<boolean>>;
  setDraggingCardId: Dispatch<SetStateAction<string | null>>;
  setColumns: Dispatch<SetStateAction<any[]>>;
  setNewDestination: Dispatch<SetStateAction<ColumnStatusType>>;
}

// Store
export interface StoreType
  extends UsersStoreType,
    DataStoreType,
    DragNDropStoreType {}

export type CustomDispatchType = (action: string, payload?: any) => void;

export type SettersType = {
  setData: Dispatch<SetStateAction<DataItemType[]>>;
  setActiveUserId: Dispatch<SetStateAction<string | null>>;
  setUsers: Dispatch<SetStateAction<UserType[]>>;
  setIsDraggingActive: Dispatch<SetStateAction<boolean>>;
  setDraggingCardId: Dispatch<SetStateAction<string | null>>;
  setColumns: Dispatch<SetStateAction<any[]>>;
  setNewDestination: Dispatch<SetStateAction<ColumnStatusType>>;
};

export type UseStoreType = UsersStoreType &
  DataStoreType &
  DragNDropStoreType & {
    userCards: DataItemType[];
    dispatch: CustomDispatchType;
  };
