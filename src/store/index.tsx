import { FC, useState, ReactNode } from 'react';

import DataProvider, { defaultData } from './data';
import UsersProvider, { defaultActiveUserId, defaultUsers } from './users';
import DragNDropProvider, {
  defaultNewDestination,
  defaultIsDraggingActive,
  defaultDraggingCardId,
  defaultColumns,
} from './dragNDrop';

/**
 * Contains all the Context API providers to have them all in one place as a component.
 * Also contains all the setters and initial values for stores.
 *
 * ##
 */
const RootProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [newDestination, setNewDestination] = useState(defaultNewDestination);
  const [isDraggingActive, setIsDraggingActive] = useState(
    defaultIsDraggingActive,
  );
  const [draggingCardId, setDraggingCardId] = useState<string | null>(
    defaultDraggingCardId,
  );
  const [columns, setColumns] = useState<any[]>(defaultColumns);
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
        <DragNDropProvider.Provider
          value={{
            newDestination,
            isDraggingActive,
            draggingCardId,
            columns,
            setNewDestination,
            setIsDraggingActive,
            setDraggingCardId,
            setColumns,
          }}
        >
          {children}
        </DragNDropProvider.Provider>
      </DataProvider.Provider>
    </UsersProvider.Provider>
  );
};

export default RootProvider;
