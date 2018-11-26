/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ChromePicker } from 'react-color';

import UiBase from './../uiBase';
import './../Color/index.css';
import './index.css';
import ColorLine from './ColorLine';
import FloatTag from './../subcoms/FloatTag';
import ColorPicker from './../subcoms/ColorPicker';
import Popover from 'material-ui/Popover';

const defaultStyle = {
  // color: 'transparent',
  color: '#f00'
};

export default class Gradient extends UiBase {
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
     * 当鼠标提起或离开，触摸结束，输入框失焦时触发
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置颜色的种类，如rbga,rgb...
     */
    colorType: PropTypes.string,
  }
  constructor(props: any) {
    super(props);
    this.state = {
      floatTagStyle: { left: 0, top: 0 },
      isFloatTagActive: false,
      displayColorPicker: false,
      color: defaultStyle.color,
      floatTagText: '',
      pickerKey: 'min',
      offsetX: 0,
      minDomain: '',
      maxDomain: '',
      index: 0,
    };
  }
  componentDidMount() {
    const { data } = this.props;
    const { value } = data;
    const domain = value.domain;
    this.setState({
      minDomain: _.min(domain),
      maxDomain: _.max(domain)
    })
    
  }
  _genColorPicker = () => {
    const { pickerKey, data, displayColorPicker, offsetX, color } = this.state;
    const value = data.value.value || data.value;
    const { anchorEl } = this.state;
    if (displayColorPicker && anchorEl) {
      return (
        <ColorPicker
          isActive={displayColorPicker}
          language={this.props.language}
          onGradientChange={this.onGradientChange}
          onDelete={this.onDelete}
          onReverse={this.onReverseColor}
          onColorPickerChange={this.onPickerChange}
          handleClose={this.onPickerClose}
          anchorEl={anchorEl}
          data={value}
          color={color}
        />
      );
    }
    return null;
  }
  onReverseColor = (data) => {
    this.props.changeColor(data);
  }
  onDelete = (index) => {
    const { data, originRange } = this.state;
    const value = data.value.value || data.value;
    let { domain, range } = value;
    if(index || index === 0){
      if(domain.length <=2 ) return;
      domain.splice(index, 1);
      if(index < range.length ) {
        originRange.splice(index, 1);
        range = originRange;
      }
      if(this.props.valueChange) {
        this.props.valueChange(this.state.data)
      }
    }
  }
  onGradientChange = (v, index) => {
    const { data } = this.state;
    const value = data.value.value || data.value;
    let { domain, range } = value;
    if(!v) {
      const value = domain[index];
      const idx = _.findIndex(_.sortBy(domain), d => d === value)
      this.setState({ index: idx });
      return;
    }
    if(!index && index !== 0) index = domain.length;
    domain[index] = v;
    // 未排序之前新增元素的index
    const originIndex = _.findIndex(domain, d => d === v);
    // 排序后新增元素的index
    const newIndex = _.findIndex(_.sortBy(domain), d => d === v);
    this.setState({ 
      data,
      index: newIndex,
      originIndex });
    if(this.props.domainChange) {
      this.props.domainChange(value);
    }
  }
  onPickerChange = (c) => {
    const { data, index, originIndex } = this.state;
    const value = data.value.value || data.value;
    const { domain, range } = value;
    let originRange = _.cloneDeep(range);
    if((index || index === 0)  && range.indexOf(c) === -1) {
      // 在index处插入
      if(originIndex >= range.length) {
        originRange[originIndex] = c;
        this.setState({ originRange });
        range.splice(index, 0, c);
      }else{
        // 替换元素
        range[index] = c;
      } 
    }
    this.setState({ data, color: c });
    if(this.props.rangeChange) {
      this.props.rangeChange(this.state.data);
    }
  }
  onPickerClose = () => {
    this.setState({
      displayColorPicker: false,
    });
  }
  handerClick = () => {
    if(this.refs.anchorEl) {
      this.setState({
        anchorEl: this.refs.anchorEl,
        displayColorPicker: true
      })
    }
  }
  _genUI() {
    const value = this.state.data.value;
    const { heightPhi } = this.props;
    const { isFloatTagActive, floatTagText } = this.state;
    const height = this._getDefaultHeight() * heightPhi;
    return (
      <div
        className="z_color-gradient-container"
        style={{ width: '100%', height, maxWidth: '100%', padding: '0 6px' }}
      >
        <FloatTag
          isActive={isFloatTagActive}
          component={this.state.curHoverNode}
        >
          {floatTagText}
        </FloatTag>
        <div
          ref="anchorEl"
          style={{ width: '100%'}}
          onClick={this.handerClick}
        >
          <ColorLine
            isShowSlider={false}
            data={value}
            height={24}
          />
        </div>
        {this._genColorPicker()}
      </div>
    );
  }
  render() {
    return super.render();
  }
}

