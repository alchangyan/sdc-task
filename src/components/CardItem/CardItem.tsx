import type { FC } from 'react';
import cn from 'classnames';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';
import useDragNDrop from '../../hooks/useDragNDrop';

import './CardItem.scss';

const StyledCardContent = styled(CardContent)(`
  &:last-child {
    padding-bottom: 16px;
  }
`);

type CardItemProps = {
  id: string;
  description: string;
};

const CardItem: FC<CardItemProps> = ({ id, description }) => {
  const { cardStyles, handleMouseDown, isDraggingActive } = useDragNDrop();

  return (
    <div
      className={cn('card-item', {
        'card-item_dragging': isDraggingActive,
      })}
    >
      <Card
        sx={cardStyles}
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
