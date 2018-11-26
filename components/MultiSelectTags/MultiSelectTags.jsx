/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import './index.css';
import Utils        from './../../lib/utils';
import UiBase       from './../uiBase';
import Input        from './../Input/Base';
import TagIcon      from './../subcoms/TagIcon';
import {fade, emphasize} from 'material-ui/utils/colorManipulator';
import Popover      from 'material-ui/Popover';
import Menus from './../subcoms/Menus';
import MenuItem     from 'material-ui/MenuItem';

function getStyles(props, context, state){
  const { palette } = context.muiTheme;
  let {textColor, borderColor, primary1Color} = palette;
  borderColor = state.isActive ? primary1Color : borderColor;
  return {
    root: {
      borderWidth: 1,
      borderColor,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      overflow: 'auto'
    },
    input: {
      color: textColor,
      border: 0,
      outline: 0,
      height: '100%',
      background: 'transparent',
      margin: '5px 8px',
      flexGrow: 1
    },
    menuItem:{
      backgroundColor: emphasize(context.muiTheme.menuItem.hoverColor, 0.3),
    }
  };
}

const isIn = (k, d) => {
  for(let i in d){
    if(_.isEqual(d[i], k)) return true;
  }
  return false;
};

const searchFilter = (k, ds) => {
  if(!ds) return null;
  if(!k)  return ds;
  return _.filter(ds, d => {
    if (typeof(d) === 'object') return d.value.toString().indexOf(k) !== -1 || d.name.toString().indexOf(k) !== -1;
    return d.toString().indexOf(k) !== -1;
  });
};

export default class MultiSelect extends UiBase {
  static propTypes = {
    /**
     * 组件配置数据
     */
    data:           PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调
     */
    onChange:       PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调
     */
    onFinishChange: PropTypes.func
  }
  static defaultProps = {
    maxShowN: 300
  }
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      isInputActive: false
    };
  }
  // componentDidUpdate(){
  //   this._focusInput();
  //  }
   _focusInput = () => {
     setTimeout(() => ReactDOM.findDOMNode(this.refs.input).focus(), 0);
   }

  _genMenus() {
    const { props, state } = this;
    const {inputValue} = this.state;
    const { value, validate, loading, groupBy, isInput, divideLine = false, id='', realOnChange=true, selectMode='multiple' } = state.data;
    const { options } = validate;
    const { maxShowN, data, isInputActive, limitMenus } = state;
    const searched = searchFilter(inputValue, options);
    const anchorEl = _.get(this, 'inputSearcher.mainNode') || this.refs.inputWrapper;
    const height = this._getDefaultHeight() * this.props.heightPhi;
    return (
      <Menus
        mode={selectMode}
        loadMore={this.loadMore}
        maxShowN={maxShowN}
        limitMenus={limitMenus}
        id={id}
        language={this.props.language}
        labelFormmat={this.props.labelFormmat}
        data={searched}
        realOnChange={realOnChange}
        value={value}
        loading={loading}
        groupBy={groupBy}
        isCheckerIcon={selectMode === 'multiple' ? true : false}
        onSelect={this.onMenuItemClick}
        onConfirm={this.onConfirm}
        anchorEl={anchorEl}
        isActive={inputValue && searched.length > 0 ? true : false}
        onRequestClose={this.onBgClick}
        divideLine={divideLine}
        joinLevel1={_.get(data, 'props.joinLevel1')}
        isSearch={!isInput}
        height={height}
      />
    );
  }

  onMenuItemClick = (e, v, k) => {
    const { value, selectMode } = this.state.data;
    let bol = false;
    for(let i in value){
      if(_.isEqual(value[i], v)) {
        value.splice(i, 1);
        bol = true;
      }
    }
    if(!bol) value.push(v);
    this.onChange(value);
    if (selectMode === 'single') {
      this._shrink();
      this.setState({
        inputValue: '',
      });
    }
    

  }
  onInputChange = (e, v) => {
    this.setState({
      inputValue: e.nativeEvent.target.value,
    });
  }
  onChipDelete = (e, v) => {
    e.preventDefault();
    e.stopPropagation();
    const {value} = this.state.data;
    _.forEach(value, (d, i) => {
      if(_.isEqual(d, v)) value.splice(i, 1);
    });
    this.onChange(value);
    this.setState({});
  }
  _getWidthStyle(){
    const width = `${Math.floor(this.props.widthPhi * 100)}%`;
    return { width, maxWidth: width };
  }
  onInputClick = () => {
    this._focusInput();
    this.setState({isInputActive: true});
  }

  _shrink() {
    this.setState({ isInputActive: false, inputValue: '' });
    this._focusInput();
  }
  onBgClick = () => {
    this._shrink();
  }
  _genTags(){
    const {value} = this.state.data;
    const height = this._getItemHeight() + 'px';
    return _.map(value, (d, k) => {
      const name  = typeof(d) === 'object' ? d.name : d;
      const value = typeof(d) === 'object' ? d.value : d; 
      return (
        <TagIcon
          key={name}
          id={name}
          style={{height, margin: '5px 5px'}}
          value={value}
          onDelete={(e) => this.onChipDelete(e, d)}
        >
         {name}
        </TagIcon>
      );
    });
  }
  _genInput(){
    const styles = getStyles(this.props, this.context, this.state);
    const height = this._getItemHeight();
    const style  = Object.assign(styles.input, {height, lineHeight: height});
    return (
      <input
        ref="input"
        style={styles.input}
        value={this.state.inputValue}
        onChange={this.onInputChange}
        onClick={this.onInputClick}
      />
    );
  }
  _getItemHeight(){
    return this._getDefaultHeight() * this.props.heightPhi;
  }
  _getElementsHeight () {
    if(!this.refs.inputWrapper) return  this._getDefaultHeight();
    return  this.refs.inputWrapper.offsetHeight;
  }
  _getLineN(){
    if (!this.refs.inputWrapper) return 1;
    return Math.min(Math.floor(this.refs.inputWrapper.clientHeight / this._getItemHeight()), this.props.maxShowN);
  }
  _getContainerStyle(){
    const style = _.cloneDeep(this.props.style);
    const lineN = this._getLineN();
    style.height = style.height * lineN;
    return style;
  }
  _getHeightStyle(){
    const {heightPhi} = this.props;
    let height = this._getElementsHeight();
    const margin = 0;
    return {height, margin};
  }

  _genUI(){
    const {data} = this.state;
    let {validate, value} = data;
    if(!validate.options) validate.options = [value];

    const styles = getStyles(this.props, this.context, this.state);
    const rootStyle = Object.assign(this._getHeightStyle(), this._getWidthStyle());
    Object.assign(rootStyle, styles.root);

    return (
      <div
        className="z_input-container"
        style={rootStyle}
        ref="container"
      >
        <div 
          className="z_input-wrapper-container"
          ref="inputWrapper"
        >
          {this._genTags()}
          {this._genInput()}
          {this._genMenus()}
        </div>
      </div>
    );
  }
  render() {
    return super.render();
  }
}
