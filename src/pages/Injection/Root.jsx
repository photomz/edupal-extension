import React from 'react';
import { RecoilRoot } from 'recoil';
import App from './App';
import './Root.css';

const Root = () => (
  <RecoilRoot>
    <App />
  </RecoilRoot>
);

export default Root;
