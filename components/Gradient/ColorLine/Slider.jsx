/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'material-ui/Popover';
import { fade } from 'material-ui/utils/colorManipulator';
import _ from 'lodash';

import UiBase from '../../uiBase';
import Utils from '../../../lib/utils';
import { randomBytes } from 'crypto';

const colors = Utils.getColorArray();

const defaultStyle = {
  color: '#f00',
};

function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  const border = `1px solid ${palette.canvasColor}`;
  const borderRadius = '2px';
  const { color } = props;
  const color0 = fade(color, 0);
  const color1 = fade(color, 1);
  const sliderHeight = '12px';
  return {
    slider: {
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      position: 'absolute'

    },
    dot: {
      background: '#FFFFFF',
      border: '1px solid #FFFFFF',
      boxShadow: '0 0 2px 0 rgba(0,0,0,0.50)',
      borderRadius: '1px',
      position: 'absolute',
      height: '10px',
      width: '6px',
    },
  };
}

export default class Color extends UiBase {
  static defaultProps = {
    value: 0.2,
  };
  static propTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.setState({
      index: 0
    });
    document.addEventListener('keydown', (e) => this.onKeyDown(e), false);
    document.addEventListener("mousemove", (e) => this.onMouseMove(e), false);
    document.addEventListener("mouseup", (e) => this.onMouseUp(e), false);
  }
  componentWillUnmount(){
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
    document.removeEventListener('keydown', this.handleDelete, false);
  }
  
  handelChangeValue(ratio, i) {
    if (this.props.onChange) this.props.onChange(ratio, i);
  }

  _getRect(v) {
    if (!this.sliderEL) return;
    const width = this.sliderEL.offsetWidth;
    return v === 1 ? width - 8 : width * v;
  }
  onKeyDown = (e) => {
    const { index } = this.state;
    if(e.keyCode === 8) {
      if(index || index === 0) {
        this.props.handleDelete(index);
      }
    }
  }
  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const dom = e.target;
    const id = dom.getAttribute('id');
    this.isdown = true;
    let l = e.target.offsetLeft; 
    let x = e.clientX ;  
    let disX = '';
    disX = x-l;  
    let max;
    if(!this.sliderEL || !e.target) return;
    max = this.sliderEL.offsetWidth - e.target.offsetWidth;  
    const index = id && Number(id.split('-')[1]);
    this.setState({
      max,
      disX,
      id,
      index
    })
    this.handelChangeValue(null, index);

  }
  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isdown) return;
    const { max, id, disX, index } = this.state;
    let moveX = '';
    let moveL = '';
    moveX = e.clientX;
    moveL = Math.min(max, Math.max(0, moveX - disX));
    if(!this.state.id || !this.sliderEL) return;
    document.getElementById(id).style.left = moveL + 'px';  //设置滑块left值
    const ratio = moveL / this.sliderEL.offsetWidth;
    this.handelChangeValue(ratio, index);
  }
  onMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.isdown = false;
  }
  addRect = (e) => {
    const id = e.target.getAttribute('id');
    const { value } =this.props;
    if(!id || id !== 'rectContainer' || !this.sliderEL) return;
    const width = this.sliderEL.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    if(value && value.length > 0) {
      this.setState({
        index: value.length
      });
    }
    if(this.props.onChange) this.props.onChange(offsetX/width);
  }
  render() {
    const styles = getStyles(this.props, this.state, this.context);
    const { value } = this.props;
    const selectStyle = {
      border: '2px solid #FFFFFF',
      boxShadow: '0 0 2px 0 rgba(0,0,0,0.50)',
      borderRadius: '1px',
      background: 'none'
    }
    return (
      <div 
        style={{height: '100%', position: 'relative'}}
        ref={ref => this.sliderEL = ref}
        onClick={this.addRect}
        id="rectContainer"
      >
      {
        value && _.map(value, (v, i) => {
        return (  
          <div 
            id={`rect-${i}`}
            key={i}
            ref='rect'
            onMouseDown={this.onMouseDown}
            style={this.state.index === i ? { ...styles.dot, ...selectStyle, left: this._getRect(v, i) } : { ...styles.dot, left: this._getRect(v, i) }} 
          />
        )})
      }
      </div>
    )
  }
}

