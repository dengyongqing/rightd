
import _ from 'lodash';

function _getId(o, id) {
  if (o === undefined || o === null) return 'null';
  return (o && typeof o === 'object' ? o.id || o.value : o.toString()) || id;
}

function _isEqual(d, v) {
  return _.isEqual(d, v);
}

function genMenuArray(options, valueSel) {
  const isArray = Array.isArray(options);
  return _.map(options, (d, k) => formatMenu(d, k, valueSel, isArray));
}

function _isPureObject(v) {
  return v && typeof v === 'object' && !Array.isArray(v);
}

function formatMenu(value, k, valueSel, isArray = false) {
  const key = _getId(value, k);
  let isSelected = false;
  if (Array.isArray(valueSel)) {
    _.forEach(valueSel, (v) => {
      if (_isEqual(value, v)) isSelected = true;
    });
  } else {
    isSelected = _isEqual(value, valueSel);
  }
  let others = {};
  if (value && typeof value === 'object') {
    const { id, value: v, isSelected, key, ...rest } = value;
    others = rest;
  }
  let name;
  if (value === undefined || value === null) return { name: '空值', isSelected, key, value };
  if (isArray) {
    name = _isPureObject(value) ? value.name : value.toString();
  } else {
    name = _isPureObject(value) ? (value.name || k.toString()) : k.toString();
  }
  return { key, name, isSelected, value, ...others };
}

function getDisplayName(value, options) {
  if (value === undefined || value === null) return '不存在';
  if ((typeof value !== 'object' || Array.isArray(value)) && !Array.isArray(options)) {
    for (const name in options) {
      if (_isEqual(options[name], value)) return name;
    }
  }
  if ((typeof value !== 'object' || Array.isArray(value)) && Array.isArray(options)) {
    const object = _.find(options, o => o.value  === value);
    if (object) {
      return object.name || value;
    }
  }
  if (value && typeof (value) === 'object') {
    const name = value.name || value.id;
    if (name) return name;
    for (const _name in options) {
      if (_isEqual(options[_name], value)) return _name;
    }
  }
  return value.toString ? value.toString() : value;
}

function mergeDisplayName(text, value, options) {
  if (value === undefined || value === null) return text;
  return text;// /
  // if ((typeof value !== 'object' || Array.isArray(value)) && !Array.isArray(options)) {
  //   for (const name in options) {
  //     if (_isEqual(options[name], value)) return name;
  //   }
  // }
  // if (value && typeof (value) === 'object') return value.name || value.id;
  // return value.toString ? value.toString() : value;
}
export default {
  genMenuArray, getDisplayName, mergeDisplayName,
};
