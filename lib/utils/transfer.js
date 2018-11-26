/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-15 12:00:37
*/

const log = require('./console').log;
const _ = require('lodash');
const moment = require('moment');
const meta = require('./../../meta');
// const Utils = require('bcore/utils');

const { valueMap } = meta;

const eachValidation = (validations, fn, chain) => {
  chain = chain || '';
  validations.forEach((d, i) => {
    const { key } = d;
    const chainChild = (chain && chain.length) ? `${chain}.${key}` : key;
    fn(d, chainChild);
    if ((d.valueType === 'group' || d.uiType === 'group') && d.children) {
      eachValidation(d.children, fn, chainChild);
    }
  });
};
const toObject = (val, options, bool) => {
  options = options || {};
  val.forEach((d) => {
    const { key } = d;
    if (d.valueType === 'group' || d.uiType === 'group') {
      const { children } = d;
      if (!children) return log('子元素缺失...');
      const childO = options[key] = {};
      if (d.disable === true) return;
      toObject(children, childO, bool);
    } else if (d.uiType === 'switch') {
      const v = d.value;
      if (typeof v === 'string') {
        const vals = d.validate.options[v];
        options[key] = {
          [v]: toObject(vals),
        };
      } else {
        options[key] = v;
      }
    } else {
      options[key] = toValue(d, bool);
    }
  });
  return options;
};
function getValue(val, options, bool) {
  options = options || {};
  val.forEach((d) => {
    const { key } = d;
    if (d.valueType === 'group' || d.uiType === 'group') {
      const { children } = d;
      if (!children) return log('子元素缺失...');
      const childO = options[key] = {};
      if (d.disable === true) return;
      toObject(children, childO, bool);
    } else if (d.uiType === 'switch') {
      const v = d.value;
      if (typeof v === 'string') {
        const vals = d.validate.options[v];
        options[key] = {
          [v]: toObject(vals),
        };
      } else {
        options[key] = v;
      }
    } else {
      options[key] = toValue(d, bool);
    }
  });
  return options;
}

function toValue(d, isFunc) {
  const valueType = valueMap[d.valueType];
  let { value } = d;
  if (valueType && valueType.toValue) value = valueType.toValue(value, isFunc);
  return value;
}

const isNull = d => d === undefined;

function mergeObject2Validation(validation, object) {
  if (!object) return validation;
  const validationObj = {};
  eachValidation(validation, (d, chain) => {
    validationObj[chain] = d;
  });
  _.forEach(validationObj, (d, chain) => {
    const valueType = valueMap[d.valueType];
    let v = _.get(object, chain);
    if (valueType && valueType.toValidation && v !== undefined) {
      v = valueType.toValidation(v).value;
    }
    if (!isNull(v)) d.value = v;
  });
  return validation;
}

const genItem = (v, k) => {
  if (v === null || v === undefined) return null;
  let valueType;
  for (const key in valueMap) {
    valueType = valueMap[key];
    if (valueType.checkType(v)) return valueType.toValidation(v, k);
  }
  return null;
};

