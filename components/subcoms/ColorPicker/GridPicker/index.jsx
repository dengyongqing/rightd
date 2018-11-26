/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import * as d3color from 'd3-color';
import { ChromePicker } from 'react-color';
import Utils from './../../../../lib/utils';
import getStyles from './getStyles';
import AlphaSlider from './AlphaSlider';
import { emphasize, decomposeColor, fade } from 'material-ui/utils/colorManipulator';
import './index.css';

const COLRS0 = Utils.colorArr1;
const COlORS = Utils.getColorArray();
// import Utils from './../../../lib/utils';

export default class ColorPicker extends Component {
  static propTypes = {
  }
  static defaultProps = {
    type: 'detail',
    isActive: false,
    anchorEl: null,
    isShowAlpha: true,
    language: 'zh'
  }
  constructor(props: any) {
    super(props);

    this.state = {
      alpha: 1,
      storage: [],
    };
  }
  onGridMouseOver = c => this.setState({ gridid: c });
  onGridMouseOut = () => this.setState({ gridid: null });
  onAlphaSliderChange = (alpha) => {
    const color = fade(this.props.color, alpha);
    this.state.alpha = alpha;
    this.setState({ alpha });
    this.onChange(color);
  }
  _getAlpha() {
    const { color } = this.props;
    const rgba = decomposeColor(color);
    return _.get(rgba, 'values.3') || this.state.alpha;
  }
  _genAlpha() {
    const { styles } = this;
    const { color } = this.props;
    const alpha = this._getAlpha();
    return (
      <div style={styles.alpha}>
        <AlphaSlider
          color={color}
          value={alpha}
          onChange={this.onAlphaSliderChange}
        />
      </div>
    );
  }
  _genRecentColor = () => {
    let colors = JSON.parse(window.localStorage.getItem('colors'));
    colors = _.uniqBy(colors, 'color');
    colors = _.orderBy(colors, 'useTime', ['desc']);
    if (!colors || colors.length === 0) return;
    return (
      <div>
        <div style={{ fontSize: '12px', margin: '10px 0px' }}>{Utils.getText('最近使用', this.props.language)}</div>
        { this._genRencentGrid(colors.slice(0, 10))}
      </div>
    );
  }
  _genRencentGrid = (arr) => {
    const { styles } = this;
    return (
      <div style={styles.recent_line} >
        { _.map(arr, cs => this._genColorGridPickerGrid(cs.color)) }
      </div>
    );
  }
  _genGridPickerLine0 = (arr, i) => {
    const { styles } = this;
    return (
      <div style={styles.recent_line} key={i}>
        { _.map(arr, cs => this._genColorGridPickerGrid(cs, 'line0')) }
      </div>
    );
  }
  _genGridPickerLine = (arr, i) => {
    const { styles } = this;
    return (
      <div style={styles.line} key={i}>
        { _.map(arr, cs => this._genColorGridPickerGrid(cs, 'multipLine')) }
      </div>
    );
  }
  _getColor(c) {
    return fade(c, this.state.alpha);
  }
  onGridClick = (c) => {
    if (c === 'rgba(255, 255, 255, 0)') {
      this.setState({
        alpha: 0
      }, () => {
        c = this._getColor(c);
      });
    } else {
      this.setState({
        alpha: this.state.alpha || 1
      }, () => {
        c = this._getColor(c);
      });
    }
    
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
  }
  onChange = (c, s) => {
    c = this._getColor(c);
    if (this.props.onChange) this.props.onChange(c, s);
  };
  _genColorGridPickerGrid(c, type='') {
    // const cc = d3color.color(c);
    const marginStyle = type ===  'line0' ? {
      marginBottom: '10px',
      marginRight: '4px'
    } : { marginRight : '4px'};
    const isHover = c === this.state.gridid;
    const border = isHover ? `solid 2px ${emphasize(c, 1)}` : c === '#FFFFFF' || c === 'rgba(255, 255, 255, 0)' ? 
      `solid 1px #00143c33` : null;
    const zIndex = isHover ? 1 : 0;
    const { styles } = this;
    return (
      <div
        key={c}
        className={ c === 'rgba(255, 255, 255, 0)' ? 'grid_color' : ''}
        style={{ ...styles.grid, backgroundColor: c, border, zIndex, ...marginStyle }}
        onMouseOut={() => this.onGridMouseOut(c)}
        onMouseOver={() => this.onGridMouseOver(c)}
        onClick={() => this.onGridClick(c)}
      />
    );
  }
  _updateStyles() {
    this.styles = getStyles(this.props, this.state, this.context);
  }
  componentWillUpdate() {
    this._updateStyles();
  }
  componentWillMount() {
    this._updateStyles();
  }
  render() {
    const { anchorEl, isShowAlpha } = this.props;
    const styles = getStyles(this.props, this.state, this.context);
    if (anchorEl) {
      return (
        <div
          style={styles.colorGrid}
        >
          <div style={{ fontSize: '12px', padding: '10px 0px 10px 0px' }}>{Utils.getText('常用色板', this.props.language)}</div>
          {_.map(COLRS0, this._genGridPickerLine0)}
          {_.map(COlORS, this._genGridPickerLine)}
          { isShowAlpha && this._genAlpha()}
          {this._genRecentColor()}
        </div>
      );
    }
    return null;
  }
}

