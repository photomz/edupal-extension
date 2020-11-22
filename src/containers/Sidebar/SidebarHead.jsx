import React from 'react';
import { useTheme } from '@material-ui/core/styles';
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
  const theme = useTheme();
  return (
    <FlexContainer theme={theme}>
      <Image src={logo} theme={theme} />
    </FlexContainer>
  );
};

export default SidebarHead;
