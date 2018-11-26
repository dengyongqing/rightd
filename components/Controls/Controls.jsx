/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import RaisedButton from 'material-ui/RaisedButton';
import Utils from './../../lib/utils';
import { parseValidate } from '../../meta/validation';

import Tag from './../Tag';
//
import _ from 'lodash';

const empty = () => null;

function getStyles(props, state, context) {
  const { y, x } = props.offset;
  const { widthPhi } = props;
  return {
    main: {
      ...props.style,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrapper: {
      width: `calc(100% - ${x * 2}px)`,
      margin: `${y}px 0px`,
    },
    footer: {
      height: '72px',
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: `${x + 5}px`,
    },
    footerDivider: {
      flexGrow: 1,
    },
    confirmButton: {
      height: '36px',
      lineHeight: '36px'
    },
  };
}

export default class Controls extends Component {
  static propTypes = {
    /**
     * 组件的相关配置数据
     */
    data: PropTypes.array.isRequired,
    /**
     * 当value改变时发生回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当data里的expand为true时,可调用onExpand来控制组件面板的收缩
     */
    onExpand: PropTypes.func,
    /**
     * 删除某个组件的回调
     */
    onDelete: PropTypes.func,
    /**
     * 当单击确定按钮时回调生效
     */
    onConfirm: PropTypes.func,
    onValiForm: PropTypes.func,
    /**
     * 是否显示确定按钮
     */
    showFooter: PropTypes.bool,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失焦时触发
     */
    onFinishChange: PropTypes.func,
    /**
     * 设置是否可编辑组件的属性
     */
    editable: PropTypes.bool,
    /**
     * 设置是否可编译函数
     */
    compileFunction: PropTypes.bool,
    /**
     * 设置面板显示的方向，column或者row
     */
    direction: PropTypes.string,
    /**
     * 设置root element的样式
     */
    style: PropTypes.object,
    /**
     * 设置z_control-container的样式
     */
    bodyStyle: PropTypes.object,
    /**
     * 设置z_control-name的样式
     */
    nameStyle: PropTypes.object,
    /**
     *
     */
    endStyle: PropTypes.object,
    /**
     * 通过depthGrow的数值来设置flexGrow
     */
    depthGrow: PropTypes.number,
    /**
     * 按照某个系数(phi)改变宽度，如width * phi
     */
    widthPhi: PropTypes.number,
    /**
     * 按照某个系数(phi)改变高度，如height * phi
     */
    heightPhi: PropTypes.number,
    /**
     * 设置时间选择组件的样式
     */
    pickerStyle: PropTypes.object,
    /**
     * 设置multiSelect组件的样式
     */
    multiSelectStyle: PropTypes.object,

    componentStyle: PropTypes.object,
     /**
     * 设置group组件的配置
     */
    group: PropTypes.object,
    /**
     * 设置布局方式
    */
    layout: PropTypes.string,

    nameWidth: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),

    helpStyle: PropTypes.object,
    language: PropTypes.string,
  }
  static defaultProps = {
    data: [],
    onChange: (a, b, c) => console.log(a, b, c),
    editable: false,
    compileFunction: false,
    direction: 'column',
    offset: {
      x: 24,
      y: 12,
    },
    height: 48,
    // itemStyle: {
    // },
    bodyStyle: {
      flexGrow: 8,
    },
    nameStyle: {
      flexGrow: 2.5,
    },
    nameWidth: '60px',
    endStyle: {
      flexGrow: 1,
    },
    depthGrow: 1.5,
    confirmStyle: {

    },
    widthPhi: 0.9,
    heightPhi: 0.7,
    isHover: false,
    isShowTitle: true,
    isShowDepth: true,
    pickerStyle: {},
    multiSelectStyle: {},
    layout: 'horizontal',
    showFooter: true,
    helpStyle: {},
    group: {
      // 弱化
      weakenLevel: 1,
    },
    componentStyle: {},
    language: 'zh',
    labelFormmat: null
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
  // shouldComponentUpdate(newprops) {
  //   return true;// _.isEqual(this.props.data, newprops.data);
  // }
  // 获取整体配置
  _getOptions = () => _.cloneDeep(this.options);
  _getValidation = (options = {}) => {
    const validation = this.validation = Utils.mergeObject2Validation(_.cloneDeep(this.state.data), options);
    return validation;
  }
  updateMaxDepth() {
    this.maxDepth = 0;
    const validation = this._getValidation();
    this._updateMaxDepth(validation);
  }
  _updateMaxDepth(validation, maxDepth = 0) {
    this.maxDepth = Math.max(this.maxDepth, maxDepth);
    _.forEach(validation, (val) => {
      if (val && val.children) this._updateMaxDepth(val.children, maxDepth + 1);
    });
  }
  // 根据输入的不同生成不同的ui界面
  _getSelectors = (ds, options = {}, depth = 0, chain = '') => {
    if (!ds) return null;
    const { props } = this;
    let prev = null;
    const depthNext = depth + 1;
    return _.map(ds, (d) => {
      // fixed
      const { children, key, handlerType, validate, valueType, disable, value, uiType, id, name, style, unit, handleConfirm } = d;
      const chainChild = chain === '' ? key : `${chain}.${key}`;
      //
      const _onChange = (data, valid, val) => {
        let value;
        let diff;
        if (data && data.uiType !== 'group') {
          Object.assign(options, data);
        }
        if (data && data.uiType === 'group') {
          const { key, disable } = data;
          const nd = {
            [key]: disable,
          };
          const nv = disable;
          diff = { data: nd, value: nv, chain: chainChild };
        } else {
          value = _.values(data)[0];
          diff = { data, value, chain: chainChild };
        }
        // if ( valid.uiType && valid.uiType === 'keyValue') {
        //   const changeV = valid.value;
        //   let checkKey = changeV && changeV.key || '';
        //   let checkV = changeV && changeV.value || '';
        //   if (checkKey) {
        //     delete valid.showKeyError;
        //     delete valid.keyError;
        //     delete d.showKeyError;
        //     delete d.keyError;
        //   }
        //   if (checkV) {
        //     delete valid.showValueError;
        //     delete valid.valueError;
        //     delete d.showValueError;
        //     delete d.valueError;
        //   }
        // }
        if (valid) {
          delete valid.showError;
          delete valid.errorMessage;
        }
        if (d) {
          delete d.showError;
          delete d.errorMessage;
        }
        Object.assign(d, valid);
        const optionsFinal = this._getOptions();
        const validationFinal = this._getValidation(optionsFinal);
        //
        if (valid && valid.disable === true) {
          _.set(optionsFinal, chainChild, null);
        } else if (valid && valid.disable === false && valid.uiType === 'group') {
          const newo = Utils.toObject([valid]);
          _.set(optionsFinal, chainChild, newo);
        }
        //
        props.onChange(optionsFinal, diff, validationFinal);
      };
      const _applyConfirm = () => {
        const options = this._getOptions();
        const validation = this._getValidation();
        d.handleConfirm(options, validation);
      };
      const isFinish = (handlerType === 'finish');
      const onChange = isFinish ? empty : _onChange;
      const onFinishChange = !isFinish ? empty : _onChange;
      const applyConfirm = handleConfirm ? _applyConfirm : empty;
      let childrenOptions = {};
      if ((uiType === 'group' || valueType === 'group') && children) {
        childrenOptions = options[key] = {};
      } else if (uiType === 'switch') {
        if (typeof value === 'string') {
          const vals = validate.options[value];
          childrenOptions = options[key] = {
            [value]: Utils.toObject(vals),
          };
        } else {
          childrenOptions = options[key] = value;
        }
      } else if (uiType === 'slider' || uiType === 'input') {
        unit ? options[key] = value + unit : options[key] = value;
      } else if (key) options[key] = value;
      //
      const isBorder = d && prev &&
                       ((prev.valueType === 'group' && valueType === 'group') ||
                       (prev.valueType !== 'group' && valueType !== 'group')) || false;
      prev = d;

      if (!Tag) {
        Utils.warn(`id: ${id}, 名字: ${name}的选择器不存在`);
        return null;
      }
      if (uiType === 'hidden') return null;
      if (!d || !d.uiType) {
        console.log('data为空...');
        return null;
      }
      return (
        <Tag
          key={chainChild}
          data={_.cloneDeep(d)}
          onChange={onChange}
          onFinishChange={onFinishChange}
          onExpand={props.onExpand}
          applyConfirm={applyConfirm}
          onDelete={props.onDelete}
          onConfirm={this.onConfirm}
          onValiForm={this.onValiForm}
          showFooter={props.showFooter}
          direction={props.direction}
          editable={props.editable}
          depth={props.depth ? props.depth : depth}
          layout={props.layout}
          maxDepth={this.maxDepth}
          isBorder={isBorder}
          nameWidth={props.nameWidth}
          chain={chain}
          uiThemeId={props.uiThemeId}
          compileFunction={props.compileFunction}
          height={props.height}
          style={{ ...props.itemStyle, ...style, height: props.height }}
          pickerStyle={props.pickerStyle}
          multiSelectStyle={props.multiSelectStyle}
          componentStyle={props.componentStyle}
          depthGrow={props.depthGrow}
          bodyStyle={props.bodyStyle}
          wrapStyle={props.wrapStyle}
          nameStyle={props.nameStyle}
          endStyle={props.endStyle}
          widthPhi={props.widthPhi}
          heightPhi={props.heightPhi}
          expand={props.expand}
          isHover={props.isHover}
          isShowTitle={props.isShowTitle}
          isShowDepth={props.isShowDepth}
          helpStyle={props.helpStyle}
          group={props.group}
          disabled={disable}
          language={props.language}
          labelFormmat={props.labelFormmat}
        >
          { disable !== true && children && children.length > 0 ? this._getSelectors(children, childrenOptions, depthNext, chainChild) : null }
        </Tag>
      );
    });
  }
  onConfirm = () => {
    const options = this._getOptions();
    const validation = this._getValidation();
    this.props.onConfirm(options, {}, validation);
  }
  onValiForm = () => {
    const validation = this._getValidation();
    let checks = [];
    // for (let i=0; i<validation.length; i++) {
    //   const { validate, value } = validation[i];
    //   if (validate) {
    //     const { rules } = validate;    
    //     if (rules && typeof rules !== 'function') {
    //       const onCheck = parseValidate(rules);
    //       const bol = onCheck(value);
    //       if (typeof bol === 'string') {
    //         validation[i].showError = true;
    //         validation[i].errorMessage = bol;
    //         flag = false;
    //       } else {
    //         flag =true;
    //       }
    //       this.setState({ data: validation });
    //       return flag
    //     }
    //   }
    // }
    _.map(validation, v => {
      const { validate, value, key } = v;
      if (validate) {
        const { rules } = validate;    
        if (rules && typeof rules !== 'function') {
          const onCheck = parseValidate(rules);
          const bol = onCheck(value);
          if (typeof bol === 'string') {
            v.showError = true;
            v.errorMessage = bol;
            checks.push(key)
          }
        }
      }
    });
    this.setState({
      data: validation
    })
    if (checks.length > 0) return false;
    return true;
  }  
  _genFooter() {
    if (!this.props.onConfirm) return null;
    const styles = getStyles(this.props, this.state, this.context);
    const { showFooter } = this.props;
    let hideStyle = {};
    if (!showFooter) {
      hideStyle = {
        display: 'none'
      }
    }
    return (
      <div
        className="_controls-footer"
        style={{...styles.footer, ...hideStyle}}
      >
        <div
          style={styles.footerDivider}
        />
        <RaisedButton
          label={Utils.getText('确定', this.props.language)}
          primary
          onTouchTap={d => this.onConfirm()}
          labelStyle={{ ...styles.confirmButton }}
          style={{ ...styles.confirmButton, ...this.props.confirmStyle }}
        />
      </div>
    );
  }
  renderColumn() {
    const options = this.options = {};
    const styles = getStyles(this.props, this.state, this.context);

    return (
      <div
        className="_controls-panel"
        style={styles.main}
      >
        <div style={styles.wrapper}>
          <div className="_controls-header" />
          {this._getSelectors(this.state.data || [], options || {})}
          {this._genFooter()}
        </div>
      </div>
    );
  }
  renderRow() {
    const { options = {} } = this;
    return (
      <div className="z_controls-row-panel">
        {this._getSelectors(this.state.data || [], options)}
      </div>
    );
  }
  render() {
    const { direction } = this.props;
    this.updateMaxDepth();
    if (direction === 'column') return this.renderColumn();
    if (direction === 'row') return this.renderRow();
    return null;
  }
}
