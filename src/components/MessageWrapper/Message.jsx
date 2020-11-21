import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
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
  const emojiUrl = React.lazy(() =>
    import(`../../assets/images/nod/tones/${tone || 0}/${emojiId}.gif`)
  );
  return (
    <Wrapper>
      <EmojiWrapper>
        <Emoji src={emojiUrl} alt="emoji" />
      </EmojiWrapper>
      <Avatar alt={username} src={avatar} />
    </Wrapper>
  );
};

export default Message;
