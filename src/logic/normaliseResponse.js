import Util from '../util';
import g from '../global';

const normaliseResponse = (texts, res) => {
  switch (typeof res) {
    case 'boolean':
      return Util.capitalise([res.toString()]);
    case 'number':
      return texts && texts.options
        ? [texts.options[res]]
        : [g.alphabet[res][0]];
    case 'object':
      if (res === null) return 'Ungraded';
      return texts && texts.options
        ? texts.options.filter((_, i) => res[i])
        : [
            res
              .map((num) => g.alphabet[num][0])
              .reduce((p, c) => `${p}, ${c}`, ''),
          ];
    case 'string':
      return [res];
    default:
      throw new Error('Unexpected response type');
  }
};

export default normaliseResponse;
