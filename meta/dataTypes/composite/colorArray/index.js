
const _      = require('lodash');
const valueType = 'color[]';
const valueName = '取值范围';
const isExist = d => d !== null && d !== undefined;
const Color = require('./../../basic/color');

const getDesc = () => `颜色列表`;

const checkType = (d) => {
  if (!d) return false;
  if (!Array.isArray(d) || !d.length) return false;
  return Color.checkType(d[0]);
};

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'colorArray',
    validate: {
    }
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

