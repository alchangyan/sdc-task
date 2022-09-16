import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import StoreProvider from './store';

import './index.css';

import App from './App';

// const theme = createTheme({ palette: { mode: "dark" } });
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
