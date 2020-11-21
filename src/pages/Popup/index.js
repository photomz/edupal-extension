import React from 'react';
import { render } from 'react-dom';
import Greeting from '../../components/Popup/greeting_container';

// eslint-disable-next-line react/jsx-filename-extension
render(<Greeting />, window.document.getElementById('popup-root'));
