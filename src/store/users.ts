import { createContext } from 'react';
import type { UsersContextType, UserType } from '../types/global-types';

/**
 * Getting default state from the local storage for users only.
 *
 * ##
 */
const defaultActiveUserId: string | null =
  localStorage.getItem('activeUserId') || null;
const defaultUsers: UserType[] = JSON.parse(
  localStorage.getItem('users') || '[]',
);

/**
 * Creation of users' store.
 * Contains active user ID to show cards based on the user.
 *
 * ##
 */

const UsersContext = createContext<UsersContextType>({
  activeUserId: defaultActiveUserId,
  users: defaultUsers,
  setActiveUserId: () => {},
  setUsers: () => {},
});

export { defaultActiveUserId, defaultUsers };
export default UsersContext;
