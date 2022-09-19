// MUI Components
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// Layouts
import MainLayout from './layouts/Main';

// Components
import Column from './components/Column';

// Store
import useStore from './hooks/useStore';

// Types
import type { ColumnStatusType } from './types/global-types';

type ColumnType = {
  status: ColumnStatusType;
  title: string;
};

const columns: ColumnType[] = [
  { status: 'to do', title: 'To Do' },
  { status: 'doing', title: 'Doing' },
  { status: 'done', title: 'Done' },
];

function App() {
  const { activeUserId } = useStore();

  /**
   * if there is no active user, message will be shown, otherwise, content as expected.
   * It's wrapped with layout(MainLayout) which contains Header component and wrapper for the content.
   *
   * ##
   */

  return (
    <div className="App">
      <MainLayout>
        {!activeUserId && (
          <Typography align="center" variant="h4">
            Please select user first
          </Typography>
        )}
        {activeUserId && (
          <Grid container spacing={2}>
            {columns.map(({ status, title }) => (
              <Column key={status} status={status} title={title} />
            ))}
          </Grid>
        )}
      </MainLayout>
    </div>
  );
}

export default App;
