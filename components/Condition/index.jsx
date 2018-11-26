/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/
import './index.css';
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

// function inList(d, arr) {
//   let bol = false;
//   arr.forEach((a) => {
//     bol = bol || equal(d, a);
//   });
//   return bol;
// }

export default class Condition extends UiBase {
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
    // if (this.state.data.value && Object.keys(this.state.data.value).length !== 0) {
    //   this.setState({
    //     showCurrent: false,
    //   });
    // }
  }
  componentWillReceiveProps(newprops) {
    // const { isOpenEditor, data } = newprops;
    // let { isExpand } = this.state;
    // const { expand, value } = data;
    // if (expand || expand === false) {
    //   isExpand = expand;
    // }
    // if (value && value.name) {
    //   this.setState({
    //     showCurrent: true,
    //   });
    // }
    // this.setState({
    //   data, isOpenEditor, isExpand,
    // });
  }
  render() {
    const { props, state, context } = this;
    const styles = getStyles(props, state, context);
    const { type } = state.data.validate;
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

