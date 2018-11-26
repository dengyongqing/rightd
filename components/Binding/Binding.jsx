/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UiBase from './../uiBase';
import Block from './../Block';
import Gradient from './../Gradient';
import Select from './../Select';
import Toggle from './../Toggle';
import Range from './../Range';
import TextField from 'material-ui/TextField';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import zscale from 'zscale';
import dataTypes from './../../meta/dataTypes';
import { emphasize } from 'material-ui/utils/colorManipulator';
import Popover from 'material-ui/Popover';
import { ChromePicker } from 'react-color';
import Utils from './../../lib/utils';

const binding = dataTypes.binding;

const { floor } = Math;

const defaultProps = {
  meadianRange: [0.05, 0.95],
};
const defaultStyle = {
  // color: 'transparent',
  color: '#f00'
};

const isNull = d => (d === undefined || d === null);
const isVavid = (d) => {
  if (isNull(d)) return false;
  if (typeof (d) === 'number') return true;
  if (!d.length) return false;
  if ((d[0] === '0' && d[1] !== '.') || d[0] === '.') return false;
  if (d[d.length - 1] === '.') return false;
  return true;
};


export function getStyles(props, state, context, depth1) {
  const { palette } = context.muiTheme;
  const { textColor, borderColor, primary1Color, alternateTextColor } = palette;
  const { depth } = props;
  const depthGrow = props.isShowDepth ? props.depthGrow || 0.2 : 0;
  return {
    depth: {
      flexGrow: depthGrow * (depth1 || depth) || 0,
      minWidth: '6px',
    },
    radioButtonGroup: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    captial: {
      padding: '0 6px',
      width: 60,
      fontSize: 12,
      color: '#4A4A4A',
    },
    anim: {
      width: '100%',
    },
    orAndSpace: {
      width: '20px',
    },

    inputStyle: {
      alignItems: 'center',
    },
    lineName: {
      color: emphasize(textColor, 0.4),
    },
    select: {
      width: '100%',
      maxWidth: '100%',
    },
  };
}

