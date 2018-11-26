/* /*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/
import React from 'react';
import PropTypes from 'prop-types';
import EventNote from 'material-ui/svg-icons/notification/event-note';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Divider from 'material-ui/Divider';
import Toggle from 'material-ui/Toggle';
import zhCN from 'rc-calendar/lib/locale/zh_CN';
import EN from 'rc-calendar/lib/locale/en_GB';
import JA from 'rc-calendar/lib/locale/ja_JP';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';
import TimePickerPanel from 'rc-time-picker/lib/Panel';
import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import 'moment/locale/zh-cn';
import 'moment/locale/en-gb';
import 'moment/locale/ja';
import { fade, emphasize } from 'material-ui/utils/colorManipulator'
import Utils from './../../lib/utils';
import ZToolTip from './../subcoms/Tooltip';
import UiBase from './../uiBase';
import './index.css';


const switchT = (v) => {
  return v && typeof v === 'string'  ? moment(v, 'YYYY-MM-DD HH:mm:ss').toDate() : v;
};
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
const timePickerElement = (
  <TimePickerPanel
    defaultValue={[moment('00:00:00', 'HH:mm:ss'), moment('23:59:59', 'HH:mm:ss')]}
  />
);

const getDisplayValue = (range, str, lan) => {
  if (range.$gte === undefined || range.$lte === undefined) return '';
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
  const { pickerStyle, helpStyle={} } = props;
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
      fontSize: inputStyle && inputStyle.fontSize ? inputStyle.fontSize : 12,
      fontWeight: inputStyle && inputStyle.fontWeight ? inputStyle.fontWeight : 400
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
    placeholder: {
      color: helpStyle.color || emphasize(palette.textColor, 0.3)
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
      // position: 'fixed',
      // margin: `-${high}px 0 0 0`,
      backgroundColor: '#FFEEF0',
      padding: '4px 6px',
      boxSizing: 'border-box',
      zIndex: 99,
    },
  };
}

const formatStr = 'YYYY-MM-DD HH:mm:ss';

export default class RangeDate extends UiBase {
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
      value: [],
      hoverValue: [],
    };
  }
  onSelectClick = (e) => {
    const { data } = this.state;
    if (data.hoc) {
      e.stopPropagation();
    }
    this.setState({
      isSelectActive: !this.state.isSelectActive,
    });
  };
  _onChange = (range) => {

    (this.onChange || empty)(range);
  }
  onBgClick = (e) => {
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
  onError = () => {
    this.setState({
      error: true,
      errorText: Utils.getText('结束时间不该小于开始时间', this.props.language),
    });
  }
  onDateMaxChange = (v) => {
    let range;
    if (this.state.data.value.range) {
      range = this.state.data.value.range;
    } else {
      range = this.state.data.value;
    }
    range.$lte = moment(v).format('YYYY-MM-DD HH:mm:ss');
    if (range.$gte) range.$gte = moment(range.$gte).format('YYYY-MM-DD HH:mm:ss');
    const startTime = new Date(range.$gte).getTime();
    const endTime = new Date(range.$lte).getTime();
    if (startTime > endTime) {
      return this.onError();
    } else {
      this.setState({
        error: false,
        errorText: null,
      });
      const nv = {
        range,
        name: null,
      };
      return this._onChange(nv);
    }
  };

  onDateMinChange = (v) => {
    let range;
    if (this.state.data.value.range) {
      range = this.state.data.value.range;
    } else {
      range = this.state.data.value;
    }
    range.$gte = moment(v).format('YYYY-MM-DD HH:mm:ss');
    if (range.$lte) range.$lte = moment(range.$lte).format('YYYY-MM-DD HH:mm:ss');
    const startTime = new Date(range.$gte).getTime();
    const endTime = new Date(range.$lte).getTime();
    if (startTime > endTime) {
      return this.onError();
    } else {
      this.setState({
        error: false,
        errorText: null,
      });
      const nv = {
        range,
        name: null,
      };
      return this._onChange(nv);
    }
  };
  onButtonSelect(range, name) {
    this.state.data.value = {
      range,
      name,
    };
    const nv = {
      range,
      name,
    };
    this._onChange(nv);
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
  onStandaloneSelect = (time) => {
    let range;
    if (this.state.data.value.range) {
      range = this.state.data.value.range;
    } else {
      range = this.state.data.value;
    }
    range.$gte = moment(time[0]).format('YYYY-MM-DD HH:mm:ss');
    range.$lte = moment(time[1]).format('YYYY-MM-DD HH:mm:ss')
    const startTime = new Date(range.$gte).getTime();
    const endTime = new Date(range.$lte).getTime();
    const nv = {
      range,
      name: null,
    };

    if (startTime > endTime) {
      return this.onError();
    } else {
      this.setState({
        error: false,
        errorText: null,
      });
      return this._onChange(nv);
    }
  }
  onStandaloneChange = (range) => {
    if (range[0]) this.onDateMinChange(range[0]);
    if (range[1]) this.onDateMaxChange(range[1]);
  }
  _genTimeSelectorDetail() {
    let range;
    const { language } = this.props;
    if (this.state.data.value.range) {
      range = this.state.data.value.range;
    } else {
      range = this.state.data.value;
    }
    if (!range.$gte) {
      range.$gte = new Date()
    }
    if (!range.$lte) {
      range.$lte = new Date()
    }
    const locale = language === 'en' ? EN : language === 'ja' ? JA : zhCN;
    return (
      <RangeCalendar
        showToday={false}
        dateInputPlaceholder={['YYYY-MM-dd HH:mm:ss', 'YYYY-MM-dd HH:mm:ss']}
        locale={locale}
        showOk={false}
        showClear
        format={formatStr}
        defaultSelectedValue={[moment(range.$gte, 'YYYY-MM-dd HH:mm:ss'), moment(range.$lte, 'YYYY-MM-dd HH:mm:ss')]}
        timePicker={timePickerElement}
        onSelect={this.onStandaloneSelect}
      />
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
        useLayerForClickAway={false}
        // canAutoPosition
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
          anchorOrigin={{ horizontal: 'left', vertical: 'top' }}
          targetOrigin={{ horizontal: 'left', vertical: 'bottom' }}
        >
          <span style={styles.errorMsg}>{this.state.errorText}</span>
        </Popover>
      );
    } else {
      return null;
    }
  }
  _genUI() {
    if (this.props.language === 'en') {
      moment.locale('en-gb', { week: { dow: 7 } });
    } else if (this.props.language === 'ja') {
      moment.locale('ja', { week: { dow: 7 } });
    } else {
      moment.locale('zh-cn', { week: { dow: 7 } });
    }
    
    if (this.state.data.value.range) {
      this.state.data.value.range = parseRange(this.state.data.value.range);
    } else {
      this.state.data.value = parseRange(this.state.data.value);
    }
    const { heightPhi, pickerStyle, language, labelFormmat } = this.props;
    const { error, data } = this.state;
    const { placeholder=Utils.getText('请选择时间', language) } = data;
    const high = pickerStyle.height
      ? pickerStyle.height
      : this._getDefaultHeight() * heightPhi;
    const styles = getStyles(this.props, this.context, this.state, high);
    const rootStyle = Object.assign({}, styles.root, { height: `${high}px` });
    const maxWidth = null;
    const style = Object.assign({ high }, this._getSelectorStyle());
    const displayValue = getDisplayValue(
      this.state.data.value.range ? this.state.data.value.range : this.state.data.value,
      this.state.isDetailMode ? null : this.state.buttonName, this.props.language
    );
    return (
      <div className="z_select-container" style={style}>
        <div
          className="z_input-container"
          style={!error ? rootStyle : styles.errorBorder}
          ref={(r) => { this.inputWrapper = r; }}
          onClick={this.onSelectClick}
        >
          <EventNote style={Object.assign({}, styles.icon, { minWidth: 12, paddingLeft: '8px' })} />
          
            <div
              className="z_time-value-container"
              style={Object.assign({}, styles.timeInput, { maxWidth })}
            >
              <ZToolTip
                title={displayValue}
                className="z_tooltip"
                theme="dark custom"
              >
                { displayValue ? displayValue:
                  <span style={styles.placeholder}>{ labelFormmat ? labelFormmat(placeholder) : Utils.getText(placeholder, this.props.language)}</span>
                }
              </ZToolTip>
            </div>
          <OpenIcon style={styles.rightIcon} />
        </div>
        {this._genPopover(high)}
        { (error && this.state.isActive) || (error && this.state.isSelectActive) ? this._genError(high) : null}
      </div>
    );
  }
  render() {
    return super.render();
  }
}
