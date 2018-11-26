/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import zscale from 'zscale';
import _ from 'lodash';
import Popover from 'material-ui/Popover';
// import Slider from 'material-ui/Slider';
import Utils from './../../../lib/utils';
import './../../Color/index.css';
import Slider from './Slider';

export default class ColorLine extends Component {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     * 设置组件的高度
     */
    height: PropTypes.number,
    /**
     * 设置组件的宽度
     */
    width: PropTypes.number,
    /**
     * 当鼠标移到颜色框时触发回调
     */
    onGridMouseOver: PropTypes.func,
    /**
     * 当鼠标离开颜色框时触发回调
     */
    onGridMouseOut: PropTypes.func,
    /**
     * 当value改变时触发回调函数
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失焦时触发
     */
    onFinishChange: PropTypes.func,
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isGridActive: false,
      open: false,
      selectedArr: [],
      values: [],
    };
  }
  componentDidMount() {
    const { data } = this.props;
    const { domain } = data;
    this.setState({
      minDomain: _.min(domain),
      maxDomain: _.max(domain),
    });
  }
  _getColorPicker = () => {
    const state = this.state;
    const bol = state.displayColorPicker;
    if (bol) {
      return (
        <div className="z_color-popover">
          <div className="z_color-cover" onClick={this.handleClose} />
          <ChromePicker color={state.data.value} onChange={this.handleChange} />
        </div>
      );
    }
    return null;
  }

  getStyle = () => {
    const container = this.refs.main;
    let width = '';
    let height = '';
    if (container) {
      width = container.offsetWidth || 300;
      height = container.offsetHeight || 100;
    }
    const { data } = this.props;
    const { domain, range } = data;
    const { minDomain, maxDomain } = this.state;
    const delta = maxDomain - minDomain;
    let back = '';
    let percent = '';
    domain && _.sortBy(domain).map((d, i) => {
      const symbol = i === domain.length - 1 ? '%' : '%,';
      percent = percent +  range[i] + ' ' + (d - minDomain) / delta * 100 + symbol;
    })
    back = `-webkit-linear-gradient(left, ${percent})`;
    return back;
  }
  ColorGridClick = (e, d, i, key) => {
    const { domain } = this.props.data;
    if (this.props.handleGridClick) {
      const { selectedArr } = this.state;
      if (selectedArr.indexOf(i) > -1) {
        selectedArr.splice(selectedArr.indexOf(i), 1);
        this.setState({ selectedArr });
      } else {
        this.setState({
          selectedArr: [...this.state.selectedArr, i],
        });
      }
      this.props.handleGridClick(e, d, i);
    }
  }
  _genColorGrid(data, key) {
    const { selectedArr } = this.state;
    return this._getColorList(data).map((d, i) => {
      const { text, color } = d;
      return (
        <div
          className="z_color-line-grid z_color-line-grid-gradient"
          style={selectedArr.indexOf(i) > -1 ? { border: '1px solid #fff', background: color, display: 'block' } : { background: color, display: 'block' }}
          key={i}
          ref="grid"
          onClick={e => this.ColorGridClick(e, d, i, key)}
        />
      );
    });
  }

  onBgClick = () => {
    this._shrink();
  }
  _shrink() {
    this.setState({
      open: false,
    });
  }
  handleSelect = () => {
    this.setState({
      open: !this.state.open,
    });
  }
  onSliderChange = (value, index) => {
    if (this.props.onChange) {
      this.props.onChange(value, index);
    }
  }
  onDelete = (index) => {
    if(this.props.onDelete) {
      this.props.onDelete(index);
    }
  }
  _genSlider = () => {
    const { data, index } = this.props;
    const { domain, range } = data;
    const delta = this.state.maxDomain - this.state.minDomain;
    // console.log(delta, this.state.minDomain);
    const values = [];
    domain && domain.map((d, i) => {
      // values.push((d - this.state.minDomain) / delta);
      values.push(d);
    });
    return (
      <div style={{ width: '100%' }}>
        <Slider
          color={'#f00'}
          value={this.state.values && this.state.values.length > 0 ? this.state.values : values}
          handleDelete={this.onDelete}
          onChange={this.onSliderChange}
        />
      </div>
    );
  }
  render() {
    const { data, height, width, isShowSlider } = this.props;
    const style = this.getStyle();
    return (
      <div>
        <div
          className="z_gradient-picker"
          style={{ width: '100%', height: '12px', borderRadius: '2px', background: style }}
          ref="main"
        >
          { isShowSlider && this._genSlider(data) }
        </div>
      </div>
    );
  }
}
