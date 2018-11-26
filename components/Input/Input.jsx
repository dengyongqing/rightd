import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import DeleteIcon from 'material-ui/svg-icons/navigation/cancel';
import Add from 'material-ui/svg-icons/content/add';
import Remove from 'material-ui/svg-icons/content/remove';
import AceEditor from 'react-ace';
import 'brace/ext/language_tools';
import InputSearcher from './../subcoms/InputSearcher';
import validator from 'validator';
import UiBase from './../uiBase';
import Select from './../Select';
import getStyles from './getStyles';
import { parseValidate } from '../../meta/validation';
import Utils from './../../lib/utils';

const isArray = v => v && (v === 'array' || v.indexOf('[]') !== -1);
const isNull = (d) => {
  if (typeof (d) === 'string') return d === null || d === undefined;
  return d === null || d === undefined || isNaN(d);
};


export default class Input extends UiBase {
  static propTypes = {
    /** * 组件的name属性 */
    name: PropTypes.any,
    /** * 当value改变时触发回调函数 */
    onChange: PropTypes.func.isRequired,
    /** * 设置输入框的类型，如text、password... */
    type: PropTypes.string,
  };
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  static defaultProps = {
    editorWidth: 300,
    type: 'text',
  }
  constructor(props) {
    super(props);
    this.state = {
      error: false, // this.props.error,
      value: null,
      text: null,
      errorText: null,
      isInputActive: false,
    };
    // this.onInputChange = this._onInputChange;// _.debounce(this._onInputChange, 0);
  }
  componentWillReceiveProps(newprops) {
    const { isOpenEditor, data } = newprops;
    const { value } = data;
    const { text } = this.state;
    // console.log(data.showError, this.state.error);
    if (!isNaN(value) && data.valueType === 'float' && parseFloat(value, 10) === parseFloat(text, 10)) {
      this.setState({
        text: this.state.text,
        data,
        isOpenEditor,
      });
    } else {
      this.setState({
        data,
        error: data.showError ? data.showError : this.state.error || null,
        errorText: data.errorMessage ? data.errorMessage : this.state.errorText || null,
        isOpenEditor,
        text: null, // 针对input
      });
    }
  }
  componentDidMount() {
    const { validate, value } = this.state.data;
    window.addEventListener('keydown', this.onUpdateValue, false);
    if (validate === undefined || validate === null) return null;
    const { rules, errormessage } = validate;
    if (rules === undefined || errormessage === undefined) return null;
    const bool = typeof rules === 'function' && rules(value);
    if (!bool) this.setState({ error: true });
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onUpdateValue, false);
  }
  onUpdateValue = (e) => {
    const { numberic } = this.state.data;
    if (this.state.isInputActive && numberic) {
      if (e.keyCode === 38) {
        this.onIncrease();
      } else if (e.keyCode === 40) {
        this.onDecrease();
      }
    } 
  }

  handleDelete = () => {
    this.onValueChange('');
  }
  onTextAreaInputChange = (e) => {
    const { target } = e;
    const value = target.value;
    this.onInputChange(value);
  }
  onInputChange = (vInput) => {
  
    this.onValueChange(vInput);
    
  }
  onValueChange = (vInput) => {
    const validate = (this.state.data || {}).validate || {};
    const { rules, maxLength, range, notNull } = validate;

    if (vInput === '') {
      this.onClean('');
    }
    let v = vInput;
    if (rules && typeof rules === 'object') {
      const check = parseValidate(rules);
      const bol = check(v);
      if (typeof bol === 'string') {
        return this.onError(v, bol);
      }
    }else if (rules && typeof rules === 'function' && !rules(v)) {
      return this.onError(v);
    } else if (v && maxLength) {
      if (v.length > maxLength) return this.onError(v, `字符长度不能超过${maxLength}`);
    } else {
      this.setState({ error: false });
    }
    const { valueType } = this.props.data;
    if ((!vInput || !vInput.length) && notNull) {
      return this.onError(vInput, Utils.getText('输入不能为空', this.props.language));
    }
    if (valueType === 'integer[]') {
      try {
        if (vInput[vInput.length - 1] === ',' || vInput.indexOf(',') === 0) return this.onProtect(vInput);
        let vv = v.replace(/\?/g, null);
        vv = vv.split(',');
        return this.onSuccess(vv, vInput);
      } catch (e) {
        return this.onError(vInput);
      }
    }
    if (valueType === 'string[]') {
      try {
        v = v.split(',');
        return this.onSuccess(v, vInput);
      } catch (e) {
        return this.onError(vInput);
      }
    }
    if (valueType === 'integer') {
      // if (vInput === '') return this.onSuccess(vInput, vInput);
      v = parseInt(v, 10);
      if (isNull(v)) return this.onError(v, Utils.getText('输入不能为空', this.props.language));
      if (range) {
        if (v > range.max || v < range.min) {
          return this.onError(v, `输入请介于${range.min}-${range.max}之间`);
        }
      }
      return this.onSuccess(v, vInput);
    }
    if (valueType === 'float') {
      if (!validator.isFloat(vInput)) return this.onError(vInput);
      if (vInput[vInput.length - 1] === '.' || vInput.indexOf('.') === 0) {
        return this.onProtect(vInput);
      }
      // if (vInput === '') return this.onSuccess(vInput, vInput);
      v = parseFloat(vInput, 10);
      if (isNull(v)) return this.onError(v, Utils.getText('输入不能为空', this.props.language));
      if (range) {
        if (v > range.max || v < range.min) {
          return this.onError(v, `输入请介于${range.min}-${range.max}之间`);
        }
      }
      return this.onSuccess(v, vInput);
    }
    if (v === null || v === undefined) return this.onError(vInput);
    this.onSuccess(v, vInput);
  }
  onProtect(v) {
    this.setState({
      error: false,
      text: v,
    });
  }
  onSuccess(v, vInput) {
    const { valueType } = this.state.data;
    
    this.setState({ error: false, text: vInput });
    if (valueType === 'integer[]') {
      for (let i = 0; i < v.length; i++) {
        if (v[i] === '') v.splice(i, 1);
        if (v[i]) {
          if (v[i] === 'null') {
            v[i] = null;
          } else {
            v[i] = parseInt(v[i], 10);
            if (isNull(v[i])) return this.onError(vInput);
          }
        }
      }
      const d = this._getDataObject(v);
      this.props.onChange(d);
    } else {
      this.onChange(v);
    }
  }
  onError(v, errorText) {
    this.setState({
      error: true,
      text: v,
      errorText: errorText || Utils.getText('请输入合法的数据类型', this.props.language),
    });
  }
  onClean = () => {
    const { valueType } = this.props.data;
    if (valueType === 'integer[]' || valueType === 'string[]') {
      this.onChange([]); this.setState({ text: '' });
    } else {
      this.onChange(''); this.setState({ text: '' });
    }
  }
  _genPopover(height) {
    const styles = getStyles(this.props, this.state, this.context, height);
    const { validate } = this.state.data;
    const errormessage = validate && validate.errormessage ? validate.errormessage : this.state.errorText;
    const width = this.refs.wrap ? this.refs.wrap.offsetWidth : null;
    if (errormessage) {
      return (
        <Popover
          open
          anchorEl={this.refs.wrap}
          anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'left', vertical: 'top' }}
          onRequestClose={this.onBgClick}
          useLayerForClickAway={false}
          style={{ ...styles.popOver, width }}
        >
          <span style={styles.errorMsg} className='z_error'>{errormessage}</span>
        </Popover>
      );
    } else {
      return null;
    }
  }
  handelClick = (e) => { 
    const { onClick, hoc } = this.state.data;
    if (hoc) {
      e.stopPropagation();
    }
    if (onClick) onClick();
  }
  onFocus = () => {
    this.isFocus = true;
  }
  onBlur = () => {
    this.isFocus = false;
  }
  componentWillUpdate() {
    setTimeout(() => {
      if (this.input && this.isFocus) {
        // this.input.focus();
      }
    });
  }
  onInputFocuStateChange = (isActive) => {
    // this.setState({ isActive });
    setTimeout(() => {
      this.setState({ isActive });
    }, 10);
  }
  textAreaBlur = (e, isActive = false) => {
    setTimeout(() => {
      this.setState({ isActive });
      if (!isActive) {
        if (this.textarea) {
          let v = this.textarea.value;
          if (v) {
            this.onInputChange(v);
          }
        }
        
      }
    });
  }
  onInputActiveStateChange = bool => this.setState({ isInputActive: bool });
  onSelectChange = (d) => {
    if (!d) return;
    const unit = d.unit;
    _.set(this.state.data, 'unit', unit);
    this.setState({
      data: this.state.data
    }) 
    const { value } = this.state.data;
    this.onChange(value);
  }

  genUnit() {
    const { data } = this.state;

    const { validate={}, unit } = data;

    const { units } = validate;
    if(!unit) return null;
    return (
      <Select
        ref={(r) => { this.Select = r; }}
        language={this.props.language}
        labelFormmat={this.props.labelFormmat}
        isShowDepth
        isShowTitle={false}
        isActive={this.state.isSelectActive}
        data={{
          isInput: false,
          uiType: 'select',
          valueType: 'string',
          value: unit || '',
          key: 'unit',
          validate: {
            options: units || []
          },
        }}
        heightPhi={this.props.heightPhi || 0.7}
        widthPhi={this.props.widthPhi || 0.9}
        height={this.props.height}
        onChange={d => this.onSelectChange(d)}
      />
    ) 
  }

  onIncrease = () => {
    const { validate } = this.state.data;
    const { step } = validate;
    const addStep = step || 1;
    let subStep;
    if (addStep.toString().indexOf('.') > -1) {
      subStep = addStep.toString().split('.')[1].length;
    }
    const nv = Number(this.input.value) + addStep;
    this.input.value = nv.toFixed(subStep);
    this.onValueChange(this.input.value);
  }
  onDecrease = () => {
    const { validate } = this.state.data;
    const { step } = validate;
    const addStep = step || 1;
    let subStep;
    if (addStep.toString().indexOf('.') > -1) {
      subStep = addStep.toString().split('.')[1].length;
    }
    const nv = Number(this.input.value) - addStep;
    this.input.value = nv.toFixed(subStep);
    this.onValueChange(this.input.value);
  }
  _genUI() {
    const { state, props, context } = this;
    const { error, text, data, validate = {} } = state;
    // console.log(error);
    const { valueType, type, disable = false, resize='none', style, numberic, placeholder  } = data;
    const { notNull = false } = validate;
    const { heightPhi, componentStyle={}, language, labelFormmat } = props;
    let height;

    if (style) {
      const h = style.height;
      h ? height = h : height = this._getDefaultHeight() * heightPhi;
    } else {
      height = this._getDefaultHeight() * heightPhi;
    }

    const styles = getStyles(props, state, context, height);
    
    let value;

    if (!isNull(text)) {
      value = text || '';
    } else {
      value = this.state.data.value;
      if (isArray(valueType)) {
        if (!Array.isArray(value)) value = [value];
        for (const i in value) {
          if (value[i] === null) value[i] = '?';
        }
        value = value.join(',');
      }
    }
    value = labelFormmat ? labelFormmat(text || value) : Utils.getText(text || value, language);
    const deleteIcon = (this.state.isActive && value !== '' && !disable) ? styles.deleteIcon : styles.unhoverIcon;
    // const deleteIcon = styles.deleteIcon;
    const inputO = Object.assign(
      {},  styles.input, { height: componentStyle.height ? componentStyle.height : height },  
      this.state.data.filterStyle,
      error ? styles.error : {},
      disable ? styles.disabled : {},
      (this.state.isInputActive && !disable && !this.state.error) ? styles.hover : {},
      this.state.data.noShowBorder ? styles.noBorder : {},
    );
    const wrapHeight = componentStyle.height ? componentStyle.height : height;
    const updateWidth = componentStyle.width ? { width: componentStyle.width, maxWidth: componentStyle.width }: {};
    return (
      <div
        style={{ 
          position: 'relative', 
          ...styles.wrapper, 
          ...this._getSelectorStyle(), 
          ...updateWidth,
          height: wrapHeight
        }}
        onClick={this.handelClick}
        ref='wrap'
      >
        { this.state.data.addonBefore || null}
        <div style={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', height: wrapHeight }}>
          { type === 'textarea' ?
            <textarea
              ref={(r) => { this.textarea = r; }}
              value={value}
              style={Object.assign({}, inputO, { resize: resize, padding: '4px 8px' })}
              onChange={this.onTextAreaInputChange}
              placeholder={labelFormmat ? labelFormmat(placeholder) : Utils.getText(placeholder, language)}
              disabled={disable}
            /> :
            <InputSearcher
              ref={(r) => {
                if (r) return (this.input = r.input);
              }}
              componentStyle={componentStyle}
              disable={disable}
              text={value}
              width={this._getSelectorWidth()}
              type={type}
              helpStyle={this.props.helpStyle}
              style={inputO}
              placeholder={labelFormmat ? labelFormmat(placeholder) : Utils.getText(placeholder, language)}
              onChange={this.onInputChange}
              onFocuStateChange={this.onInputFocuStateChange}
              onActiveStateChange={this.onInputActiveStateChange}
              isActive={this.state.isInputActive}
            />
          }
          {(notNull || numberic) ? null : <DeleteIcon style={deleteIcon} onClick={this.onClean} />}
        </div>
        { numberic && <div style={styles.btn}>
          <Add style={styles.arrow} onTouchTap={this.onIncrease}/>
          <Remove style={{...styles.arrow, ...styles.arrowDown}} onTouchTap={this.onDecrease}/>
          </div>}
        { this.state.data.addonAfter || null}
        { error  ? this._genPopover(height) : null }
      </div>
    )
  }
  _genUIExtra() {
    const { state, props, context } = this;
    const height = this._getDefaultHeight();
    const styles = getStyles(props, state, context, height);
    const { data } = state;
    const { unit } = data;
    if(!unit) return <div></div>;
    if (unit) {
      return (
        <div style={styles.extra}>{ this.genUnit() }</div>
      )
    }  
  }
  
  render() {
    return super.render();
  }
}
