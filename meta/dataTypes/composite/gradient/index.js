
const _ = require('lodash');
const zscale = require('zscale');

const valueType = 'gradient';
const valueName = '色彩渐变';
const getDesc = () => `
  颜色映射函数: 
  domain为输入数字的范围
  range为输出颜色的范围
  结果为json,最终被编译成函数:
  d3.scaleLinear().domain(domain).range(range);
`;

const checkType = zscale.funcs.gradient.checkType;

// 转化成validation对象
const toValidation = (value, key) => {
  if (value.value) value = value.value;
  return {
    key,
    value,
    valueType,
    name: key,
    uiType: 'gradient',
    validate: {
    },
  };
};

const toValue = (value, isFunc) => {
  // console.log(value, 'value...');
  value = value.value || value;
  const v = {
    type: valueType,
    value,
  };
  if (!isFunc) return v;
  return zscale.generate(v);
};

module.exports = {
  getDesc, checkType, toValidation, valueType, valueName, toValue,
};

