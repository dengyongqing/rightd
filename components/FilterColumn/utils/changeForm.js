
import moment from 'moment';
import _ from 'lodash';
moment.locale('zh-cn');

// 时间格式化
const toStringTime = (t) => {
  return moment(t).format('YYYY-MM-DD HH:mm:ss');
};
// 控制时间 年 月 周 天
const getLastDay = (o) => {
  const { name } = o;
  const nd = new Date();
  const now = nd.getTime();
  const m = 60 * 1000;
  const h = 60 * m;
  const d = 24 * h;
  const nowDay = nd.getDate();
  const nowDayWeek = nd.getDay();
  const nowYear = nd.getFullYear();
  const nowMonth = nd.getMonth();
  if (name) {
    switch (name){
      case '年':
        return toStringTime(new Date(nowYear, 11, 31, 23, 59, 59));
        break;
      case '月':
        return toStringTime(new Date(nowYear, nowMonth + 1, 0, 23, 59, 59));
        break;
      case '天':
        return toStringTime(new Date(nowYear, nowMonth, nowDay, 23, 59, 59));
        break;
      case '周':
        return toStringTime(new Date(nowYear, nowMonth, nowDay - nowDayWeek + 1 , 23, 59, 59));
        break;
      case '小时':
        return toStringTime(new Date(nowYear, nowMonth, nowDay, nd.getHours(), 59, 59));
        break;
      case '分钟':
        return toStringTime(new Date(nowYear, nowMonth, nowDay, nd.getHours(), nd.getMinutes(), 59));
        break;
      default:
        return '';
        break;
    }
  }
}
const changeDateForm = (selectday, selectDayValue, k, name="") => {
  let data;
  if (typeof selectday === 'object' && Object.keys(selectday).length !== 0) {
    data = `${selectDayValue}${selectday.name || selectday}`;
  } else if (typeof selectday === 'string') {
    data = `${selectDayValue}${selectday}`;
  } else if (k === '$eql') {
    data = `1${selectday.name || selectday}`;
  } else {
    data = selectDayValue;
  }
  const nd = new Date();
  const now = nd.getTime();
  const m = 60 * 1000;
  const h = 60 * m;
  const d = 24 * h;
  let time = '';
  const nowDay = nd.getDate();
  const nowDayWeek = nd.getDay();
  const nowYear = nd.getFullYear();
  const nowMonth = nd.getMonth();
  if ((selectday === '分钟' || selectday.name === '分钟') && name && name.indexOf('当前') > -1) {
    time = new Date(nd.setSeconds(0, 0, 0, 0));
    return [toStringTime(time), data]
  } else if ((selectday === '小时' || selectday.name === '小时') && name && name.indexOf('当前') > -1) {
    time = new Date(nd.setMinutes(0, 0, 0, 0));
    return [toStringTime(time), data]
  } else if ((selectday === '天' || selectday.name === '天')  && name && name.indexOf('当前') > -1) {
    time = new Date(nd.setHours(0, 0, 0, 0));
    return [toStringTime(time), data]
  } else if ((selectday === '周' || selectday.name === '周')  && name && name.indexOf('当前') > -1) {
    time = new Date(nowYear, nowMonth, nowDay - nowDayWeek + 1);
    return [toStringTime(time), data]
  } else if ((selectday === '月' || selectday.name === '月')  && name && name.indexOf('当前') > -1) {
    time = new Date(nowYear, nowMonth, 1);
    return [toStringTime(time), data]
  } else if ((selectday === '年' || selectday.name === '年')  && name && name.indexOf('当前') > -1) {
    time = new Date(nowYear, 0, 1);
    return [toStringTime(time), data]
  }
  if (selectday.name === '分钟' && k === '$gte') {
    time = new Date(now - selectDayValue * m)
  } else if (selectday.name === '分钟' && k === '$lte') {
    time = new Date(now + selectDayValue * m);
  } else if (selectday.name === '小时' && k === '$gte') {
    time = new Date(now - selectDayValue * h)
  }else if (selectday.name === '小时' && k === '$lte'){
    time = new Date(now + selectDayValue * h)
  }else if (selectday.name === '天' && k === '$gte') {
    time = new Date(now - selectDayValue * d);
  } else if (selectday.name === '天' && k === '$lte') {
    time = new Date(now + selectDayValue * d);
  } else if (selectday.name === '月' && k === '$gte') {
    time = new Date(new Date().setMonth((new Date().getMonth() - selectDayValue)));
  } else if (selectday.name === '月' && k === '$lte') {
    time = new Date(new Date().setMonth((new Date().getMonth() + selectDayValue)));
  } else if (selectday.name === '年' && k === '$gte') {
    time = new Date(new Date().setYear((new Date().getFullYear() - selectDayValue)));
  } else if (selectday.name === '年' && k === '$lte') {
    time = new Date(new Date().setYear((new Date().getFullYear() + selectDayValue)));
  } else if (selectday.name === '周' && k === '$gte') {
    time = new Date(now - selectDayValue * 7 * d);
  } else if (selectday.name === '周' && k === '$lte') {
    time = new Date(now + selectDayValue * 7 * d);
  }
  return [toStringTime(time), data]
};
  // 判断时间的合理性
