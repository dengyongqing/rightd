/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Checkbox from 'material-ui/Checkbox';
// import CheckBoxOutlineBlankIcon from "material-ui/svg-icons/toggle/check-box-outline-blank";
// import CheckBoxIcon from "material-ui/svg-icons/toggle/check-box";

import getStyles from './getStyle';

import UiBase from './../uiBase';
import Utils from './../../lib/utils';


export default class checkbox extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调函数
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调
     */
    onFinishChange: PropTypes.func,
  }
  constructor(props: any) {
    super(props);
  }
  _genUI() {
    const { props, state } = this;
    const { data, language, labelFormmat } = props;
    const { value, label, labelStyle = {}, disabled, iconStyle = {} } = data;
    const styles = getStyles(props, state, this.context);
    return (
      <Checkbox
        className="checkBox"
        label={labelFormmat ? labelFormmat(label) : Utils.getText(label, language)}
        style={styles.box}
        disabled={disabled}
        labelStyle={{...styles.label, ...labelStyle}}
        iconStyle={{ ...styles.icon, ...iconStyle }}
        checked={value}
        onCheck={this.onChange}
      />
    );
  }
  render() {
    return super.render();
  }
}
