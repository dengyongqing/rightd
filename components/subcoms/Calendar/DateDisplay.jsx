
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import transitions from 'material-ui/styles/transitions';
import SlideInTransitionGroup from 'material-ui/internal/SlideIn';
import TextField from 'material-ui/TextField';

function getStyles(props, context, state) {
  const {datePicker, palette} = context.muiTheme;
  const { textColor, primary1Color } = palette;
  const {selectedYear} = state;
  const { style } = props;
  const isLandscape = props.mode === 'landscape';
  const styles = {
    root: {
      width: isLandscape ? 165 : '100%',
      height: isLandscape ? 330 : 'auto',
      padding: '15px 0',
      float: isLandscape ? 'left' : 'none',
      fontWeight: 700,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderTopLeftRadius: 2,
      borderTopRightRadius: isLandscape ? 0 : 2,
      borderBottomLeftRadius: isLandscape ? 2 : 0,
      color: textColor,
      boxSizing: 'border-box',
    },
    monthDayTitle: {
      width: '100px',
      color: Object.keys(style).length !==0 && style.color ? style.color : primary1Color,
      cursor: !selectedYear ? 'default' : 'pointer',
    },
    label: {
        fontWeight: 'normal',
        fontSize: '14px',
        color: Object.keys(style).length !==0 && style.textColor ? style.textColor : textColor
    }
  };

  return styles;
}

class DateDisplay extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    disableYearSelection: PropTypes.bool,
    locale: PropTypes.string.isRequired,
    mode: PropTypes.oneOf(['portrait', 'landscape']),
    monthDaySelected: PropTypes.bool,
    onTouchTapMonthDay: PropTypes.func,
    onTouchTapYear: PropTypes.func,
    selectedDate: PropTypes.object.isRequired,
    style: PropTypes.object,
    span: PropTypes.string,
    style: PropTypes.object
  };

  static defaultProps = {
    disableYearSelection: false,
    monthDaySelected: true,
    style: {}
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    selectedYear: false,
    transitionDirection: 'up',
  };

  componentWillMount() {
    if (!this.props.monthDaySelected) {
      this.setState({selectedYear: true});
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedDate !== this.props.selectedDate) {
      const direction = nextProps.selectedDate > this.props.selectedDate ? 'up' : 'down';
      this.setState({
        transitionDirection: direction,
      });
    }

    if (nextProps.monthDaySelected !== undefined) {
      this.setState({
        selectedYear: !nextProps.monthDaySelected,
      });
    }
  }

  handleTouchTapMonthDay = () => {
    if (this.props.onTouchTapMonthDay && this.state.selectedYear) {
      this.props.onTouchTapMonthDay();
    }

    this.setState({selectedYear: false});
  };

  handleTouchTapYear = () => {
    if (this.props.onTouchTapYear && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.onTouchTapYear();
    }

    if (!this.props.disableYearSelection) {
      this.setState({selectedYear: true});
    }
  };

  render() {
    const {
      DateTimeFormat,
      disableYearSelection, // eslint-disable-line no-unused-vars
      locale,
      mode, // eslint-disable-line no-unused-vars
      monthDaySelected, // eslint-disable-line no-unused-vars
      onTouchTapMonthDay, // eslint-disable-line no-unused-vars
      onTouchTapYear, // eslint-disable-line no-unused-vars
      selectedDate, // eslint-disable-line no-unused-vars
      style,
      span,
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);
    const dateTime = new DateTimeFormat(locale, {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    }).format(selectedDate);
    
    return (
      <div {...other} style={prepareStyles(styles.root, style)}>
        <div style={styles.label}>{span}</div>
          <div
            key={dateTime}
            onTouchTap={this.handleTouchTapMonthDay}
            style={styles.monthDayTitle}
          >
            {dateTime}
            {/* <TextField 
              style={{
                width: 100,
                fontSize: 12
              }}
              defaultValue={dateTime}
            >
            </TextField> */}
          </div>
      </div>
    );
  }
}

export default DateDisplay;