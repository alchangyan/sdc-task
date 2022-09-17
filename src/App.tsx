import Grid from '@mui/material/Grid';

// Layouts
import MainLayout from './layouts/Main';

// Components
import Column from './components/Column';

import './App.css';

const columns = [
  { status: 'to do', title: 'To Do' },
  { status: 'doing', title: 'Doing' },
  { status: 'done', title: 'Done' },
];

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Grid container spacing={2}>
          {columns.map(({ status, title }) => (
            <Column key={status} status={status} title={title} />
          ))}
        </Grid>
      </MainLayout>
    </div>
  );
}

export default App;
