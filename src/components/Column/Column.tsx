import {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef,
  MutableRefObject,
} from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddCardIcon from '@mui/icons-material/AddCard';

import CardItem from '../CardItem';
import CreateButton from '../CreateButton';
import CardPlaceholder from '../CardPlaceholder';
import useStore from '../../hooks/useStore';
import { ADD_CARD, ADD_COLUMN } from '../../store/actionTypes';
import type { ColumnStatusType } from '../../types/global-types';

type ColumnProps = {
  title: string;
  status: ColumnStatusType;
};

const Column: FC<ColumnProps> = ({ title, status: columnStatus }) => {
  const [newCardDescription, setNewCardDescription] = useState('');
  const { userCards, dispatch } = useStore();

  const isInitiated = useRef(false);
  const columnRef: MutableRefObject<HTMLDivElement | null> = useRef(null);

  const columnCards = useMemo(() => {
    return userCards.filter(({ status }) => status === columnStatus);
  }, [userCards, columnStatus]);

  const handleSubmitNewCard = useCallback(() => {
    dispatch(ADD_CARD, {
      columnStatus,
      description: newCardDescription,
    });
  }, [columnStatus, dispatch, newCardDescription]);

  useEffect(() => {
    if (!isInitiated.current) {
      isInitiated.current = true;

      dispatch(ADD_COLUMN, {
        status: columnStatus,
        ref: columnRef.current,
      });
    }
  }, [dispatch, columnStatus]);

  return (
    <Grid item xs={4} data-status={columnStatus} ref={columnRef}>
      <Typography sx={{ ml: '8px' }} variant="button">
        {title}
      </Typography>
      <CardPlaceholder columnStatus={columnStatus} />
      {columnCards.map(({ id, status, description }) => (
        <CardItem key={id} id={id} status={status} description={description} />
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
