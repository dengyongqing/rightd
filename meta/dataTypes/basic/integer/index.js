
const _ = require('lodash');
const dUtils = require('./../../utils');

const valueType = 'integer';
const valueName = '整数';
const getDesc = () => '整数型对象, 如 -1, 0, 3';

const checkType = (v) => {
  if (typeof (v) === 'number') return true;
  const string = v.toString();
  if (string.indexOf('.') !== -1) return false;
  return match(v);
};

const intMatches = ['px', 'rem'];
const match = dUtils.genMatch(intMatches, 'integer');
const parse = dUtils.genParse(intMatches, 'integer');

function createRange(value) {
  const delta = 2;
  return {
    min: value > 0 ? value / 4 - delta : value * 4 - delta,
    max: value > 0 ? value * 4 + delta : value / 4 + delta,
  };
}

function createCom(value, key = '', unit = '') {
  if (!unit) {
    return {
      key,
      value,
      valueType,
      name: key,
      uiType: 'slider',
      validate: {
        range: createRange(value),
        step: 1,
      },
    };
  }

  return {
    key,
    value,
    valueType,
    name: key,
    unit,
    uiType: 'slider',
    validate: {
      range: createRange(value),
      step: 1,
    },
  };
}

// 转化成validation对象
function toValidation(value, key) {
  if (typeof value === 'number' || value === null || value === undefined) return createCom(value, key);
  if (typeof value === 'string') {
    const o = parse(value);
    return createCom(o.value, key, o.unit);
  }
}

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName,
};

