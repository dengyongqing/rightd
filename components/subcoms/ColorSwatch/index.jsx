/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/


import PropTypes from 'prop-types';
import React, { Component } from 'react';
import _ from 'lodash';

// import { ChromePicker } from 'react-color';
// import Popover from 'material-ui/Popover';
// import { emphasize, decomposeColor, fade } from 'material-ui/utils/colorManipulator';
// import * as d3color from 'd3-color';
import getStyles from './getStyles';

// import Utils from './../../../lib/utils';

export default class Swatch extends Component {
  static propTypes = {
    
  }
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  onClick = () => {
    if (this.props.onClick) this.props.onClick();
  }
  render() {
    const styles = getStyles(this.props, this.state, this.context);
    const { color, height } = this.props;
    return (
      <div
        style={{ ...styles.swatchWrapper, height }}
        onTouchTap={this.onClick}
      >
        <div
          style={{ ...styles.swatchBg }}
          ref="anchorEl"
        >
          <div style={{ ...styles.colorLine, backgroundColor: color }} />
        </div>
      </div>
    );
  }
}

