import React from 'react';
import styled from 'styled-components';
import { useRecoilState, useRecoilValue } from 'recoil';
import atoms from '../../atoms';
import { TrayButton, TrayButtonBackground } from './styles';
import ReactionsDropdown from './ReactionsDropdown';

import thumbImage from '../../assets/images/nod/notification.png';

const Wrapper = styled.div`
  &:focus > ${TrayButton} {
    background-color: rgba(2, 191, 165, 0.15);
  }
`;

const Image = styled.img`
  height: 42px;
`;

const ReactionsButton = () => {
  const [isDropdownOpen, setDropdown] = useRecoilState(
    atoms.isReactionsDropdownOpen
  );
  const tone = useRecoilValue(atoms.emojiTone);

  // const thumbImage = React.lazy(() =>
  //   import(`../../assets/images/nod/tones/thumb-0.gif`)
  // );

  const handleKeyPress = (e) => {
    switch (e.code) {
      case 'Enter':
        setDropdown(true);
        break;
      case 'Escape':
        setDropdown(false);
        break;
      default:
        break;
    }
  };

  return (
    <Wrapper
      tabIndex={0}
      onMouseOver={() => setDropdown(true)}
      onMouseLeave={() => setDropdown(false)}
      onKeyUp={handleKeyPress}
    >
      <TrayButton tabIndex={-1} aria-label="Open Nod extension">
        <TrayButtonBackground />
        <Image src={thumbImage} />
        {isDropdownOpen && <ReactionsDropdown />}
      </TrayButton>
    </Wrapper>
  );
};

export default ReactionsButton;
