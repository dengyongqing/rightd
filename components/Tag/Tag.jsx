/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './index.css';
import Utils from './../../lib/utils';
import UiBase from './../uiBase';

// 基本类型
import Slider from './../Slider';
import Toggle from './../Toggle';
import CheckBox from './../Checkbox';
import RadioButton from './../RadioButton';
import Input from './../Input';
import InputCode from './../Input/inputCode';
import InputCompact from './../Input/inputCompact';
import InputSearch from './../Input/inputSearch';
import Color from './../Color';
import ColorArray from './../ColorArray';
import Group from './../Group';
import Select from './../Select';
import Time from './../Time';
import Label from './../Label';



// 复合类型
import Range from './../Range';
import RangeSlider from './../RangeSlider';
import RangeTime from './../RangeTime';
import RangeDate from './../RangeDate';
import Gradient from './../Gradient';
import MultiSelect from './../MultiSelect';
import MultiSelectTags from './../MultiSelectTags';
import Binding from './../Binding';
import Switch from './../Switch';
import KeyValue from './../KeyValue';

// 更复杂类型
import FilterColumn from './../FilterColumn';
import FilterRow from './../FilterRow';


const all = {
  // 基本类型
  slider: Slider,
  color: Color,
  input: Input,
  group: Group,
  select: Select,
  checkBox: CheckBox,
  radioButton: RadioButton,
  toggle: Toggle,
  rangeSlider: RangeSlider,
  time: Time,
  inputCode: InputCode,
  inputSearch: InputSearch,
  inputCompact: InputCompact,
  label: Label,
  // 复合类型
  range: Range,
  rangeTime: RangeTime,
  rangeDate: RangeDate,
  gradient: Gradient,
  multiSelect: MultiSelect,
  multiSelectTags: MultiSelectTags,
  binding: Binding,
  switch: Switch,
  colorArray: ColorArray,
  keyValue: KeyValue,
  // 更复合类型
  filterColumn: FilterColumn,
  filterRow: FilterRow,
};

const getCom = type => all[type];

export default class Tag extends UiBase {
  static propTypes = {
    /**
     *  组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     *  当value发生改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发
     */
    onFinishChange: PropTypes.func,

  }
  constructor(props: any) {
    super(props);
  }
  onUITypeChange = (data, isOpenEditor) => {
    this.setState({ data, isOpenEditor });
  }
  render() {
    const { state } = this;
    if (!state.data) return null;
    const { uiType } = state.data;
    let TagUI = getCom(uiType);
    const { hoc, hocParmas } = state.data;
    if (hoc) {
      TagUI = hoc(TagUI, hocParmas);
    }
    if (!TagUI) return console.log(`组件类型为${uiType}的没找到...`);
    return (
      <TagUI
        onUITypeChange={this.onUITypeChange}
        {...this.props}
        data={this.state.data}
        isOpenEditor={this.state.isOpenEditor}
      />
    );
  }
}
