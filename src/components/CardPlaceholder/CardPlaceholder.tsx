import { FC, useMemo } from 'react';
import { ColumnStatusType, DataItemType } from '../../types/global-types';
import useStore from '../../hooks/useStore';

import CardItem from '../CardItem';

type CardPlaceholderProps = {
  columnStatus: ColumnStatusType;
};

const CardPlaceholder: FC<CardPlaceholderProps> = ({ columnStatus }) => {
  const { newDestination, draggingCardId, userCards, isDraggingActive } =
    useStore();

  const curretnCard = useMemo(() => {
    return userCards.find(({ id }) => id === draggingCardId);
  }, [userCards, draggingCardId]);

  if (newDestination === columnStatus && isDraggingActive) {
    const { id, status, description } = curretnCard as DataItemType;
    return (
      <CardItem
        id={id}
        status={status}
        description={description}
        asPlaceholder
      />
    );
  }
  return null;
};

export default CardPlaceholder;
