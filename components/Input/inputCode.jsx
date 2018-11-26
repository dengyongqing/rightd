/*
* @Author: phobal
* @Date:   2016-12-27 18:05:51
 * @Last Modified by: Domon Ji
 * @Last Modified time: 2017-10-17 10:57:15
*/


import React from 'react';
import PropTypes from 'prop-types';
import AceEditor from 'react-ace';
import 'brace/mode/json';
import 'brace/mode/mysql';
import 'brace/mode/javascript';
import 'brace/mode/java';
import 'brace/mode/css';
import 'brace/mode/python';
import 'brace/theme/monokai';
import 'brace/theme/github';
import 'brace/keybinding/emacs';
import 'brace/ext/language_tools';
import Popover from 'material-ui/Popover';
import TouchRipple from 'material-ui/internal/TouchRipple';
import UiBase from './../uiBase';

import getStyles from './getStyles';

const isObject = v => v === 'json';
const JsonV = (v) => {
  let newV;
  try {
    newV = JSON.parse(v);
  } catch (error) {
    return;
  }
  return newV;
};
export default class InputCode extends UiBase {
  static propTypes = {
    /**
     * 输入框的name属性
     */
    name: PropTypes.any,
    /**
     * 当value改变时触发函数
     */
    onChange: PropTypes.func.isRequired,
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  static defaultProps = {
    fontSize: 14,
    editorWidth: 300,
  }
  constructor(props) {
    super(props);
    this.state = {
      error: null, // this.props.error,
      value: null,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    if (this.state.isEditorActive !== nextState.isEditorActive) return this.state.isEditorActive !== nextState.isEditorActive;
    return false;
  }
  componentWillReceiveProps(newprops) {
    const { isOpenEditor, data } = newprops;
    this.setState({
      data,
      isOpenEditor,
      text: null, // 针对input
    });
  }
  onValueChange(vInput) {
    if (vInput === '') return this.onClean();
    const v = vInput;
    const { valueType } = this.props.data;
    if (isObject(valueType)) {
      if (JsonV(v)) {
        return setTimeout(() => this.onSuccess(JsonV(v), v), 0);
      } else {
        return this.onError(v);
      }
    }
    if (v === null || v === undefined) return this.onError(vInput);
    this.onSuccess(v, vInput);
  }
  onSuccess(v, vInput) {
    this.onChange(v);
    this.setState({ error: false, text: vInput });
  }
  onError(v) {
    this.setState({ error: true, text: v });
  }
  onClean(v) {
    this.onChange('');
    this.setState({ text: v });
  }
  onJSONInputClick = () => {
    this.setState({ isEditorActive: true });
  }
  onEditorBgClick = () => {
    this.setState({ isEditorActive: !this.state.isEditorActive });
  }
  _genJSONEditor(value = '') {
    const { disabled, fontSize, heightPhi } = this.props;
    const { error, data } = this.state;
    const { valueType, color } = data;
    const height = this._getDefaultHeight() * heightPhi;
    const styles = getStyles(this.props, this.state, this.context);
    const { canvasColor, textColor } = this.context.muiTheme.baseTheme.palette;
    let theme;
    if (canvasColor === '#303030') {
      theme = 'monokai';
    } else {
      theme = 'github';
    }
    const inputO = Object.assign(
      {}, styles.input, this.props.style, { height },
      error ? styles.error : {},
      disabled ? styles.disabled : {},
      (this.state.isActive && !disabled && !this.state.error) ? styles.hover : {},
    );
    const heightAce = `${288}px`;
    const rootStyle = Object.assign({}, inputO, styles.wrapper, this._getSelectorStyle(), styles.inputJson, {
      width: `${this.props.widthPhi * 100}%`,
      overflow: 'hidden',
    });
    const { container } = this;
    const editorStyle = {
      width: `${container ? container.offsetWidth * 2 : 100}px`,
      height: heightAce,
    };
    return (
      <div
        className="z_input-container"
        style={rootStyle}
        ref={(r) => { this.container = r; }}
      >
        <div
          className="z_input-wrapper-container"
          ref={(r) => { this.inputWrapper = r; }}
          onClick={this.onJSONInputClick}
        >
          <TouchRipple >
            <div style={styles.jsonText}>
              <span style={{}}>{'{ '}</span>
              <span style={{ color: color || textColor, fontWeight: 'bold' }}>{valueType}</span>
              <span style={{}}>{' }'}</span>
            </div>
          </TouchRipple>
          <Popover
            open={this.state.isEditorActive}
            anchorEl={container}
            anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
            targetOrigin={{ horizontal: 'left', vertical: 'top' }}
            onRequestClose={this.onEditorBgClick}
            useLayerForClickAway={false}
            style={Object.assign({}, editorStyle)}
            zDepth={2}
            animated={false}
          >
            <AceEditor
              className="ace-Editor"
              mode={valueType}
              theme={theme}
              name="UNIQUE_ID_OF_DIV"
              onChange={e => this.onValueChange(e)}
              fontSize={fontSize}
              showPrintMargin
              showGutter
              highlightActiveLine
              value={value}
              width={`${100}%`}
              height={heightAce}
              editorProps={{ $blockScrolling: 'Infinity' }}
              style={{
                paddingLeft: '0px',
                height: heightAce,
              }}
              enableBasicAutocompletion
              enableLiveAutocompletion
              keyboardHandler="emacs"
              setOptions={{
                showLineNumbers: true,
                tabSize: 2,
              }}
            />
          </Popover>
        </div>
      </div>
    );
  }
  _genUI() {
    const { valueType } = this.state.data;
    let value;
    const { text, error } = this.state;
    if (error) {
      value = text || '';
    } else {
      value = this.state.data.value;
      if (isObject(valueType)) value = (text === null || text === undefined) ? JSON.stringify(value, null, 2) : text;
    }
    return this._genJSONEditor(value || '');
  }
  render() {
    return super.render();
  }
}
