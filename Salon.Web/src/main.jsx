import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './context/ThemeContext';
import DataProviders from './context/DataProviders';
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <DataProviders>
        <App />
      </DataProviders>
    </ThemeProvider>
  </StrictMode>,
);
