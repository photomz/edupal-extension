import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Container from '@material-ui/core/Container';
import { useRecoilValue } from 'recoil';
import Person from '../../components/Person';
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
      {board.map(({ name, id, avatar, change, points }, i) => {
        let trophyColor;
        switch (i) {
          case 1:
            trophyColor = 'gold';
            break;
          case 2:
            trophyColor = 'silver';
            break;
          case 3:
            trophyColor = 'bronze';
            break;
          default:
            trophyColor = 'merit';
            break;
        }
        return (
          <Person
            key={id}
            name={name}
            avatar={avatar}
            change={change}
            subheader={`${points} Points`}
            highlighted={id === userId}
            iconColor={trophyColor}
          />
        );
      })}
    </FlexContainer>
  );
};

export default LeaderboardPanel;
