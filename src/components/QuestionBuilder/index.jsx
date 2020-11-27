/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-wrap-multilines */
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import { DropzoneDialog } from 'material-ui-dropzone';

import PhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

import McqOption from './McqOption';
import MultiSelectOption from './MultiSelectOption';
import ShortAnswerOption from './ShortAnswerOption';
import TrueFalseOption from './TrueFalseOption';
import a from '../../atoms';
import SplitButton from './SplitButton';

const StyledCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const StyledTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledButton = styled(IconButton)`
  &&& {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const optionComponentMap = {
  MCQ: McqOption,
  ShortAnswer: ShortAnswerOption,
  MultiSelect: MultiSelectOption,
  TrueFalse: TrueFalseOption,
};

const QuestionBuilder = () => {
  const [type, setType] = useRecoilState(a.questionType);
  // Question type dictates interface of meta and answer;
  const Option = optionComponentMap[type];

  const [meta, setMeta] = useRecoilState(a.builderMeta);
  const [answer, setAnswer] = useRecoilState(a.builderAnswer);

  const [title, setTitle] = useState('');
  const [isOpen, setOpen] = useRecoilState(a.isUploaderOpen);

  // TODO: useEffect to construct response object, send to websocket

  return (
    <StyledCard variant="outlined">
      <CardHeader
        title={
          <Grid container direction="row" justify="space-between">
            <SplitButton value={type} handleChange={setType} />
            <StyledButton onClick={() => setOpen(true)}>
              <PhotoIcon />
            </StyledButton>
            <StyledButton color="primary">
              <SendIcon />
            </StyledButton>
          </Grid>
        }
      />
      <CardContent>
        <StyledTextField
          multiline
          variant="outlined"
          placeholder="Type the question title (optional)"
          label="Title"
          rowsMax={5}
          value={title}
          fullWidth
          onChange={(e) => setTitle(e.target.value)}
        />
        <DropzoneDialog
          acceptedFiles={['image/*']}
          cancelButtonText="cancel"
          submitButtonText="done"
          filesLimit={1}
          maxFileSize={3000000}
          open={isOpen}
          onClose={() => setOpen(false)}
          onSave={(files) => {
            console.log('Files:', files);
            setOpen(false);
          }}
          showPreviews={false}
          dialogProps={{ id: 'edupal-uploader' }}
        />
      </CardContent>

      <CardActions>
        <Option
          meta={meta}
          setMeta={setMeta}
          answer={answer}
          setAnswer={setAnswer}
        />
      </CardActions>
    </StyledCard>
  );
};

export default QuestionBuilder;
