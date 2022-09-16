import Grid from '@mui/material/Grid';

// Layouts
import MainLayout from './layouts/Main';

// Components
import CardItem from './components/CardItem';
import Column from './components/Column';

import './App.css';

function App() {
  return (
    <div className="App">
      <MainLayout>
        <Grid container spacing={2}>
          <Column title="to do">
            <CardItem />
          </Column>
          <Column title="doing">
            <CardItem />
          </Column>
          <Column title="done">
            <CardItem />
          </Column>
        </Grid>
      </MainLayout>
    </div>
  );
}

export default App;
