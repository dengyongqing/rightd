/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-15 12:00:37
*/

const toFixed = (num, digit) => {
  if (!digit) return num;
  if (num === 0) return '0';
  const n = Math.pow(10, digit);
  return Math.floor(num * n) / n;
	// return num.toFixed(digit);
};
// 10001 => 1.00万
const numberFormater = (num, digit = 2, unit = '') => {
  if (typeof (num) === 'string') {
    num = parseFloat(num, 10);
    if (isNaN(num) || num === undefined || num === null) return '';
  }
  if (num < 10000) return toFixed(num, digit) + unit;
  if (num < 10000 * 10000) return `${toFixed(num / 10000, digit)} 万${unit}`;
  return `${toFixed(num / 100000000, digit)} 亿${unit}`;
};

module.exports = { numberFormater };
