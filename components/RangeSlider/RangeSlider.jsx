/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Utils     from './../../lib/utils';
import UiBase    from './../uiBase';

import InputBase from './../Input/Base';

import styles from './index.css';

const isNull = d => (d === undefined || d === null);
const isVavid = d => {
  if(isNull(d)) return false;
  if(typeof(d) === 'number') return true;
  if(!d.length) return false;
  if((d[0] === '0' && d[1] !== '.') || d[0] === '.') return false;
  if(d[d.length - 1] === '.') return false;
  return true;
};

export default class Range extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data:           PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调
     */
    onChange:       PropTypes.func.isRequired,
    /**
     * 当鼠标离开或提起，触摸结束，输入框失去焦点时触发回调函数
     */
    onFinishChange: PropTypes.func,
  }
  constructor(props: any) {
    super(props)
    props = this.props;
  }
  onMinChange = (min) => {
    if(isVavid(min)){
      const {max} = this.state.data.value;
      this.onChange({min, max});
    }
  }
  onMaxChange = (max) => {
    if(isVavid(max)){
      max = parseFloat(max, 10);
      const {min} = this.state.data.value;
      this.onChange({min, max});
    } 
  }
  _genUI(){
    const {onFinishChange, heightPhi} = this.props;
    const {step, validate, id, name, key, value, valueType, disable} = this.state.data;
    const height = this._getDefaultHeight() * heightPhi + 'px';
    const {min, max} = value;
    return(
      <div className="z_range-container" style={this._getSelectorStyle()}>
        <InputBase
          isActive={this.state.isActive}
          id={`${id}_min`}
          value={min}
          onChange={this.onMinChange}
          type={'float'}
          style={{height}}
          disabled={disable}
        />
        <div className="z_range-spliter" style={{width: height}}/>
          <InputBase
            isActive={this.state.isActive}
            id={`${id}_max`}
            value={max}
            onChange={this.onMaxChange}
            type={'float'}
            style={{height}}
            disabled={disable}
          />
      </div>
    );
  }
  render(){
    return super.render();
  }
}
