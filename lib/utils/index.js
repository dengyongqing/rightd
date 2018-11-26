/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-15 12:00:37
*/

const Utils     = require('bcore/utils');
const id        = require('./id');
const CONSOLE   = require('./console');
const check     = require('./check');
const validator = require('./validator');
const transfer  = require('./transfer');
const formater  = require('./formater');
const events    = require('./events');
const color     = require('./color');
const language  = require('./language');

module.exports = Object.assign({}, transfer, id, CONSOLE, check, validator, Utils, formater, events, color, language);
