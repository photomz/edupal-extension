import React from 'react';
import styled from 'styled-components';
import shortid from 'shortid';
import useWebsocket from 'react-use-websocket';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import global from '../../global';
import atoms from '../../atoms';

const EmojiWrapper = styled.div`
  flex-basis: 33%;
  flex-shrink: 0;
  &:focus > .dropdown-item {
    background-color: rgba(2, 191, 165, 0.15);
    outline: 4px solid rgb(2, 191, 165);
  }
`;

const DropdownItem = styled.div`
  padding: 10px 18px;
  font-size: 15px;
  display: flex;
  align-items: center;
  position: relative;
  justify-content: center;
  border-radius: 8px;
  margin: 3px;
  ${({ isFaded }) => isFaded && `opacity: 0.3; cursor: default;`}
  &:hover {
    background-color: ${({ isFaded }) => (isFaded ? 'white' : '#00796b0d')};
  }
`;

const Emoji = styled.div`
  width: 100%;
`;

const Reaction = (emoji, label) => {
  const { sendJsonMessage } = useWebsocket(global.socketUrl);
  const setIsReactionsDropdownOpen = useSetRecoilState(
    atoms.isReactionsDropdownOpen
  );
  const mutateMessage = useSetRecoilState(atoms.messagesSelector);
  const preferredName = useRecoilValue(atoms.preferredNameSelector);
  const tone = useRecoilValue(atoms.emojiTone);
  const { meetingId, avatar } = useRecoilValue(atoms.meetData);
  // const emojiUrl = React.lazy(() =>
  //   import(`../../assets/images/nod/tones/${emoji}-${tone || 0}.gif`)
  // );

  const canPost = !useRecoilValue(atoms.myMessagesSelector).length;

  const sendMessage = () => {
    setIsReactionsDropdownOpen(false);
    const id = shortid();
    if (!canPost) return; // One user may only raise one hand at a time
    const messageObj = {
      emoji,
      username: preferredName,
      img: avatar,
      messageId: id,
      tone,
    };
    mutateMessage({
      action: 'add',
      data: { ...messageObj, owner: true },
    });
    sendJsonMessage({
      action: 'MESSAGE',
      message: { ...messageObj, id: meetingId },
    });
    // TODO: Mixpanel send reaction click event
  };

  return (
    <EmojiWrapper
      onClick={sendMessage}
      onKeyUp={(e) => e.code === 'Enter' && sendMessage()}
      tabIndex={0}
      aria-label={label}
    >
      <DropdownItem tabIndex={-1} isFaded={!canPost}>
        {/* <Emoji src={emojiUrl} /> */}
      </DropdownItem>
    </EmojiWrapper>
  );
};

export default Reaction;
