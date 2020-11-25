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
import ButtonGroup from '@material-ui/core/ButtonGroup';
import IconButton from '@material-ui/core/IconButton';
// import Typography from '@material-ui/core/Typography';
import { DropzoneDialog } from 'material-ui-dropzone';

import PhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';
import Grid from '@material-ui/core/Grid';

import { McqOption, MultiSelectOption } from './Options';

import atoms from '../../atoms';
import SplitButton from './SplitButton';

const StyledCard = styled(Card)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const StyledTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const StyledButtonGroup = styled(ButtonGroup)``;

const StyledButton = styled(IconButton)`
  &&& {
    margin-left: ${({ theme }) => theme.spacing(2)};
  }
`;

const QuestionBuilder = () => {
  const [type, setType] = useState('MCQ');
  const [title, setTitle] = useState('');
  const [isOpen, setOpen] = useRecoilState(atoms.isUploaderOpen);
  const [meta, setMeta] = useState({});

  console.log(type);

  let OptionComponent;
  switch (type) {
    case 'MCQ':
      OptionComponent = McqOption;
      break;
    case 'ShortAnswer':
      OptionComponent = null;
      break;
    case 'MultiSelect':
      OptionComponent = MultiSelectOption;
      break;
    case 'TrueFalse':
      OptionComponent = null;
      break;
    default:
      throw new Error('Invalid question type');
  }

  // TODO: useEffect to construct response object, send to websocket

  return (
    <StyledCard variant="outlined">
      <CardHeader
        title={
          <Grid container direction="row" justify="space-between">
            <StyledButtonGroup>
              <SplitButton value={type} setValue={setType} />
              <StyledButton onClick={() => setOpen(true)}>
                <PhotoIcon />
              </StyledButton>
            </StyledButtonGroup>
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
        <OptionComponent meta={meta} setMeta={setMeta} />
      </CardActions>
    </StyledCard>
  );
};

export default QuestionBuilder;
