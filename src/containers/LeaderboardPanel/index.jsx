import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue } from 'recoil';
import Person from './Person';
import a from '../../atoms';
import mockHttpData from './data.json';

const FlexContainer = styled(Container)`
  overflow: hidden;
  padding: ${({ theme }) => theme.spacing(1)} ${({ theme }) => theme.spacing(2)};
`;

const LeaderboardPanel = () => {
  const { userId } = useRecoilValue(a.meetData);
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // TODO: HTTP backend call
    const sortedLeaderboard = mockHttpData.sort((c, d) => d.points - c.points);
    setBoard(sortedLeaderboard);
  }, []);

  return (
    <FlexContainer>
      {board.map(({ name, id, avatar, change, points }, i) => (
        <Person
          key={id}
          name={name}
          avatar={avatar}
          change={change}
          points={points}
          rank={i + 1}
          isMe={id === userId}
        />
      ))}
    </FlexContainer>
  );
};

export default LeaderboardPanel;
