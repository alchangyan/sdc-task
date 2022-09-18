import { FC, useState } from 'react';

import DataProvider, { defaultData } from './data';
import UsersProvider, { defaultActiveUserId, defaultUsers } from './users';

const RootProvider: FC<{ children: any }> = ({ children }) => {
  const [activeUserId, setActiveUserId] = useState(defaultActiveUserId);
  const [users, setUsers] = useState(defaultUsers);
  const [data, setData] = useState(defaultData);

  return (
    <UsersProvider.Provider
      value={{
        users,
        activeUserId,
        setUsers,
        setActiveUserId,
      }}
    >
      <DataProvider.Provider
        value={{
          data,
          setData,
        }}
      >
        {children}
      </DataProvider.Provider>
    </UsersProvider.Provider>
  );
};

export default RootProvider;
