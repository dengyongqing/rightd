
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import EnhancedButton from 'material-ui/internal/EnhancedButton';

function getStyles(props, context, state) {
  const {selected, year} = props;
  const {baseTheme, datePicker} = context.muiTheme;
  const {hover} = state;
  const { style } = props;
  const unSelect = Object.keys(style).length !==0 && style.color ? style.color : baseTheme.palette.textColor;
  const select = Object.keys(style).length !== 0 && style.selectedColor ? style.selectedColor : datePicker.selectColor
  return {
    root: {
      boxSizing: 'border-box',
      color: Object.keys(style).length !== 0 && style.color ? style.color : datePicker.color,
      display: 'block',
      fontSize: 14,
      margin: '0 auto',
      position: 'relative',
      textAlign: 'center',
      lineHeight: 'inherit',
      WebkitTapHighlightColor: 'rgba(0,0,0,0)', // Remove mobile color flashing (deprecated)
    },
    label: {
      alignSelf: 'center',
      color: hover || selected ? select : unSelect,
      fontSize: selected ? 26 : 17,
      fontWeight: hover ? 450 : selected ? 500 : 400,
      position: 'relative',
      top: -1,
    },
  };
}

class YearButton extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    /**
     * The css class name of the root element.
     */
    className: PropTypes.string,
    onTouchTap: PropTypes.func,
    selected: PropTypes.bool,
    year: PropTypes.number.isRequired,
    style: {}
  };

  static defaultProps = {
    selected: false,
    style: {}
  };

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };

  state = {
    hover: false,
  };

  handleMouseEnter = () => {
    this.setState({hover: true});
  };

  handleMouseLeave = () => {
    this.setState({hover: false});
  };

  handleTouchTap = (event) => {
    if (this.props.onTouchTap) {
      this.props.onTouchTap(event, this.props.year);
    }
  };

  render() {
    const {
      children,
      className, // eslint-disable-line no-unused-vars
      onTouchTap, // eslint-disable-line no-unused-vars
      selected, // eslint-disable-line no-unused-vars
      year, // eslint-disable-line no-unused-vars
      ...other
    } = this.props;

    const {prepareStyles} = this.context.muiTheme;
    const styles = getStyles(this.props, this.context, this.state);

    return (
      <EnhancedButton
        {...other}
        disableFocusRipple={true}
        disableTouchRipple={true}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onTouchTap={this.handleTouchTap}
        style={styles.root}
      >
        <span style={prepareStyles(styles.label)}>
          {children}
        </span>
      </EnhancedButton>
    );
  }
}

export default YearButton;