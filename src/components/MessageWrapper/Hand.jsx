import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { useSetRecoilState } from 'recoil';
import Util from '../../util';
import atoms from '../../atoms';
import closeButton from '../../assets/images/nod/down.png';

const mount = keyframes`
	from {
		opacity: 0;
	}
	to {
		opacity: 1;
	}
`;

const unmount = keyframes`
	from {
		opacity: 1;
		margin-buttom: 0px;
	}
	to {
		opacity: 0;
		margin-buttom: 50px;
	}
`;

const Wrapper = styled.div`
  animation: ${({ isUnmounting }) => (isUnmounting ? unmount : mount)} 0.5s
    ease-in-out;
  opacity: 1;
  height: auto;
  background-color: white;
  border-radius: 30px;
  display: flex;
  align-items: center;
  padding: 5px 15px 5px 5px;
  margin-top: 10px;
  box-shadow: rgba(0, 0, 0, 0.15) 1px 2px 10px;
  font-size: 16px;
  transition: all 0.3s ease-in-out;
  overflow: hidden;
  flex-shrink: 1;
  cursor: pointer;
`;

const Avatar = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

const Emoji = styled.div`
  max-width: 26px;
  transition: all 0.3s ease;
`;

const EmojiWrapper = styled.div`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: -20px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 24px;
  z-index: 2;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 0px 10px;
  overflow: hidden;
`;

const Hand = (messageId, username, avatar, tone) => {
  const mountState = Util.useDelayedUnmount(500);
  const [isHover, setIsHover] = useState(false);
  const mutateHand = useSetRecoilState(atoms.handsSelector);
  const handUrl = React.lazy(() =>
    import(`../../assets/images/nod/tones/${tone || 0}/hand.gif`)
  );
  const removeHand = () => {
    mutateHand({ action: 'remove', data: messageId });
  };
  return (
    <Wrapper
      isUnmounting={mountState === 'unmounting'}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={removeHand}
    >
      <EmojiWrapper>
        {isHover && <Emoji alt="Remove icon" src={closeButton} />}
        <Emoji src={handUrl} alt="emoji" />
      </EmojiWrapper>
      <Avatar alt={username} src={avatar} />
    </Wrapper>
  );
};

export default Hand;
