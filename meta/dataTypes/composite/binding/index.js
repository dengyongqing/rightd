
const _ = require('lodash');
const zscale = require('zscale');
// const d3     = require('d3-scale');

const valueType = 'binding';
const valueName = '数据映射';
const getDesc = () => `
  绑定映射函数: 
  key为输入数据的键值
  domain为输入数字的范围
  range为输出颜色的范围
  结果为json,最终被编译成函数:
`;

const checkType = (v) => {
  if (typeof (v) !== 'object') return false;
  const { domain, range, key } = v;
  if (!domain || !range || !key) return;
};

// 转化成validation对象
const toValidation = (value, key) => {
  if (value.value) value = value.value;
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'binding',
    validate: {
    },
  };
};

const toValue = (value, isFunc) => {
  if (value.value) value = value.value;
  let { domain, range, key } = value;
  if (key.value) key = key.value;
  const obj = {
    type: 'binding',
    value: {
      domain, range, key,
    },
  };
  if (!isFunc) return obj;
  const o = Object.assign({}, obj, { type: 'gradient' });
  const fn = zscale.generate(o);
  const finalFn = d => fn(d[key]);
  const hash = `${JSON.stringify(o)}_${key}`;
  finalFn.__hash = hash;
  return finalFn;
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName, toValue,
};

