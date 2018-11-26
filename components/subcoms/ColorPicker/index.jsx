/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Popover from 'material-ui/Popover';
import Utils from './../../../lib/utils';
import getStyles from './getStyles';
import GridPicker from './GridPicker';
import DetailPicker from './DetailPicker';
import GradientPicker from './GradientPicker';

export default class ColorPicker extends Component {
  static propTypes = {
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  static defaultProps = {
    isActive: false,
    anchorEl: null,
    // color: 'rgba(255,0,0,0.1)',
  }
  constructor(props: any) {
    super(props);
    this.state = {
      type: 'grid',
      storage: [],
    };
  }
  handleClose = () => {
    const { storage } = this.state;
    if (storage && storage.length !== 0) {
      window.localStorage.setItem('colors', JSON.stringify(storage));
    }
    if (this.props.handleClose) this.props.handleClose();
  }
  onTabClick = type => this.setState({ type });
  onChange = (v, s) => {
    if (s || v) {
      this.setState({
        storage: s,
        color: v,
      });
    }
    if (this.props.onColorPickerChange) {
      this.props.onColorPickerChange(v);
    }
    if (this.props.onChange) {
      this.props.onChange(v);
    }
  }
  _genTabButton(name, id) {
    const { styles } = this;
    const bStyle = id === this.state.type ? styles.buttonActive : {};
    return (
      <div
        style={{ ...this.styles.button, ...bStyle }}
        onClick={() => this.onTabClick(id)}
      >
        {name}
      </div>
    );
  }
  _genTabs() {
    const { styles } = this;
    return (
      <div style={styles.tabs}>
        {this._genTabButton(Utils.getText('色板', this.props.language), 'grid')}
        {this._genTabButton(Utils.getText('自定义', this.props.language), 'detail')}
      </div>
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
  onGradient = (value, index) => {
    this.props.onGradientChange(value, index);
  }
  handleDelete = (index) => {
    this.props.onDelete(index)
  }
  onReverseColor = (data) => {
    this.props.onReverse(data);
  }
  _genPicker() {
    const { type } = this.state;
    const { anchorEl, data, color, isShowAlpha } = this.props;
    const Picker = type === 'detail' ? DetailPicker : GridPicker;
    const { styles } = this;
    return (
      <div style={styles.editor}>
        { data && <GradientPicker
          data={data}
          anchorEl={anchorEl}
          onChange={this.onGradient}
          handleDelete={this.handleDelete}
          reverseColor={this.onReverseColor}
        />}
        <Picker
          language={this.props.language}
          anchorEl={anchorEl}
          onChange={this.onChange}
          isShowAlpha={isShowAlpha}
          color={color || this.state.color}
        />
      </div>
    );
  }
  render() {
    const { anchorEl, isActive, isShowAlpha } = this.props;
    const { styles } = this;
    return (
      <Popover
        open={isActive}
        anchorEl={anchorEl}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.handleClose}
        zDepth={2}
        style={{ backgroundColor: 'transparent' }}
      >
        <div style={styles.main}>
          { isShowAlpha && this._genTabs()}
          { this._genPicker() }
        </div>
      </Popover>
    );
  }
}

