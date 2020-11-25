import React from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import logo from '../../assets/images/logo_words.svg';

const Image = styled.img`
  width: 250;
  align-self: center;
  padding-left: ${({ theme }) => theme.spacing(4)};
`;

const FlexContainer = styled(Container)`
  display: flex;
  flex-direction: row;
  justify-content: left;
  margin: ${({ theme }) => theme.spacing(4)};
`;

const SidebarHead = () => {
  return (
    <FlexContainer>
      <Image src={logo} />
    </FlexContainer>
  );
};

export default SidebarHead;
