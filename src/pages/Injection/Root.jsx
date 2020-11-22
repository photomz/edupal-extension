import React from 'react';
import ReactDOM from 'react-dom';
import { RecoilRoot } from 'recoil';
import App from './App';
import './Root.css';

const Root = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

const renderRoot = (id) => {
  ReactDOM.render(<Root />, document.getElementById(id));
};

export default renderRoot;
