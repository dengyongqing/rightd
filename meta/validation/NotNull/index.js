
function log(e) {
  console.log(e);
}

function _isNull(v) {
  return v !== undefined && v !== null && typeof v === 'number' && !isNaN(v);
}

function _check(o) {
  if (!o) return log('value: 对象不能为空');
  return true;
}

function parseRange(o = {}) {
  const { errorMessage } = o
  if (_check(o)) {
    return (d) => {
      if (d) {
        return true
      }
      return errorMessage || `输入不能为空`
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
