/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-15 12:00:37
*/

'use strict';

const Utils = require('bcore/utils');

const {floor, random} = Math;

/*
  生成随机id
*/
const genID = (key) => {
  const t = new Date().getTime() % 1000000;
  const rnd = floor(random() * 1000000);
  return `${key}_${t}_${rnd}`;
}
module.exports = {genID};
