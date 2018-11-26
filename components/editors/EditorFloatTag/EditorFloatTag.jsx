/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//
import Utils    from './../../../lib/utils';
import _        from 'lodash';
import FloatTag from './../../subcoms/FloatTag';
import Editor from './../Editor';

export function getStyles(props, context) {
  const { palette } = context.muiTheme;
  const { alternateTextColor, accent3Color, textColor } = palette;
  return {};
}

export default class EditorFloatTag extends Component {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data:           PropTypes.any.isRequired,
    /**
     * 设置编辑面板是否开启
     */
    isOpen:         PropTypes.bool.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失焦时触发
     */
    onFinishChange: PropTypes.func.isRequired,
    /**
     * 控制弹出框开关的回调函数
     */
    onBgClick:      PropTypes.func.isRequired,
  }
  static defaultProps = {
    isOpen: false
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  constructor(props: any) {
    super(props);
    this.state = {
      data: _.cloneDeep(this.props.data)
    };
  }
  componentWillUpdate(newprops){
    if(_.isEqual(newprops.data, this.state.data)) return;
    this.state.data = Utils.deepMerge(this.state.data, {value: newprops.data.value});
  }
  render(){
    const {
      isOpen, component, 
      onFinishChange, onBgClick,
      onMouseOver, onMouseOut, data
    } = this.props;
    //
    if(!isOpen) return null;
    const styles = getStyles(this.props, this.context);
    return (
        <FloatTag
          isActive={isOpen}
          component={component}
          direction="right"
          style={{background: '#fff'}}
        >
          <div className="z_editor-background"  onMouseDown={onBgClick}/>
          <Editor
             onFinishChange={onFinishChange}
             onMouseOver={onMouseOver}
             onMouseOut={onMouseOut}
             data={data}
           />
        </FloatTag>
    );
  }
};


