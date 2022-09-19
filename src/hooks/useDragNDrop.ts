import {
  useState,
  useRef,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';
import {
  SET_DRAGGING_ACTIVE,
  SET_DRAGGING_INACTIVE,
  SET_DRAGGING_CARD_ID,
  SET_CARD_DESTINATION,
  MOVE_CARD,
} from '../store/actionTypes';
import useStore from './useStore';
import type { ColumnStatusType } from '../types/global-types';

// @ts-ignore
const getDestination = (columns, e) => {
  const { pageX, pageY } = e;
  let destination = null;

  // @ts-ignore
  columns.forEach(({ status, ref }) => {
    const { offsetTop, offsetLeft, offsetHeight, offsetWidth } = ref;

    if (
      pageX >= offsetLeft &&
      pageX <= offsetLeft + offsetWidth &&
      pageY >= offsetTop &&
      pageY <= offsetTop + offsetHeight
    ) {
      destination = status;
    }
  });

  return destination;
};

type ClickCoordsRefType = { current: { x: number; y: number } };

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

  const dispatch: any = useRef(null);
  const columns: any = useRef(null);
  const isActive: any = useRef(false);
  const isDraggingActive: any = useRef(false);
  const newDestination: any = useRef(false);

  dispatch.current = stroredDispatch;
  columns.current = stroredColumns;
  isActive.current = draggingCardId === cardId;
  isDraggingActive.current = storedIsDraggingActive;
  newDestination.current = storedNewDestination;

  const clickCoords: ClickCoordsRefType = useRef({
    x: 0,
    y: 0,
  });

  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget.dataset;
    clickCoords.current.x = e.pageX;
    clickCoords.current.y = e.pageY;
    dispatch.current(SET_DRAGGING_CARD_ID, id as string);
    // to remove text selection
    e.preventDefault();
  }, []);

  const handleMouseUp = useCallback(() => {
    dispatch.current(MOVE_CARD, { cardId, newStatus: newDestination.current });
    dispatch.current(SET_DRAGGING_INACTIVE);
    dispatch.current(SET_DRAGGING_CARD_ID, null);
  }, [cardId]);

  const handleMouseMove = useCallback(
    (e: globalThis.MouseEvent) => {
      const yDiff = e.pageY - clickCoords.current.y;
      const xDiff = e.pageX - clickCoords.current.x;

      setCardCoords({
        top: yDiff,
        left: xDiff,
      });

      const destination = getDestination(columns.current, e);

      if (cardStatus !== destination) {
        if (newDestination.current !== destination) {
          dispatch.current(SET_CARD_DESTINATION, destination);
        }
      } else {
        dispatch.current(SET_CARD_DESTINATION, null);
      }

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

  // console.log(columns[2].ref.offsetHeight);

  return {
    cardStyles,
    handleMouseDown,
  };
};

export default useDragNDrop;
