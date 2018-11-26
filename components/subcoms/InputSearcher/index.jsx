/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import { emphasize } from 'material-ui/utils/colorManipulator';
import DeleteIcon from 'material-ui/svg-icons/navigation/cancel';
// import Divider from 'material-ui/Divider';
// import MenuItem from 'material-ui/MenuItem';
// import Popover from 'material-ui/Popover';
// import Menu from 'material-ui/Menu';
import getStyles from './getStyles';
import tUtils from './../utils';
import { isChrome, isFirefox, isSafari, isIE, isEdge, isOpera } from './../../utils/browser';
import './index.css';



export default class InputSearcher extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    onFinishChange: PropTypes.func,
    isInputActive: PropTypes.bool,
    isActive: PropTypes.bool,
  }
  static defaultProps = {
    data: [],
    isInputActive: false,
    isActive: false,
    isShowActiveBorder: true,
    isCloseIcon: true,
    loading: false,
    text: '',
    isEmpty: true,
    isInput: true,
    placeholder: '',
    disable: false,
    onChange: () => {},
    onFocuStateChange: () => {},
    onActiveStateChange: () => {},
  };
  constructor(props: any) {
    super(props);
    this.state = {
      text: this.props.text,
      isFocus: false
    };
    this.isInnerChangeFromOnChange = false;
    this.isOnComposition = false;
    this.__id = Math.floor(Math.random() * 1000);
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  onFocus = () => {
    this.setState({
      isFocus: true,
    });
    if (this.props.isInputActive) return;
    this.props.onFocuStateChange(true);
    this.focus();
  }
  onBlur = () => {
    this.setState({
      isFocus: false,
    });
    if (this.props.isInputActive) {
      // this.props.onActiveStateChange(false);
      this.props.onFocuStateChange(false);
    }
  }
  onClick = (e) => {
    // e.stopPropagation();
    this.props.onActiveStateChange(true);
    this.focus();
  }
  _onChange(v) {

    this.props.onChange(v);
    this.isOnComposition = false;
    this.focus();
  
  }

  // componentWillUpdate(newProps) {
  //   if (newProps.text !== this.input.text && !this.isOnComposition) {
  //     // console.log(this.input.value, newProps.text, 'newProps.text...');
  //     // this.input.value = newProps.text;
  //     // setTimeout(() => {
  //     // this.setState({ text });
  //     // }, 0);
  //   }
  // }

  focus() {
    if (!this.props.isInputActive || !this.input) return;
    this.input.focus();
    setTimeout(() => this.input.focus(), 100);
  }
  onPlaceholder = () => {
    this.input.focus();
  }
  onChange = (e) => {
    const { value } = e.nativeEvent.target;
    if (!this.isOnComposition) {
      this._onChange(value);
    } else {
      // this.isOnComposition = false;
      // this.setState({ text: value });
    }
  }
  // shouldComponentUpdate(newProps, newState) {
  // //   const isStateChange = !_.isEqual(newState, this.state);
  // //   const isPropsChange = !_.isEqual(newProps, this.props);
  // //   if (newProps.text !== this.state.text) {
  // //     this.setState({
  // //       text: newProps.text,
  // //     });
  // //   }
  // //   return isStateChange || isPropsChange;
  //   return true;
  // }
  onComposition = (e) => {
    e = e.nativeEvent;
    if (e.type === 'compositionend') {
      this.onCompositionEnd();
      this.isOnComposition = false;
    } else {
      this.isOnComposition = true;
    }
  }
  onCompositionEnd() {
    const value = this.input.value;
    this._onChange(value);
  }
  _updateInput() {
    if (this.input) {
      this.input.value = this.props.text;
    }
  }
  componentDidUpdate() {
    this._updateInput();
  }
  componentDidMount() {
    this._updateInput(true);
  }
  onIconClick= (isDelete) => {
    if (isDelete && this.props.onClean) this.props.onClean();
  }
  render() {
    const { props, state, context } = this;
    const styles = getStyles(props, state, context);
    const { text } = props;
    const { isFocus } = state;
    const { placeholder, disabled, disable = true, isEmpty, isActive, isInputActive, isDropdown=false, tagStyle={} } = this.props;
    const normalIcon = props.rightIcon || OpenIcon;
    const isDelete = !isEmpty && (isActive || isInputActive);
    const Icon = isDelete ? DeleteIcon : normalIcon;
    return (
      <div style={{ ...styles.main }} ref={r => (this.mainNode = r)} onClick={disabled ? null : this.onClick}>
        {this.props.isInput ? (
          <div className='z_input-wrapper' >
            <input
              id="inputId"
              ref={rf => (this.input = rf)}
              disabled={disable}
              // placeholder={placeholder}
              style={{ ...styles.input }}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              onChange={this.onChange}
              onCompositionUpdate={this.onComposition}
              onCompositionEnd={this.onComposition}
              onCompositionStart={this.onComposition}
            />
            {/* 模拟placeholder */}
            { (!text && text !==0 && !isFocus) && <span onClick={this.onPlaceholder}  className='z_placeholder' style={styles.label} >{placeholder}</span>}
          </div>
          ) : (
            <div
              style={{ ...styles.input, ...styles.inputDiv, ...tagStyle }}
              ref={d => (this.refDiv = d)}
            >
              {text ? text : <span style={styles.placeholder}>{placeholder}</span>}
            </div>
        )}
        { isDropdown && <Icon style={styles.rightIcon} onClick={() => this.onIconClick(isDelete)} />}
      </div>
    );
  }
}
