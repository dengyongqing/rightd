
const range = require('./range');
const notNull = require('./NotNull');
const timeRange = require('./timeRange');

const map = {
  range: range,
  notNull,
  timeRange
};

function parseValidate (validate) {

    const fns = [];

    _.forEach(validate, (vali, index) => {
      const genFn = map[vali.type];
      const fn = genFn(vali);
      fns.push(fn);
    });
    return (v) => {
      let bol = true;
      for (let i=0; i<fns.length; i++) {
        if (typeof (bol && fns[i](v)) === 'string') {
          return bol && fns[i](v);
        }
      }
    }
}

module.exports = {
  parseValidate
};