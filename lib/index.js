
import _ from 'lodash';

function _getId(o) {
  if (o === undefined || o === null) return 'null';
  return o && typeof o === 'object' ? o.id || o.value : o.toString();
}

function _isEqual(d, v) {
  return _.isEqual(d, v);
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
    // console.log(valueSel, name);
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
    // console.log(valueSel, name);
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

export default {
  genMenuArray, getDisplayName, searchFilter, genMultiArray, unique,
};
