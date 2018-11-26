/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import { ChromePicker } from 'react-color';
import Utils from './../../../../lib/utils';
import getStyles from './getStyles';
import './index.css';

// import Popover from 'material-ui/Popover';
// import { emphasize, decomposeColor, fade } from 'material-ui/utils/colorManipulator';
// import * as d3color from 'd3-color';


// import Utils from './../../../lib/utils';

export default class DetailPicker extends Component {
  static propTypes = {
  }
  static defaultProps = {
    anchorEl: null,
    type: 'detail',
  }
  constructor(props: any) {
    super(props);
    this.state = {
      storage: [],
    };
  }
  
  onChange = (c) => {

    c = this._getColor(c);
    const RencentColor = {
      color: c,
      useTime: new Date().getTime(),
    };
    const filter = _.filter(this.state.storage, o => o.color === c);
    const locals = JSON.parse(window.localStorage.getItem('colors'));
    let storage = locals && locals.length !== 0 ? [...this.state.storage, RencentColor].concat(locals) : [...this.state.storage, RencentColor];
    storage = _.uniqBy(storage, 'color');

    if (filter.length === 0) {
      this.setState({
        storage,
      }, () => {
        if (this.props.onChange) this.props.onChange(c, this.state.storage);
      });
    } else if (this.props.onChange) this.props.onChange(c);

    // if (this.props.onChange) this.props.onChange(c);
  }
  _getColor(c) {
    const { colorType = 'rgba' } = this.props;
    if (colorType.indexOf('rgb') !== -1) {
      return `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a || c.opacity || 0})`;
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

  render() {
    const styles = getStyles(this.props, this.state, this.context);
    const { anchorEl, color } = this.props;
    if (anchorEl) {
      return (
        <ChromePicker
          className="main"
          color={color}
          onChange={c => this.onChange(c.rgb)}
        />
      );
    }
    return null;
  }
}

