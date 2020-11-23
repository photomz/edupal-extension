import React from 'react';
import prop from 'prop-types';

const MultiSelectOption = ({ num }) => <div>{num}</div>;

MultiSelectOption.propTypes = {
  num: prop.number.isRequired,
};

export default MultiSelectOption;
