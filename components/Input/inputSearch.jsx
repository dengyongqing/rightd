/*
* @Author: phobal
* @Date:   2016-12-27 18:05:51
 * @Last Modified by: Domon Ji
 * @Last Modified time: 2017-10-17 10:57:26
*/


import React, { version } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { AutoComplete } from 'material-ui';
import SearchIcon from 'material-ui/svg-icons/action/search';
import UiBase from './../uiBase';


import getStyles from './getStyles';
import { ActionSwapVerticalCircle } from 'material-ui/svg-icons/action/swap-vertical-circle';

export default class InputSearch extends UiBase {
  static propTypes = {
    /**
     * 输入框的name
     */
    name: PropTypes.any,
    /**
     * 当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 设置输入框的类型，如text、password...
     */
    type: PropTypes.string,
    /**
     * 按下搜索图标的触发回调
     */
    onSearch: PropTypes.func,
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  static defaultProps = {
    editorWidth: 300,
    type: 'text',
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null, // this.props.error,
      value: null,
      searchText: null,
      dataSource: [],
    };
  }
  componentWillReceiveProps(newprops, b, c) {
    const { isOpenEditor, data } = newprops;
    this.setState({
      data,
      isOpenEditor,
      text: null, // 针对input
    });
  }
  componentDidUpdate() {
    if (this.refs.input) {
      this._focusInput();
    }
  }
  _focusInput = () => { // 让input的光标固定下来
    setTimeout(this.refs.input.focus(), 0);
  }
  onSearch = () => {
    const { onSearch } = this.props;
    if (onSearch) {
      onSearch(this.refs.input.value);
    }
  }
  onSuccess = (searchText, dataSource) => {
    this.setState({
      searchText,
    });
    this.onChange(searchText);
  }

  _genUI() {
    const { state, props, context } = this;
    const styles = getStyles(props, state, context);
    const { disabled, heightPhi } = props;
    const { error, data } = state;
    let { validate, value } = data;
    value = this.state.searchText ? this.state.searchText : value;
    const { options } = validate;
    const height = this._getDefaultHeight() * heightPhi;
    const inputO = Object.assign(
        {}, styles.input, this.props.style, { height },
        error ? styles.error : {},
        disabled ? styles.disabled : {},
        (this.state.isActive && !disabled && !this.state.error) ? styles.hover : {},
    );
    const inputWrapper = this.refs.inputWrapper;
    let minWidth,
      popoverStyle = {};
    if (inputWrapper) {
      minWidth = inputWrapper.clientWidth;
      popoverStyle = { minWidth };
    }
    return (
      <div ref="inputWrapper" style={Object.assign({ height }, styles.wrapper, this._getSelectorStyle())}>
        <AutoComplete
          style={inputO}
          name="textfield"
          searchText={value}
          animated={false}
          openOnFocus
          fullWidth
          hintText="查找"
          dataSource={options}
          popoverProps={{ style: popoverStyle, anchorEl: this.refs.inputWrapper }}
          onUpdateInput={this.onSuccess}
          filter={(searchText, key) => (key.indexOf(searchText) !== -1)}
          underlineShow={false}
          textFieldStyle={{ height: '100%' }}
          hintStyle={{ fontSize: '14px', bottom: '3px' }}
        />
        <SearchIcon style={styles.searchIcon} onClick={this.onSearch} />
      </div>
    );
  }
  render() {
    return super.render();
  }
}
