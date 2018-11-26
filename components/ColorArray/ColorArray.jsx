/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import UiBase from './../uiBase';
import { ChromePicker } from 'react-color';
import Utils from './../../lib/utils';
import Popover from 'material-ui/Popover';
import MenuItem from 'material-ui/MenuItem';
import Menu from 'material-ui/Menu';
import { emphasize } from 'material-ui/utils/colorManipulator';
import TouchRipple from 'material-ui/internal/TouchRipple';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import defaultArray from './../../meta/dataTypes/composite/colorArray/defaultArray';


function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  const { textColor, borderColor, primary1Color } = palette;
  return {
    colorGrid: {
      margin: '0',
    },
    hover: {
      border: `1px solid ${'#000'}`,
      opacity: 1,
    },
    rightIcon: {
      color: textColor,
    },
    swatch: {
      border: `solid 1px ${borderColor}`,
    },
    memuItem: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 0,
      padding: 0,
    },
  };
}

export default class ColorArray extends UiBase {
  static defaultProps = {
    isAdvance: true,
  };
  static propTypes = {
    /**
     * 组件的配置数据
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
      color: 'rgba(250, 0, 0, 0.2)',
    };
  }
  onGridClick = (c, i) => {
    const node = this.refs[i];
    this.setState({
      curColorGrid: { c, i, node },
    });
  }
  onGridClose = () => {
    this.setState({
      curColorGrid: null,
    });
  }
  onExpandClick = () => {
    this.setState({ expandMode: true });
  }
  onBgClick = () => {
    this.setState({ expandMode: false, curColorGrid: null });
  }
  onMenuItemClick = (e, d) => {
    const data = this.state;
    data.value = d;
    this.onChange(d);
    this.setState({ expandMode: false, curColorGrid: null });
  }
  handleChange(c, i) {
    const { curColorGrid } = this.state;
    const { value } = this.state.data;
    const color = this._getColor(c);
    value[i] = color;
    this.onChange(value);
    curColorGrid.c = color;
    this.setState({});
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
  _genGrid = (c, i, isHook) => {
    const { curColorGrid } = this.state;
    const style = isHook && curColorGrid && curColorGrid.c === c ? { borderColor: emphasize(c, 0.9) } : {};
    const key = isHook ? i : c;
    return (
      <div
        style={{ ...style, backgroundColor: c }}
        key={key}
        ref={key}
        className="z_color-array-grid"
        onClick={isHook ? d => this.onGridClick(c, i) : null}
      />
    );
  }
  _genColorPicker = () => {
    const { curColorGrid } = this.state;
    if (curColorGrid && curColorGrid.node) {
      return (
        <Popover
          open
          anchorEl={curColorGrid.node}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.onGridClose}
          useLayerForClickAway={false}
        >
          <ChromePicker color={curColorGrid.c} onChange={c => this.handleChange(c.rgb, curColorGrid.i)} />
        </Popover>
      );
    }
    return null;
  }
  _genMenus() {
    const { value, validate = {} } = this.state.data;
    const { options = [] } = validate;
    const newOptions = _.concat(options, defaultArray);
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <Popover
        open={this.state.expandMode}
        anchorEl={this.refs.anchorEl}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
        onRequestClose={this.onBgClick}
        useLayerForClickAway
      >
        <Menu maxHeight={300} style={{ overflowY: null }}>
          {_.map(newOptions, (d, k) => {
            const key = d.join(',');
            return (
              <MenuItem
                key={key}
                value={''}
                primaryText={''}
                onTouchTap={e => this.onMenuItemClick(e, d)}
                style={styles.memuItem}
              >
                {this._genGrids(d, key, false)}
              </MenuItem>
            );
          })}
        </Menu>
      </Popover>
    );
  }
  _genGrids(value, ref, isHook) {
    const height = `${this._getDefaultHeight() * this.props.heightPhi}px`;
    const styles = getStyles(this.props, this.state, this.context);
    const width = this.refs.anchorElGrid ? this.refs.anchorElGrid.offsetWidth : 100;
    return (
      <div
        className="z_color-array-swatch z_color-transparent-image"
        style={Object.assign({}, { height, width }, styles.swatch)}
        ref={ref}
      >
        {_.map(value, (c, i) => this._genGrid(c, i, isHook))}
      </div>
    );
  }
  _genExpandButton() {
    const { heightPhi } = this.props;
    const height = `${this._getDefaultHeight() * heightPhi}px`;
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div
        className="z_color-array-add-containter"
        style={{ height, width: height, maxWidth: height }}
        onClick={this.onExpandClick}
        ref="anchorEl"
      >
        <TouchRipple>
          <OpenIcon style={styles.rightIcon} />
        </TouchRipple>
      </div>
    );
  }
  _genUI() {
    const { value } = this.state.data;
    const styles = getStyles(this.props, this.state, this.context);
    // const borderStyle = this.state.isActive ? styles.hover : {};
    const borderStyle = {};

    return (
      <div className="z_color-picker" style={this._getSelectorStyle()}>
        {this._genGrids(this.state.data.value, 'anchorElGrid', true)}
        {this._genExpandButton()}
        {this._genColorPicker()}
        {this._genMenus()}
      </div>
    );
  }
  render() {
    return super.render();
  }
}

