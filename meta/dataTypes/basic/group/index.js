
const _  = require('lodash');

const valueType = 'group';
const valueName = '群组';
const getDesc = () => `群组, 选择器的容器`;

const checkType = v => typeof(v) === 'object' && !(v.type && v.value);

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    valueType,
    name: key,
    uiType: 'group',
    children: []
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

