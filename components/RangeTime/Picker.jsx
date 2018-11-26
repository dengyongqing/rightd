/* /*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import EventNote from 'material-ui/svg-icons/notification/event-note';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import moment from 'moment';
import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../subcoms/Calendar/Calendar';
import UiBase from './../uiBase';
import Utils from './../../lib/utils';


moment.locale('zh-cn');
//
const switchT = v => {
  return typeof v === 'string' ? moment(v, 'YYYY-MM-DD HH:mm:ss').toDate() : v;
}
const parseRange = (range) => {
  return {
    $gte: switchT(range.$gte),
    $lte: switchT(range.$lte),
  };
};
const genRecentTime = () => {
  const m = 60 * 1000;
  const h = 60 * m;
  const d = 24 * h;
  const nd = new Date();
  const now = nd.getTime();
  return [
    {
      delta: 3 * m,
      name: '3分钟',
    },
    {
      delta: 1 * h,
      name: '1小时',
    },
    {
      delta: 6 * h,
      name: '6小时',
    },
    {
      delta: 1 * d,
      name: '1天',
    },
    {
      delta: 3 * d,
      name: '3天',
    },
    {
      delta: 7 * d,
      name: '7天',
    },
  ].map(day => ({
    name: day.name,
    range: {
      $gte: moment(new Date(now - day.delta)).format('YYYY-MM-DD HH:mm:ss'),
      $lte: moment(nd).format('YYYY-MM-DD HH:mm:ss'),
    },
  }));
};

const parseDisplay = (t) => {
  return moment(t).format('YYYY-MM-DD');
};

const getDisplayValue = (range, str, lan='zh') => {
  if (range.$gte === undefined || range.$lte === undefined) return ' ';
  if (str) {
    const num = parseFloat(str);
    let name = str;
    name = num && name.split(num).length > 0 && `${num}${Utils.getText(name.split(num)[1], lan)}`;
    return `${Utils.getText('最近', lan)}${name}`;
  }
  return [range.$gte, range.$lte].map(parseDisplay).join(' -> ');
};
function getStyles(props, context, state, high) {
  const { palette } = context.muiTheme;
  const { textColor, primary1Color, canvasColor } = palette;
  let { borderColor } = palette;
  const { pickerStyle } = props;
  const { width, height, inputStyle, calendarStyle } = pickerStyle;
  const popoverBgc = calendarStyle && calendarStyle.popoverBgc;
  const color = inputStyle && inputStyle.borderColor ? inputStyle.borderColor : borderColor;
  borderColor = state.isActive ? primary1Color : color;
  return {
    root: {
      borderWidth:
        inputStyle && inputStyle.borderWidth ? inputStyle.borderWidth : 1,
      backgroundColor:
        inputStyle && inputStyle.backgroundColor
          ? inputStyle.backgroundColor
          : canvasColor,
      color: inputStyle && inputStyle.color ? inputStyle.color : textColor,
      borderStyle: 'solid',
      boxSizing: 'border-box',
      width: width || '100%',
      height: height || '100%',
      overflow: 'hidden',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      ...(inputStyle || {}),
      borderColor,
    },
    popover: {
      backgroundColor:
        popoverBgc && popoverBgc.backgroundColor
          ? popoverBgc.backgroundColor
          : canvasColor,
    },
    icon: {
      width: '18px',
      height: '18px',
      color: borderColor,
    },
    timePanel: {
      minWidth: '400px',
      padding: '12px 24px 18px 24px',
    },
    timePanelWrapper: {},
    timePickerHead: {
      color:
        calendarStyle && calendarStyle.color ? calendarStyle.color : textColor,
    },
    divider: {
      marginTop: '4px',
      marginBottom: '12px',
    },
    button: {
      color:
        calendarStyle && calendarStyle.color ? calendarStyle.color : textColor,
      // backgroundColor: '#222',
      marigin: '0 12px',
    },
    buttonActive: {
      backgroundColor:
        calendarStyle && calendarStyle.backgroundColor
          ? calendarStyle.backgroundColor
          : primary1Color,
      borderRadius: '40px',
      color: palette.canvasColor,
    },
    //
    timeInput: {
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      color: inputStyle && inputStyle.color ? inputStyle.color : textColor,
    },
    rightIcon: {
      color: '#7B7B7B',
      minWidth: 24,
    },
    toggle: {
      width: 'auto',
    },
    ml10: {
      marginLeft: '10px',
    },
    thumbOff: {
      backgroundColor:
        calendarStyle && calendarStyle.backgroundColor
          ? calendarStyle.backgroundColor
          : primary1Color,
      boxShadow: '0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24)',
    },
    trackOff: {
      opacity: '0.5',
      backgroundColor:
        calendarStyle && calendarStyle.backgroundColor
          ? calendarStyle.backgroundColor
          : primary1Color,
    },
    thumbSwitched: {
      backgroundColor:
        calendarStyle && calendarStyle.backgroundColor
          ? calendarStyle.backgroundColor
          : primary1Color,
      boxShadow: '0 0 1px 0 rgba(0,0,0,0.12), 0 1px 1px 0 rgba(0,0,0,0.24)',
    },
    trackSwitched: {
      opacity: '0.5',
      backgroundColor:
        calendarStyle && calendarStyle.backgroundColor
          ? calendarStyle.backgroundColor
          : primary1Color,
    },
    border: {
      border: '1px solid #E6E9ED',
      borderRadius: '2px',
    },
    errorBorder: {
      position: 'relative',
      borderWidth: 1,
      borderColor: '#f00',
      borderStyle: 'solid',
      boxSizing: 'border-box',
      width: width || '100%',
      height: height || '100%',
      overflow: 'hidden',
      flexDirection: 'row',
      flexWrap: 'nowrap',
    },
    slider: {
      padding: '0 16px',
    },
    errorMsg: {
      color: '#D0021B',
      fontSize: '12px',
    },
    popOver: {
      position: 'fixed',
      margin: `-${high}px 0 0 0`,
      backgroundColor: '#FFEEF0',
      padding: '4px 6px',
      boxSizing: 'border-box',
      zIndex: 99,
    },
  };
}

export default class Picker extends UiBase {
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
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调函数
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置input的样式
     */
    inputStyle: PropTypes.object,
    /**
     * 设置日历的样式
     */
    calendarStyle: PropTypes.object,
  };
  static defaultProps = {
    pickerStyle: {},
    inputStyle: {},
    calendarStyle: {},
    heightPhi: 0.7,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      isSelectActive: false,
      isDetailMode: false,
      minDate: new Date(),
      buttonName: null,
      firstSlider: 24,
      secondSlider: 60,
      error: false,
      errorText: null,
    };
  }

  onSelectClick = () => {
    this.setState({
      isSelectActive: !this.state.isSelectActive,
    });
  };
  onChange = (range) => {
    const d = this._getDataObject(range);
    (this.props.onChange || empty)(d);
  }
  onBgClick = () => {
    this._shrink();
  };
  _shrink() {
    this.setState({
      isSelectActive: false,
    });
  }
  onCheckChange = (e, v) => {
    this.setState({
      isDetailMode: v,
    });
  };
  onDateMaxChange = (v) => {
    const { value } = this.state.data;
    value.$lte = moment(v).format('YYYY-MM-DD HH:mm:ss');
    if (value.$gte) value.$gte = moment(value.$gte).format('YYYY-MM-DD HH:mm:ss');
    this.onChange(value);
    this.setState({});
  };
  onDateMinChange = (v) => {
    const { value } = this.state.data;
    value.$gte = moment(v).format('YYYY-MM-DD HH:mm:ss');
    if (value.$lte) value.$lte = moment(value.$lte).format('YYYY-MM-DD HH:mm:ss');
    this.onChange(value);
    this.setState({});
  };
  //
  onButtonSelect(range, name) {
    this.state.data.value = range;
    this.onChange(range);
    this.setState({
      buttonName: name,
    });
  }
  _genRangeButton = (to) => {
    const { range, name } = to;
    let displayName = name;
    let spliceName = parseFloat(name);

    displayName = spliceName && displayName.split(spliceName).length > 0 && 
      `${spliceName}${Utils.getText(displayName.split(spliceName)[1], this.props.language)}` 
    const { heightPhi, pickerStyle } = this.props;
    const high = pickerStyle.height
      ? pickerStyle.height
      : this._getDefaultHeight() * heightPhi;
    const styles = getStyles(this.props, this.context, this.state, high);
    const isEqual = this.state.buttonName === name;
    const buttonActive = isEqual ? styles.buttonActive : {};
    const buttonStyle = Object.assign({}, styles.button, buttonActive);
    return (
      <FlatButton
        className="z_flatButton"
        backgroundColor={buttonStyle.backgroundColor}
        key={name}
        onTouchTap={() => this.onButtonSelect(range, name)}
        style={buttonStyle}
        labelStyle={buttonStyle}
      >
        {displayName}
      </FlatButton>
    );
  };
  _genTimeSelectorGeneral() {
    const ts = genRecentTime();
    return (
      <div className="z_time-picker-body">
        <div className="z-time-buttons">{ts.map(this._genRangeButton)}</div>
      </div>
    );
  }
  getMinTime = (date) => {
    const starTime = date.getTime();
    const endTime = this.maxCalendar
      ? this.maxCalendar.state.selectedDate.getTime()
      : '';
    if (starTime > endTime) {
      this.setState({
        error: true,
        errorText: '开始时间不该超过结束时间',
      });
    } else {
      this.setState({
        error: false,
        errorText: null,
      });
      this.onDateMinChange(date);
    }
  };
  getMaxTime = (date) => {
    const starTime = this.minCalendar
      ? this.minCalendar.state.selectedDate.getTime()
      : '';
    const endTime = date.getTime();
    if (endTime < starTime) {
      this.setState({
        error: true,
        errorText: '结束时间不该小于开始时间',
      });
    } else {
      this.setState({
        error: false,
        errorText: null,
      });
      this.onDateMaxChange(date);
    }
  };
  _genTimeSelectorDetail() {
    const { value } = this.state.data;
    const { pickerStyle, language } = this.props;
    return (
      <div className="z_time-picker-body">
        <div>
          <Calendar
            style={{ ...pickerStyle.calendarStyle }}
            firstDayOfWeek={0}
            DateTimeFormat={Intl.DateTimeFormat}
            locale={language === 'en' ? 'en-US' : language === 'ja' ? 'ja' : 'zh-CN'}
            ref={(r) => { this.minCalendar = r; }}
            language={this.props.language}
            span={Utils.getText('开始时间', this.props.language)}
            initialDate={value.$gte}
            onPassValue={this.getMinTime}
            getState={this.onDateMinChange}
          />
        </div>
        <div className="z_time-calendar">
          <Calendar
            style={{ ...pickerStyle.calendarStyle }}
            locale={language === 'en' ? 'en-US' : language === 'ja' ? 'ja' : 'zh-CN'}
            firstDayOfWeek={0}
            DateTimeFormat={Intl.DateTimeFormat}
            ref={(r) => { this.maxCalendar = r; }}
            span={Utils.getText('结束时间', this.props.language)}
            initialDate={value.$lte}
            language={this.props.language}
            onPassValue={this.getMaxTime}
            getState={this.onDateMaxChange}
          />
        </div>
      </div>
    );
  }
  _genTimeSelector = () =>
    !this.state.isDetailMode
      ? this._genTimeSelectorGeneral()
      : this._genTimeSelectorDetail();
  _genPopover(height) {
    const styles = getStyles(this.props, this.context, this.state, height);
    const inputWrapper = this.inputWrapper;
    let minWidth;
    let menuStyle = {};
    if (inputWrapper) {
      minWidth = inputWrapper.clientWidth + styles.root.borderWidth * 2;
      menuStyle = { minWidth };
      Object.assign(menuStyle, styles.timePanel);
    }
    return (
      <Popover
        open={this.state.isSelectActive}
        anchorEl={inputWrapper}
        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
        onRequestClose={this.onBgClick}
        useLayerForClickAway
        canAutoPosition={false}
        style={Object.assign({}, styles.popover, menuStyle)}
      >
        <div style={styles.timePanelWrapper}>
          <div className="z_time-picker-head" style={styles.timePickerHead}>
            <span>{Utils.getText('最近', this.props.language)}</span>
            <Toggle
              style={styles.toggle}
              thumbStyle={styles.thumbOff}
              trackStyle={styles.trackOff}
              thumbSwitchedStyle={styles.thumbSwitched}
              trackSwitchedStyle={styles.trackSwitched}
              toggled={this.state.isDetailMode}
              onToggle={this.onCheckChange}
            />
            <span style={styles.ml10}>{Utils.getText('指定时间', this.props.language)}</span>
          </div>
          <Divider style={styles.divider} />
          {this._genTimeSelector()}
        </div>
      </Popover>
    );
  }
  _genError(height) {
    const { state, props, context } = this;
    const styles = getStyles(props, context, state, height);
    const width = this.inputWrapper
      ? this.inputWrapper.offsetWidth
      : null;
    if (this.state.errorText) {
      return (
        <div style={Object.assign({}, styles.popOver, width)}>
          <span style={styles.errorMsg}>{this.state.errorText}</span>
        </div>
      );
    } else {
      return null;
    }
  }
  _genUI() {
    this.state.data.value = parseRange(this.state.data.value);
    const { value } = this.state.data;
    const { heightPhi, pickerStyle } = this.props;
    const { error } = this.state;
    const high = pickerStyle.height
      ? pickerStyle.height
      : this._getDefaultHeight() * heightPhi;
    const styles = getStyles(this.props, this.context, this.state, high);
    const rootStyle = Object.assign({}, styles.root, { height: `${high}px` });
    const maxWidth = null;
    const style = Object.assign({ high }, this._getSelectorStyle());
    return (
      <div className="z_select-container" style={style}>
        <div
          className="z_input-container"
          style={!error ? rootStyle : styles.errorBorder}
          ref={(r) => { this.inputWrapper = r; }}
          onClick={this.onSelectClick}
        >
          <EventNote style={Object.assign({}, styles.icon, { minWidth: 12 })} />
          <div
            className="z_time-value-container"
            style={Object.assign({}, styles.timeInput, { maxWidth })}
          >
            {getDisplayValue(
              value,
              this.state.isDetailMode ? null : this.state.buttonName, this.props.language
            )}
          </div>
          <OpenIcon style={styles.rightIcon} />
        </div>
        {this._genPopover(high)}
        { (error  && this.state.isActive ) || ( error && this.state.isSelectActive) ? this._genError(high) : null}
      </div>
    );
  }
  render() {
    return super.render();
  }
}
