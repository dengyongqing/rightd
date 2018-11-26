import _ from 'lodash';
import React from 'react';
import PropTypes from 'prop-types';
// import AceEditor from 'react-ace';
// import 'brace/ext/language_tools';
import Select from './../Select';
import Input from './../Input';
import validator from 'validator';
import UiBase from './../uiBase';
import getStyles from './getStyles';


export default class InputCompact extends UiBase {
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

  }
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }
  setValue = (v) => {
    if(!v) return;
    _.set(this.state.data, 'value.value', v.value);
    this.onSuccess();
  }
  setUnit = (d) => {
    if(!d) return;
    _.set(this.state.data, 'value.unit', d.unit);
    this.onSuccess()
  }
  onSuccess = () => {
    this.onChange(this.state.data.value);
  }
  _genInput = (v) => {
    return (
      <Input
        ref={(r) => { this.Input = r; }}
        key="value"
        isShowDepth
        isShowTitle={false}
        data={{
          uiType: 'input',
          valueType: 'integer',
          value: v || '',
          key: 'value',
        }}
        heightPhi={0.7}
        onChange={v => this.setValue(v)}
      />
    )
  }
  _genSelect = (unit) => {
    const { data } = this.state;
    const { validate } = data;
    const { options } = validate;
    return (
      <Select
        ref={(r) => { this.Select = r; }}
        isShowDepth
        isShowTitle={false}
        isActive={this.state.isActive}
        data={{
          isInput: false,
          uiType: 'select',
          valueType: 'string',
          value: unit || '',
          key: 'unit',
          validate: {
            options: options || []
          },
        }}
        heightPhi={0.7}
        onChange={d => this.setUnit(d)}
      />
    )
  }
  _genUI() {
    const { state, props, context } = this;
    const { data } = state;
    const { validate } = data;
    const value  = data.value.value;
    const unit = data.value.unit;
    const { heightPhi } = props;
    const height = this._getDefaultHeight() * heightPhi;
    const styles = getStyles(props, state, context, height);
    return (
      <div
        style={{ height, position: 'relative', ...styles.wrapper, ...this._getSelectorStyle() }}
        onClick={this.handelClick}
      > 
        <div style={{width: 'calc(100% - 64px)'}}>
          {this._genInput(value)}
        </div>
        <div style={{marginLeft: '4px', width: '64px'}}>
          {this._genSelect(unit)}
        </div>
      </div>
    );
  }
  render() {
    return super.render();
  }
}
