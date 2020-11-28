import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import TrophyIcon from '@material-ui/icons/EmojiEvents';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import LazyAvatar from './LazyAvatar';

const PersonCard = styled(Card)`
  margin: ${({ theme }) => theme.spacing(1)} 0;
  &&& .MuiCardHeader-action {
    align-self: center;
    margin-right: ${({ theme }) => theme.spacing(1)};
  }
  ${({ $highlighted, theme }) =>
    $highlighted &&
    `background-color: ${theme.palette.secondary.dark}; 
    box-shadow: ${theme.shadows[8]};
    &&& * {
      color: ${theme.palette.common.white};
      font-weight: ${theme.typography.fontWeightMedium};
    }
     `}
`;

const StyledGrid = styled(Grid)``;

const IconWrapper = styled(LazyAvatar)`
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
const Person = ({
  name,
  avatar,
  change,
  subheader,
  highlighted,
  children,
  Icon,
  iconColor,
}) => {
  return (
    <PersonCard variant="outlined" $highlighted={highlighted}>
      <CardHeader
        avatar={<LazyAvatar src={avatar} />}
        action={
          <IconWrapper colour={iconColor}>
            <Icon />
          </IconWrapper>
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
        subheader={subheader}
      />
      {children}
    </PersonCard>
  );
};

Person.defaultProps = {
  name: 'John',
  avatar: '',
  change: 2,
  subheader: '45 Points',
  highlighted: false,
  children: <></>,
  Icon: TrophyIcon,
  iconColor: 'gold',
};

Person.propTypes = {
  name: prop.string,
  avatar: prop.string,
  change: prop.number,
  subheader: prop.string,
  highlighted: prop.bool,
  children: prop.oneOfType([prop.string, prop.element, prop.node]),
  // eslint-disable-next-line react/forbid-prop-types
  Icon: prop.object,
  iconColor: prop.string,
};

export default Person;
