import type { StoreType, SettersType } from '../../types/global-types';

/**
 * I am using Date.now() to forget about unique IDs of the users while creation.
 *
 * ##
 */
export const createUser = (
  store: StoreType,
  { setUsers, setActiveUserId }: SettersType,
  username: string,
) => {
  const newUsers = [...store.users];

  const newUserId = String(Date.now());

  const newUser = {
    id: newUserId,
    name: username,
  };

  newUsers.push(newUser);

  localStorage.setItem('users', JSON.stringify(newUsers));

  setUsers(newUsers);

  /**
   * If this is the first user we made, it will be automatically marked as active one.
   *
   * ##
   */
  if (newUsers.length === 1) {
    setActiveUserId(newUserId);
  }
};

export const setActiveUser = (
  { setActiveUserId }: SettersType,
  userId: string,
) => {
  setActiveUserId(userId);
  localStorage.setItem('activeUserId', userId);
};

export const deleteUser = (
  store: StoreType,
  { setUsers, setData, setActiveUserId }: SettersType,
  userId: string,
) => {
  const newUsers = [...store.users];
  let newData = [...store.data];

  const userToDeleteIndex = newUsers.findIndex(({ id }) => id === userId);

  newUsers.splice(userToDeleteIndex, 1);
  localStorage.setItem('users', JSON.stringify(newUsers));

  newData = newData.filter(({ user }) => user !== userId);
  localStorage.setItem('data', JSON.stringify(newData));

  setUsers(newUsers);
  setData(newData);

  /**
   * If the user we just removed is an active one, I am removing active user from the storage as well, so user will chose which user will be active next.
   *
   * ##
   */
  if (userId === store.activeUserId) {
    localStorage.removeItem('activeUserId');
    setActiveUserId(null);
  }
};
