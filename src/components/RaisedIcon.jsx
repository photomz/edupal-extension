import React from 'react';
import prop from 'prop-types';
import styled from 'styled-components';
import TrophyIcon from '@material-ui/icons/EmojiEvents';
import LazyAvatar from './LazyAvatar';

const IconWrapper = styled(LazyAvatar)`
  ${({ theme, colour, size }) => `
	color: #fff;
	align-self: center;
	box-shadow: ${theme.shadows[2]};
	background-color: ${theme.palette[colour].main};
	border: ${Math.round(size / 8)}px solid ${theme.palette[colour].light};
	&&& > svg {
		width: ${size}px;
		height: ${size}px;	
	}
  `}
`;

const RaisedIcon = ({ Icon, colour, size }) => (
  <IconWrapper colour={colour} size={size}>
    <Icon />
  </IconWrapper>
);

RaisedIcon.defaultProps = {
  Icon: TrophyIcon,
  colour: 'gold',
  size: 24,
};

RaisedIcon.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  Icon: prop.any,
  colour: prop.string,
  size: prop.number,
};

export default RaisedIcon;
