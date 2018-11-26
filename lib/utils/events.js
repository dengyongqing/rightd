/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-15 12:00:37
*/

'use strict';

const onKeydown = (key, fn) => {
	window.addEventListener('keydown', (e) => {
		if(e.key === key) return fn();
	});
};

module.exports = {onKeydown};
