import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ErrorBoundary from './errorBoundary';
import { baseUrl } from './services/http';
import { ThemeProvider } from 'styled-components';
import theme from './Theme';

ReactDOM.render(
  <ErrorBoundary>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </ErrorBoundary>,
  document.getElementById('root')
);
