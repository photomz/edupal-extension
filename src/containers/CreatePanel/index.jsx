import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import { DropzoneDialog } from 'material-ui-dropzone';
import Tooltip from '@material-ui/core/Tooltip';

import PhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';

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
    padding: ${({ theme }) => theme.spacing(1)};
  }
`;

const optionComponentMap = {
  MCQ: McqOption,
  ShortAnswer: ShortAnswerOption,
  MultiSelect: MultiSelectOption,
  TrueFalse: TrueFalseOption,
};

const CreatePanel = () => {
  const [type, setType] = useRecoilState(a.creatorType);
  // Question type dictates interface of meta and answer;
  const Option = optionComponentMap[type];

  const [meta, setMeta] = useRecoilState(a.creatorMeta(type));
  const [answer, setAnswer] = useRecoilState(a.creatorAnswer(type));
  const [image, setImage] = useRecoilState(a.creatorImage);

  const [title, setTitle] = useRecoilState(a.creatorText);
  const [isOpen, setOpen] = useRecoilState(a.isUploaderOpen);
  const ask = useSetRecoilState(a.ask);

  return (
    <StyledCard variant="outlined">
      <CardHeader
        title={
          <Grid container direction="row" justify="space-between">
            <SplitButton value={type} handleChange={setType} />
            <Tooltip
              title={
                image === ''
                  ? 'Attach an image'
                  : image.split('/').slice(image.split('/').length - 1)
              }
            >
              <StyledButton onClick={() => setOpen(true)} variant="extended">
                <PhotoIcon />
              </StyledButton>
            </Tooltip>
            <Tooltip title="Send question">
              <StyledButton color="primary" onClick={ask}>
                <SendIcon />
              </StyledButton>
            </Tooltip>
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
          onSave={([file]) => {
            setImage(file.path);
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

export default CreatePanel;
