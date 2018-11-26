

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import brace from 'brace';
import 'brace/mode/json';
import AceEditor from 'react-ace';

const isArray = v => v && (v === 'array' || v.indexOf('[]') !== -1);
const isObject = v => v === 'json';
const isNull = (d) => {
  if (typeof (d) === 'string') return d === null || d === undefined;
  return d === null || d === undefined || isNaN(d);
};

export function getStyles(props, context) {
  const { palette } = context.muiTheme;
  const { error } = props;
  const { textColor, borderColor, primary1Color } = palette;
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      flexGrow: 1,
    },
    input: {
      boxSizing: 'border-box',
      width: '100%',
      background: 'transparent',
      fontWeight: 'normal',
      border: `1px solid ${borderColor}`,
      borderRadius: '2px',
      outline: 'none',
      appearance: 'none',
      margin: 0,
      fontSize: '14px',
      transition: 'opacity 0.6s ease, color 0.6s ease, border-color 0.6s ease',
      height: 20,
      paddingLeft: '10px',
      opacity: 0.9,
      color: textColor,
      pointerEvents: 'auto',
    },
    error: {
      border: '1px solid #f01000',
    },
    disabled: {
      // background: '#EEEEEE',
      cursor: 'not-allowed',
    },
    show: {
      opacity: 1,
    },
    'input-item-error': {
      position: 'absolute',
      background: '#fae3e3',
      borderRadius: '2px',
      fontSize: '14px',
      color: '#FF1F1F',
      letterSpacing: '0px',
      padding: '7.5px 2px 7.5px 2px',
      // height: '28px',
      opacity: 0,
      minWidth: '160px',
      zIndex: 2,
      transition: 'opacity ease 0.5s',
    },
    hover: {
      border: `1px solid ${primary1Color}`,
      opacity: 1,
    },
  };
}

export default class Input extends React.Component {
  static propTypes = {
    name: PropTypes.any,
    id: PropTypes.string.isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      error: this.props.error,
      value: this.props.value,
    };
  }
  componentDidMount() {
  }
  componentWillReceiveProps(props) {
    if (this.props.error !== props.error) {
      this.setState({
        error: props.error,
      });
    }
  }

  switchHover = () => {
    this.setState({ hover: !this.state.hover });
  }

  getInputType = () => {
    // let type = 'text';
    return 'text';
    // switch (this.props.type) {
    //   case 'float':
    //   case 'int':
    //     type = 'number';
    //     break;
    //   default:
    //     break;
    // }
    // return type;
  }

  onInputChange = (e) => {
    if (!e || !e.nativeEvent | !e.nativeEvent.target) return;
    const vInput = e.nativeEvent.target.value;
    let v = vInput;
    //
    const valueType = this.props.type;
    if (isArray(valueType) || isObject(valueType)) {
      try {
        v = JSON.parse(v);
        this.onSuccess(v);
      } catch (e) {
        return this.onError(vInput);
      }
    }
    //
    if (valueType === 'integer') {
      v = parseInt(v, 10);
      if (isNull(v)) return this.onError(vInput);
      return this.onSuccess(v);
    }
    //
    if (valueType === 'float') {
      if (v[v.length - 1] === '.') return this.onProtect(v);
      v = parseFloat(v, 10);
      if (isNull(v)) return this.onError(vInput);
      return this.onSuccess(v);
    }

    //
    if (v === null || v === undefined) return this.onError(vInput);

    this.onSuccess(v);
    // 成功
  }
  onProtect(v) {
    this.setState({ error: false, text: v });
  }
  onSuccess(v) {
    this.props.onChange(v);
    this.setState({ error: false, text: null });
  }
  onError(v) {
    this.setState({ error: true, text: v });
  }
  render() {
    const { state, props, context } = this;
    const styles = getStyles(props, context);
    const { disabled, description } = props;

    const { error } = state;

    const valueType = this.props.type;
    let value;
    const { text } = this.state;
    if (!isNull(text)) {
      value = text;
    } else {
      value = this.props.value;
      if (isArray(valueType) || isObject(valueType)) value = JSON.stringify(value, null, 2);
    }

    const inputO = Object.assign(
      styles.input, this.props.style,
      error ? styles.error : {},
      disabled ? styles.disabled : {},
      (props.isActive && !disabled && !this.state.error) ? styles.hover : {},
    );

    // const errorStyle = error ? Object.assign({}, styles['input-item-error'], styles.bottom, styles.show):null;
    if (valueType !== 'json') {
      return (
        <div style={styles.wrapper}>
          <input
            type={this.getInputType()}
            style={inputO}
            disabled={disabled}
            onChange={this.onInputChange}
            value={value}
          />
        </div>
      );
    }

    return (
      <AceEditor
        mode="json"
        theme="kuroir"
        onChange={this.onJsonInputChange}
        name="UNIQUE_ID_OF_DIV"
        fontSize={14}
        tabSize={2}
        value={value}
        editorProps={{ $blockScrolling: 'Infinity' }}
        width={'90%'}
        height={'100%'}
      />
    );
  }
}
