
const _  = require('lodash');

const valueType = 'array';
const valueName = '数组';

const getDesc = () => `数组, 如 [1,2,3,4]`;

const checkType = v => Array.isArray(v);

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value: JSON.stringify(value),
    valueType,
    name: key,
    uiType: 'input',
    validate: {
    }
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

