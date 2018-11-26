/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ToggleM from 'material-ui/Toggle';

import './index.css';
import Utils from './../../lib/utils';
import UiBase from './../uiBase';

export default class Toggle extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data:          PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调函数
     */
    onChange:       PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调
     */
    onFinishChange: PropTypes.func
  }
  constructor(props: any) {
    super(props);
  }
  _genUI(){
    let   {onChange, onFinishChange, data} = this.props;
    const {id, name, key, value} = data;
    return (
      <ToggleM 
        defaultToggled={value}
        style={{}}
        onToggle={this.onChange}
      />
    );
  }
  render(){
    return super.render();
  }
}
