
const _  = require('lodash');

const valueType = 'color';
const valueName = '色彩';
const getDesc = () => `Web色彩对象, 如 rgba(100,20,20,0.1), #fff, #f0f0f0`;

const checkType = (v) => {
  if(!v) return;
  if (typeof(v) !== 'string') return false;
  return (v.indexOf('rgb') === 0 && v.indexOf(')') !== 0) || 
         (v.indexOf('hsl') === 0 && v.indexOf(')') !== 0) || 
         v.indexOf('#') === 0 ||
         v in {'transparent': 1, 'red': 1, 'black': 1, 'blue': 1};
};

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'color',
    validate: {
    }
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

