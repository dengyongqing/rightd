
import _ from 'lodash';
import { retrieveFollowingIdentifier } from 'brace/ext/language_tools';
import { version } from 'core-js';

function _getId(o) {
  if (o === undefined || o === null) return 'null';
  return o && typeof o === 'object' ? o.id || o.value : o.toString();
}

function _isEqual(d, v) {
  return _.isEqual(d, v);
  // if (d && v && typeof d === 'object' && typeof v === 'object') {
  //   return _.isEqual(d, v);
  // }
  // if (typeof v === )
}

function getDisplayName(value, options) {
  if (value === undefined || value === null) return '不存在';
  if ((typeof value !== 'object' || Array.isArray(value)) && !Array.isArray(options)) {
    for (const name in options) {
      if (_isEqual(options[name], value)) return name;
    }
  }
  if (value && typeof (value) === 'object') return value.name || value.id;
  return value.toString ? value.toString() : value;
}
function unique(arr) {
  const result = {};
  const finalResult = [];

  for (let i = 0; i < arr.length; i++) {
    if (!arr[i]) return;
    result[arr[i].name] = arr[i];
  }
  for (const item in result) {
    finalResult.push(result[item]);
  }
  return finalResult;
}
function genMenuArray(options, valueSel) {
  const isArray = Array.isArray(options);
  let isSelected;
  let name;
  let key;
  return _.map(options, (d, k) => {
    key = _getId(d);
    isSelected = _isEqual(d, valueSel);
    if (d === undefined || d === null) return { name: '未选择', isSelected, key, value: d };
    if (isArray) {
      name = d && typeof d === 'object' && !Array.isArray(d) ? d.name : d.toString();
    } else {
      name = d && typeof d === 'object' && !Array.isArray(d) ? d.name : k.toString();
    }
    return { key, name, isSelected, value: d };
  });
}
function genMultiArray(options, valueSel) {
  const isArray = Array.isArray(options);
  let isSelected;
  let name;
  let key;
  return _.map(options, (d, k) => {
    key = _getId(d);
    isSelected = _isEqual(d, valueSel);
    if (d === undefined || d === null) return { name: '未选择', isSelected, key, value: d };
    if (isArray) {
      name = d && typeof d === 'object' && !Array.isArray(d) ? d.name : d.toString();
    } else {
      name = d && typeof d === 'object' && !Array.isArray(d) ? d.name : k.toString();
    }
    return { name, value: d };
  });
}

function searchFilter(k, ds) {
  if (!ds) { return null; }
  if (!k) { return ds; }
  k = (k || '').toLowerCase();
  return _.filter(ds, (d) => {
    if (typeof (d) === 'object') {
      const value = (d.value || '')
        .toString()
        .toLowerCase();
      const name = (d.name || '')
        .toString()
        .toLowerCase();
      return value.indexOf(k) !== -1 || name.indexOf(k) !== -1;
    }
    return (d || '')
      .toString()
      .toLowerCase()
      .indexOf(k) !== -1;
  });
}

function isNull(v) {
  return v === undefined || v === null;
}

function _contain(long, str) {
  if (isNull(long)) return false;
  str = `${str}`;
  long = `${long}`;
  return typeof long === 'string' && long.toLowerCase().indexOf(str) !== -1;
}

function _addRes(res, d, k) {
  if (Array.isArray(res)) return res.push(d);
  res[k] = d;
}
function genSearchFilter(text = '', col) {
  if (!text) return c => c;
  text = text.toLowerCase();
  return (ds) => {
    if (!ds) return null;
    const dtype = Array.isArray(ds) ? 'array' : 'object';
    const res = dtype === 'array' ? [] : {};
    _.forEach(ds, (d, k) => {
      if (col && _contain(d[col], text)) return _addRes(res, d, k);
      if ((typeof d === 'string' || typeof d === 'number') && _contain(d, text)) {
        return _addRes(res, d, k);
      }
      for (const key in d) {
        if (_contain(key, text) || _contain(k, text) || _contain(d[key], text)) return _addRes(res, d, k);
      }
    });
    return res;
  };
}

export default {
  genMenuArray, getDisplayName, searchFilter, genMultiArray, unique, genSearchFilter,
};
