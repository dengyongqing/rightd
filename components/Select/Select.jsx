/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
// import SearchIcon from 'material-ui/svg-icons/action/search';
import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import UiBase from './../uiBase';
import './../MultiSelect/index.css';
import Menus from './../subcoms/Menus';
import InputSearcher from './../subcoms/InputSearcher';
import Utils from './../utils';
import ZUtils from './../../lib/utils';
import cUtils from './../subcoms/utils';
import getStyles from './getStyles';

export default class Select extends UiBase {
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
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置可见的menuItem的个数
     */
    listN: PropTypes.number,
  }
  static defaultProps = {
    onChange: () => null,
    onFinishChange: () => null,
    listN: 6,
    searchN: 20,
  }
  constructor(props : any) {
    super(props);
    this.state = {
      isInputActive: false,
      inputValue: '',
      maxShowN: 8,
      limitMenus: 100
    };
  }
  onInputChange = (v) => {
    const { value, validate } = this.state.data;
    this._setSearchFunc(v);
    const vv = cUtils.mergeDisplayName(v, value, validate.options);
    this.onChange(vv);
    this.setState({});
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  handleSearchClick = e => this.onInputChange(e);
  onSelect = (e, v) => {
    const { data } = this.state;
    if (data.onChange) {
      data.onChange(v);
    }
    this.onChange(v);
    this._shrink();
    this.setState({
      inputValue: '',
    });
  }
  onInputActiveStateChange = (bool) => {
    const { data } = this.state;
    this.setState({ isInputActive: bool });
    if (data.onSelect) { data.onSelect(); }
  }
  onInputFocuStateChange = (bool) => {
    // this.setState({ isInputActive: bool });
  }
  onBgClick = (v) => {
    const { data } = this.state;
    if (data.handleOpen) {
      data.handleOpen(v);
    }
    this._shrink();
  }
  _shrink() {
    // console.log('run')
    this.setState({ isInputActive: false });
  }
  handleInputDelete = (e) => {
    e.stopPropagation();
    this.setState({ inputValue: '' });
    // this.input.value = '';
  };
  loadMore = () => {
    const maxShowN = this.state.maxShowN + 100;
    this.setState({ maxShowN });
  };
  _setSearchFunc(text) {
    this.searchFunc = Utils.genSearchFilter(text);
  }
  _cleanSearchFunc() {
    this.searchFunc = null;
  }
  loadMore = () => {
    const limitMenus = this.state.limitMenus + 100;
    this.setState({ limitMenus });
  }
  _genMenus() {
    const { maxShowN, data, isInputActive, limitMenus } = this.state;
    const { searchN } = this.props;
    const { value, validate, loading, groupBy, isInput, divideLine = false, id='' } = data;
    let { options } = validate;
    if (this.searchFunc) options = this.searchFunc(options);
    const anchorEl = _.get(this, 'inputSearcher.mainNode') || this.refs.inputWrapper; //  || ;
    const dataN = _.values(options).length;
    const height = this._getDefaultHeight() * this.props.heightPhi;
    return (
      <Menus
        mode="single"
        maxShowN={maxShowN}
        limitMenus={limitMenus}
        loadMore={this.loadMore}
        height={height}
        isCheckerIcon={false}
        data={options}
        value={value}
        id={id}
        loading={loading}
        groupBy={groupBy}
        onSelect={this.onSelect}
        language={this.props.language}
        labelFormmat={this.props.labelFormmat}
        anchorEl={anchorEl}
        isActive={isInputActive}
        onRequestClose={this.onBgClick}
        divideLine={divideLine}
        joinLevel1={_.get(data, 'props.joinLevel1')}
        isSearch={!isInput && dataN > searchN}
      />
    );
  }
  _updateStyle() {
    this.styles = getStyles(this.props, this.state, this.context);
  }
  componentWillMount(a, b) {
    super.componentWillMount(a, b);
    this._updateStyle();
  }
  componentWillUpdate(a, b) {
    super.componentWillUpdate(a, b);
    this._updateStyle();
  }
  handleSelect = (e) => {
    const { data } = this.state;
    const { hoc } = data;
    if (hoc) {
      e.stopPropagation();
    }
    if (data.handleOpen) {
      data.handleOpen();
    }
  }
  _genUI() {
    const { props, state } = this;
    const { heightPhi, labelFormmat, language } = props;
    const styles = getStyles(props, state, this.context);
    const height = `${this._getDefaultHeight() * heightPhi}px`;
    const { value, placeholder, disable, isInput = false } = this.state.data;
    const inputO = Object.assign(
      {}, styles.input, styles.hover,
      disable ? styles.disabled : {},
    );
    let displayName = cUtils.getDisplayName(value, this.state.data.validate.options, language);
    displayName = labelFormmat ? labelFormmat(displayName) : 
      language ? ZUtils.getText(displayName, language) : displayName;
    return (
      <div
        className="z_select-container"
        style={{
          ...this._getSelectorStyle(),
          height,
          ...this.state.data.selectStyle,
        }}
        onClick={this.handleSelect}
      >
        <div
          className="z_input-container"
          style={styles.root}
          ref="inputWrapper"
        >
          <InputSearcher
            ref={r => (this.inputSearcher = r)}
            text={displayName}
            isInput={isInput}
            isDropdown
            disable={disable}
            disabled={disable}
            placeholder={labelFormmat ? labelFormmat(placeholder) : ZUtils.getText(placeholder, language)}
            style={{...inputO}}
            helpStyle={this.props.helpStyle}
            width={this._getSelectorWidth()}
            onChange={this.onInputChange}
            onFocuStateChange={this.onInputFocuStateChange}
            onActiveStateChange={this.onInputActiveStateChange}
            isActive={state.isActive}
            isInputActive={state.isInputActive}
            isCloseIcon={false}
            onClean={() => this.onSelect(null, '')}
          />
        </div>
        {this.state.data.addonAfter || null}
        {this._genMenus()}
      </div>
    );
  }
  render() {
    return super.render();
  }
}
