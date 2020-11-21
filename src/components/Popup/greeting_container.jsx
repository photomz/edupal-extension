import React from 'react';
import { hot } from 'react-hot-loader';
import icon from '../../assets/icons/128.png';

const Greeting = () => (
  <div>
    <p>Hello, find me on src/js/popup/greeting_component.jsx</p>
    <img src={icon} alt="icon" />
  </div>
);

export default hot(module)(Greeting);
