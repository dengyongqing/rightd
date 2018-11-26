/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Utils from './../../../lib/utils';
import UiBase from './../../uiBase';

const translate = (x, y) => `translate(${x}%, ${y}%)`;

const getDirection = type => {
  return {
    top:   'column',
    left:  'row',
    right: 'row-reverse',
    bottom:'column-reverse'
  }[type];
};

const defaultProps = {
  heightTriangle: 7,
  direction: 'top',
};

const getTriangleStyle = (type, w) => {
  return {
    top:    {
      borderWidth: `${w}px ${w}px 0 ${w}px`,
      borderColor: 'rgba(10, 10, 10, 1) transparent transparent transparent'
    },
    bottom: {
      borderWidth: `0 ${w}px ${w}px ${w}px`,
      borderColor: ' transparent transparent rgba(10, 10, 10, 1) transparent'
    },
    left:   {
      borderWidth: `${w}px 0 ${w}px ${w}px`,
      borderColor: 'transparent transparent transparent rgba(10, 10, 10, 1)'
    },
    right:  {
      borderWidth: `${w}px ${w}px ${w}px 0`,
      borderColor: 'transparent rgba(10, 10, 10, 1) transparent transparent'
    },
  }[type]
};

export default class FloatTag extends UiBase {
  static propTypes = {
    onChange:       PropTypes.func.isRequired,
    onFinishChange: PropTypes.func,
    isActive:       PropTypes.bool,
    primaryText:    PropTypes.any,
    direction:      PropTypes.string
  }
  constructor(props: any) {
    super(props);
  }
  _getFloatTagStyle(){
    return Object.assign({}, this.props.style);
  }
  _getContentContainerStyle(){
    const {direction} = defaultProps;
    const transforms = {
      top:    translate(0, 0),
      bottom: translate(0, 100),
      left:   translate(-50, 50),
      right:  translate(50, 50)
    };
    const transform = transforms[direction];
    return {
      flexDirection: getDirection(direction),
      transform
    };
  }
  _genChildren = () => {
    const {children} = this.props;
    if(typeof(children) === 'number') return Utils.numberFormater(children);
    return children;
  }
  render(){
    let {isActive, primaryText} = this.props;
    const {heightTriangle, direction} = defaultProps;
    const style = this._getFloatTagStyle();
    const className = isActive ? "z_float-tag-container z_float-tag-active": "z_float-tag-container z_float-tag-normal";
    return (
      <div 
        className={className}
        style={style}
      > 
        <div 
          className="z_float-tag-content-wapper-container"
        >
          <div 
            className="z_float-tag-content-container"
            style={this._getContentContainerStyle()}
          >
            <div className="z_float-tag-text-container">
              {this._genChildren()}
            </div>
            <div 
              className="z_float-tag-triangle"
              style={getTriangleStyle(direction, heightTriangle)}
            />
          </div>
        </div>
      </div>
    );
  }
}
