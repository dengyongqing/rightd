/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/


import PropTypes from 'prop-types';
import React from 'react';
import _ from 'lodash';
// import * as d3color from 'd3-color';
import Swatch from './../subcoms/ColorSwatch';
import './index.css';
import UiBase from './../uiBase';
import ColorPicker from '../subcoms/ColorPicker';

const defaultStyle = {
  color: '#f00',
};

export default class Color extends UiBase {
  static propTypes = {
    /**
     * 组件的相关配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     * 当value发生改变时回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失焦时触发
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置颜色的种类，rgb,rgba...
     */
    colorType: PropTypes.string,
  }
  constructor(props: any) {
    super(props);
    this.state = {
      displayColorPicker: false,
      displayColorGridPicker: false,
      color: defaultStyle.color,
    };
  }
  onClick = () => this.setState({ displayColorPicker: !this.state.displayColorPicker });
  handleClose = () => this.setState({ displayColorPicker: false });
  handleChange = (color) => {
    const data = { ...this.state.data, value: color };
    this.setState({ data });
    this.onChange(color);
  }
  onChange = (value) => {
    const d = this._getDataObject(value);
    if (this.props.onChange) this.props.onChange(d);
  }
  _genUI() {
    const { heightPhi } = this.props;
    const height = `${this._getDefaultHeight() * heightPhi}px`;
    const { displayColorPicker, data } = this.state;
    const { value, isShowAlpha=true } = data;
    const anchorEl = _.get(this.refs, 'swatch.refs.anchorEl');
    return (
      <div className="z_color-picker" style={this._getSelectorStyle()}>
         <Swatch
          height={height}
          color={value}
          onClick={this.onClick}
          ref="swatch"
        />
        <ColorPicker
          language={this.props.language}
          isActive={displayColorPicker}
          isShowAlpha={isShowAlpha}
          onChange={this.handleChange}
          handleClose={this.handleClose}
          anchorEl={anchorEl}
          color={value}
        />
      </div>
    );
  }
  render() {
    return super.render();
  }
}

