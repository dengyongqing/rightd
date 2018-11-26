import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EventListener from 'react-event-listener';

import keycode from 'keycode';
import transitions from 'material-ui/styles/transitions';
import CalendarActionButtons from './CalendarActionButtons';
import CalendarMonth from './CalendarMonth';
import CalendarYear from './CalendarYear';
import CalendarMonths from './CalendarMonths';
import CalendarToolbar from './CalendarToolbar';
import DateDisplay from './DateDisplay';
import SlideInTransitionGroup from 'material-ui/internal/SlideIn';
import Slider from 'material-ui/Slider';
import TextField from 'material-ui/TextField';
import './index.css';
import Utils from './../../../lib/utils';

import {
  addDays,
  addMonths,
  addYears,
  cloneDate,
  dateTimeFormat,
  isAfterDate,
  isBeforeDate,
  getFirstDayOfMonth,
  localizedWeekday,
  monthDiff,
} from './dateUtils';

const daysArray = [...Array(7)];
class Calendar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    autoOk: PropTypes.bool,
    cancelLabel: PropTypes.node,
    disableYearSelection: PropTypes.bool,
    disableMonthSelection: PropTypes.bool,
    firstDayOfWeek: PropTypes.number,
    initialDate: PropTypes.object,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object,
    minDate: PropTypes.object,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    okLabel: PropTypes.node,
    onTouchTapCancel: PropTypes.func,
    onTouchTapDay: PropTypes.func,
    onTouchTapOk: PropTypes.func,
    open: PropTypes.bool,
    shouldDisableDate: PropTypes.func,
    span: PropTypes.string,
    onPassValue: PropTypes.func,
    style: PropTypes.object,
  };
  static defaultProps = {
    DateTimeFormat: dateTimeFormat,
    disableYearSelection: false,
    disableMonthSelection: false,
    initialDate: new Date(),
    locale: 'en-US',
    minDate: addYears(new Date(), -100),
    maxDate: addYears(new Date(), 100),
    span: '开始时间：',
    style: {},
    language: 'zh'
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  state = {
    displayDate: undefined,
    displayMonthDay: true,
    selectedDate: undefined,
    isYearSelector: false,
    transitionDirection: 'left',
    transitionEnter: true,
    hourError: false,
    minuteError: false,
    secondError: false,
    defaultValue: '00',
    hour: '00',
    minute: '00',
    second: '00',
  };
  componentWillMount() {
    this.setState({
      displayDate: getFirstDayOfMonth(this.props.initialDate),
      selectedDate: this.props.initialDate,
      hour: this.props.initialDate.getHours(),
      minute: this.props.initialDate.getMinutes(),
      second: this.props.initialDate.getSeconds(),
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.initialDate !== this.props.initialDate) {
      const date = nextProps.initialDate || new Date();
      this.setState({
        displayDate: getFirstDayOfMonth(date),
        selectedDate: date,
      });
    }
  }
  getSelectedDate() {
    return this.state.selectedDate;
  }

  isSelectedDateDisabled() {
    if (!this.state.displayMonthDay) {
      return false;
    }

    return this.refs.calendar.isSelectedDateDisabled();
  }

  addSelectedDays(days) {
    this.setSelectedDate(addDays(this.state.selectedDate, days));
  }

  addSelectedMonths(months) {
    this.setSelectedDate(addMonths(this.state.selectedDate, months));
  }

  addSelectedYears(years) {
    this.setSelectedDate(addYears(this.state.selectedDate, years));
  }

  setDisplayDate(date, newSelectedDate) {
    const newDisplayDate = getFirstDayOfMonth(date);
    const direction = newDisplayDate > this.state.displayDate ? 'left' : 'right';
    if (newDisplayDate !== this.state.displayDate) {
      this.setState({
        displayDate: newDisplayDate,
        transitionDirection: direction,
        selectedDate: newSelectedDate || this.state.selectedDate,
      });
    }
  }

  setSelectedDate(date) {
    let adjustedDate = date;

    if (isBeforeDate(date, this.props.minDate)) {
      adjustedDate = this.props.minDate;
    } else if (isAfterDate(date, this.props.maxDate)) {
      adjustedDate = this.props.maxDate;
    }
    const newDisplayDate = getFirstDayOfMonth(adjustedDate);
    if (newDisplayDate !== this.state.displayDate) {
      this.setDisplayDate(newDisplayDate, adjustedDate);
    }
    this.setState({
      selectedDate: adjustedDate,
    });
  }

  handleTouchTapDay = (event, date) => {
    this.setSelectedDate(date);
    if (this.props.onTouchTapDay) this.props.onTouchTapDay(event, date);
    if (this.props.onPassValue) {
      this.props.onPassValue(date);
    }
  };

  handleMonthChange = (months) => {
    this.setState({
      transitionDirection: months >= 0 ? 'left' : 'right',
      displayDate: addMonths(this.state.displayDate, months),
    });
  };

  handleTouchTapYear = (event, year) => {
    const date = cloneDate(this.state.selectedDate);
    date.setFullYear(year);
    this.setSelectedDate(date, event);
    this.setState({
      displayMonthDay: true,
    });
    if (this.props.onPassValue) {
      this.props.onPassValue(date);
    }
  };
  handleTouchTapMonths = (event, month) => {
    const date = cloneDate(this.state.selectedDate);
    date.setMonth(month);
    this.setSelectedDate(date, event);
    this.setState({
      displayMonthDay: true,

    });
    if (this.props.onPassValue) {
      this.props.onPassValue(date);
    }
  };

  getToolbarInteractions() {
    return {
      prevMonth: monthDiff(this.state.displayDate, this.props.minDate) > 0,
      nextMonth: monthDiff(this.state.displayDate, this.props.maxDate) < 0,
    };
  }

  handleTouchTapDateDisplayMonthDay = () => {
    this.setState({
      displayMonthDay: true,
    });
  };

  handleTouchTapDateDisplayYear = () => {
    this.setState({
      displayMonthDay: false,
      isYearSelector: true,
    });
  };
  handleTouchTapDateDisplayMonth = () => {
    this.setState({
      displayMonthDay: false,
      isYearSelector: false,
    });
  }


  handleWindowKeyDown = (event) => {
    if (this.props.open) {
      switch (keycode(event)) {
        case 'up':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(-1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(-1);
          } else {
            this.addSelectedDays(-7);
          }
          break;

        case 'down':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
          } else {
            this.addSelectedDays(7);
          }
          break;

        case 'right':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(1);
          } else {
            this.addSelectedDays(1);
          }
          break;

        case 'left':
          if (event.altKey && event.shiftKey) {
            this.addSelectedYears(-1);
          } else if (event.shiftKey) {
            this.addSelectedMonths(-1);
          } else {
            this.addSelectedDays(-1);
          }
          break;
      }
    }
  };

  yearSelector() {
    if (!this.props.disableYearSelection) {
      return (
        <CalendarYear
          key="years"
          DateTimeFormat={this.props.DateTimeFormat}
          locale={this.props.locale}
          onTouchTapYear={this.handleTouchTapYear}
          selectedDate={this.state.selectedDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
        />
      );
    }
  }
  monthSelector() {
    if (!this.props.disableMonthSelection) {
      return (
        <CalendarMonths
          key="months"
          DateTimeFormat={this.props.DateTimeFormat}
          locale={this.props.locale}
          onTouchTapMonth={this.handleTouchTapMonths}
          selectedDate={this.state.selectedDate}
          minDate={this.props.minDate}
          maxDate={this.props.maxDate}
        />
      );
    }
  }
  handleFirstSlider = (e, value) => {
    this.setState({
      firstSlider: value,
    });
  }
  handleSecondSlider = (e, value) => {
    this.setState({
      sencondSlider: value,
    });
  }
  inputActive = (e, v) => {
    const { defaultValue, hour, minute, second } = this.state;
    const reg = /^\d+$/g;
    switch (e.currentTarget.name) {
      case 'hour':
        let isNum = reg.test(v);
        if (isNum) {
          if (v < 0 || v > 23 || v.length > 2) {
            this.setState({
              hourError: true,
            });
            return;
          } else {
            this.setState({
              hourError: false,
            });
          }
          const date1 = this.state.selectedDate;
          date1.setHours(v);
          this.setState({
            selectedDate: date1,
          });
          if (this.props.onPassValue) {
            this.props.onPassValue(this.state.selectedDate);
          }
        } else {
          this.setState({
            hourError: true,
          });
        }
        break;

      case 'minute':
        isNum = reg.test(v);
        if (isNum) {
          if (v < 0 || v > 59 || v.length > 2) {
            this.setState({
              minuteError: true,
            });
            return;
          } else {
            this.setState({
              minuteError: false,
            });
          }
          const date2 = this.state.selectedDate;
          date2.setMinutes(v);
          this.setState({
            selectedDate: date2,
          });
          if (this.props.onPassValue) {
            this.props.onPassValue(this.state.selectedDate);
          }
        } else {
          this.setState({
            minuteError: true,
          });
        }
        break;

      case 'second':
        isNum = reg.test(v);
        if (isNum) {
          if (v < 0 || v > 59 || v.length > 2) {
            this.setState({
              secondError: true,
            });
            return;
          } else {
            this.setState({
              secondError: false,
            });
          }
          const date3 = this.state.selectedDate;
          date3.setSeconds(v || second);
          this.setState({
            selectedDate: date3,
          });
          if (this.props.onPassValue) {
            this.props.onPassValue(this.state.selectedDate);
          }
        } else {
          this.setState({
            secondError: true,
          });
        }
        break;
    }
  }
  render() {
    const { prepareStyles, datePicker, palette } = this.context.muiTheme;
    const { textColor } = palette;
    const toolbarInteractions = this.getToolbarInteractions();
    const isLandscape = this.props.mode === 'landscape';
    const { calendarTextColor } = this.context.muiTheme.datePicker;
    const { hourError, minuteError, secondError, defaultValue, hour, minute, second } = this.state;
    const styles = {
      root: {
        color: calendarTextColor,
        userSelect: 'none',
        width: isLandscape ? 479 : 310,
      },
      calendar: {
        display: 'flex',
        flexDirection: 'column',
        paddingTop: '25px',
      },
      calendarContainer: {
        display: 'flex',
        alignContent: 'space-between',
        justifyContent: 'space-between',
        flexDirection: 'column',
        fontSize: 12,
        fontWeight: 400,
        padding: '0px 8px',
        transition: transitions.easeOut(),
      },
      yearContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
        height: 272,
        marginTop: 10,
        overflow: 'hidden',
        width: 310,
      },
      weekTitle: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        fontWeight: '500',
        height: 20,
        lineHeight: '15px',
        opacity: '.8',
        textAlign: 'center',

      },
      weekTitleDay: {
        color: textColor,
        width: 42,
      },
      transitionSlide: {
        height: 214,
      },
      timeWrap: {
        width: '100%',
        height: '36px',
        lineHeight: '36px',
        paddingBottom: '20px',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex',
        paddingLeft: '20px',
        paddingRight: '20px',
        boxSizing: 'border-box',
      },
      detailTime: {
        flex: 1,
        display: 'flex',
        alignItems: 'center',
      },
      textField: {
        width: '100%',
      },
      inputStyle: {
        fontSize: '12px',
        color: textColor,
      },
      units: {
        fontSize: '12px',
        marginLeft: '4px',
        color: textColor,
      },
      underlineStyle: {
        borderBottom: `1px solid ${textColor}`,
      },
      errorStyle: {
        borderBottom: '1px solid #f00',
      },
      underlineFocusStyle: {
        borderBottom: `1px solid ${datePicker.selectColor}`,
      },
    };

    const weekTitleDayStyle = prepareStyles(styles.weekTitleDay);
    const {
      minDate,
      maxDate,
      cancelLabel,
      DateTimeFormat,
      firstDayOfWeek,
      locale,
      okLabel,

      onTouchTapCancel, // eslint-disable-line no-unused-vars
      onTouchTapOk, // eslint-disable-line no-unused-vars
      style,
    } = this.props;
    return (
      <div style={prepareStyles(Object.assign({}, styles.root, style))}>
        <EventListener
          target="window"
          onKeyDown={this.handleWindowKeyDown}
        />
        <CalendarToolbar
          DateTimeFormat={DateTimeFormat}
          locale={locale}
          displayDate={this.state.displayDate}
          disableYearSelection={this.props.disableYearSelection}
          disableMonthSelection={this.props.disableMonthSelection}
          onTouchTapMonth={this.handleTouchTapDateDisplayMonth}
          onTouchTapMonthDay={this.handleTouchTapDateDisplayMonthDay}
          onTouchTapYear={this.handleTouchTapDateDisplayYear}
          onMonthChange={this.handleMonthChange}
          prevMonth={toolbarInteractions.prevMonth}
          nextMonth={toolbarInteractions.nextMonth}
          selectedDate={this.state.selectedDate}
        />
        <div style={prepareStyles(styles.calendar)}>
          {this.state.displayMonthDay &&
            <div style={prepareStyles(styles.calendarContainer)}>
              <div style={prepareStyles(styles.weekTitle)}>
                {daysArray.map((event, i) => (
                  <span key={i} style={weekTitleDayStyle}>
                    {localizedWeekday(DateTimeFormat, locale, i, firstDayOfWeek)}
                  </span>
                ))}
              </div>
              <SlideInTransitionGroup direction={this.state.transitionDirection} style={styles.transitionSlide}>
                <CalendarMonth
                  DateTimeFormat={DateTimeFormat}
                  locale={locale}
                  displayDate={this.state.displayDate}
                  firstDayOfWeek={this.props.firstDayOfWeek}
                  key={this.state.displayDate.toDateString()}
                  minDate={minDate}
                  maxDate={maxDate}
                  onTouchTapDay={this.handleTouchTapDay}
                  ref="calendar"
                  selectedDate={this.state.selectedDate}
                  shouldDisableDate={this.props.shouldDisableDate}
                />
              </SlideInTransitionGroup>
            </div>
          }
          {!this.state.displayMonthDay && this.state.isYearSelector ?
            <div style={prepareStyles(Object.assign({}, styles.yearContainer, style))}>
              {this.yearSelector()}
            </div>
            : null
          }
          {
            !this.state.displayMonthDay && !this.state.isYearSelector ?
              <div style={prepareStyles(Object.assign({}, styles.yearContainer, style))}>
                {this.monthSelector()}
              </div>
            : null
          }
          {okLabel &&
            <CalendarActionButtons
              autoOk={this.props.autoOk}
              cancelLabel={cancelLabel}
              okLabel={okLabel}
              onTouchTapCancel={onTouchTapCancel}
              onTouchTapOk={onTouchTapOk}
            />
          }
          <div style={styles.timeWrap}>
            <div className="z_time" style={styles.detailTime}>
              <TextField
                name="hour"
                defaultValue={hour}
                style={styles.textField}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={hourError ? styles.errorStyle : styles.underlineFocusStyle}
                onChange={this.inputActive}
              />
              <span style={styles.units}>{Utils.getText('时', this.props.language)}</span>
            </div>
            <div className="z_time" style={styles.detailTime}>
              <TextField
                name="minute"
                defaultValue={minute}
                style={styles.textField}
                underlineFocusStyle={minuteError ? styles.errorStyle : styles.underlineFocusStyle}
                inputStyle={styles.inputStyle}
                onChange={this.inputActive}
              />
              <span style={styles.units}>{Utils.getText('分', this.props.language)}</span>
            </div>
            <div className="z_time" style={styles.detailTime}>
              <TextField
                name="second"
                defaultValue={second}
                style={styles.textField}
                inputStyle={styles.inputStyle}
                underlineFocusStyle={secondError ? styles.errorStyle : styles.underlineFocusStyle}
                onChange={this.inputActive}
              />
              <span style={styles.units}>{Utils.getText('秒', this.props.language)}</span>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

export default Calendar;
