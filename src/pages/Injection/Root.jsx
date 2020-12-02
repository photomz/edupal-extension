/* eslint-disable*/
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

import { ErrorBoundary } from 'react-error-boundary';
import MuiSnackbar from '@material-ui/core/Snackbar';
import MuiButton from '@material-ui/core/Button';
import SnackbarProvider from '../../containers/Snackbar';
import App from './App';
import themeTemplate from '../../styles/theme';
import './Root.css';

import 'fontsource-roboto/latin-300.css';
import 'fontsource-roboto/latin-400.css';
import 'fontsource-roboto/latin-500.css';
import 'fontsource-roboto/latin-700.css';

const theme = createMuiTheme(themeTemplate);

const Root = () => (
  <RecoilRoot>
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </MuiThemeProvider>
    </StyledThemeProvider>
  </RecoilRoot>
);

const RootErrorBoundary = () => (
  <ErrorBoundary
    fallbackRender={({ resetErrorBoundary }) => (
      <MuiSnackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        style={{ marginBottom: 96 }}
        open
        onClose={resetErrorBoundary}
        message="Something went wrong. Please click OK to refresh Edu-pal. This will not refresh the page."
        action={
          <MuiButton
            style={{ color: '#fff', fontWeight: 700 }}
            onClick={resetErrorBoundary}
          >
            OK
          </MuiButton>
        }
      />
    )}
  >
    <Root />
  </ErrorBoundary>
);

const renderRoot = (id) => {
  ReactDOM.render(<RootErrorBoundary />, document.getElementById(id));
};

export default renderRoot;
