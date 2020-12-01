/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import {
  createMuiTheme,
  ThemeProvider as MuiThemeProvider,
} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import recoilPersist from 'recoil-persist';

import SnackbarProvider from '../../containers/Snackbar';
import App from './App';
import themeTemplate from '../../styles/theme';
import './Root.css';

import 'fontsource-roboto/latin-300.css';
import 'fontsource-roboto/latin-400.css';
import 'fontsource-roboto/latin-500.css';
import 'fontsource-roboto/latin-700.css';

const { RecoilPersist, updateState } = recoilPersist();

const theme = createMuiTheme(themeTemplate);

const Root = () => (
  <RecoilRoot initializeState={updateState}>
    <RecoilPersist />
    <MuiThemeProvider theme={theme}>
      <StyledThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </StyledThemeProvider>
    </MuiThemeProvider>
  </RecoilRoot>
);

const renderRoot = (id) => {
  ReactDOM.render(<Root />, document.getElementById(id));
};

export default renderRoot;
