/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import prop from 'prop-types';
import { useRecoilValue } from 'recoil';
import { makeStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import {
  McqOption,
  MultiSelectOption,
  ShortAnswerOption,
  TrueFalseOption,
} from './Options';
import atoms from '../../atoms';
import Util from '../../util';

const useStyles = makeStyles(($) => ({
  root: {
    maxWidth: 345,
    marginTop: $.spacing(4),
    marginBottom: $.spacing(4),
  },
  title: {
    paddingLeft: $.spacing(2),
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: $.transitions.create('transform', {
      duration: $.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

const QuestionCard = ({ num }) => {
  // TODO: Make recoil selector
  const { avatar, teacher, askTimestamp, question } = useRecoilValue(
    atoms.questions
  )[num];
  const c = useStyles();

  let OptionComponent;
  switch (question.type) {
    case 'MCQ':
      OptionComponent = McqOption;
      break;
    case 'ShortAnswer':
      OptionComponent = ShortAnswerOption;
      break;
    case 'MultiSelect':
      OptionComponent = MultiSelectOption;
      break;
    case 'TrueFalse':
      OptionComponent = TrueFalseOption;
      break;
    default:
      throw new Error('Invalid question type');
  }

  return (
    <Card className={c.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" src={avatar} className={c.avatar} />
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={teacher.name}
        subheader={Util.parseDateToDayTime(askTimestamp)}
      />
      <Typography
        component="h4"
        variant="h5"
        color="initial"
        className={c.title}
        gutterBottom
      >
        {question.text || `Question ${num + 1}`}
      </Typography>
      {question.image !== null && (
        <CardMedia
          className={c.media}
          image={question.image}
          title="Question Image"
        />
      )}
      {/* <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" />
      </CardContent> */}
      <CardActions disableSpacing>
        <OptionComponent num={num} />
      </CardActions>
    </Card>
  );
};

QuestionCard.propTypes = {
  num: prop.number.isRequired,
};

export default QuestionCard;
