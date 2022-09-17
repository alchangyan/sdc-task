import { createContext, Dispatch } from 'react';

type UserType = {
  id: string;
  name: string;
};

type UsersStoreType = {
  activeUserId: string | null;
  users: UserType[];
};

interface UsersContextType extends UsersStoreType {
  dispatch: Dispatch<any>;
}

const storedActiveUser: string | null =
  localStorage.getItem('activeUserId') || null;
const storedUsers: UserType[] = JSON.parse(
  localStorage.getItem('users') || '[]',
);

const defaultState: UsersStoreType = {
  activeUserId: storedActiveUser,
  users: storedUsers,
};

const UsersContext = createContext<UsersContextType>({
  ...defaultState,
  dispatch: () => {},
});

const usersReducer = (store: UsersStoreType, action: any) => {
  const newUsers = [...store.users];
  let newActiveUserId = store.activeUserId;

  switch (action.type) {
    case 'add user':
      const newUser = {
        id: String(Date.now()),
        name: action.payload,
      };

      newUsers.push(newUser);

      localStorage.setItem('users', JSON.stringify(newUsers));

      return {
        ...store,
        users: newUsers,
      };
    case 'delete user':
      const userToDeleteIndex = newUsers.findIndex(
        ({ id }) => id === action.payload,
      );

      newUsers.splice(userToDeleteIndex, 1);

      localStorage.setItem('users', JSON.stringify(newUsers));

      if (action.payload === store.activeUserId) {
        localStorage.removeItem('activeUserId');
        newActiveUserId = null;
      }

      return {
        activeUserId: newActiveUserId,
        users: newUsers,
      };
    case 'set active user':
      localStorage.setItem('activeUserId', action.payload);

      return {
        ...store,
        activeUserId: action.payload,
      };

    default:
      return store;
  }
};

export type { UsersStoreType, UserType, UsersContextType };
export { defaultState, usersReducer };
export default UsersContext;
