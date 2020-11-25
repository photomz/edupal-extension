import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue } from 'recoil';
import { useTheme } from '@material-ui/core/styles';
import Person from './Person';
import atoms from '../../atoms';
import mockHttpData from './data.json';

const FlexContainer = styled(Container)`
  overflow: hidden;
  padding: ${({ $ }) => $.spacing(1)} ${({ $ }) => $.spacing(2)};
`;

const LeaderboardPanel = () => {
  const { userId } = useRecoilValue(atoms.meetData);
  const [board, setBoard] = useState([]);
  const $ = useTheme();

  useEffect(() => {
    // TODO: HTTP backend call
    const sortedLeaderboard = mockHttpData.sort((a, b) => b.points - a.points);
    setBoard(sortedLeaderboard);
  }, []);

  return (
    <FlexContainer $={$}>
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
