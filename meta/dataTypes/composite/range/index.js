
const _      = require('lodash');

const valueType = 'range';
const valueName = '取值范围';
const isExist = d => d !== null && d !== undefined;

const onlyMinMax = (line) => {
  let bol = true;
  let isMin = false;
  let isMax = false;
  _.forEach(line, (d, k) => {
    if (k === 'min' && isExist(d[k])) isMin = true;
    if (k === 'max' && isExist(d[k])) isMax = true;
    if (k!=='min' && k !== 'max')     bol = false
  });
  return bol && isMax && isMin;
}

const getDesc = () => `取值范围, 如: {min:1, max:2}`;

const checkType = (d) => {
  if (!d) return false;
  if (typeof(d) !== 'object') return false;
  return onlyMinMax(d) && typeof d.min === 'number' && typeof d.max === 'number';
};

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'range',
    validate: {
    }
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

