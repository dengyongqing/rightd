/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
//
import Utils    from './../../../lib/utils';
import Controls from './../../Controls';
import _        from 'lodash';
import meta     from './../../../meta';
import {fade} from 'material-ui/utils/colorManipulator';

const prevent = e => {
  e.stopPropagation();
  return false;
};

export function getStyles(props, context) {
  const { palette } = context.muiTheme;
  const { alternateTextColor, accent3Color, textColor } = palette;
  return {
    overlay: {
      background: fade(accent3Color, 0.5),
    },
    centerBody: {
      background: alternateTextColor,
    },
    head: {
      normal: {
        background: alternateTextColor,
        boxShadow: `0px 2px 2px rgba(150,150,150, 1)`
      },
      hover: {
        background: fade(accent3Color, 0.05),
      }
    },
    name: {
      color: fade(textColor, 0.4)
    }
  };
}

const validation2CoreMeta = validation => {
  const {valueType, uiType, key} = validation;
  //
  const valuesList = meta.getValueCastList(valueType);
  const valueTypeInfo   = meta.getValueType(valueType);
  const valueTypeName   = valueTypeInfo.valueType;
  const valueTypeNameCN = valueTypeInfo.valueName;
  //
  const uiTypeList = meta.getUIListByValue(valueType);
  return [
    {
      name:   'uiType',
      key:    'uiType',
      uiType: 'select',
      value:   uiType,
      validate: {
        options: uiTypeList
      }
    },
    {
      name:   'valueType',
      key:    'valueType',
      uiType: 'input',
      disable: true,
      value: valueType,
      validate: {
        options: valuesList
      }
    },
  ];
};
const validation2ChildMeta = (validation) => {
  const { key, validate, name, disable, hide} = validation;
  let result = [{
    name: 'key',
    key: 'key',
    uiType: 'input',
    value: key
  },{
    name: 'name',
    key: 'name',
    uiType: 'input',
    value: name
  }];
  if (validate) {
    const {
      range,
      options
    } = validate;
    if (options) result = Utils.deepMerge(result, [{
        uiType: 'group',
        valueType: 'group',
        key: 'validate',
        name: 'validate',
        children: [{
          uiType: 'input',
          value: options,
          valueType: 'array',
          key: 'options',
          name: 'options',
        }]
      }]);

    if (range) result = Utils.deepMerge(result, [{
      uiType: 'group',
      valueType: 'group',
      key: 'validate',
      name: 'validate',
      children: [{
        uiType: 'range',
        value: range,
        valueType: 'range',
        key: 'range',
        name: 'range',
      }]
    }]);
  }

  result = result.concat([{
    name:      'disable',
    uiType:    'toggle',
    valueType: 'boolean',
    key:  'disable',
    value: disable || false
  },{
    name:      'hide',
    uiType:    'toggle',
    valueType: 'boolean',
    key:  'hide',
    value: hide || false
  }]);

  return result;
}

export default class Editor extends Component {
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
  }
  static defaultProps = {
    isOpen: false
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
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
  _genCoreControl(){
    const {data} = this.state;
    const validate = validation2CoreMeta(data);
    return (
      <Controls
        data={validate}
        onChange={this.onCoreChange}
        editable={false}
    />)
  }
  _genChildControl(){
    const {data} = this.state;
    const validate = validation2ChildMeta(data);
    return (
      <Controls
        data={validate}
        onChange={this.onChildChange}
        editable={false}
     />)
  }
  onFinishChange = (options, d) => {
    options = _.cloneDeep(options);
    this.props.onFinishChange(options);
  }
  onCoreChange = (options, diff) => {
    const data = this.state.data;
    _.set(data, diff.chain, diff.value);
    this.onFinishChange(data);
    this.setState({data});
  }
  onChildChange= (options, diff) => {
    const {data} = this.state;
    const {chain, value} = diff;
    _.set(data, chain, value);
    this.onFinishChange(data);
    this.setState({data});
  }
  render(){
    const styles = getStyles(this.props, this.context);
    return (
      <div className="z_editor-container">
        <div className="z_editor-center-head"  style={styles.head.normal} onMouseDown={prevent}> {`属性编辑`} </div>
          <div className="z_editor-center-body" style={styles.centerBody} onMouseDown={prevent}>
            {this._genCoreControl()}
            <div className="z_editor-divison"/>
            {this._genChildControl()}
         </div>
      </div>
    );
  }
}
