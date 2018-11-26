
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import MonthButton from './MonthButton';
import {cloneDate} from './dateUtils';

class CalendarMonths extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    locale: PropTypes.string.isRequired,
    maxDate: PropTypes.object.isRequired,
    minDate: PropTypes.object.isRequired,
    onTouchTapMonth: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    wordings: PropTypes.object,
    style: PropTypes.object
  };
  static defaultProps = {
    style: {}
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  componentDidMount() {
    this.scrollToSelectedYear();
  }

  componentDidUpdate() {
    this.scrollToSelectedYear();
  }

  getMonths() {
    const {
      DateTimeFormat,
      locale,
      minDate,
      maxDate,
      selectedDate,
      style
    } = this.props;

    
    const months = [];
    const minMonth = 0;
    const maxMonth = 11;
    const dateCheck = cloneDate(selectedDate);
    for (let month = minMonth; month <= maxMonth; month++) {
      dateCheck.setMonth(month)
      dateCheck.setMonth(month);
      const selected = selectedDate.getMonth() === month;
      const selectedProps = {};
      if (selected) {
        selectedProps.ref = 'selectedMonthButton';
      }
      const monthFormated = new DateTimeFormat(locale, {
        month: 'numeric',
      }).format(dateCheck);

      const monthButton = (
        <MonthButton
          style={{color: style.color, selectedColor: style.selectColor}}
          key={`yb${month}`}
          onTouchTap={this.handleTouchTapMonth}
          selected={selected}
          month={month}
          {...selectedProps}
        >
          {monthFormated}
        </MonthButton>
      );

      months.push(monthButton);
    }

    return months;
  }

  scrollToSelectedYear() {
    if (this.refs.selectedMonthButton === undefined) {
      return;
    }

    const container = ReactDOM.findDOMNode(this);
    const yearButtonNode = ReactDOM.findDOMNode(this.refs.selectedMonthButton);

    const containerHeight = container.clientHeight;
    const yearButtonNodeHeight = yearButtonNode.clientHeight || 32;

    const scrollYOffset = (yearButtonNode.offsetTop + yearButtonNodeHeight / 2) - containerHeight / 2;
    container.scrollTop = scrollYOffset;
  }
    handleTouchTapMonth = (event, month) => {
        if (this.props.onTouchTapMonth) {
            this.props.onTouchTapMonth(event, month);
        }
    };

  render() {
    const {
      prepareStyles,
      datePicker: {
        calendarYearBackgroundColor,
      },
    } = this.context.muiTheme;
    const { yearBgc } = this.props.style;
    const styles = {
      root: {
        backgroundColor: yearBgc && yearBgc.backgroundColor ? yearBgc.backgroundColor : calendarYearBackgroundColor,
        height: 'inherit',
        lineHeight: '35px',
        overflowX: 'hidden',
        overflowY: 'scroll',
        position: 'relative',
      },
      child: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100%',
      },
    };

    return (
      <div style={prepareStyles(styles.root)}>
        <div style={prepareStyles(styles.child)}>
          {this.getMonths()}
        </div>
      </div>
    );
  }
}

export default CalendarMonths;