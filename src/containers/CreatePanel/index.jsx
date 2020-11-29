import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import styled from 'styled-components';

import MuiCard from '@material-ui/core/Card';
import MuiCardHeader from '@material-ui/core/CardHeader';
import MuiCardContent from '@material-ui/core/CardContent';
import MuiCardActions from '@material-ui/core/CardActions';
import MuiTextField from '@material-ui/core/TextField';
import MuiIconButton from '@material-ui/core/IconButton';
import MuiGrid from '@material-ui/core/Grid';
import MuiTooltip from '@material-ui/core/Tooltip';
import { DropzoneDialog } from 'material-ui-dropzone';

import PhotoIcon from '@material-ui/icons/AddPhotoAlternate';
import SendIcon from '@material-ui/icons/Send';

import McqOption from './McqOption';
import MultiSelectOption from './MultiSelectOption';
import ShortAnswerOption from './ShortAnswerOption';
import TrueFalseOption from './TrueFalseOption';
import SplitButton from './SplitButton';
import {
  creatorType,
  creatorImage,
  creatorText,
  sendAsk,
} from '../../logic/create';
import { isUploaderOpen } from '../../logic/common';

const Card = styled(MuiCard)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  padding-bottom: ${({ theme }) => theme.spacing(2)};
  padding: ${({ theme }) => theme.spacing(1)};
`;

const TextField = styled(MuiTextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const Button = styled(MuiIconButton)`
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
  const [type, setType] = useRecoilState(creatorType);
  // Question type dictates interface of meta and answer;
  const Option = optionComponentMap[type];
  const [image, setImage] = useRecoilState(creatorImage);
  const [title, setTitle] = useRecoilState(creatorText);

  const [isOpen, setOpen] = useRecoilState(isUploaderOpen);
  const ask = useSetRecoilState(sendAsk);

  return (
    <Card variant="outlined">
      <MuiCardHeader
        title={
          <MuiGrid container direction="row" justify="space-between">
            <SplitButton value={type} handleChange={setType} />
            <MuiTooltip
              title={
                image === ''
                  ? 'Attach an image'
                  : image.split('/').slice(image.split('/').length - 1)
              }
            >
              <Button onClick={() => setOpen(true)} variant="extended">
                <PhotoIcon />
              </Button>
            </MuiTooltip>
            <MuiTooltip title="Send question">
              <Button color="primary" onClick={ask}>
                <SendIcon />
              </Button>
            </MuiTooltip>
          </MuiGrid>
        }
      />
      <MuiCardContent>
        <TextField
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
      </MuiCardContent>

      <MuiCardActions>
        <Option />
      </MuiCardActions>
    </Card>
  );
};

export default CreatePanel;
