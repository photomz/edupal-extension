import React from 'react';
import styled from 'styled-components';
import prop from 'prop-types';

import MuiCard from '@material-ui/core/Card';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiGrid from '@material-ui/core/Grid';
import MuiTypography from '@material-ui/core/Typography';

import TrophyIcon from '@material-ui/icons/EmojiEvents';
import UpIcon from '@material-ui/icons/KeyboardArrowUp';
import DownIcon from '@material-ui/icons/KeyboardArrowDown';
import LazyAvatar from './LazyAvatar';
import RaisedIcon from './RaisedIcon';

const PersonCard = styled(MuiCard)`
  margin: ${({ theme }) => theme.spacing(1)}px 0px;
  &&& .MuiCardHeader-action {
    align-self: center;
    margin-right: ${({ theme }) => theme.spacing(1)}px;
  }
  ${({ $highlighted, theme, $colour }) =>
    $highlighted &&
    `background-color: ${theme.palette[$colour].dark}; 
    box-shadow: ${theme.shadows[8]};
    &&& * {
      color: ${theme.palette.common.white};
      font-weight: ${theme.typography.fontWeightMedium};
    }
     `}
`;

const Grid = styled(MuiGrid)``;

const InnerGrid = styled(MuiGrid)`
  color: ${({ theme, colour }) => theme.palette[colour].main};
  margin-left: ${({ theme }) => theme.spacing(1)}px;
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
  const [Icon, colour] = changeMap[change > 0 ? 0 : 1];
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
      <MuiTypography>{change}</MuiTypography>
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
  highlightColour,
  children,
  Icon,
  iconColor,
  HeaderProps,
}) => {
  return (
    <>
      <PersonCard
        variant="outlined"
        $highlighted={highlighted}
        $colour={highlightColour}
      >
        <MuiCardHeader
          avatar={<LazyAvatar src={avatar} />}
          action={<RaisedIcon Icon={Icon} colour={iconColor} />}
          title={
            <Grid container direction="row" justify="flex-start" wrap="nowrap">
              <MuiTypography>{name}</MuiTypography>
              <ChangeIndicator change={change} />
            </Grid>
          }
          subheader={subheader}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...HeaderProps}
        />
        {children}
      </PersonCard>
    </>
  );
};

Person.defaultProps = {
  name: '',
  avatar: '',
  change: 2,
  subheader: '',
  highlighted: false,
  children: <></>,
  Icon: TrophyIcon,
  iconColor: 'gold',
  highlightColour: 'secondary',
  HeaderProps: {},
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
  highlightColour: prop.string,
  // eslint-disable-next-line react/forbid-prop-types
  HeaderProps: prop.object,
};

export default Person;
