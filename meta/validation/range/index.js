
const rangeOption = {
  min: 1,
  max: 2,
};

function log(e) {
  console.log(e);
}

function _isNull(v) {
  return v !== undefined && v !== null && typeof v === 'number' && !isNaN(v);
}

function _check(o) {
  if (!o) return log('range: 对象不能为空');
  if (!_isNull(o.min)) return log('range: o.min不能为空');
  if (!_isNull(o.max)) return log('range: o.max不能为空');
  return true;
}

function parseRange(o = {}) {
  const { value, errorMessage } = o;
  if (_check(value)) {
    return (d) => {
      if (d > value.min && d < value.max) {
        return d > value.min && d < value.max 
      }
      return errorMessage || `请输入介于${value.min}~${value.max}的值`
    };
  }
  return () => {};
}


// validate: {
//   options [],
//   range: {
//     min: xx,
//     max: xx
//   }
// }

// validate: [
//   {
//     type: 'range',
//     value: {
//       min: xx,
//       max: xx
//     }
//   }, {
//     type: 'in',
//     value: [1,2,3,4]
//   }
// ]

// validate: {
//   $or: [
//     {
//       type: 'range',
//       value: {
//         min: xx,
//         max: xx
//       }
//     }, {
//       type: 'in',
//       value: [1,2,3,4]
//     }
//   ]
// }


module.exports = parseRange;
