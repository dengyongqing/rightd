
const _  = require('lodash');

const valueType = 'time';
const valueName = '时间';
const getDesc = () => `时间对象, 如 2014-01-02`;

const checkType = (v) => {
  if (!v) return false;
  if (typeof(v) !== 'string') return false;
  return new Date(v) !== 'null';
};

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'time',
    validate: {
    }
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

