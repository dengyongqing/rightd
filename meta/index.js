

const _ = require('lodash');
const valueMap = require('./dataTypes');
// ui类型和数据类型的映射
const uiValue = {
  // 复合类型
  binding: ['binding'],
  gradient: ['gradient'],
  range: ['range'],
  rangeTime: ['rangeTime'],
  // 基础类型
  color: ['color'],
  input: ['float', 'integer', 'string'],
  slider: ['float', 'integer'],
  toggle: ['boolean'],
  select: ['boolean', 'integer', 'float', 'string', 'color'],
  array: ['input'],
  'int[]': ['input'],
  colorArray: ['color[]'],
};

const valueCastMap = {
  integer: ['float'],
};

const uis = _.keys(uiValue);
const values = _.uniq(_.flatten(_.values(uiValue)));
const valueUi = {};
_.forEach(uiValue, (values, ui) => {
  _.forEach(values, (value) => {
    const arr = valueUi[value] = valueUi[value] || [];
    arr.push(ui);
  });
});

function getValueCastList(valueType) {
  return (valueCastMap[valueType] || []).concat([valueType]);
}

function getValueTypeName(v) {
  let valueType;
  for (const i in valueMap) {
    valueType = valueMap[i];
    if (valueType.checkType(v)) return valueType.valueType;
  }
}

function getValueType(v) {
  return valueMap[v] || 'unkown';
}

function getUIListByValue(valueType) {
  return valueUi[valueType];
}

module.exports = {
  uis,
  values,
  valueMap,
  uiValue,
  valueUi,
  getValueTypeName,
  getValueType,
  getValueCastList,
  getUIListByValue,
};
