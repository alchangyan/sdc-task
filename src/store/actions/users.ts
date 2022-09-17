import { StoreType, SettersType } from '../../types/global-types';

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
  // debugger;
  const newUsers = [...store.users];
  let newData = [...store.data];

  const userToDeleteIndex = newUsers.findIndex(({ id }) => id === userId);

  newUsers.splice(userToDeleteIndex, 1);
  localStorage.setItem('users', JSON.stringify(newUsers));

  newData = newData.filter(({ user }) => user !== userId);
  localStorage.setItem('data', JSON.stringify(newData));

  setUsers(newUsers);
  setData(newData);

  if (userId === store.activeUserId) {
    localStorage.removeItem('activeUserId');
    setActiveUserId(null);
    return;
  }
};
