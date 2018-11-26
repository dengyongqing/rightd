
function log(e) {
  console.log(e);
}

function _isNull(v) {
  // console.log(v);
  return v !== undefined && v !== null && v !=='';
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
      if (d > new Date(value.min).getTime() && d < new Date(value.max).getTime()) {
        return d > new Date(value.min).getTime() && d < new Date(value.max).getTime();
      }
      return errorMessage || `请输入介于${value.min}~${value.max}的值`
    };
  }
  return () => {};
}

module.exports = parseRange;
