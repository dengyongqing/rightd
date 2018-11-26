//基本类型
const binding  = require('./binding');
const gradient = require('./gradient');
const range    = require('./range');
const rangeTime  = require('./rangeTime');
const colorArray = require('./colorArray');

const composite = {
  gradient, range, rangeTime, binding, colorArray
};

module.exports = composite;

