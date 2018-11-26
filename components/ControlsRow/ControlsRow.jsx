/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Utils from './../../lib/utils';
import Controls from './../Controls';

//
import _ from 'lodash';

const empty = () => null;

export default class ControlsRow extends Controls {
  static propTypes = {
    /**
     * 组件的相关配置数据
     */
    data: PropTypes.array.isRequired,
    /**
     * 当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 设置属性是否可修改
     */
    editable: PropTypes.bool,
  }
  static defaultProps = {
    data: [],
    onChange: (a, b, c) => console.log(),
    editable: true,
    compileFunction: false,
    direction: 'column',
    style: {
      height: 48,
    },
    bodyStyle: {
      flexGrow: 8,
    },
    nameStyle: {
      flexGrow: 2.5,
    },
    endStyle: {
      flexGrow: 1,
    },
    depthGrow: 0.4,
    widthPhi: 0.9,
    heightPhi: 0.7,
  }
  constructor(props: any) {
    super(props);
    props = this.props;
    this.state = {
      data: Utils.check(_.cloneDeep(props.data)),
    };
    this._resetData();
  }
  _resetData() {
    this.options = {};
  }
  componentWillReceiveProps(newprops) {
    // if (_.isEqual(this.props.data, newprops.data)) return;
    const data = Utils.check(_.cloneDeep(newprops.data));
    this.setState({ data });
  }
  shouldComponentUpdate(newprops) {
    return true;// _.isEqual(this.props.data, newprops.data);
  }
  renderColumn() {
    const options = this.options = {};
    return (
      <div className="z_controls-panel-row">
        <div className="z_controls-header-row" />
        {this._getSelectors(this.state.data || [], options)}
        <div className="z_controls-footer-row" />
      </div>
    );
  }
  renderRow() {
    const options = this.options = {};
    return (
      <div className="z_controls-row-panel">
        {this._getSelectors(this.state.data || [], options)}
      </div>
    );
  }
  render() {
    const options = this.options = {};
    const { direction } = this.props;
    return this.renderRow();
  }
}