const toValidation = (options, validation) => {
  validation = validation || [];
  let item;
  _.forEach(options, (value, key) => {
    item = genItem(value, key);
    if (item) validation.push(item);
    if (item && item.valueType === 'group') {
      toValidation(value, item.children);
    }
  });
  return validation;
};
const toStringTime = (t) => {
  return moment(t).format('YYYY-MM-DD HH:mm:ss');
};
const convertFilterTime = (val) => {
  if (!val) return;
  const range = val.$and;
  if (!range) return val;
  let $gte = '';
  let $lte = '';
  const name = val.name;
  if (!name) {
    let range0 = _.values(range)[0];
    $gte = range0.$gte || '';
    $lte = range0.$lte || '';
    return { $and: [{ '$gte': toStringTime($gte) }, { '$lte': toStringTime($lte) }], name };
  };
  const v0 = _.values(range)[0];
  const v1 = _.values(range)[1];
  const k1 = _.keys(v0)[0];
  const k2 = _.keys(v1)[0];
  const nd = new Date();
  const now = nd.getTime();
  const m = 60 * 1000;
  const h = 60 * m;
  const d = 24 * h;
  let isDelay;
  let delayTime;
  let delayUnit;
  if (name.indexOf('_') !== -1) {
    const newName = name.substring(name.indexOf('_'), name.length);
    delayTime = newName.replace(/[^\d]/g, '');
    const strArr = newName.split(delayTime);
    isDelay = strArr[0];
    delayUnit = strArr[strArr.length - 1];
  }
  const day = name.indexOf('_') !== -1 ? name.substring(0, name.indexOf('_')).replace(/[^\d]/g, '') : name.replace(/[^\d]/g, '');
  const strArr = name.indexOf('_') !== -1 ? name.substring(0, name.indexOf('_')).split(day) : name.split(day);
  const unit = strArr[strArr.length - 1];
  const exp = strArr[0];
  const nowDay = nd.getDate();
  const nowDayWeek = nd.getDay();
  const nowYear = nd.getFullYear();
  const nowMonth = nd.getMonth();
  const currentUnit = name.substring(2, name.length);
  const time = _.cloneDeep(nd);
  if (name.indexOf('当前') !== -1 || exp === '当前') {
    if (currentUnit === '分钟' || unit === '分钟') {
      $gte = new Date(time.setSeconds(0, 0, 0, 0));
      $lte = nd;
    } else if (currentUnit === '小时' || unit === '小时') {
      $gte = new Date(time.setMinutes(0, 0, 0, 0));
      $lte = nd;
    } else if (currentUnit === '天' || unit === '天') {
      $gte = new Date(time.setHours(0, 0, 0, 0));
      $lte = nd;
    } else if (currentUnit === '周' || unit === '周') {
      $gte = new Date(nowYear, nowMonth, nowDay - nowDayWeek);
      $lte = nd;
    } else if (currentUnit === '月' || unit === '月') {
      $gte = new Date(nowYear, nowMonth, 1);
      $lte = nd;
    } else if (currentUnit === '年' || unit === '年') {
      $gte = new Date(nowYear, 0, 1);
      $lte = nd;
    }
  }
  if (!exp) {
    if (unit === '分钟') {
      return {
        name: `${day}${unit}`,
        range: {
          $gte: moment(new Date(now - day * m)).format('YYYY-MM-DD HH:mm:ss'),
          $lte: moment(nd).format('YYYY-MM-DD HH:mm:ss'),
        },
      };
    } else if (unit === '小时') {
      return {
        name: `${day}${unit}`,
        range: {
          $gte: moment(new Date(now - day * h)).format('YYYY-MM-DD HH:mm:ss'),
          $lte: moment(nd).format('YYYY-MM-DD HH:mm:ss'),
        },
      };
    } else if (unit === '天') {
      return {
        name: `${day}${unit}`,
        range: {
          $gte: moment(new Date(now - day * d)).format('YYYY-MM-DD HH:mm:ss'),
          $lte: moment(nd).format('YYYY-MM-DD HH:mm:ss'),
        },
      };
    }
  }
  if (exp === '过去' && unit === '年' && isDelay === '_延迟') {
    if (delayUnit === '分钟') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - day)) - delayTime * m);
      $lte = new Date(now - delayTime * m);
    }
    if (delayUnit === '小时') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - day)) - delayTime * h);
      $lte = new Date(now - delayTime * h);
    }
    if (delayUnit === '天') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - day)) - delayTime * d);
      $lte = new Date(now - delayTime * d);
    }
    if (delayUnit === '周') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - day)) - delayTime * 7 * d);
      $lte = new Date(now - delayTime * 7 * d);
    }
    if (delayUnit === '月') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)) - (now - new Date().setYear((new Date().getFullYear() - day))));
      $lte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)));
    }
    if (delayUnit === '年') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - delayTime - day)));
      $lte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)));
    }
  }
  if (exp === '过去' && unit === '月' && isDelay === '_延迟') {
    if (delayUnit === '分钟') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - day)) - delayTime * m);
      $lte = new Date(now - delayTime * m);
    }
    if (delayUnit === '小时') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime * h)));
      $lte = new Date(now - delayTime * h);
    }
    if (delayUnit === '天') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime * d)));
      $lte = new Date(now - delayTime * d);
    }
    if (delayUnit === '周') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime * 7 * d)));
      $lte = new Date(now - delayTime * 7 * d);
    }
    if (delayUnit === '月') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime - day)));
      $lte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)));
    }
    if (delayUnit === '年') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)) - (now - new Date().setMonth((new Date().getMonth() - day))));
      $lte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)));
    }
  }
  if (exp === '过去' && unit === '周' && isDelay === '_延迟') {
    if (delayUnit === '分钟') {
      $gte = new Date(now - day * 7 * d - delayTime * m);
      $lte = new Date(now - delayTime * m);
    }
    if (delayUnit === '小时') {
      $gte = new Date(now - day * 7 * d - delayTime * h);
      $lte = new Date(now - delayTime * h);
    }
    if (delayUnit === '天') {
      $gte = new Date(now - day * 7 * d - delayTime * d);
      $lte = new Date(now - delayTime * d);
    }
    if (delayUnit === '周') {
      $gte = new Date(now - day * 7 * d - delayTime * 7 * d);
      $lte = new Date(now - delayTime * 7 * d);
    }
    if (delayUnit === '月') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)) - day * 7 * d);
      $lte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)));
    }
    if (delayUnit === '年') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)) - day * 7 * d);
      $lte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)));
    }
  }
  if (exp === '过去' && unit === '天' && isDelay === '_延迟') {
    if (delayUnit === '分钟') {
      $gte = new Date(now - day * d - delayTime * m);
      $lte = new Date(now - delayTime * m);
    }
    if (delayUnit === '小时') {
      $gte = new Date(now - day * d - delayTime * h);
      $lte = new Date(now - delayTime * h);
    }
    if (delayUnit === '天') {
      $gte = new Date(now - day * d - delayTime * d);
      $lte = new Date(now - delayTime * d);
    }
    if (delayUnit === '周') {
      $gte = new Date(now - day * d - delayTime * 7 * d);
      $lte = new Date(now - delayTime * 7 * d);
    }
    if (delayUnit === '月') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)) - day * d);
      $lte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)));
    }
    if (delayUnit === '年') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)) - day * d);
      $lte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)));
    }
  }
  if (exp === '过去' && unit === '小时' && isDelay === '_延迟') {
    if (delayUnit === '分钟') {
      $gte = new Date(now - day * h - delayTime * m);
      $lte = new Date(now - delayTime * m);
    }
    if (delayUnit === '小时') {
      $gte = new Date(now - day * h - delayTime * h);
      $lte = new Date(now - delayTime * h);
    }
    if (delayUnit === '天') {
      $gte = new Date(now - day * h - delayTime * d);
      $lte = new Date(now - delayTime * d);
    }
    if (delayUnit === '周') {
      $gte = new Date(now - day * h - delayTime * 7 * d);
      $lte = new Date(now - delayTime * 7 * d);
    }
    if (delayUnit === '月') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)) - day * h);
      $lte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)));
    }
    if (delayUnit === '年') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - day)) - day * h);
      $lte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)));
    }
  }
  if (exp === '过去' && unit === '分钟' && isDelay === '_延迟') {
    if (delayUnit === '分钟') {
      $gte = new Date(now - day * m - delayTime * m);
      $lte = new Date(now - delayTime * m);
    }
    if (delayUnit === '小时') {
      $gte = new Date(now - day * m - delayTime * h);
      $lte = new Date(now - delayTime * h);
    }
    if (delayUnit === '天') {
      $gte = new Date(now - day * m - delayTime * d);
      $lte = new Date(now - delayTime * d);
    }
    if (delayUnit === '周') {
      $gte = new Date(now - day * m - delayTime * 7 * d);
      $lte = new Date(now - delayTime * 7 * d);
    }
    if (delayUnit === '月') {
      $gte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)) - day * m);
      $lte = new Date(new Date().setMonth((new Date().getMonth() - delayTime)));
    }
    if (delayUnit === '年') {
      $gte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)) - day * m);
      $lte = new Date(new Date().setYear((new Date().getFullYear() - delayTime)));
    }
  }

  if (unit === '分钟' && exp === '过去' && isDelay !== '_延迟') {
    $gte = new Date(now - day * m);
    $lte = nd;
  } else if (unit === '分钟' && exp === '未来') {
    $lte = new Date(now + day * m);
    $gte = nd;
  } else if (unit === '小时' && exp === '过去' && isDelay !== '_延迟') {
    $gte = new Date(now - day * h);
    $lte = nd;
  } else if (unit === '小时' && exp === '未来') {
    $lte = new Date(now + day * h);
    $gte = nd;
  } else if (unit === '天' && exp === '过去' && isDelay !== '_延迟') {
    $gte = new Date(now - day * d);
    $lte = nd;
  } else if (unit === '天' && exp === '未来') {
    $lte = new Date(now + day * d);
    $gte = nd;
  } else if (unit === '月' && exp === '过去' && isDelay !== '_延迟') {
    $gte = new Date(new Date().setMonth((new Date().getMonth() - day)));
    $lte = nd;
  } else if (unit === '月' && exp === '未来') {
    $lte = new Date(new Date().setMonth((new Date().getMonth() + day)));
    $gte = nd;
  } else if (unit === '年' && exp === '过去' && isDelay !== '_延迟') {
    $gte = new Date(new Date().setYear((new Date().getFullYear() - day)));
    $lte = nd;
  } else if (unit === '年' && exp === '未来') {
    $lte = new Date(new Date().setYear((new Date().getFullYear() + day)));
    $gte = nd;
  } else if (unit === '周' && exp === '过去' && isDelay !== '_延迟') {
    $gte = new Date(now - day * 7 * d);
    $lte = nd;
  } else if (unit === '周' && exp === '未来') {
    $lte = new Date(now + day * 7 * d);
    $gte = nd;
  }
  return { $and: [{ [k1]: toStringTime($gte) }, { [k2]: toStringTime($lte) }], name };
};

