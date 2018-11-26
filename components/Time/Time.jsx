/* /*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UiBase from './../uiBase';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import Delete from 'material-ui/svg-icons/navigation/cancel';
import Popover from 'material-ui/Popover';
import RaisedButton from 'material-ui/RaisedButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import Calendar from '../subcoms/Calendar/Calendar';
import Calendar from '../subcoms/Calendar/Calendar1';
import moment from 'moment';
import { teal200 } from 'material-ui/styles/colors';
import { teal300 } from 'material-ui/styles/colors';
import { parseValidate } from '../../meta/validation';
import Utils from './../../lib/utils';

function isTime(t) {
  return t instanceof Date || typeof t === 'string';
}

moment.locale('zh-cn');
//
const switchT = v => typeof v === 'string' ? moment(v, 'YYYY-MM-DD HH:mm:ss').toDate() : v;
// const parseRange = range => ({
//   time: switchT(range.time),
// });
const isTimeEqual = (t1, t2) => t1.getTime() - t2.getTime() < 10;
const isTimeRangeEqual = (r1, r2) => isTimeEqual(r1.min, r2.min) && isTimeEqual(r1.max, r2.max);

const parseDisplay = (t) => {
  return moment(t).format('YYYY-MM-DD HH:mm:ss');
};

const getDisplayValue = (t) => {
  if (!t) return '';
  if (isTime(t)) return parseDisplay(t);
  if (t.time === undefined) return ' ';
  if (t.time === '') return '';
  if (typeof t === 'object') return t.time;
  if (t.time == 'Invalid date') return null;
  return parseDisplay(t.time);
};

function getStyles(props, context, state, height) {
  const { palette } = context.muiTheme;
  const { inputStyle } = props;
  let { textColor, borderColor, primary1Color, canvasColor } = palette;
  const color = Object.keys(inputStyle).length !== 0 && inputStyle.border ? inputStyle.borderColor : borderColor;
  borderColor = state.isActive ? primary1Color : color;
  return {
    root: {
      borderWidth: Object.keys(inputStyle).length !== 0 ? inputStyle.borderWidth : 1,
      backgroundColor: Object.keys(inputStyle).length !== 0 ? inputStyle.backgroundColor : canvasColor,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      width: '100%',
      height,
      overflow: 'hidden',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      ...(props.inputStyle || {}),
      borderColor,
    },
    icon: {
      width: '18px',
      height: '18px',
      color: borderColor,
    },
    timePanel: {
      minWidth: '250px',
     // padding: '12px 24px 18px 24px',
    },
    timePanelWrapper: {
    },
    addButton: {
      float: 'right',
      margin: '8px'
    },
    raiseButton: {
      width: '40px',
      height: '30px',
      lineHeight: '30px'
    },
    timePickerHead: {
      color: textColor,
    },
    divider: {
      marginTop: '4px',
      marginBottom: '12px',
    },
    button: {
      color: textColor,
      // backgroundColor: '#222',
      marigin: '0 12px',
    },
    buttonActive: {
      backgroundColor: '#B3A7FB',
      borderRadius: '40px',
      color: palette.canvasColor,
    },
    //
    timeInput: {
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: textColor,
    },
    rightIcon: {
      color: '#7B7B7B',
      width: 24,
      height: 24,
      minWidth: 24,
    },
    unhoverIcon: {
      display: 'none',
    },
    delete: {
      color: '#7B7B7B',
      width: 24,
      height: 24,
      minWidth: 24,
      // minWidth: 20,
    },
    border: {
      border: '1px solid #E6E9ED',
      borderRadius: '2px',
    },
    errorMsg: {
      color: '#D0021B',
      fontSize: '12px',
    },
    popOver: {
      // position: 'fixed',
      // margin: `-${high}px 0 0 0`,
      background: 'transparent',
      marginTop: '-4px',
      boxShadow: 'none',
      boxSizing: 'border-box',
      zIndex: 99,
    },
    errorBorder: {
      borderWidth: 1,
      borderColor: '#f00',
      borderStyle: 'solid',
      boxSizing: 'border-box',
      width: '100%',
      height,
      overflow: 'hidden',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
  };
}

export default class Picker extends UiBase {
  static propTypes = {
    /**
     *  组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     *  当value改变时触发回调函数
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调函数
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置日历toolbar的标题
     */
    span: PropTypes.string,
    /**
     * 判断日期输入的合理性
     */
    error: PropTypes.bool,
    /**
     * 设置root element的回调函数
     */
    style: PropTypes.object,
    /**
     * 删除日期的回调函数
     */
    handleDelete: PropTypes.func,
    /**
     * 设置日历的初始化日期
     */
    initialDate: PropTypes.string,
    /**
     * 设置input的样式
     */
    inputStyle: PropTypes.object,
  }
  static defaultProps ={
    inputStyle: {},
    heightPhi: 0.7,
  }
  constructor(props: any) {
    super(props);
    this.state = {
      isSelectActive: false,
      isDetailMode: false,
      minDate: new Date(),
      buttonName: null,
      firstSlider: 24,
      secondSlider: 60,
      timeError: false,
      errorText: null,
      error: props.error || false,
    };
  }
  componentWillReceiveProps(newprops) {
    const { error, data } = newprops;
    this.setState({ error, data });
  }

  onSelectClick = (e) => {
    const { data } = this.state;
    if (data.hoc) {
      e.stopPropagation();
    }
    this.setState({
      isSelectActive: !this.state.isSelectActive,
    });
  }
  _getTimeValue() {
    const { data } = this.state;
    const { value } = data;
    if (!value) return null;
    if (typeof value === 'object') {
      if (isTime(value)) {
        return value;
      } else {
        return value.time || value.value;
      }
    }

    return value;
  }
  _setTimeValue(v) {
    const { data } = this.state;
    let { value } = data;
    if (!value) {
      if (!v) {
        return data.value = '';
      }
      data.value = moment(new Date(v)).format('YYYY-MM-DD HH:mm:ss');
      return data.value;
    } else if (typeof value === 'object') {

      if (isTime(value)) {
        if (!v) {
          data.value = '';
          return data.value;
        } else {
          data.value = moment(new Date(v)).format('YYYY-MM-DD HH:mm:ss');
          return data.value;  
        }
      } else {
        if (!v) {
          value.time = '';
          return value;
        }
        value.time = moment(new Date(v)).format('YYYY-MM-DD HH:mm:ss');
        return value;
      }
    } else if (typeof value === 'string') {
      if (!v) {
        data.value = '';
        return data.value;
      }
      data.value = moment(new Date(v)).format('YYYY-MM-DD HH:mm:ss');
      return data.value;
    }
  }
  _onChange = (value) => {
    
    let checkV;
    if (typeof value === 'object') {
      if (isTime(value)) {
        checkV = value;
      } else {
        checkV = value.time || value.value;
      }
    } else {
      checkV = value;
    }
    const { validate } = this.state.data;
    const rules = validate && validate.rules || '';
    let bol;
    if (rules) {
      const checkFun = parseValidate(rules);
      checkV = new Date(checkV).getTime();
      bol = checkFun(checkV);
    }

    if (bol && typeof bol === 'string') {
      return this.onError(bol);
    } else {
      this.setState({
        timeError: false,
        errorText: ''
      })
      return this.onChange(value);
    }
    
  }
  onError = (bol) => {
    this.setState({
      timeError: true,
      errorText: bol,
    });
  }
  handleDelete = (e) => {
    e.stopPropagation();
    const { handleDelete } = this.props;
    if (handleDelete) {
      handleDelete();
    } else {
      const value = this._setTimeValue(null);
      this._onChange(value);
    }
  }
  onBgClick = () => {
    this._shrink();
  }
  _shrink() {
    this.setState({
      isSelectActive: false,
    });
  }

  onDateMinChange = (v) => {
    const { hoc } = this.state.data; 
    const value = this._setTimeValue(v);
    this.setState({
      time: value
    });
    if (!hoc) {
      this._onChange(value);
      this.setState({});
    }
    
  }

  getMinTime = (date) => {
    this.onDateMinChange(date);
  }
  handleOnClick = () => {

    this._onChange(this.state.time);
    this.setState({});
    this._shrink()

  }
  _genTimeSelectorDetail() {
    const { language } = this.props;
    let t = this._getTimeValue() || this.props.initialDate || new Date();
    t = moment(t, 'YYYY-MM-DD HH:mm:ss').toDate();
    return (
      <div className="z_time-picker-body">
        <Calendar
          style={{ width: 250 }}
          firstDayOfWeek={0}
          DateTimeFormat={Intl.DateTimeFormat}
          locale={language === 'en' ? 'en-US' : language === 'ja' ? 'ja' : 'zh-CN'}
          language={language}
          ref="minCalendar"
          initialDate={t}
          span={this.props.span}
          onPassValue={this.getMinTime}
          getState={this.onDateMinChange}
        />
      </div>
    );
  }

  _genPopover() {
    const { value, validate, hoc } = this.state.data;
    const styles = getStyles(this.props, this.context, this.state);
    const inputWrapper = this.inputWrapper;
    let minWidth,
      width,
      menuStyle = {};
    if (inputWrapper) {
      // width = minWidth = inputWrapper.clientWidth + styles.root.borderWidth * 2;
      width = minWidth = inputWrapper.offsetWidth;
      menuStyle = { minWidth };
      Object.assign(menuStyle, styles.timePanel);
    }
    
    return (
      <Popover
        open={this.state.isSelectActive}
        anchorEl={this.inputWrapper}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.onBgClick}
        useLayerForClickAway={false}
        style={menuStyle}
      >
        <div style={styles.timePanelWrapper}>
          {this._genTimeSelectorDetail()}
        </div>
        {
          hoc ? 
          <div style={styles.addButton}>
            <RaisedButton label={Utils.getText("确定", this.props.language)} primary 
              style={styles.raiseButton}
              buttonStyle={{lineHeight: '30px'}}
              onClick={this.handleOnClick}></RaisedButton>
          </div> : null
        }
        
      </Popover>
    );
  }
  
  _genError(height) {
    const { state, props, context } = this;
    const styles = getStyles(props, context, state, height);
    const inputWrapper = this.inputWrapper;
    const width = this.inputWrapper
      ? this.inputWrapper.offsetWidth
      : null;
    if (this.state.errorText) {
      return (
        <Popover
          open
          anchorEl={inputWrapper}
          style={Object.assign({}, styles.popOver, width)}
          useLayerForClickAway={false}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        >
          <span style={styles.errorMsg}>{this.state.errorText}</span>
        </Popover>
      );
    } else {
      return null;
    }
  }
  _genUI() {
    const value = this._getTimeValue();
    const { heightPhi } = this.props;
    const { error, isActive, data, timeError } = this.state;
    const { placeholder='' } = data;
    let height = this._getDefaultHeight() * heightPhi;
    if (isNaN(height)) height = 48 * heightPhi;
    const styles = getStyles(this.props, this.context, this.state, height);
    const rootStyle = Object.assign({}, styles.root, { height });
    // const maxWidth = this.refs.inputWrapper ? this.refs.inputWrapper.offsetWidth - height * 2 : null;
    const style = Object.assign({ }, this._getSelectorStyle(), { boxSizing: 'border-box' });
    const t = this._getTimeValue();
    const rightIcon = (!isActive || t === '') ? styles.rightIcon : styles.unhoverIcon;
    const deleteIcon = (isActive && t !== '') ? styles.delete : styles.unhoverIcon;
    return (
      <div className="z_select-container" style={style}>
        <div
          className="z_input-container"
          style={!error ? rootStyle : styles.errorBorder}
          ref={(r) => { this.inputWrapper = r; }}
          onClick={this.onSelectClick}
        >
          <EventNote style={{ ...styles.icon, minWidth: '12px', paddingLeft: '8px' }} />

          <div
            className="z_time-value-container"
            style={{ ...styles.timeInput }}
          >
            { value ?
              getDisplayValue(value) :
              placeholder
            }
          </div>
          <OpenIcon
            style={rightIcon}
          />
          <Delete style={deleteIcon} onClick={e => this.handleDelete(e)} />
        </div>

        {this._genPopover()}
        { timeError ? this._genError(height) : null}
        {/* { (timeError && this.state.isActive) || (timeError && this.state.isSelectActive) ? this._genError(height) : null} */}
      </div>
    );
  }
  render() {
    return super.render();
  }
}
