import Util from '../util';
import g from '../global';

const sanitiseResponse = (texts, res) => {
  switch (typeof res) {
    case 'boolean':
      return [Util.capitalise(res.toString())];
    case 'number':
      return texts && texts.options
        ? [texts.options[res]]
        : [g.alphabet[res][0]];
    case 'object':
      if (res === null) return ['No answer'];
      return texts && texts.options
        ? texts.options.filter((_, i) => res[i])
        : [
            g.alphabet
              .filter((_, i) => res[i])
              .reduce((p, c) => `${p}${p === '' ? '' : ','} ${c[0]}`, ''),
          ];
    case 'string':
      return [res];
    default:
      throw new Error('Unexpected response type');
  }
};

export default sanitiseResponse;
