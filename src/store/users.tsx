import { createContext, Dispatch } from 'react';

type UserType = {
  id: number;
  name: string;
};

type UsersStoreType = {
  currentUser: number;
  users: UserType[];
};

interface UsersContextType extends UsersStoreType {
  dispatch: Dispatch<any>;
}

const storedActiveUser: number = Number(localStorage.getItem('activeUser'));
const storedUsers: UserType[] = JSON.parse(
  localStorage.getItem('users') || '[]',
);

const defaultState: UsersStoreType = {
  currentUser: storedActiveUser,
  users: storedUsers,
};

const UsersContext = createContext<UsersContextType>({
  ...defaultState,
  dispatch: () => {},
});

const usersReducer = (store: UsersStoreType, action: any) => {
  console.log(action);
  return store;
};

export type { UsersStoreType, UserType, UsersContextType };
export { defaultState, usersReducer };
export default UsersContext;
