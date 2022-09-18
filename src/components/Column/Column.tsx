import { FC, useCallback, useMemo, useState } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddCardIcon from '@mui/icons-material/AddCard';

import CardItem from '../CardItem';
import CreateButton from '../CreateButton';
import useStore from '../../hooks/useStore';
import { ADD_CARD } from '../../store/actionTypes';

type ColumnProps = {
  title: string;
  status: string;
};

const Column: FC<ColumnProps> = ({ title, status: columnStatus }) => {
  const [newCardDescription, setNewCardDescription] = useState('');
  const { userCards, dispatch } = useStore();

  const columnCards = useMemo(() => {
    return userCards.filter(({ status }) => status === columnStatus);
  }, [userCards, columnStatus]);

  const handleSubmitNewCard = useCallback(() => {
    dispatch(ADD_CARD, {
      columnStatus,
      description: newCardDescription,
    });
  }, [columnStatus, dispatch, newCardDescription]);

  return (
    <Grid item xs={4}>
      <Typography sx={{ ml: '8px' }} variant="button">
        {title}
      </Typography>
      {columnCards.map(({ id, description }) => (
        <CardItem key={id} id={id} description={description} />
      ))}
      <CreateButton
        placeholder="New card..."
        icon={<AddCardIcon />}
        onChange={setNewCardDescription}
        onSubmit={handleSubmitNewCard}
      />
    </Grid>
  );
};

export default Column;
