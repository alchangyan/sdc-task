import {
  useState,
  useRef,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
  MutableRefObject,
} from 'react';

// Store
import {
  SET_DRAGGING_ACTIVE,
  SET_DRAGGING_INACTIVE,
  SET_DRAGGING_CARD_ID,
  SET_CARD_DESTINATION,
  MOVE_CARD,
} from '../store/actionTypes';
import useStore from './useStore';

// Types
import type { ColumnStatusType } from '../types/global-types';

// Helpers
import { getDestination } from '../utils/helpers';

type ClickCoordsRefType = { current: { x: number; y: number } };

/**
 * Custom hook to control all the cards in case of dragging.
 * There is a card in every column to show as dragging card destination which is called as "placeholder" (isPlaceholder argument).
 *
 * ##
 */
const useDragNDrop = (
  cardId: string,
  cardStatus: ColumnStatusType,
  isPlaceholder: boolean,
) => {
  const [cardCoords, setCardCoords] = useState({});

  const {
    isDraggingActive: storedIsDraggingActive,
    draggingCardId,
    columns: stroredColumns,
    dispatch: stroredDispatch,
    newDestination: storedNewDestination,
  } = useStore();

  /**
   * All the variables those are used in the event listeners are moved to refs to have them as an ordinary variables and not to trigger useCallback recreation of the functions.
   * Otherwise they are not working as expected.
   *
   * ##
   */
  const dispatch: MutableRefObject<typeof stroredDispatch> =
    useRef(stroredDispatch);
  const columns: MutableRefObject<typeof stroredColumns> =
    useRef(stroredColumns);
  const isActive: MutableRefObject<boolean> = useRef(false);
  const isDraggingActive: MutableRefObject<boolean> = useRef(false);
  const newDestination: MutableRefObject<typeof storedNewDestination> =
    useRef(storedNewDestination);

  dispatch.current = stroredDispatch;
  columns.current = stroredColumns;
  isActive.current = draggingCardId === cardId;
  isDraggingActive.current = storedIsDraggingActive;
  newDestination.current = storedNewDestination;

  /**
   * First click coordinates are stored to have the inital point for further calculations of floating card.
   *
   * ##
   */
  const clickCoords: ClickCoordsRefType = useRef({
    x: 0,
    y: 0,
  });

  /**
   * Getting card which is about to moving.
   * Dragging state is still inactive as it is not moved yet.
   *
   * ##
   */
  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget.dataset;
    clickCoords.current.x = e.pageX;
    clickCoords.current.y = e.pageY;
    dispatch.current(SET_DRAGGING_CARD_ID, id as string);
    /**
     * To remove text selection.
     *
     * ##
     */
    e.preventDefault();
  }, []);

  /**
   * Reset of the dragging and setting new destination of the card if moved.
   * Condition for moving is already in the appropriate action in case if card is still in the same column.
   *
   * ##
   */
  const handleMouseUp = useCallback(() => {
    dispatch.current(MOVE_CARD, { cardId, newStatus: newDestination.current });
    dispatch.current(SET_DRAGGING_INACTIVE);
    dispatch.current(SET_DRAGGING_CARD_ID, null);
  }, [cardId]);

  /**
   * Handling card moving.
   *
   * ##
   */
  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      /**
       * Calculated difference between initial card coordinates and the cursor.
       * If card is moved for more than the specified gap(10px), dragging will be activated.
       *
       * ##
       */
      const yDiff = e.pageY - clickCoords.current.y;
      const xDiff = e.pageX - clickCoords.current.x;

      setCardCoords({
        top: yDiff,
        left: xDiff,
      });

      const destination = getDestination(columns.current, e);

      /**
       * Preventing many dispatch calls while moving.
       *
       * ##
       */
      if (cardStatus !== destination) {
        if (newDestination.current !== destination) {
          dispatch.current(SET_CARD_DESTINATION, destination);
        }
      } else {
        /**
         * For this case there is also condition to avoid final store calls in the appropriate action.
         *
         * ##
         */
        dispatch.current(SET_CARD_DESTINATION, null);
      }

      /**
       * Calculation of cursor while dragging.
       * If cursor moved for more than 10px from the card while dragging, so dragging will be activated.
       *
       * ##
       */
      if (
        !isDraggingActive.current &&
        (Math.abs(xDiff) > 10 || Math.abs(yDiff) > 10)
      ) {
        dispatch.current(SET_DRAGGING_ACTIVE);
      }
    },
    [cardStatus],
  );

  useEffect(() => {
    /**
     * Preventing of attaching event listeners in case if the card is placeholder type.
     *
     * ##
     */
    if (!isPlaceholder) {
      if (isActive.current) {
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mousemove', handleMouseMove);
        return;
      }

      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mousemove', handleMouseMove);
    }
    // eslint-disable-next-line
  }, [draggingCardId, isPlaceholder]);

  /**
   * Dynamically changing dragging card styles which makes card moving with the cursor.
   *
   * ##
   */
  const cardStyles = useMemo(() => {
    if (storedIsDraggingActive && isActive.current) {
      return {
        position: 'relative',
        transform: 'rotate(5deg)',
        zIndex: 1,
        ...cardCoords,
      };
    }

    return {};
  }, [storedIsDraggingActive, cardCoords]);

  return {
    cardStyles,
    handleMouseDown,
  };
};

export default useDragNDrop;
