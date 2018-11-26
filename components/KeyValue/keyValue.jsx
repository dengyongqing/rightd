/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Utils     from './../../lib/utils';
import UiBase from './../uiBase';

import InputBase from './../Input/Base';

import './index.css';

const isNull = d => (d === undefined || d === null);
const isVavid = (d) => {
  if (isNull(d)) return false;
  if (typeof (d) === 'number') return true;
  if (!d.length) return false;
  if ((d[0] === '0' && d[1] !== '.') || d[0] === '.') return false;
  if (d[d.length - 1] === '.') return false;
  return true;
};

export default class KeyValue extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发会滴啊
     */
    onFinishChange: PropTypes.func,
  }
  constructor(props: any) {
    super(props);
    props = this.props;
  }
  componentWillReceiveProps(nextProps) {
    if (!_.isEqual(nextProps.data, this.props.data)) {
      this.setState({
        data: nextProps.data
      })
    }
  }

  onKeyChange = (key) => {
    // const { key } = d;
    if (!isNull(key)) {
      const { value } = this.state.data.value;
      this.onChange({ key, value });
      // this.setState({
      //   data:  {...this.state.data,  showKeyError: false ,  keyError: '' }
      // }, () => {
        
      // });
      
    }
  }

  onValueChange = (value) => {
    // const { value } = d;
    if (!isNull(value)) {
      // value = parseFloat(max, 10);
      const { key } = this.state.data.value;
      this.onChange({ key, value });
      // this.setState({
      //   data: Object.assign({}, this.state.data, { showValueError: false, valueError: ''})
      // }, () => {
        
      // })
      
    }
  }
  _genUI() {
    const { heightPhi } = this.props;
    const { disable, value, addOnAfter } = this.state.data;
    const height = `${this._getDefaultHeight() * heightPhi}px`;
    return (
      <div  className="z_range-container" style={this._getSelectorStyle()}>
        <div className="z_range">
          {/* <Input
            ref={(r) => { this.delayInput = r; }}
            key="key"
            isActive={this.state.isActive}
            isShowDepth
            isShowTitle={false}
            data={{
              uiType: 'input',
              valueType: 'string',
              value: value.key || '',
              key: 'key',
              validate,
              showError: showKeyError,
              errorMessage: keyError
            }}
            onChange={this.onKeyChange}
            heightPhi={0.7}
          /> */}
          <InputBase
            isActive={this.state.isActive}
            value={value.key}
            onChange={this.onKeyChange}
            type={'string'}
            style={{ height }}
            disabled={disable}
          />
          <div className="z_range-spliter" style={{ width: height }} >=</div>
          <InputBase
            isActive={this.state.isActive}
            value={value.value}
            onChange={this.onValueChange}
            type={'string'}
            style={{ height }}
            disabled={disable}
          />
          {/* <Input
            ref={(r) => { this.delayInput = r; }}
            key="value"
            isActive={this.state.isActive}
            isShowDepth
            isShowTitle={false}
            data={{
              uiType: 'input',
              valueType: 'string',
              value: value.value || '',
              key: 'value',
              validate,
              showError: showValueError,
              errorMessage: valueError
            }}
            onChange={this.onValueChange}
            heightPhi={0.7}
          /> */}
        </div>
        { addOnAfter || null}
       
      </div>
    );
  }
  render() {
    return super.render();
  }
}
