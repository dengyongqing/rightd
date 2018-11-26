

import _ from 'lodash';
import { lans } from './validation.js';


function getText(key, lan) {
  if (!key) return '';
  let translateKey = lans[key];
  if (!translateKey) return key;
  let result = translateKey[lan];
  return result;
}

module.exports = { getText };
