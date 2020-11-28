import WrongIcon from '@material-ui/icons/Cancel';
import CorrectIcon from '@material-ui/icons/CheckCircle';
import UngradedIcon from '@material-ui/icons/RemoveCircle';

export default {
  socketUrl: 'wss://0cyod0odw5.execute-api.ap-southeast-1.amazonaws.com/dev/',
  alphabet: [
    ['A', 'primary'],
    ['B', 'red'],
    ['C', 'green'],
    ['D', 'secondary'],
    ['E', 'yellow'],
  ],
  trueFalse: [
    ['T', 'primary'],
    ['F', 'red'],
  ],
  correctness: {
    true: { Icon: CorrectIcon, colour: 'green' },
    false: { Icon: WrongIcon, colour: 'red' },
    null: { Icon: UngradedIcon, colour: 'silver' },
  },
};
