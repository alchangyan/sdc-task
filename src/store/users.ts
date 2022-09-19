import { createContext } from 'react';
import { UsersContextType, UserType } from '../types/global-types';

const defaultActiveUserId: string | null =
  localStorage.getItem('activeUserId') || null;
const defaultUsers: UserType[] = JSON.parse(
  localStorage.getItem('users') || '[]',
);

const UsersContext = createContext<UsersContextType>({
  activeUserId: defaultActiveUserId,
  users: defaultUsers,
  setActiveUserId: () => {},
  setUsers: () => {},
});

export { defaultActiveUserId, defaultUsers };
export default UsersContext;