const validation2Meta = (validation) => {
  const meta = toValidation(validation);
  eachValidation(meta, (d) => {
    if (d.uiType === 'slider') d.uiType = 'input';
  });
  return meta;
};

const funcTypes = {
  gradient: valueMap.gradient,
  binding: valueMap.binding,
};

const object2Function = (obj) => {
  return _.cloneDeepWith(obj, (d) => {
    if (!d || typeof (d) !== 'object') return;
    const { type, value } = d;
    if (!type || !value) return;
    if (type && type in funcTypes && value) {
      const dataType = funcTypes[type];
      return dataType.toValue({ type, value }, true);
    }
  });
};

function getValidation(validation, chain) {
  if (!validation) return;
  if (typeof chain === 'string') chain = chain.split('.');
  let result = null;
  validation.forEach((val, i) => {
    if (val.key === chain[0]) {
      if (chain.length === 1) {
        result = validation[i];
      } else {
        chain = chain.splice(1);
        result = getValidation(val.children, chain);
      }
    }
  });
  return result;
}
function updateConfig(validation, key, chain, v) {
  if (!validation) return;
  // if (typeof chain === 'string') chain = chain.split('.');
  validation.forEach((val, i) => {
    if (val.key === key) {
      _.set(val, chain, v);
    }
  });
}
function getValidate(validation, chain) {
  if (!validation) return;
  if (typeof chain === 'string') chain = chain.split('.');
  let result = null;
  validation.forEach((val, i) => {
    val.validate && val.validate.options ? console.log(val.validate.options) : console.log('null');
    if (val.validate && val.validate.options === chain[0]) {
      if (chain.length === 1) {
        result = validation[i];
      } else {
        chain = chain.splice(1);
        result = getValidate(val.validate.options, chain);
      }
    }
  });
  return result;
}

function setValidation(validation, chain, valida) {
  if (!validation) return;
  if (typeof (chain) === 'string') chain = chain.split('.');
  let bol = false;
  validation.forEach((val, i) => {
    if (val.key === chain[0]) {
      bol = true;
      if (chain.length === 1) {
        // validation[i] = valida;
        Object.assign(validation[i], valida);
      } else {
        chain = chain.splice(1);
        setValidation(val.children, chain, valida);
      }
    }
  });
  if (!bol) {
    if (chain.length === 1) {
      validation.push(valida);
    }
  }
  return validation;
}

function deepMergeValidation(v1, v2) {
  v1 = _.cloneDeep(v1);
  if (!v2) return v1;
  const vObj = {};
  eachValidation(v2, (d, chain) => {
    vObj[chain] = d;
  });
  _.forEach(vObj, (vo, chain) => {
    setValidation(v1, chain, vo);
  });
  return v1;
}
module.exports = {
  toObject,
  getValue,
  toValidation,
  validation2Meta,
  mergeObject2Validation,
  eachValidation,
  object2Function,
  convertFilterTime,
  toValue,
  deepMergeValidation,
  getValidate,
  updateConfig,
  setValidation,
  getValidation,
};
