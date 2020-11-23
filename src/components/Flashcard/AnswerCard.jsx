import React from 'react';
import prop from 'prop-types';

const AnswerCard = ({ num }) => (
  <div>
    For question
    <div>{num}</div>
    You got it correct! You earned 3 points.
  </div>
);

AnswerCard.propTypes = {
  num: prop.number.isRequired,
};

export default AnswerCard;
