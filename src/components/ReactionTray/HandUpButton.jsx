import React from 'react';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import useWebsocket from 'react-use-websocket';
import styled from 'styled-components';
import shortid from 'shortid';
import global from '../../global';
import atoms from '../../atoms';
import { TrayButton, TrayButtonBackground } from './styles';

const InnerWrapper = styled(TrayButton)`
  display: flex;
  overflow: visible !important;
  padding: 0 10px;
`;

const TrayButtonWrapper = styled.div`
  &:focus > ${InnerWrapper} {
    background-color: rgba(2, 191, 165, 0.15);
  }
`;

const Background = styled(TrayButtonBackground)`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #00796b;
  opacity: 0;
`;

const Image = styled.img`
  height: 32px;
`;

const HandUpButton = () => {
  const { sendJsonMessage } = useWebsocket(global.socketUrl);
  const setIsReactionsDropdownOpen = useSetRecoilState(
    atoms.isReactionsDropdownOpen
  );
  const mutateHand = useSetRecoilState(atoms.handsSelector);
  const { avatar, meetingId } = useRecoilValue(atoms.meetData);
  // One user may only raise one hand at a time
  const canPost = !useRecoilValue(atoms.myHandsSelector).length;
  const tone = useRecoilValue(atoms.emojiTone);
  const preferredName = useRecoilValue(atoms.preferredNameSelector);

  const handUrl = React.lazy(() =>
    import(`../../assets/images/nod/tones/hand-${tone || 0}.gif`)
  );

  const sendHand = () => {
    setIsReactionsDropdownOpen(false);
    const id = shortid();
    if (!canPost) return;
    const handObj = {
      emoji: 'hand',
      text: `${preferredName} raised their hand`,
      img: avatar,
      messageId: id,
      tone,
    };
    mutateHand({
      action: 'add',
      data: { ...handObj, owner: true },
    });
    sendJsonMessage({
      action: 'QUEUE',
      message: { ...handObj, id: meetingId },
    });
    // TODO: Mixpanel hand up click event
  };

  return (
    <TrayButtonWrapper
      tabIndex={0}
      onClick={sendHand}
      onFocus={() => setIsReactionsDropdownOpen(false)}
      onKeyUp={(e) => e.code === 'Enter' && sendHand()}
    >
      <InnerWrapper tabIndex={-1} aria-label="Raise your hand">
        <Background />
        <Image src={handUrl} />
      </InnerWrapper>
    </TrayButtonWrapper>
  );
};

export default HandUpButton;
