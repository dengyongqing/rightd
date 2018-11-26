//基本类型
const float   = require('./float');
const string  = require('./string');
const boolean = require('./boolean');
const integer = require('./integer');
const group   = require('./group');
//
const color   = require('./color');

const basic = {
  float, integer, color, string, boolean, group
};

module.exports = basic;

