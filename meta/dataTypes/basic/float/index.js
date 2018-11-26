
const _  = require('lodash');
const dUtils = require('./../../utils');

const valueType = 'float';
const valueName = '浮点数';
const getDesc = () => `浮点数, 如 1.23`;


const checkType = v => {
  if (typeof(v) === 'number') return true;
  let string = v.toString();
  if (string.indexOf('.') === -1) return false;
  return match(v);
};

const intMatches = ['px', 'rem'];
const match = dUtils.genMatch(intMatches, 'float');
const parse = dUtils.genParse(intMatches, 'float');

function createRange(value){
  const delta = 0.01;
  return {
    min: value > 0 ? value / 4 - delta : value * 4 - delta,
    max: value > 0 ? value * 4 + delta : value / 4 + delta
  };
}

function createCom(value, key, unit){
  if (!unit) {
    return {
      key, value, valueType, name: key,
      uiType: 'slider',
      validate: {
        range: createRange(value),
        step: 1
      }
    };
  }

  return {
    key, value, valueType, name: key, unit,
    uiType: 'slider',
    validate: {
      range: createRange(value),
      step: 1
    }
  }
}


//转化成validation对象
const toValidation = (value, key) => {
  if (typeof(value) === 'number') return createCom(value, key);
  if (typeof value === 'string') {
    const o = parse(value);
    return createCom(o.value, key, o.unit);
  }
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName, createRange
};

