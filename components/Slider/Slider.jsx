/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SliderUI from 'material-ui/Slider';
import TextField from 'material-ui/TextField';

import './index.css';
import Utils from './../../lib/utils';
import UiBase from './../uiBase';
import FloatTag from './../subcoms/FloatTag';
// import { createRange } from './../../meta/dataTypes/basic/float';
import { emphasize } from 'material-ui/utils/colorManipulator';

export function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  return {
    slider: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
    },
    number: {
      height: '80%',
      display: 'flex',
      alignItems: 'center',
      flexWrap: 'nowrap',
      color: emphasize(palette.textColor, 0.4),
      borderBottom: '1px solid rgba(155, 155, 155, 0.4)',
    },
  };
}

export default class Slider extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     *  当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     *  当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调
     */
    onFinishChange: PropTypes.func,
  }
  constructor(props: any) {
    super(props);
  }
  handleInputBlur = (e) => {
    this.setState({
      isEdit: false,
      isFocused: false
    })
    if (this.props.onBlur) {
      this.props.onBlur(e);
    }
  }
  componentDidUpdate(){
    if(this.refs.textfield && this.refs.textfield.handleInputBlur){
      this.refs.textfield.handleInputBlur = this.handleInputBlur;
    }
  }
  onSliderChange = (e, value) => { 
    this.setState({ text: value, errorText: '' });
    this.onChange(e, value);
  }
  onError(v, errtext) {
    this.setState({ text: v, errorText: errtext });
  }
  onInputClick = (e, d) => {
    if (!this.state.isEdit) this.setState({ isEdit: true });
  }
  onBgClick = () => {

    if (this.state.isEdit) this.setState({ isEdit: false });
  }
  onInputChange = (e, value) => {
    if (value === null || value === '') return this.onError(value, '不能为空');
    // if (value.indexOf('.') !== -1) return;
    if (value.indexOf('-') !== -1) return;
    const { range } = this.state.data.validate;
    const v = parseFloat(value, 10);
    // if ( value > range.max ) {
    //   this.onError(range.max, `max=${range.max}`);
    //   this.onChange(e, parseFloat(range.max, 10));
    //   return;
    // }else if (value < range.min) {
    //   this.onError(range.min, `min=${range.min}`);
    //   this.onChange(e, parseFloat(range.min, 10));
    //   return;
    // }
    if (value > range.max || value < range.min) {
      this.adjustValue(v);
    }
    if (isNaN(value)) return this.onError(value, '格式有误');
    this.setState({
      data: { ...this.state.data, value: v },
      text: null,
      errorText: null,
    });
    this.onChange(e, v);
  }
  _genNumber(displayValue, itemHeight) {
    const styles = getStyles(this.props, this.state, this.context);
    const { isEdit } = this.state;
    const { unit } = this.state.data;
    if (isEdit) {return (
      <div 
        className="z_slider-number"
        style={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <TextField
          ref="textfield"
          id="TextField"
          // type="number"
          style={{width: 'auto', height: itemHeight, padding: 0}}
          errorText={ this.state.errorText }
          value={displayValue}
          onChange={ this.onInputChange }
          underlineStyle={{bottom: '2px'}}
        />
       { unit ? <span >{unit}</span> : null}
      </div>
    );}
    return (
      <div
        className="z_slider-number"
        style={{}}
        onClick={this.onInputClick}
      >
        <div style={styles.number}>
          {Utils.numberFormater(displayValue, 1, unit)}
        </div>
      </div>
    );
  }
  createRange(value) {
    const delta = 0.01;
    return {
      min: 0,
      max: value > 0 ? value * 4 + delta : value / 4 + delta,
    };
  }
  adjustValue(valueNew) {
    const range = this.createRange(valueNew);
    this.state.data.validate.range = range;
    this.onChange({}, valueNew);
  }
  _genUI() {
    let { onChange, onFinishChange } = this.props;
    const { data } = this.state;
    const { validate, id, name, key, value, disable } = data;
    const { range, step } = validate;
    onFinishChange = onFinishChange || (d => null);
    const styles = getStyles(this.props, this.state, this.context);
    const itemHeight = this._getItemHeight();
    const sliderStyle = {
      marginTop: 0,
      marginBottom: 0,
    };
    const { text } = this.state;
    const displayValue = (text === undefined || text === null) ? value : text;
    // const displayValue = value;
    return (
      <div
        className="z_slider-line-container"
        ref="mainSlider"
        style={this._getSelectorStyle()}
      >
        <div
          className="z_slider-container"
          ref="sliderContainer"
          onMouseDown={this.onBgClick}
        >
          <SliderUI
            style={styles.slider}
            min={range.min}
            max={range.max}
            defaultValue={value}
            value={value}
            onChange={this.onSliderChange}
            step={step || 0.001}
            sliderStyle={sliderStyle}
            onDragStop={onFinishChange}
            disabled={disable}
          />
        </div>
        <div className="z_slider-space" />
        { this._genNumber(displayValue, itemHeight) }
      </div>
    );
  }
  render() {
    return super.render();
  }
}
