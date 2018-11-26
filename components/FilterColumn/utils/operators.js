// 默认
const none = { name: '无', id: null };
// Numberic
const operatorsNuberic = [
  { name: '大于', id: '$gt' },
  { name: '大于等于', id: '$gte' },
  { name: '小于', id: '$lt' },
  { name: '小于等于', id: '$lte' },
  { name: '等于', id: '$eq' },
  { name: '不等于', id: '$ne' },
  none,
];
// Category
// const operatorsCategory = [
//   { name: '等于', id: '$eq' },
//   { name: '不等于', id: '$ne' },
//   { name: '包含于', id: '$in' },
//   { name: '不包含', id: '$notIn' },
//   { name: '含有', id: '$like' },
//   none,
// ];
const operatorsCategory = [
  { name: '等于', id: '$in' },
  { name: '不等于', id: '$notIn' },
  { name: '等于(自定义)', id: '$eq' },
  { name: '不等于(自定义)', id: '$ne' },
  { name: '包含', id: '$like' },
  { name: '不包含', id: '$notLike' },
  // { name: '为空', id: '$eqnull'},
  // { name: '非空', id: '$neqnull'},
  none,
];
// Time
const operatorsTime = [
  { name: '过去', id: '$gte' },
  { name: '当前', id: '$eql' },
  { name: '未来', id: '$lte' },
];
const operatorsDays = [
  { name: '分钟', id: '$minute' },
  { name: '小时', id: '$hour' },
  { name: '天', id: '$day' },
  { name: '周', id: '$week' },
  { name: '月', id: '$month' },
  { name: '年', id: '$year' },
];
const operatorsTime1 = [
  { name: '等于', id: '$equal' },
  { name: '不等于', id: '$notEq' },
  { name: '为空', id: '$null' },
  { name: '不为空', id: '$notNull' },
  none,
];

module.exports = { none, operatorsNuberic, operatorsCategory, operatorsTime, operatorsTime1, operatorsDays };
