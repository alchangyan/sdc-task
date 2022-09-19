import { createContext } from 'react';
import { DragNDropContextType, ColumnStatusType } from '../types/global-types';

const defaultIsDraggingActive: boolean = false;
const defaultDraggingCardId: string | null = null;
const defaultColumns: any[] = [];
const defaultNewDestination: ColumnStatusType = null;

const DragNDropContext = createContext<DragNDropContextType>({
  isDraggingActive: defaultIsDraggingActive,
  draggingCardId: defaultDraggingCardId,
  columns: defaultColumns,
  newDestination: defaultNewDestination,
  setIsDraggingActive: () => {},
  setDraggingCardId: () => {},
  setColumns: () => {},
  setNewDestination: () => {},
});

export {
  defaultIsDraggingActive,
  defaultDraggingCardId,
  defaultColumns,
  defaultNewDestination,
};
export default DragNDropContext;
