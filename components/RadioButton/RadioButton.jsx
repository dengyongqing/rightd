/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';

import getStyles from './getStyles';

import UiBase from './../uiBase';
import Utils from './../../lib/utils';


export default class Radio extends UiBase {
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
  onTouchTap = (o) => {
    this.onChange(o);
  }
  _genRadioGroup() {
    const { props, state, context } = this;
    const { data, language, labelFormmat } = props;
    const { value, validate } = data;
    const { options } = validate;
    const styles = getStyles(props, state, context);
    return (
      <RadioButtonGroup 
        name="group"
        style={{...styles.radioGroup}}
        defaultSelected={value.value || ''}
      >
        {
          _.map(options, (o, idx) => {
            return <RadioButton
              className="radio"
              key={idx}
              value={o.value}
              label={labelFormmat ? labelFormmat(o.label) : Utils.getText(o.label, language)}
              style={{...styles.radio}}
              labelStyle={{...styles.label}}
              iconStyle={{...styles.icon}}
              onTouchTap={() => this.onTouchTap(o)}
            />
          })
        }
      </RadioButtonGroup>
    ) 
  }
  _genUI() {
    const { props, state, context } = this;
    const { data } = props;
    const { type } = data;
    const styles = getStyles(props, state, context);
    return (
      <div className="z_radio" style={styles.radioWrap}>
        {this._genRadioGroup()}
      </div>
    );
  }
  render() {
    return super.render();
  }
}
