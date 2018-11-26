/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Menus from './../subcoms/Menus';
import InputSearcher from './../subcoms/InputSearcher';

import getStyles from './getStyles';
import './index.css';
import cUtils from './../utils';
import UiBase from './../uiBase';
import ZUtils from './../../lib/utils';

function getValue(d) {
  return d && typeof d === 'object' ? d.value : d;
}

function getName(d, i) {
  if (typeof d === 'object') {
    return (d.name || d.id || '').toString();
  }
  return (d || '').toString();
}
const isOnComposition = false;

export default class MultiSelect extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置输入框的样式
     */
    inputStyle: PropTypes.object,
    /**
     * 设置menuItem的样式
     */
    menuItemStyle: PropTypes.object,
  };
  static defaultProps = {
    maxTextShowN: 10,
    maxMenuHeight: 48 * 5,
    multiSelectStyle: {},
    helpStyle: {}
  };
  constructor(props: any) {
    super(props);
    this.state = {
      inputValue: '',
      isInputActive: false,
      scrollTo: 0,
      searchN: 20,
      maxShowN: 8,
      limitMenus: 2
    };
  }
  componentDidUpdate() {
    if (this.refs.input) this._focusInput();
  }
  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    const { value, validate } = data;
    const { options } = validate;
    const originOptions = this.props.data && this.props.data.validate && this.props.data.validate.options || [];
    if (!_.isEqual(this.props.data, nextProps.data)) {
      if (!_.isEqual(options, originOptions)) {
        let flag;
        let newOptions;
        if (Array.isArray(options)) {
          for (const i of options) {
            if (i && typeof i === 'object') {
              flag = 1;
            }
          }
          const nv = _.filter(value, v => {
            return _.filter(options, o => {
              return _.isEqual(o, v);
            })
          });
          // const nv = _.intersection(value, options);
          if (flag) {
            newOptions = cUtils.unique(nv.concat(options));
          } else {
            newOptions = _.uniq(nv.concat(options));
          }
        }
        this.setState({
          data: Object.assign({}, nextProps.data, {
            validate: { options: newOptions },
          }),
        });
      } else {
        this.setState({
          data: Object.assign({}, nextProps.data)
        });
      }
    }
   
  }

  _focusInput = () => {
    // 让input的光标固定下来
    setTimeout(this.refs.input.focus, 0);
  };
  _getSelectedCount() {
    const { options } = this.state.data.validate;
    const vs = _.values(this.state.data.value);
    const vsf = _.filter(vs, (d) => {
      let bol = false;
      _.forEach(options, (o) => {
        bol = bol || getValue(d) === getValue(o);
      });
      return bol;
    });
    return _.get(vsf, 'length');
  }

  onInputChange = (e) => {
    if (e.target instanceof HTMLInputElement && !isOnComposition) {
      this.setState({ inputValue: this.input.value });
    }
  };
  loadMore = () => {
    const limitMenus = this.state.limitMenus + 100;
    this.setState({ limitMenus });
  }
  _genMenus() {
    const { props, state } = this;
    const { value, validate, loading, groupBy, isInput, divideLine = false, id='', realOnChange=true } = state.data;
    const { options } = validate;
    const { maxShowN, data, isInputActive, limitMenus } = state;

    const anchorEl = _.get(this, 'inputSearcher.mainNode') || this.refs.inputWrapper;
    const height = this._getDefaultHeight() * this.props.heightPhi;
    return (
      <Menus
        mode="multiple"
        loadMore={this.loadMore}
        maxShowN={maxShowN}
        limitMenus={limitMenus}
        id={id}
        language={this.props.language}
        labelFormmat={this.props.labelFormmat}
        data={options}
        realOnChange={realOnChange}
        value={value}
        loading={loading}
        groupBy={groupBy}
        onSelect={this.onSelect}
        onConfirm={this.onConfirm}
        anchorEl={anchorEl}
        isActive={isInputActive}
        onRequestClose={this.onBgClick}
        divideLine={divideLine}
        joinLevel1={_.get(data, 'props.joinLevel1')}
        isSearch={!isInput}
        height={height}
      />
    );
  }

  _mergeValue(value, v) {
    let bol = false;
    for (const i in value) {
      if (_.isEqual(value[i], v)) {
        value.splice(i, 1);
        bol = true;
      }
    }
    if (!bol) value.push(v);
    return value;
  }
  onConfirm = v => {
    let { value } = this.state.data;
    if (Array.isArray(v)) {
      value = v;
    } else {
      this._mergeValue(value, v);
    }
    this.state.data.value = value;
    this.onChange(value);
  }

  onSelect = (e, v) => {
    let { value, realOnChange=true } = this.state.data;
    if (Array.isArray(v)) {
      value = v;
    } else {
      this._mergeValue(value, v);
    }
    this.state.data.value = value;
    
    if (!realOnChange) {
      this.setState({
        data: this.state.data
      })
    } else {
      this.onChange(value); 
    }
    

  };
  onInputActiveStateChange = (bool) => {
    this.setState({ isInputActive: bool });
  }

  onInputClick = (e) => {
    const { data } = this.state;
    if (data.hoc) {
      e.stopPropagation();
    }
    if (data.handleOpen) {
      data.handleOpen();
    }
    const { value, validate } = data;
    const { options } = validate;
    let flag;
    let newOptions;
    if (Array.isArray(options)) {
      for (const i of options) {
        if (i && typeof i === 'object') {
          flag = 1;
        }
      }
      const nv = _.filter(value, v => {
        return _.filter(options, o => {
          return _.isEqual(o, v);
        })
      });
      // const nv = _.intersection(value, options);
      if (flag) {
        newOptions = cUtils.unique(nv.concat(options));
      } else {
        newOptions = _.uniq(nv.concat(options));
      }
      this.setState({
        data: Object.assign({}, this.state.data, {
          validate: { options: newOptions },
        }),
      });
    }
  };
  onBgClick = (v) => {
    const { data } = this.state;
    if (data.onConfirm) {
      data.onConfirm();
    }
    if (data.handleOpen) {
      data.handleOpen(v);
    }
    this._shrink();
  };
  _shrink() {
    this.setState({ isInputActive: false, inputValue: '', scrollTo: 0 });
  }
  _genshowItem() {

    const styles = getStyles(this.props, this.context, this.state);
    const { value } = this.state.data;
    if (value.length === 0) return null;
    let text = cUtils.getDisplayName(value[0]);
    text = this.props.labelFormmat ? this.props.labelFormmat(text) : ZUtils.getText(text, this.props.language);
    // const text1 = value.length > 1 ? cUtils.getDisplayName(value[1]) : '';
    return <span style={styles.showSingleItem}>{ text}</span>;
  }
  _genShowNum() {
    const styles = getStyles(this.props, this.context, this.state);
    return (
      <div>
        <span style={styles.showSpan}>
          { ZUtils.getText('已选择', this.props.language)}
          {/* <span style={styles.showSpanNumber}>{`${text}、${text1}等`}</span> */}
          <span style={styles.showSpanNumber}>
            {`${this._getSelectedCount()}`}
          </span>
          { ZUtils.getText('项', this.props.language)}
        </span>
      </div>
    );
  }
  _genShowDiv() {
    const styles = getStyles(this.props, this.context, this.state);
    let { value, placeholder } = this.state.data;
    placeholder = this.props.labelFormmat ? this.props.labelFormmat(placeholder) : ZUtils.getText(placeholder, this.props.language);
    const showList =
      value.length >= 2 ? this._genShowNum() : this._genshowItem();
    const show = value.length === 0 ? <span style={styles.info}>{placeholder}</span> : showList;
    return <div style={styles.showDiv}>{show}</div>;
  }

  _genUI() {
    const { state, props } = this;
    const { onChange, onFinishChange, listN, disabled, multiSelectStyle } = props;
    const { data, isInputActive, isActive } = state;
    const { validate, value, placeholder, isInput = false } = data;
    if (!validate.options) validate.options = [value];
    const styles = getStyles(this.props, this.context, this.state);
    // const dropIcon =
    //   !isActive || value.length === 0 ? styles.dropIcon : styles.unhoverIcon;
    // const deleteIcon =
    //   (isInputActive && value.length !== 0) || (isActive && value.length !== 0)
    //     ? styles.deleteIcon
    //     : styles.unhoverIcon;
    const { width, height } = this._getSelectorStyle();
    const rootStyle = Object.assign({}, this._getSelectorStyle(), {
      width: '100%'
    }, {
      width: multiSelectStyle.width  || width,
      height: multiSelectStyle.height || height
    });
    const displayNode = this._genShowDiv();
    // console.log(displayNode);
    return (
      <div
        className="z_multi-container"
        style={rootStyle}
        ref="container"
      >
        <div
          className="z_multi-wrapper-container"
          ref="inputWrapper"
          style={Object.assign({}, styles.root, this.state.data.mulitStyle)}
          onClick={this.onInputClick}
        >
          <InputSearcher
            ref={r => (this.inputSearcher = r)}
            text={displayNode}
            isInput={isInput}
            isDropdown
            disabled={disabled}
            helpStyle={this.props.helpStyle}
            placeholder={placeholder}
            style={{ ...styles.input }}
            width={this._getSelectorWidth()}
            onChange={this.onInputChange}
            onFocuStateChange={this.onInputFocuStateChange}
            onActiveStateChange={this.onInputActiveStateChange}
            isActive={this.state.isActive}
            isInputActive={state.isInputActive}
            isCloseIcon
            isEmpty={!value || !value.length}
            onClean={() => this.onSelect(null, [])}
          />
          {this._genMenus()}
        </div>
      </div>
    );
  }
  render() {
    return super.render();
  }
}
