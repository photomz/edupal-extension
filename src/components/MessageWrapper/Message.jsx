import React from 'react';
import styled, { keyframes } from 'styled-components';
import Util from '../../util';

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
`;

const Avatar = styled.img`
  border-radius: 50%;
  height: 40px;
  width: 40px;
  margin-right: 10px;
`;

const Emoji = styled.img`
  width: 80%;
  max-width: 42px;
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

const Message = (username, emojiId, avatar, tone) => {
  const mountState = Util.useDelayedUnmount(500);
  const emojiUrl = React.lazy(() =>
    import(`../../assets/images/nod/tones/${emojiId}-${tone || 0}.gif`)
  );
  return (
    <Wrapper isUnmounting={mountState === 'unmounting'}>
      <EmojiWrapper>
        <Emoji src={emojiUrl} alt="emoji" />
      </EmojiWrapper>
      <Avatar alt={username} src={avatar} />
      {username}
    </Wrapper>
  );
};

export default Message;
