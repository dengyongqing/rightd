/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UiBase from './../uiBase';

export function getStyles(){
}

export default class Block extends UiBase {
  static propTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  _getStyle(){
    const {children} = this.props;
    const childrenN = children.length;
    const height = this._getDefaultHeight() * childrenN + 'px';
    return {height};
  }
  render() {
    const {children} = this.props;
    return (
      <div className="z_block-container" style={this._getStyle()}>
        {children}
      </div>
    );
  }
};

