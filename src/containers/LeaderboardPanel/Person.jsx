import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TrophyIcon from '@material-ui/icons/EmojiEvents';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

const PersonCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  &&& .MuiCardHeader-action {
    align-self: center;
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
  ${({ $isMe, theme }) =>
    $isMe &&
    `background-color: ${theme.palette.secondary.dark}; 
    box-shadow: ${theme.shadows[8]};
    &&& * {
      color: ${theme.palette.common.white};
      font-weight: ${theme.typography.fontWeightMedium};
    }
     `}
`;

const StyledGrid = styled(Grid)``;

const Trophy = styled(Avatar)`
  ${({ theme, colour }) => `
	color: #fff;
	align-self: center;
	box-shadow: ${theme.shadows[2]};
	background-color: ${theme.palette[colour].main};
	border: 3px solid ${theme.palette[colour].light};

  `}
`;

const InnerGrid = styled(Grid)`
  color: ${({ theme, colour }) => theme.palette[colour].main};
  margin-left: ${({ theme }) => theme.spacing(1)};
  &&& svg {
    width: 16px;
    height: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &&& .MuiTypography-body1 {
    font-size: 12px;
  }
`;

const changeMap = [
  [UpIcon, 'green'],
  [DownIcon, 'red'],
];

const ChangeIndicator = ({ change }) => {
  const [Icon, colour] = changeMap[change >= 0 ? 0 : 1];
  return (
    <InnerGrid
      colour={colour}
      container
      direction="row"
      justify="flex-start"
      alignItems="center"
      wrap="nowrap"
    >
      <Icon />
      <Typography>{change}</Typography>
    </InnerGrid>
  );
};

ChangeIndicator.propTypes = {
  change: prop.number.isRequired,
};

// Change in position index, not points
const Person = ({ name, avatar, change, points, isMe, rank }) => {
  let trophyColor;
  switch (rank) {
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
    <PersonCard variant="outlined" $isMe={isMe}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <Trophy colour={trophyColor}>
            <TrophyIcon />
          </Trophy>
        }
        title={
          <StyledGrid
            container
            direction="row"
            justify="flex-start"
            wrap="nowrap"
          >
            <Typography>{name}</Typography>
            <ChangeIndicator change={change} />
          </StyledGrid>
        }
        subheader={`${points} Points`}
      />
    </PersonCard>
  );
};

Person.propTypes = {
  name: prop.string.isRequired,
  avatar: prop.string.isRequired,
  change: prop.number.isRequired,
  points: prop.number.isRequired,
  isMe: prop.bool.isRequired,
  rank: prop.number.isRequired,
};

export default Person;
