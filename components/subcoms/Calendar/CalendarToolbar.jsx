
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import IconButton from 'material-ui/IconButton';
import NavigationChevronLeft from 'material-ui/svg-icons/navigation/chevron-left';
import NavigationChevronRight from 'material-ui/svg-icons/navigation/chevron-right';
import SlideInTransitionGroup from 'material-ui/internal/SlideIn';
import TextField from 'material-ui/TextField';
import DropIcon from 'material-ui/svg-icons/navigation/arrow-drop-down';

function getStyles(props, context, state) {
  const { datePicker, palette} = context.muiTheme;
  const { textColor, primary1Color } = palette;
  const {selectedYear} = state;
  const { style } = props;
  const isLandscape = props.mode === 'landscape';
  const styles = {
    root: {
      display: 'flex',
      justifyContent: 'space-between',
      backgroundColor: 'inherit',
      height: 48,
      color: Object.keys(style).length !== 0 && style.color ? style.color : textColor
    },
    titleText: {
      flex: 1,
      height: 'inherit',
      position: 'relative',
      // paddingTop: 12,
    },
    TextField: {
      width: '100%',
      fontSize: Object.keys(style).length !== 0 && style.fontSize ? style.fontSize : 12,
    },
    inputStyle: {
      color: Object.keys(style).length !== 0 && style.color ? style.color : textColor,
    },
    underlineStyle: {
      borderBottom: `1px solid ${textColor}`,
    },
    underlineFocusStyle: {
      borderBottom: Object.keys(style).length !== 0 && style.backgroundColor ? `1px solid style.color` : `1px solid ${primary1Color}`
    },
    mr30: {
      marginRight: '30px'
    },
    dropIcon: {
      position: 'absolute',
      right: '-8px',
      bottom: '12px'
    }
  };
  return styles;
}

class CalendarToolbar extends Component {
  static propTypes = {
    DateTimeFormat: PropTypes.func.isRequired,
    displayDate: PropTypes.object.isRequired,
    locale: PropTypes.string.isRequired,
    nextMonth: PropTypes.bool,
    onMonthChange: PropTypes.func,
    prevMonth: PropTypes.bool,
    selectedDate: PropTypes.object.isRequired,
    onTouchTapYear: PropTypes.func,
    onTouchTapMonth: PropTypes.func,
    style: PropTypes.object
  };

  static defaultProps = {
    nextMonth: true,
    prevMonth: true,
    style: {}
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  state = {
    selectedYear: false,
    selectedMonth: false,
    transitionDirection: 'up',
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.displayDate !== this.props.displayDate) {
      const direction = nextProps.displayDate > this.props.displayDate ? 'left' : 'right';
      this.setState({
        transitionDirection: direction,
      });
    }
  }

  handleTouchTapPrevMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(-1);
    }
  };

  handleTouchTapNextMonth = () => {
    if (this.props.onMonthChange) {
      this.props.onMonthChange(1);
    }
  };
  handleTouchTapYear = () => {
    if (this.props.onTouchTapYear && !this.props.disableYearSelection && !this.state.selectedYear) {
      this.props.onTouchTapYear();
    }
  };
  handleTouchTapMonth = () => {
    if (this.props.onTouchTapMonth && !this.props.disableMonthSelection && !this.state.selectedYear) {
      this.props.onTouchTapMonth();
    }
  };
  render() {
    const {DateTimeFormat, locale, displayDate, selectedDate, onTouchTapYear} = this.props;
    const {prepareStyles,datePicker, palette} = this.context.muiTheme;
    const { textColor } = palette;
    const styles = getStyles(this.props, this.context, this.state);
    const year = new DateTimeFormat(locale, {
      year: 'numeric',
    }).format(displayDate);
    const month = new DateTimeFormat(locale, {
      month: 'numeric'
    }).format(displayDate);
    return (
      <div style={styles.root}>
        <IconButton
          style={ styles.titletext}
          disabled={!this.props.prevMonth}
          onTouchTap={this.handleTouchTapPrevMonth}
        >
        <NavigationChevronLeft color={textColor}/>
        </IconButton>
         <div key={year} style={Object.assign({},styles.titleText,styles.mr30)} onTouchTap={this.handleTouchTapYear}>
            <TextField
              style={styles.TextField}
              inputStyle={styles.inputStyle}
              id="year"
              value={year}
              readOnly
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <DropIcon style={styles.dropIcon} color={textColor}/>
          </div>
          <div key={month} style={styles.titleText} onTouchTap={this.handleTouchTapMonth}>
            <TextField
              style={styles.TextField}
              inputStyle={styles.inputStyle}
              id="month"
              readOnly
              value={month}
              underlineStyle={styles.underlineStyle}
              underlineFocusStyle={styles.underlineFocusStyle}
            />
            <DropIcon style={styles.dropIcon} color={textColor}/>
          </div>
       
        <IconButton
          style={ styles.titletext}
          disabled={!this.props.nextMonth}
          onTouchTap={this.handleTouchTapNextMonth}
        >
          <NavigationChevronRight color={textColor}/>
        </IconButton>
      </div>
    );
  }
}

export default CalendarToolbar;