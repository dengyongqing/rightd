
const _  = require('lodash');


const valueType = 'boolean';
const valueName = '布尔值';
const getDesc   = () => `布尔型对象, true或false`;

const checkType = v => typeof(v) === 'boolean';

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
    name: key,
    uiType: 'toggle',
    valueType,
    validate: {}
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

