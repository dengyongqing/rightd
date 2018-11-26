/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-15 12:00:37
*/

import _ from 'lodash';
import * as colors from 'material-ui/styles/colors';
const colorArr = ['red', 'deepOrange', 'orange', 'lightGreen', 'green', 'teal', 'blue', 'indigo', 'purple', 'pink'];
// const colorArr = ['red', 'pink', 'purple','brown', 'blueGrey', 'grey','green', 'blue',' yellow' ]
// const order = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const order = [50, 100, 300, 400];
const colorArr1 = [
  ['rgba(255, 255, 255, 0)', '#FFFFFF', '#F5F5F5', '#E0E0E0', '#BDBDBD', '#9E9E9E', '#757575', '#616161', '#424242', '#000000'],
  ['#FC5551', '#FF9626', '#FFD447', '#A5D971', '#66BB6A', '#01B8AA', '#03ADF3 ', '#5362BC', '#9132AA', '#E91E63']
]
function getColorArray(){
  const arr = [];
  _.forEach(colorArr, (before) => {
    const cs = [];
    _.forEach(order, (after) => {
      const name = `${before}${after}`;
      const color = colors[name];
      cs.push(color);
    });
    arr.push(cs);
  });
  return arr;
}

module.exports = { getColorArray, colorArr1 };
