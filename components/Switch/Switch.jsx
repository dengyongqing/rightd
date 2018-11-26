/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import UiBase from './../uiBase';
import './../common/index.css';
import './index.css';
import './../uiBase/index.css';
import Select from './../Select';
import Zcontrol from './../Controls';
import { fade } from 'material-ui/utils/colorManipulator';
import Subheader from 'material-ui/Subheader';
import _ from 'lodash';
import Utils from './../../lib/utils';

export function getStyles(props, context) {
  const { palette } = context.muiTheme;
  const { alternateTextColor, accent3Color } = palette;
  return {
    main: {
      normal: {
        background: alternateTextColor,
      },
      hover: {
        background: fade(alternateTextColor, 0.05),
      },
    },
  };
}

function getVstring(d) {
  if (d && typeof d === 'object') {
    return _.keys(d)[0];
  }
  return d;
}

export default class Switch extends UiBase {
  static propTypes = {
    /**
     *  组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     *  当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失去焦点时触发回调
     */
    onFinishChange: PropTypes.func,
    // /**
    //  *
    //  */
    // children:   PropTypes.any,
  }

  constructor(props: any) {
    super(props);
    this.state = {
      vstring: getVstring(this.props.data.value),
      contentHeight: null
    };
  }

  componentDidMount() {
    this.setState({
      contentHeight: this.content.clientHeight,
    });
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({
      vstring: getVstring(nextProps.data.value),
    });
  }
  onSelectChange = (d) => {
    this.setState({
      vstring: getVstring(d.key),
    });
    const val = this.props.data.validate.options[d.key];
    this.onChange(d.key, Utils.toObject(val), val);
  }
  onZcontrolChange = (o, diff, val) => {
    const { validate, value } = this.props.data;
    const { vstring } = this.state;
    validate.options[vstring] = val;
    this.onChange(vstring, o, val);
  }
  onChange = (k, v, val) => {
    const { validate } = this.state.data;
    const { options } = validate;
    this.setState({
      data: Object.assign({}, this.state.data, { value: k }, { validate: { options: { ...options, [k]: val } } }),
    }, () => {
      const { key } = this.state.data;
      const d = { [key]: { [k]: v } };
      this.props.onChange(d, this.state.data, val);
    });
  }
  
  // TODO: add pending to child group
  render() {
    const { props, state } = this;
    const { layout, bodyStyle, widthPhi, heightPhi, height, direction, data } = props;
    const { name, validate, value, desc } = data;
    const { options } = validate;
    const keys = _.keys(options);
    const { vstring } = state;
    const seldata = {
      value: vstring,
      key: 'key',
      name,
      desc,
      valueType: 'string',
      uiType: 'select',
      validate: {
        options: keys,
      },
    };
    const depthStyle = this._getDepthStyle();
    return (
      <div
        className="z_control-container z_control-container-direction"
        style={{
          maxHeight: this.state.contentHeight || null,
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            flexGrow: 1
          }}
        >
          <div className='z_control-depth-space' style={{...depthStyle}} />
          
          <div 
            style={{ flexGrow: 8 }}
            ref={(ref) => { this.content = ref; }}
          >
            <div>
              <Select
                language={this.props.language}
                labelFormmat={this.props.labelFormmat}
                isShowDepth={false}
                data={seldata}
                onChange={this.onSelectChange}
                widthPhi={props.widthPhi}
                heightPhi={props.heightPhi}
                height={height}
                layout={layout}
                widthPhi={widthPhi}
                bodyStyle={bodyStyle}
              />
            </div>
            <div>
              <Zcontrol
                language={this.props.language}
                labelFormmat={this.props.labelFormmat}
                data={options[vstring]}
                isShowDepth={false}
                onChange={this.onZcontrolChange}
                editable={props.editable}
                offset={{ x: 0, y: 0 }}
                direction={direction}
                height={height}
                layout={layout}
                widthPhi={widthPhi}
                heightPhi={heightPhi}
                bodyStyle={bodyStyle}
              />
            </div>  
          </div>
        </div>

      </div>
    );
  }
}

