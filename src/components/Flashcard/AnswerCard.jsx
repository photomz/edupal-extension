import React from 'react';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import atoms from '../../atoms';

const AnswerCard = ({ num, questionId }) => {
  const response = useRecoilValue(atoms.response)[questionId];
  return (
    <div>
      For question
      <div>{num}</div>
      You answered option
      <div>{JSON.stringify(response)}</div>
      <div>(indexed 0)</div>
    </div>
  );
};

AnswerCard.propTypes = {
  num: prop.number.isRequired,
  questionId: prop.string.isRequired,
};

export default AnswerCard;
