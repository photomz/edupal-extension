import React from 'react';
import prop from 'prop-types';

const TrueFalseOption = ({ num }) => <div>{num}</div>;

TrueFalseOption.propTypes = {
  num: prop.number.isRequired,
};

export default TrueFalseOption;
