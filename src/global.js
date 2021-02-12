import WrongIcon from '@material-ui/icons/Cancel';
import CorrectIcon from '@material-ui/icons/CheckCircle';
import UngradedIcon from '@material-ui/icons/RemoveCircle';
import RadioIcon from '@material-ui/icons/RadioButtonChecked';
import CheckIcon from '@material-ui/icons/CheckBox';
import TrueFalseIcon from '@material-ui/icons/Beenhere';
import ParagraphIcon from '@material-ui/icons/ViewHeadline';

export default {
  mixpanelToken: process.env.REACT_APP_MIXPANEL_TOKEN,
  socketUrl: 'wss://g78v4bdy8f.execute-api.ap-southeast-1.amazonaws.com/prod/',
  alphabet: [
    ['A', 'primary'],
    ['B', 'error'],
    ['C', 'success'],
    ['D', 'secondary'],
    ['E', 'warning'],
  ],
  trueFalse: [
    ['T', 'primary'],
    ['F', 'error'],
  ],
  correctness: {
    true: { Icon: CorrectIcon, colour: 'success' },
    false: { Icon: WrongIcon, colour: 'error' },
    null: { Icon: UngradedIcon, colour: 'info' },
  },
  questionTypes: {
    MCQ: { Icon: RadioIcon, name: 'Multiple Choice' },
    MultiSelect: { Icon: CheckIcon, name: 'Multi-Select' },
    TrueFalse: { Icon: TrueFalseIcon, name: 'True or False' },
    ShortAnswer: { Icon: ParagraphIcon, name: 'Short Answer' },
  },
  drawerWidth: 400,
  meetChatWidth: 360,
  meetChatClass: '.kjZr4',
};
