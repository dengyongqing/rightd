
const _      = require('lodash');

const valueType = 'rangeTime';
const valueName = '时间取值范围';
const isExist = d => d !== null && d !== undefined;

const isTime = require('./../../basic/time').checkType;

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
  return onlyMinMax(d) && isTime(d.min) && isTime(d.max);
};

//转化成validation对象
const toValidation = (value, key) => {
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'rangeTime',
    validate: {
    }
  };
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName
};

