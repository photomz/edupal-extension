import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import Person from './Person';

import mockHttpData from './data.json';

const FlexContainer = styled(Container)`
  overflow: hidden;
`;

const LeaderboardPanel = () => {
  const [board, setBoard] = useState([]);

  useEffect(() => {
    // TODO: HTTP backend call
    const sortedLeaderboard = mockHttpData.sort(
      (a, b) => b.meetingPoints - a.meetingPoints
    );
    setBoard(sortedLeaderboard);
  }, []);

  return (
    <FlexContainer>
      {board.map(({ name, id, avatar, change, points }) => (
        <Person
          key={id}
          name={name}
          avatar={avatar}
          change={change}
          points={points}
        />
      ))}
    </FlexContainer>
  );
};

export default LeaderboardPanel;
