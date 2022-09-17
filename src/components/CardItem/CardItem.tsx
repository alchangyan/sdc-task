import type { FC } from 'react';

import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { styled } from '@mui/material/styles';

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
  return (
    <div className="card-item">
      <Card variant="outlined">
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
