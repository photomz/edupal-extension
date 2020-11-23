import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import App from './App';
import theme from '../../styles/theme';
import './Root.css';

import 'fontsource-roboto/300.css';
import 'fontsource-roboto/400.css';
import 'fontsource-roboto/500.css';
import 'fontsource-roboto/700.css';

const Root = () => (
  <RecoilRoot>
    <ThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </RecoilRoot>
);

const renderRoot = (id) => {
  ReactDOM.render(<Root />, document.getElementById(id));
};

export default renderRoot;