const checkTime = (starttime, endtime) => {
  const nst = new Date(starttime).getTime();
  const net = new Date(endtime).getTime();
  if (starttime === '' && endtime === '') {
    return false;
  }
  if (nst > net) {
    return false;
  }
  return true;
};
const _toDataO = (type, val) => {
  if (type !== 'time') {
    if (!val) {
      return {
        logic: '$or',
        values: [],
      };
    }
  } else if (!val) {
    return {
      logic: '$and',
      values: [],
      name: null,
    };
  }
  let color;
  let name, name0, name1;
  const logic = _.keys(val)[0] || '$and';
  if (_.keys(val).indexOf('color') !== -1) {
    color = val.color;
  }
  if (_.keys(val).indexOf('name0') !== -1) {
    name0 = val.name0 ;
  }
  if (_.keys(val).indexOf('name1') !== -1) {
    name1 = val.name1;
  }
  if (_.keys(val).indexOf('name') !== -1) {
    name = val.name;
  }
  const vals = _.values(val)[0];
  const v0 = vals[0];
  const v1 = vals[1];
  let k;
  let v;
  const values = {};
  if (v0) {
    k = _.keys(v0)[0];
    v = _.values(v0)[0];
    _.set(values, 0, { k, v });
  }
  if (v1) {
    k = _.keys(v1)[0];
    v = _.values(v1)[0];
    _.set(values, 1, { k, v });
  }
  if (color) return { logic, values, name, color };
  if ( name0 && !name1) return { logic, values, name0 };
  if ( !name0 && name1) return { logic, values, name1 }
  if ( name0 && name1) return { logic, values, name0, name1};
  return { logic, values, name };
};
const _toValue = (dataO) => {
  if (!dataO) return null;
  const { logic, values, name, color, name0, name1 } = dataO;
  const v0k = _.get(values, '0.k');
  const v0v = _.get(values, '0.v');
  const v1k = _.get(values, '1.k');
  const v1v = _.get(values, '1.v');
  if (!logic) return null;
  const query = [];
  if (v0k) query.push({ [v0k]: v0v });
  if (v1k) query.push({ [v1k]: v1v });
  if ( name0 || name1) {
    return {
      [logic]: query, 'name0': name0, 'name1': name1
    }
  }
  if (name && color) {
    return { [logic]: query, 'name': name, 'color': color };
  } else if (name && !color) {
    return { [logic]: query, 'name': name, };
  } else if (!name && color){
    return { [logic]: query, 'color': color };
  } else {
    return { [logic]: query };
  }
};

module.exports = { getLastDay, changeDateForm, toStringTime, checkTime, _toDataO, _toValue };
