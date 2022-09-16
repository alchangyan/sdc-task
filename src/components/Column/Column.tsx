import type { FC, ReactNode } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddCardIcon from '@mui/icons-material/AddCard';

type ColumnProps = {
  title: string;
  children?: ReactNode;
};

const Column: FC<ColumnProps> = ({ title, children }) => {
  return (
    <Grid item xs={4}>
      <Typography variant="button">{title}</Typography>
      {children}
      <IconButton sx={{ mt: '10px' }} color="primary">
        <AddCardIcon />
      </IconButton>
    </Grid>
  );
};

export default Column;
