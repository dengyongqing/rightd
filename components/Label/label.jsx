/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UiBase from './../uiBase';
import Utils from './../../lib/utils';
import getStyles from './getStyles';

export default class Label extends UiBase {
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
  
  _genUI() {
    const { heightPhi, language, labelFormmat } = this.props;
    const {  value } = this.state.data;
    const height = `${this._getDefaultHeight() * heightPhi}px`;
    const styles = getStyles(this.props, this.state, this.context, height);
    return (
      <div
        style={{ position: 'relative', ...styles.wrapper, ...this._getSelectorStyle(), height }}
      >
        { labelFormmat ? labelFormmat(value) : Utils.getText(value, this.props.language)}
      </div>
    );
  }
  render() {
    return super.render();
  }
}
