/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import UiBase from './../uiBase';
import './../uiBase/index.css';
import Select from './../Select';
import Input from './../Input';
import Picker from './../Time';
import Color from './../Color';
import MulitSelect from './../MultiSelect';
import Utils from './../../lib/utils';
import getStyles from './getStyles';

const getv = (v1, v2) => {
  if (v1 !== null && v1 !== undefined) return v1;
  if (v2 !== null && v2 !== undefined) return v2;
};
function equal(d, d1) {
  return (typeof d === 'object') ? d.id === d1 : d === d1;
}
function inList(d, arr) {
  let bol = false;
  arr.forEach((a) => {
    bol = bol || equal(d, a);
  });
  return bol;
}

export default class FilterColumnCategory extends UiBase {
  static propTypes = {
    /** * 组件的配置数据 */
    data: PropTypes.any.isRequired,
    /** * 当value改变时发生回调 */
    onChange: PropTypes.func.isRequired,
    /** * 当单击确认按钮后出发函数 */
    onConfirm: PropTypes.func,
    /** * 删除组件的回调函数 */
    onDelete: PropTypes.func,
    /**
     * 控制弹出框开关的回调函数
     */
    onFinishChange: PropTypes.func,
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  constructor(props: any) {
    super(props);
    this.state = {
      isExpand: getv(this.props.data.expand, this.props.expand),
      isChecked: true,
    };
  }
  componentDidMount() {
    if (this.state.data.value && Object.keys(this.state.data.value).length !== 0) {
      this.setState({
        showCurrent: false,
      });
    }
  }
  componentWillReceiveProps(newprops) {
    const { isOpenEditor, data } = newprops;
    let { isExpand } = this.state;
    const { expand, value } = data;
    if (expand || expand === false) {
      isExpand = expand;
    }
    if (value && value.name) {
      this.setState({
        showCurrent: true,
      });
    }
    this.setState({
      data, isOpenEditor, isExpand,
    });
  }
  onDelete = () => {
    const { data } = this.state;
    if (this.props.onDelete) this.props.onDelete(data);
  }

  onExpandClick = () => {
    if (this.state.data.expandable === false) return;
    const isExpand = !this.state.isExpand;
    const { data } = this.state;
    const { value, validate } = data;
    const { type } = validate;
    this.state.data.expand = isExpand;
    if (this.props.onExpand) {
      this.props.onExpand(this.state.data, isExpand);
    }
    this.onChange(this.state.data.value);
    this.setState({ isExpand });
    if (type === 'time') {
      if (value && value.$and.length !== 0) {
        this.setState({
          showCurrent: false,
        });
      } else {
        this.setState({
          showCurrent: true,
        });
      }
    }
  }
  _getContainerStyle() {
    const style = _.cloneDeep(this.props.style);
    const { alternateTextColor } = this.context.muiTheme.palette;
    return { ...style, height: 'auto', backgroundColor: alternateTextColor };
  }
  _genQuery1() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <QueueAnim
        style={styles.anim}
      >
        {
          this.state.isExpand ? (
            <div
              className="z_query_div"
              key="query1"
            >
              {this._genOperators(0)}
            </div>
          ) : null
        }
      </QueueAnim>
    );
  }
  _genQuery2() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <QueueAnim style={styles.anim}>
        {
          this.state.isExpand ? (
            <div
              className="z_query_div"
              key="query2"
            >
              {this._genOperators(1)}
            </div>
          ) : null
        }
      </QueueAnim>
    );
  }
  onLogicClick = (type) => {
    _.set(this.dataO, 'logic', type);
    const data = _toValue(this.dataO);
    this.onChange(data);
  }
  onTimeClick = (type) => {
    _.set(this.dataO, 'logic', type);
    // _.set(this.dataO, 'values', [])
    const data = _toValue(this.dataO);
    this.onChange(data);
  }
  _genOrAnd() {
    const styles = getStyles(this.props, this.state, this.context);
    const depth = this._genDepthDiv();
    const inner = this.state.isExpand ? (
      <div
        className="z_query_div z_or_and"
        style={styles.orAnd}
        key="orand"
      >
        {depth}
        <RadioButtonGroup
          name={'name'}
          defaultSelected={this.dataO.logic}
          style={styles.radioButtonGroup}
        >
          <RadioButton
            value="$or"
            key="$or"
            label="或"
            style={styles.radioButton}
            onTouchTap={() => this.onLogicClick('$or')}
          />
          <RadioButton
            value="$and"
            key="$and"
            label="且"
            style={{ ...styles.radioButton, paddingLeft: '4px' }}
            onTouchTap={() => this.onLogicClick('$and')}
          />
        </RadioButtonGroup>
      </div>
    ) : null;
    return (
      <QueueAnim
        style={styles.anim}
      >
        {inner}
      </QueueAnim>
    );
  }
  _genDepthDiv() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      this.props.isShowDepth ? <div className="z_control-depth-space" style={styles.depth} /> : null
    );
  }
  handleClick = () => {
    this.setState({

    });
  }
  _genName() {
    const { props } = this;
    return (
      <RaisedButton onClick={this.handleClick} label="添加" />
      // <div className="z_filter_wrapper">
      //   <div
      //     className="z_line-name-wrapper"
      //     style={Object.assign({}, this.state.data.filterStyle ? (this.state.data.filterStyle.nameStyle) : {}, { height })}
      //   >
      //     {this._genDepthDiv(0)}
      //     <div className="z_line-name" style={styles.lineName}>{name}</div>
      //     {

      //       isActive || (!isActive && this.state.data.expand)  ?
      //         <div
      //           style={styles.iconWrapper}
      //         >
      //           {
      //             this.state.data.expandable === false ? null : <div onClick={this.onExpandClick}>{openDom}</div>
      //           }
      //           <div onClick={this.onDelete}>{closeDom}</div>
      //         </div> : this.state.data.value !== null ?
      //           settingDom : null
      //     }
      //   </div>
      // </div>
    );
  }
  changeChecked = () => {
    this.state.isChecked = !this.state.isChecked;
    if (this.input && this.select) {
      const value = this.input.state.data.value;
      const unit = this.select.state.data.value;
      this.input.onChange(value);
      this.select.onChange(unit);
    }
  }
  _genCurrent() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div>
        <span style={styles.info}>满足以下选项：</span>
        {this._genQuery1()}
      </div>
    );
  }


  _genDetail() {
    const styles = getStyles(this.props, this.state, this.context);
    if (Object.keys(this.dataO.values).length === 1) {
      if (this.dataO.values[0].k === '&gte') {
        this.state.starttime = this.dataO.values[0].v;
        this.state.endtime = '';
      }
      if (this.dataO.values[0].k === '$lte') {
        this.state.endtime = this.dataO.values[0].v;
        this.state.starttime = '';
      }
    } else if (Object.keys(this.dataO.values).length === 2) {
      if (new Date(this.dataO.values[0].v).getTime() < new Date(this.dataO.values[1].v).getTime()) {
        this.state.starttime = this.dataO.values[0].v;
        this.state.endtime = this.dataO.values[1].v;
      }
      if (new Date(this.dataO.values[0].v).getTime() > new Date(this.dataO.values[1].v).getTime()) {
        this.state.starttime = this.dataO.values[1].v;
        this.state.endtime = this.dataO.values[0].v;
      }
    } else {
      this.state.starttime = '';
      this.state.endtime = '';
    }
    return (
      <div>
        <span style={styles.info}>满足以下选项：</span>
        <div key="picker">
          <div style={{ position: 'relative' }}>
            <Picker
              ref={(r) => { this.startTime = r; }}
              span="当前时间："
              initialDate={this.state.starttime}
              error={this.state.startError}
              handleDelete={this.handleDeleteStart}
              data={{
                name: '开始时间：',
                key: 'time',
                uiType: 'time',
                valueType: 'time',
                value: {
                  time: this.state.starttime,
                },
              }}
              style={{ display: 'flex', flexDirection: 'column', height: 'auto', alignItems: 'start', marginBottom: '8px' }}
              bodyStyle={{ width: '100%', justifyContent: 'start' }}
              nameStyle={{ width: 80, maxWidth: 80, marginBottom: '4px' }}
              onChange={d => this.onStartTime(d, 0)}
              editable={false}
            />
          </div>
          <div style={{ position: 'relative' }}>
            <Picker
              ref={(r) => { this.endtime = r; }}
              initialDate={this.state.endtime}
              span="当前时间："
              error={this.state.endError}
              handleDelete={this.handleDeleteEnd}
              data={{
                name: '结束时间',
                key: 'time',
                uiType: 'time',
                valueType: 'time',
                value: {
                  time: this.state.endtime,
                },
              // desc: '结束时间应大于开始时间'
              }}
              style={{ display: 'flex', flexDirection: 'column', height: 'auto', alignItems: 'start' }}
              bodyStyle={{ width: '100%', justifyContent: 'start' }}
              nameStyle={{ width: 80, maxWidth: 80, marginBottom: '4px' }}
              editable={false}
              onChange={d => this.onEndTime(d, 0)}
            />
          </div>
        </div>
      </div>
    );
  }


  handleAdd = () => {

  }
  // _genAdd = () => {
  //   return (<RaisedButton label="添加"/>)
  // }
  render() {
    const { props, state, context } = this;
    const styles = getStyles(props, state, context);
    const { type } = state.data.validate;
    // this.dataO = _toDataO(type, this.state.data.value);
    return (
      <div
        className="z_control-container z_control-container-direction"
        style={Object.assign({}, this._getContainerStyle())}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
        ref={(r) => { this.mainContainer = r; }}
      >
        {this._genName()}
        {/* {this._genAdd()} */}
        <div className="z_operate_wrapper">
          {this._genDepthDiv(1)}
          <QueueAnim
            style={styles.anim}
          />
          {this._genDepthDiv(1)}
        </div>
      </div>
    );
  }
}

