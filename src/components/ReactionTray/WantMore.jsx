import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  flex-basis: 100%;
  margin: 0 5px;
  border-radius: 8px;
  &:hover {
    background-color: #00796b0d;
  }
`;

const Link = styled.a``;

const WantMore = () => (
  <Wrapper tabIndex={0} aria-label="Want more emojis?">
    <Link href="https://nod.rocks/emojis" target="_blank" tabIndex="-1">
      Want more emojis?
    </Link>
  </Wrapper>
);

export default WantMore;
