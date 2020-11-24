/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';
import { useTheme } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TrophyIcon from '@material-ui/icons/EmojiEvents';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';

const FixedWidthCard = styled(Card)`
  max-width: 345px;
  margin: ${({ $ }) => $.spacing(1)};
  &&& .MuiCardHeader-action {
    align-self: center;
    margin-right: ${({ $ }) => $.spacing(1)};
  }
`;

const StyledGrid = styled(Grid)``;

const Trophy = styled(Avatar)`
  ${({ $, colour }) => `
	color: #fff;
	align-self: center;
	box-shadow: ${$.shadows[2]};
	background-color: ${$.palette[colour].main};
	border: 3px solid ${$.palette[colour].light};

  `}
`;

const InnerGrid = styled(Grid)`
  color: ${({ $, colour }) => $.palette[colour].main};
  margin-left: ${({ $ }) => $.spacing(1)};
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
  const $ = useTheme();
  const [Icon, colour] = changeMap[change >= 0 ? 0 : 1];
  return (
    <InnerGrid
      $={$}
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
const Person = ({ name, avatar, change, points }) => {
  const $ = useTheme();

  return (
    <FixedWidthCard variant="outlined" $={$}>
      <CardHeader
        avatar={<Avatar src={avatar} />}
        action={
          <Trophy $={$} colour="yellow">
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
    </FixedWidthCard>
  );
};

Person.propTypes = {
  name: prop.string.isRequired,
  avatar: prop.string.isRequired,
  change: prop.number.isRequired,
  points: prop.number.isRequired,
};

export default Person;
