import type { FC, ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import AddCardIcon from '@mui/icons-material/AddCard';

import CreateButton from '../CreateButton';

type ColumnProps = {
  title: string;
  children?: ReactNode;
};

const Column: FC<ColumnProps> = ({ title, children }) => {
  return (
    <Grid item xs={4}>
      <Typography variant="button">{title}</Typography>
      {children}
      <CreateButton
        placeholder="New card..."
        icon={<AddCardIcon />}
        onChange={() => {}}
        onSubmit={() => {}}
      />
    </Grid>
  );
};

export default Column;
