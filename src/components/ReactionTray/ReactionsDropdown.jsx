import React from 'react';
import styled from 'styled-components';

import Reaction from './Reaction';
import WantMore from './WantMore';
import {fade} from './styles';

const Dropdown = styled.div`
  animation: ${fade} 0.2s;
  position: absolute;
  top: 48px;
  left: 0;
  background-color: white;
  border-top: 1px solid #eee;
  border-radius: 0 0 8px 0;
  width: 260px;
  box-shadow: 0 1px 2px 0 rgba(60, 64, 67, 0.302),
    0 6px 6px 2px rgba(60, 64, 67, 0.149);
  padding-bottom: 10px;
  display: flex;
  flex-wrap: wrap;
`;

const emojiMap = [
  ['thumb', 'Send thumbs up emoji'],
  ['thumb_down', 'Send thumbs down emoji'],
  ['clap', 'Send clap emoji'],
  ['wave', 'Send wave emoji'],
  ['celebrate', 'Send celebration face emoji'],
  ['laugh', 'Send laughing emoji'],
];

const ReactionsDropdown = () => (
  <Dropdown>
    {emojiMap.map(([emoji, label]) => (
      <Reaction key={emoji} emoji={emoji} label={label} />
    ))}
    <WantMore />
  </Dropdown>
);

export default ReactionsDropdown;
