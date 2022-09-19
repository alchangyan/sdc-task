import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

// MUI Components
import { createTheme, ThemeProvider } from '@mui/material/styles';

// Store
import StoreProvider from './store';

// Components
import App from './App';

// Styles
import './index.css';

const theme = createTheme({ palette: { mode: 'light' } });

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <StoreProvider>
        <App />
      </StoreProvider>
    </ThemeProvider>
  </StrictMode>,
);
