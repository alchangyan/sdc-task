import { createContext } from 'react';
import type {
  DragNDropContextType,
  ColumnStatusType,
} from '../types/global-types';

/**
 * I am having this default states to follow project strucure as I have it for data and users stores
 *
 *
 * isDraggingActive - true if dragging is activated (if user moved card starting from some point)
 * draggingCardId   - card ID that is grabbed by user
 * columns          - collected column referrences to have their instances for further dragging calculations (if user hovers on them while dragging is active)
 * newDestination   - contains card column status (column ID) which is hover while dragging which is differs from the initial card column
 *
 * ##
 */
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
