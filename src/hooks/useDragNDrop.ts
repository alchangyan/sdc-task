import {
  useState,
  useRef,
  MouseEvent,
  useCallback,
  useEffect,
  useMemo,
} from 'react';

type ClickCoordsRefType = { current: { x: number; y: number } };

const useDragNDrop = () => {
  const [draggingCardId, setDraggingCardId] = useState<string | null>(null);
  const [isDraggingActive, setIsDraggingActive] = useState(false);
  const [cardCoords, setCardCoords] = useState({});

  const clickCoords: ClickCoordsRefType = useRef({
    x: 0,
    y: 0,
  });

  const handleMouseDown = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const { id } = e.currentTarget.dataset;
    setDraggingCardId(id as string);
    clickCoords.current.x = e.pageX;
    clickCoords.current.y = e.pageY;
    e.preventDefault();
  }, []);

  const handleMouseMove = useCallback((e: globalThis.MouseEvent) => {
    const yDiff = e.pageY - clickCoords.current.y;
    const xDiff = e.pageX - clickCoords.current.x;

    setCardCoords({
      top: yDiff,
      left: xDiff,
    });

    if (Math.abs(xDiff) > 10 || Math.abs(yDiff) > 10) {
      setIsDraggingActive(true);
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    setDraggingCardId(null);
    setIsDraggingActive(false);
  }, []);

  useEffect(() => {
    if (draggingCardId) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return;
    }

    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [draggingCardId, handleMouseMove, handleMouseUp]);

  const cardStyles = useMemo(() => {
    if (isDraggingActive) {
      return {
        position: 'relative',
        transform: 'rotate(5deg)',
        zIndex: 1,
        ...cardCoords,
      };
    }

    return {};
  }, [isDraggingActive, cardCoords]);

  return {
    cardStyles,
    handleMouseDown,
    isDraggingActive,
  };
};

export default useDragNDrop;
