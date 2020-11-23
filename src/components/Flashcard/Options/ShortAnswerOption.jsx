import React from 'react';
import prop from 'prop-types';

const ShortAnswerOption = ({ num }) => <div>{num}</div>;

ShortAnswerOption.propTypes = {
  num: prop.number.isRequired,
};

export default ShortAnswerOption;
