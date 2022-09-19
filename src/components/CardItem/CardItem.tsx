import { FC, useMemo } from 'react';
import cn from 'classnames';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import useDragNDrop from '../../hooks/useDragNDrop';
import useStore from '../../hooks/useStore';
import type { ColumnStatusType } from '../../types/global-types';

import './CardItem.scss';

const StyledCardContent = styled(CardContent)(`
  &:last-child {
    padding-bottom: 16px;
  }
`);

type CardItemProps = {
  id: string;
  status: ColumnStatusType;
  description: string;
  asPlaceholder?: boolean;
};

const CardItem: FC<CardItemProps> = ({
  id,
  status,
  description,
  asPlaceholder = false,
}) => {
  const { draggingCardId, newDestination, isDraggingActive } = useStore();
  const { cardStyles, handleMouseDown } = useDragNDrop(
    id,
    status,
    asPlaceholder,
  );

  const isDragging = useMemo(() => draggingCardId === id, [draggingCardId, id]);

  return (
    <div
      className={cn('card-item', {
        'card-item_dragging': isDragging,
        'card-item_inactive':
          isDraggingActive && isDragging && !!newDestination && !asPlaceholder,
        'card-item_placeholder': asPlaceholder,
      })}
    >
      <Card
        sx={!asPlaceholder ? cardStyles : {}}
        variant="outlined"
        data-id={id}
        onMouseDown={handleMouseDown}
      >
        <StyledCardContent>
          <Typography
            sx={{ fontSize: 14 }}
            variant="caption"
            color="text.secondary"
          >
            {description}
          </Typography>
        </StyledCardContent>
      </Card>
    </div>
  );
};

export default CardItem;
