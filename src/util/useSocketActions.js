import { useEffect } from 'react';
import useWebsocket from 'react-use-websocket';
import { useSetRecoilValue } from 'recoil';
import g from '../global';
import a from '../atoms';

const useSocketActions = () => {
  const { lastJsonMessage } = useWebsocket(g.socketUrl, {});
  const addQuestion = useSetRecoilValue(a.addQuestion);
  const addResponse = useSetRecoilValue(a.addResponse);
  const setLeaderboard = useSetRecoilValue(a.leaderboard);

  // TODO: Websocket
  useEffect(() => {
    const { action, data } = lastJsonMessage;
    switch (action) {
      case 'receiveAsk':
        addQuestion(data);
        break;
      case 'receiveRespond':
        addResponse(data);
        break;
      case 'receiveLeaderboard':
        setLeaderboard(data);
        break;
      case 'response':
        // eslint-disable-next-line no-console
        console.info(data);
        break;
      default:
        break;
    }
  }, [lastJsonMessage]);
};

export default useSocketActions;
