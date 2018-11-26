const CONSOLE = require('./console');
const ID      = require('./id');
const _       = require('lodash');

//字段判断相关
const getValue   = d => d.value;
const getId      = d => d.id;
const getUIType  = d => d.uiType;
const getKey     = d => d.key || d.name;
const isInt      = valueType => valueType === 'int' || valueType === 'integer';

//
const checkOne = d => {
  const {uiType, valueType} = d;
  _check(d);
  if (uiType === 'input' && isInt(valueType) === 'integer' ) {
    checkInputInteger(d);
  }
  if (uiType === 'group' && d.children) {
    d.children = d.children.map(d => checkOne(d));
  }
  return d;
}

const check = ds => {
  return ds.map(d => checkOne(d))
};

//通用性check
const nulls = { group: true };
const _check = d => {
  let id = getId(d), value = getValue(d), validate;
  //必须存在id
  if(!id) d.id = ID.genID(d.uiType);
  if((value === undefined) && !(d.valueType in nulls)) {
    return CONSOLE.warn(`${d.id}, key:${d.key}默认值缺失`);
  }
}

//各种check，主要检查格式，并补全
const checkInputInteger = d => {
}

const checkInputIntegerArray = d => {
}



module.exports = {
  check, checkOne
};
