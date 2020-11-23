import React from 'react';
import prop from 'prop-types';

const AnswerCard = ({ num }) => (
  <div>
    For question
    {num}
    <div>You got it correct! You earned 3 points.</div>
  </div>
);

AnswerCard.propTypes = {
  num: prop.number.isRequired,
};

export default AnswerCard;
