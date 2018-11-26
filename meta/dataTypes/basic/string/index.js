
const _  = require('lodash');

const valueType = 'string';
const valueName = '字符串';
const getDesc = () => `字符型型对象, 如 '大爷', '狗', '12'`;

const checkType = v => typeof(v) === 'string';

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
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