export default class Binding extends UiBase {
  // static name = '绑定'
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
  }
  constructor(props: any) {
    super(props);
    this.state = {
      data: this.props.data,
      displayColorPicker: false,
      color: defaultStyle.color,
      floatTagText: '',
      pickerKey: 'min',
      offsetX: 0,
      errorMinText: null,
      errorMaxText: null,
    };
  }
  _updateDomain() {
    const { value } = this.state.data;
    let ds = this.props.dataSource || value.data;
    const key = value.key.value;
    const isExist = d => d[key] !== undefined && d[key] !== null;
    const defaultDomain = [0, 1];
    if (!ds || !ds.length) {
      value.domain = value.domain || defaultDomain;
    } else if (value.isLock) {
      ds = ds.filter(isExist);
      ds = _.sortBy(ds, d => d[key]);
      if (!ds || !ds.length) return defaultDomain;
      const { meadianRange } = defaultProps;
      const dsLength = ds.length;
      const minIndex = floor(_.min(meadianRange) * dsLength);
      const maxIndex = floor(_.max(meadianRange) * dsLength);
      const min = ds[minIndex][key];
      const max = ds[maxIndex][key];
      value.domain = [ Math.min(min, max), Math.max(min, max)];
    }
  }
  onKeyChange = (d) => {
    _.set(this.state.data, 'value.key.value', d.key);
    this.onBindingChange();
  }
  onLockChange = (d) => {
    _.set(this.state.data, 'value.isLock', d.isLock);
    this._updateDomain();
    this.onBindingChange();
  }
  onDomainChange = (d) => {
    if (d === undefined || d === null) return;
    _.set(this.state.data, 'value.domain', d.domain);
    this.onBindingChange();
  }
  handleColor = (d) => {
    _.set(this.state.data, 'value.range', d.range);
    _.set(this.state.data, 'value.domain', d.domain);
    this.onBindingChange();
  }
  onRangeChange = (d) => {
    let value;
    if (d && d.value) value = d.value;
    _.set(this.state.data, 'value.range', value.range || value);
    this.onBindingChange();
  }
  valueChange = (d) => {
    const { value } = d;
    const { domain, range } = value;
    // console.log(domain, range);
    _.set(this.state.data, 'value.domain', domain);
    _.set(this.state.data, 'value.range', range);
    this.onBindingChange();
  }
  onBindingChange() {
    this.onChange(this.state.data.value);
  }
  _genDepthDiv() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      this.props.isShowDepth ? <div className="z_control-depth-space" style={styles.depth} /> : null
    );
  }
  _getContainerStyle() {
    const style = _.cloneDeep(this.props.style);
    const { alternateTextColor } = this.context.muiTheme.palette;
    return { ...style, height: 'auto', backgroundColor: alternateTextColor };
  }
  _genName() {
    const { props, state } = this;
    const styles = getStyles(this.props, this.state, this.context);
    const height = this._getItemHeight();
    const { name } = props.data;
    return (
      <div className="z_filter_wrapper">
        <div
          className="z_line-name-wrapper"
          style={{ height }}
        >
          {/* {this._genDepthDiv(0)} */}
          <div className="z_line-name" style={styles.lineName}>{name}</div>
          <div
            style={styles.iconWrapper}
          />
        </div>
      </div>
    );
  }
  onSelectGridClick = (e, k) => {
    this.setState({
      pickerKey: k,
      displayColorPicker: true,
      anchorEl: e.target,
    });
  }
  _getColor(c) {
    const colorType = this.props.colorType || 'rgba';
    if (colorType.indexOf('rgb') !== -1) {
      const { rgb } = c;
      return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
    } else if (colorType.indexOf('hsl') !== -1) {
      const hsl = c.hsl;
      const s = `${Math.floor(hsl.s * 100)}%`;
      const l = `${Math.floor(hsl.l * 100)}%`;
      return `hsla(${hsl.h}, ${s}, ${l}, ${hsl.a})`;
    } else if (colorType === 'hex') {
      return c.hex;
    }
    return c.hex;
  }
  onPickerClose = () => {
    this.setState({
      displayColorPicker: false,
    });
  }
  _genSelectGrid(c, key) {
    const style = {
      // background: c,
      border: '1px solid rgba(150, 150, 150, 0.2)',
      borderRadius: '2px',
      boxSizing: 'border-box',
      width: 38,
      height: 24,
      margin: '0 6px 0 20px',
    };
    return (
      <div
        className="z_select-color"
        style={style}
        onClick={e => this.onSelectGridClick(e.nativeEvent, key)}
      >
        <div style={{ width: 16, height: 16, backgroundColor: c }} />
        <OpenIcon
          style={{ width: 16, height: 16 }}
        />
      </div>
    );
  }
  render() {
    this._updateDomain();
    const styles = getStyles(this.props, this.state, this.context);
    const { value } = this.state.data;
    const { heightPhi } = this.props;
    const height = `${this._getDefaultHeight() * heightPhi}px`;
    const { key } = value;
    const domain = {
      name: Utils.getText('取值范围', this.props.language),
      key: 'range',
      value: value.domain,
      disable: value.isLock,
    };
    const { type } = value;
    const Tag = type === 'gradient' ? Gradient : Range;
    let range;
    if (type === 'gradient') {
      range = {
        key: type,
        value: {
          domain: value.domain,
          range: value.range,
        },
      };
    } else {
      range = {
        name: Utils.getText('大小映射', this.props.language),
        key: type,
        value: value.range,
      };
    }
    return (
      <div
        className="z_control-container z_control-container-direction"
        style={Object.assign({}, this._getContainerStyle())}
        ref="mainContainer"
      >
        {this._genName()}
        <div style={{ width: '100%', height: '100%' }}>
          { !range.value.domain && <Range height={this.props.height} isShowDepth data={domain} onChange={this.onDomainChange} editable={false} />}
          <Tag 
            height={this.props.height} 
            data={range} isShowDepth 
            domainChange={this.onDomainChange} 
            valueChange={this.valueChange} 
            changeColor={this.handleColor} 
            rangeChange={this.onRangeChange} 
            editable={false} 
            language={this.props.language}
          />
          {/* { range.value.domain ?
            <div>
              <div className="z_select_wrapper" style={styles.select}>
                <div style={styles.captial}>映射最小值</div>
                <TextField type="number" errorText={this.state.errorMinText} style={{ flex: 1 }} name="text" onChange={(e, v) => this.onMinChange(e, v)} defaultValue={_.min(domain.value)} />
              </div>
              <div className="z_select_wrapper" style={styles.select}>
                <div style={styles.captial}>映射最大值</div>
                <TextField type="number" errorText={this.state.errorMaxText} style={{ flex: 1 }} name="text" defaultValue={_.max(domain.value)} onChange={(e, v) => this.onMaxChange(e, v)} />
              </div>
            </div>
            : null
          } */}
        </div>
        {/* {this._genColorPicker()} */}
      </div>


    );
  }
}

