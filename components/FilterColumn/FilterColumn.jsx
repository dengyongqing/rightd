/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import SvgIcon from 'material-ui/SvgIcon';
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
import { getLastDay, changeDateForm, toStringTime, checkTime, _toDataO, _toValue } from './utils/changeForm';
import { operatorsCategory, operatorsNuberic, operatorsTime, operatorsTime1, operatorsDays } from './utils/operators';
import getStyles from './getStyles';
import Utils from './../../lib/utils';

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
      showCurrent: true,
      selectDay: {},
      selectDayValue: '',
      starttime: '',
      endtime: '',
      isDelay: false,
      isChecked: true,
      startError: false,
      endError: false,
      startMsg: '',
      endMsg: '',
    };
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
      if (value.name.indexOf('延迟') !== -1) {
        this.setState({
          isDelay: true,
        });
      }
    }
    this.setState({
      data, isOpenEditor, isExpand,
    });
  }
  onDelete = () => {
    const { data } = this.state;
    if (this.props.onDelete) this.props.onDelete(data);
  }

  // 筛选条件的键名
  onQueryKeyChange = (d, index) => {
    const { selectDay, selectDayValue, data } = this.state;
    const { type } = data.validate;
    const { dataO } = this;
    // console.log(dataO)
    let sliceName;
    if (dataO.name) {
      sliceName = dataO.name.substring(2, dataO.name.length);
    }
    let v = d.k;
    let name;
    if (typeof v === 'object' && !Array.isArray(v)) {
      name = v.name;
      v = v.id;
    }
    if (v === '$eqnull' && type !== 'time') {
      _.set(dataO, `values.${index}.k`, '$eq');
      _.set(dataO, `name${index}`, name);
      _.set(dataO, `values.${index}.v`, null);
    } else if (v === '$neqnull' && type !== 'time') {
      _.set(dataO, `values.${index}.k`, '$neq');
      _.set(dataO, `name${index}`, name);
      _.set(dataO, `values.${index}.v`, null);
    } else {
      _.set(dataO, `values.${index}.k`, v);
      const na = `name${index}`;
      if (na) {
        delete dataO[na];
      }
      _.set(dataO, `values.${index}.v`, undefined);
    }

    let time;
    if (type === 'time') {
      time = changeDateForm(selectDay, selectDayValue, v, name)[0];
      this.setKeyValue(time, v, index);
      if (name !== '过去' && sliceName && sliceName.indexOf('_') !== -1) {
        const idx = sliceName.indexOf('_');
        sliceName = sliceName.substring(0, idx);
      }
      sliceName ? _.set(dataO, 'name', `${name}${sliceName}`) : _.set(dataO, 'name', name);
    }
    const ndata = _toValue(dataO);
    this.onChange(ndata);
  }
  // showcurrent控制显示最近时间还是指定时间
  onShowCurrent = (e, v) => {
    if (v === '$or') {
      this.setState({
        showCurrent: true,
      });
    } else {
      this.setState({
        showCurrent: false,
        // isDelay: false,
      });
    }
  }
  setDateO = (dataO, limit, index, d) => {
    const lastTime = getLastDay(d);
    _.set(dataO, `values.${index + 1}.k`, limit);
    _.set(dataO, `values.${index + 1}.v`, lastTime);
  }
  // type为time的onchange事件
  setKeyValue(v, k, index, d="") {
    const { isChecked } = this.state;
    const { dataO } = this;
    if (typeof v === 'object' && !Array.isArray(v)) v = _.values(v)[0];
    _.set(dataO, `values.${index}.v`, v);
    const { name } = dataO;
    switch (k) {
      case '$gte': {
        const limitR = isChecked ? '$lte' : '$lt';
        if (limitR === '$lt') {
          _.set(dataO, `values.${index + 1}.k`, limitR);
          _.set(dataO, `values.${index + 1}.v`, toStringTime(new Date(new Date(new Date().getTime() - 24 * 60 * 60 * 1000).setHours(23, 59, 59))));
        }
        if (limitR === '$lte') {
          _.set(dataO, `values.${index + 1}.k`, limitR);
          _.set(dataO, `values.${index + 1}.v`, toStringTime(new Date()));
        }
        break;
      }
      case '$lte': {
        const limitL = isChecked ? '$gte' : '$gt';
        if (limitL === '$gt') {
          _.set(dataO, `values.${index + 1}.k`, limitL);
          _.set(dataO, `values.${index + 1}.v`, toStringTime(new Date(new Date(new Date().getTime() + 24 * 60 * 60 * 1000).setHours(0, 0, 0))));
        }
        if (limitL === '$gte') {
          _.set(dataO, `values.${index + 1}.k`, limitL);
          _.set(dataO, `values.${index + 1}.v`, toStringTime(new Date()));
        }
        break;
      }
      case '$eql': {
        this.setDateO(dataO, '$lte', index, d);
        break;
      }
    }
    if (name && name.indexOf('当前') > -1) {
      this.setDateO(dataO, '$lte', index, d);
    }
  }
  // 输入数值（input）和选择天 周 月 年（select)后的时间
  setTime = (d, index) => {
    const { selectDayValue, selectDay } = this.state;
    const { dataO } = this;
    const k = dataO.values[index] && dataO.values[index].k;
    const { name } = dataO;
    let v;
    if (typeof d === 'number' || d === '') {
      this.setState({
        selectDayValue: d,
      });
      v = changeDateForm(selectDay, d, k, name);
    } else {
      this.setState({
        selectDay: d.k || d,
      });

      v = changeDateForm(d, selectDayValue, k, name);
    }
    if (dataO.values[0].k === '$eql') {
      this.setKeyValue(v[0], k, index, d);
      _.set(dataO, `values.${index}.k`, '$gte');
      _.set(dataO, `values.${index}.v`, v[0]);
      const data = _toValue(dataO);
      this.onChange(_toValue(dataO));
    }else {
      this.setKeyValue(v[0], k, index, d);
      const data = _toValue(dataO);
      this.onChange(data);
    }

  }
  // input onChang事件
  setInputValue = (d, index) => {
    const { dataO } = this;
    const v0 = this.operatorSelect ? this.operatorSelect.props.data.value.name : '';
    const v2 = this.select ? this.select.props.data.value : '';
    const name = dataO.name;
    let last = '';
    if (name && name.indexOf('_') !== -1) {
      const idx = name.indexOf('_');
      last = name.substring(idx, name.length) || '';
    }
    _.set(dataO, 'name', `${v0}${d.v}${v2}${last}`);
    this.setTime(d.v, index);
  }
  // type为time的选择天 月 周 年的select的onchange事件
  onValueChange = (d, index) => {
    const { dataO } = this;
    const v0 = this.operatorSelect ? this.operatorSelect.props.data.value.name : '';
    const v1 = this.input ? this.input.props.data.value : '';
    const name = dataO.name;
    let last = '';
    if (name && name.indexOf('_') !== -1) {
      const idx = name.indexOf('_');
      last = name.substring(idx, name.length) || '';
    }
    _.set(dataO, 'name', `${v0}${v1}${d.k.name}${last}`);
    this.setTime(d.k || d.name, index);
  }
  // measure caregory的input的onchange事件
  onQueryValueChange = (d, index) => {
    let v = d.v;
    const { dataO } = this;
    if (typeof v === 'object' && !Array.isArray(v)) v = _.values(v)[0];
    _.set(dataO, `values.${index}.v`, v);
    const data = _toValue(dataO);
    this.onChange(data);
  }
  handleDelay = (d) => {
    const v0 = this.operatorSelect ? this.operatorSelect.props.data.value.name : '';
    const v1 = this.input ? this.input.props.data.value : '';
    const v2 = this.select ? this.select.props.data.value : '';
    this.setState({
      isDelay: !this.state.isDelay,
    }, () => {
      const { name } = this.dataO;
      if (this.state.isDelay) {
        _.set(this.dataO, 'name', `${v0}${v1}${v2}_延迟`);
        const data = _toValue(this.dataO);
        this.onChange(data);
      } else {
        const reName = name.substring(0, name.indexOf('_'));
        _.set(this.dataO, 'name', reName);
        const data = _toValue(this.dataO);
        this.onChange(data);
      }
    });
  }
  setDelayInputName = (val) => {
    const v0 = this.operatorSelect ? this.operatorSelect.props.data.value.name : '';
    const v1 = this.input ? this.input.props.data.value : '';
    const v2 = this.select ? this.select.props.data.value : '';
    const num = val.v;
    _.set(this.dataO, 'name', `${v0}${v1}${v2}_延迟${num}`);
    const data = _toValue(this.dataO);
    this.onChange(data);
  }
  setDelaySelect = (val) => {
    const v0 = this.operatorSelect.props.data.value.name;
    const v1 = this.input.props.data.value;
    const v2 = this.select.props.data.value;
    const v3 = this.delayInput.props.data.value;
    const { name } = val.k;
    _.set(this.dataO, 'name', `${v0}${v1}${v2}_延迟${v3}${name}`);
    const data = _toValue(this.dataO);
    this.onChange(data);
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
  _genDiv() {
    const styles = getStyles(this.props, this.state, this.context);
    const { isActive } = this.state;
    const { value } = this.state.data;
    let days;
    let dayNum;
    let unit;
    if (_.values(value).length > 1) {
      days = _.values(value)[1];
      let idx;
      if (days && days.indexOf('_') !== -1) {
        idx = days.indexOf('_');
        days = days.substring(idx, days.length);
      }
      dayNum = days.replace(/[^\d]/g, '');
      dayNum && days.split(dayNum)[1] !== 'undefined' ?
        unit = days.split(dayNum)[1] : unit = '';
    }
    return (
      <div style={styles.dayChose}>
        <Input
          ref={(r) => { this.delayInput = r; }}
          key="value"
          isActive={isActive}
          isShowDepth
          isShowTitle={false}
          language={this.props.language}
          labelFormmat={this.props.labelFormmat}
          data={{
            uiType: 'input',
            valueType: 'integer',
            value: dayNum || '',
            key: 'v',
            filterStyle: this.state.data.filterStyle ? this.state.data.filterStyle.inputStyle : {},
          }}
          onChange={d => this.setDelayInputName(d)}
          heightPhi={0.7}
        />
        <Select
          ref={(r) => { this.delaySelect = r; }}
          key="day"
          isShowDepth
          isShowTitle={false}
          isActive={this.state.isActive}
          language={this.props.language}
          labelFormmat={this.props.labelFormmat}
          data={{
            isInput: false,
            uiType: 'select',
            valueType: 'string',
            value: unit || '',
            key: 'k',
            validate: {
              options: operatorsDays,
            },
            selectStyle: this.state.data.filterStyle ? this.state.data.filterStyle.selectStyle : null,
          }}
          onChange={d => this.setDelaySelect(d)}
          heightPhi={0.7}
        />
      </div>
    );
  }
  _genOperators(index = 0) {
    const { showCurrent } = this.state;
    const { type } = this.state.data.validate;
    let options;
    if (type === 'category') {
      options = operatorsCategory;
    } else if (type === 'measure') {
      options = operatorsNuberic;
    } else if (type === 'time' && showCurrent) {
      options = operatorsTime;
    } else {
      options = operatorsTime1;
    }
    const { value } = this.state.data;
    let selectValue;
    let selectKey;
    let days;
    let dayNum;
    let unit;
    if (!value || typeof (value) !== 'object') {
      selectKey = { name: '无', id: null };
      selectValue = '';
    } else {
      const arr = _.values(value)[0];
      const op = arr[index];
      const k = _.keys(op)[0];
      const v = _.values(op)[0];
      if (_.filter(options, o => o.id === k).length === 0) {
        selectKey = { name: '无', id: null };
      } else {
        selectKey = _.filter(options, o => o.id === k)[0];
        selectValue = v;
      }
      if (type === 'time' && _.values(value).length > 1) {
        days = _.values(value)[1];
        let idx;
        if (days && days.indexOf('_') !== -1) {
          idx = days.indexOf('_');
          days = days.substring(0, idx);
        }
        dayNum = days && days.replace(/[^\d]/g, '');
        dayNum && days && days.split(dayNum)[1] !== 'undefined' ?
        unit = days && days.split(dayNum)[1] :
        days.length > 2 ? unit = days.substring(2, days.length) : unit = '';
        if (days && days.indexOf('当前') !== -1) {
          selectKey = { name: '当前', id: '$eql' };
        }
      } else if (type !== 'time' && _.values(value).length > 1) {
        const keys = _.values(value);
        // console.log(keys[index + 1]);
        let id;
        if (keys[index + 1] === '为空') {
          id = '$eqnull';
        } else if (keys[index + 1] === '非空') {
          id = '$neqnull';
        }
        selectKey = keys[index + 1] ? { name: keys[index + 1], id } : { name: '无', id: null };
      }
    }
    // console.log(selectKey)
    return [
      (<Select
        ref={(r) => { this.operatorSelect = r; }}
        key="key"
        isShowDepth
        isShowTitle={false}
        isActive={this.state.isActive}
        language={this.props.language}
        labelFormmat={this.props.labelFormmat}
        data={{
          isInput: false,
          uiType: 'select',
          valueType: 'string',
          value: selectKey,
          key: 'k',
          validate: {
            options,
          },
          selectStyle: this.state.data.filterStyle ? this.state.data.filterStyle.selectStyle : null,
        }}
        onChange={d => this.onQueryKeyChange(d, index)}
        heightPhi={0.7}
      />),
      this._genValue(selectKey, index, selectValue, dayNum, unit),
    ];
  }
  _genValue(selectKey, index, selectValue, dayNum = '', unit = '') {
    const styles = getStyles(this.props, this.state, this.context);
    const { isActive, isChecked, isDelay, data } = this.state;
    const { validate } = data;
    const { type, options } = validate;
    if (type === 'measure' && selectKey && selectKey.id !== null) {
      return (
        <Input
          key="value"
          isActive={isActive}
          isShowDepth
          isShowTitle={false}
          labelFormmat={this.props.labelFormmat}
          data={{
            uiType: 'input',
            valueType: 'float',
            value: typeof selectValue === 'number' ? selectValue : '',
            key: 'v',
            filterStyle: this.state.data.filterStyle ? this.state.data.filterStyle.inputStyle : {},
          }}
          onChange={d => this.onQueryValueChange(d, index)}
          heightPhi={0.7}
        />
      );
    }
    if (type === 'time' && selectKey && selectKey.id !== null) {
      return (
        <div key="dayChose">
          {selectKey.name === '当前' ?
            (<div style={styles.dayChose} key="dayChose1">
              <Select
                ref={(r) => { this.select = r; }}
                key="current"
                isShowDepth
                isShowTitle={false}
                isActive={this.state.isActive}
                language={this.props.language}
                labelFormmat={this.props.labelFormmat}
                data={{
                  uiType: 'select',
                  valueType: 'string',
                  value: unit || '',
                  key: 'k',
                  validate: {
                    options: operatorsDays,
                  },
                  selectStyle: this.state.data.filterStyle ? this.state.data.filterStyle.selectStyle : null,
                }}
                onChange={d => this.onValueChange(d, index)}
                heightPhi={0.7}
              />
            </div>)
            :
            (<div style={styles.dayChose} key="dayChose1">
              <Input
                ref={(r) => { this.input = r; }}
                key="value"
                isActive={isActive}
                isShowDepth
                isShowTitle={false}
                language={this.props.language}
                labelFormmat={this.props.labelFormmat}
                data={{
                  uiType: 'input',
                  valueType: 'integer',
                  value: dayNum || '',
                  key: 'v',
                  filterStyle: this.state.data.filterStyle ? this.state.data.filterStyle.inputStyle : {},
                }}

                onChange={d => this.setInputValue(d, index)}
                heightPhi={0.7}
              />
              <Select
                ref={(r) => { this.select = r; }}
                key="day"
                labelFormmat={this.props.labelFormmat}
                isShowDepth
                isShowTitle={false}
                isActive={this.state.isActive}
                language={this.props.language}
                data={{
                  uiType: 'select',
                  valueType: 'string',
                  value: unit || '',
                  key: 'k',
                  validate: {
                    options: operatorsDays,
                  },
                  selectStyle: this.state.data.filterStyle ? this.state.data.filterStyle.selectStyle : null,
                }}
                onChange={d => this.onValueChange(d, index)}
                heightPhi={0.7}
              />
            </div>)
          }
          {selectKey.name === '当前' ? null : <Checkbox
            checked={isChecked}
            iconStyle={styles.iconStyle}
            labelStyle={styles.labelStyle}
            style={styles.checkBox}
            onCheck={d => this.changeChecked(d)}
            label={Utils.getText('包括当前', this.props.language)}
          />
          }
          {selectKey.name === '过去' ? (
            <div>
              <Checkbox
                checked={isDelay}
                iconStyle={styles.iconStyle}
                labelStyle={styles.labelStyle}
                style={styles.checkBox}
                onCheck={d => this.handleDelay(d)}
                label={Utils.getText('延迟', this.props.language)}
              />
              {this.state.isDelay ? this._genDiv() : null}
            </div>
          ) : null
          }
        </div>
      );
    }
    if (type === 'category' && inList(selectKey, ['$in', '$notIn'])) {
      return (
        <MulitSelect
          key="value"
          isActive={isActive}
          isShowDepth
          isShowTitle={false}
          language={this.props.language}
          labelFormmat={this.props.labelFormmat}
          data={{
            uiType: 'input',
            valueType: 'string',
            value: selectValue || [],
            validate: {
              options,
            },
            placeholder: '',
            key: 'v',
            mulitStyle: this.state.data.filterStyle ? this.state.data.filterStyle.selectStyle : null,
          }}
          onChange={d => this.onQueryValueChange(d, index)}
          heightPhi={0.7}
        />
      );
    }
    if (type === 'category' && inList(selectKey, ['$eq', '$ne'])) {
      return (
        <Input
          key="value"
          isActive={isActive}
          isShowDepth
          isShowTitle={false}
          language={this.props.language}
          labelFormmat={this.props.labelFormmat}
          data={{
            uiType: 'input',
            valueType: 'string',
            value: selectValue || '',
            key: 'v',
          }}
          onChange={d => this.onQueryValueChange(d, index)}
          heightPhi={0.7}
        />
      );
    }
    if (type === 'category' && inList(selectKey, ['$like', '$notLike'])) {
      return (
        <Input
          key="value"
          isActive={isActive}
          isShowDepth
          isShowTitle={false}
          language={this.props.language}
          labelFormmat={this.props.labelFormmat}
          data={{
            uiType: 'input',
            valueType: 'string',
            value: selectValue,
            placeholder: '',
            key: 'v',
            filterStyle: this.state.data.filterStyle ? this.state.data.filterStyle.inputStyle : {},
          }}
          onChange={d => this.onQueryValueChange(d, index)}
          heightPhi={0.7}
        />
      );
    }
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
            label={Utils.getText('或', this.props.language)}
            labelStyle={styles.labelStyle}
            iconStyle={styles.iconStyle}
            style={styles.radioButton}
            onTouchTap={() => this.onLogicClick('$or')}
          />
          <RadioButton
            value="$and"
            key="$and"
            label={Utils.getText('且', this.props.language)}
            iconStyle={styles.iconStyle}
            labelStyle={styles.labelStyle}
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
  _genName() {
    const { props } = this;
    const styles = getStyles(this.props, this.state, this.context);
    const height = this._getItemHeight();
    const { name } = props.data;
    const { isActive } = this.state;
    const openDom = this.state.data.expandIcon ? this.state.data.expandIcon : (<OpenIcon
      style={styles.iconExpand}
    />);
    const closeDom = this.state.data.closeIcon ? this.state.data.closeIcon : (<CloseIcon
      style={styles.icon}
    />);
    // const settingDom = this.state.data.settingIcon ? this.state.data.settingIcon : (<SettingIcon style={styles.icon} />);
    const settingDom = this.state.data.settingIcon ? this.state.data.settingIcon : (
      <SvgIcon style={{ width: '18px', heigth: '18px' }} viewBox="0 0 1194 1024">
        <path xmlns="http://www.w3.org/2000/svg" d="M549.971042 950.613639a36.863846 36.863846 0 0 1-36.863847-36.778513V365.400077a36.69318 36.69318 0 0 1 9.557294-24.746563L760.999496 72.366632H117.759509l238.932338 268.116216a38.39984 38.39984 0 0 1 9.557294 24.149233V694.614706l58.453089 47.018471a36.437182 36.437182 0 0 1 5.71731 51.541118 36.437182 36.437182 0 0 1-51.455786 5.71731l-71.765034-57.855759a37.205178 37.205178 0 0 1-13.397278-28.586548V379.394686L9.215962 61.017346A35.839851 35.839851 0 0 1 3.498652 21.59351 36.266516 36.266516 0 0 1 37.205178 0.004267h806.993971c14.591939 0 27.306553 8.277299 33.706526 21.589243a37.205178 37.205178 0 0 1-6.399973 39.423836L586.237557 379.309353v534.525773a36.69318 36.69318 0 0 1-36.266515 36.778513z" fill="#666666" />
        <path xmlns="http://www.w3.org/2000/svg" d="M1153.019196 386.39199H735.570268a36.863846 36.863846 0 0 0 0 73.64236h417.448928a36.863846 36.863846 0 0 0 36.863846-36.778514 36.09585 36.09585 0 0 0-36.863846-36.863846z m0 193.70586H735.570268a36.863846 36.863846 0 0 0 0 73.813025h417.448928a36.863846 36.863846 0 0 0 36.863846-36.863846 36.09585 36.09585 0 0 0-36.863846-36.863846z m0 193.876525H735.570268a36.863846 36.863846 0 0 0 0 73.727693h417.448928a36.863846 36.863846 0 0 0 36.863846-36.863846 36.09585 36.09585 0 0 0-36.863846-36.863847z" fill="#666666" />
      </SvgIcon>);

    return (
      <div className="z_filter_wrapper" onClick={this.onExpandClick}>
        <div
          className="z_line-name-wrapper"
          style={Object.assign({}, this.state.data.filterStyle ? (this.state.data.filterStyle.nameStyle) : {}, { height })}
        >
          {this._genDepthDiv(0)}
          <div className="z_line-name" style={styles.lineName}>{name}</div>
          {

            isActive || (!isActive && this.state.data.expand) ?
              <div
                style={styles.iconWrapper}
              >
                {
                  this.state.data.expandable === false ? null : <div onClick={this.onExpandClick}>{openDom}</div>
                }
                <div onClick={this.onDelete}>{closeDom}</div>
              </div> : this.state.data.value && this.state.data.value !== null && this.state.data.expandable ?
                <div style={{ ...styles.iconWrapper, marginRight: '20px' }}>{settingDom}</div> : null
          }
        </div>
      </div>
    );
  }
  changeChecked = (d) => {
    this.setState({
      isChecked: !this.state.isChecked,
    });
    if (this.input && this.select) {
      const value = this.input.props.data.value;
      const unit = this.select.props.data.value;
      this.input.onChange(value);
      this.select.onChange({ name: unit });
    }
  }
  _genCurrent() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div>
        <span style={styles.info}>{Utils.getText('满足以下选项', this.props.language)}</span>
        {this._genQuery1()}
      </div>
    );
  }
  // 指定时间（开始）的picker的oncange事件
  onStartTime = (d, index = 0) => {
    const time = toStringTime(d.time.time);
    if (!checkTime(time, this.state.endtime)) {
      return this.setState({
        startError: true,
        startMsg: Utils.getText('开始时间不该大于结束时间', this.props.language),
        starttime: '',
        isDelay: false,
      });
    } else {
      this.setState({
        startError: false,
        startMsg: '',
        isDelay: false,
        starttime: time,
      });
    }
    const { dataO } = this;
    if (Object.keys(this.dataO.values).length === 0 || (this.dataO.values[1] && this.dataO.values[1].k !== '$lte')) {
      if (!(this.dataO.values[0] && this.dataO.values[0].k === '$lte')) {
        _.set(dataO, `values.${index}.k`, '$gte');
        _.set(dataO, `values.${index}.v`, time);
      }
    } else if (Object.keys(this.dataO.values[0]).length !== 0 && this.dataO.values[0].k === '$lte') {
      _.set(dataO, `values.${index + 1}.k`, '$gte');
      _.set(dataO, `values.${index + 1}.v`, time);
    } else if (this.dataO.values[1] && this.dataO.values[1].k === '&gte') {
      _.set(dataO, `values.${index + 1}.k`, '$gte');
      _.set(dataO, `values.${index + 1}.v`, time);
    } else {
      _.set(dataO, `values.${index}.k`, '$gte');
      _.set(dataO, `values.${index}.v`, time);
    }
    delete dataO.name;
    const data = _toValue(dataO);
    this.onChange(data);
  }
  // 指定时间（结束）的picker的onchange事件
  onEndTime = (d, index) => {
    const { dataO } = this;
    const time = toStringTime(d.time.time);
    if (!checkTime(this.state.starttime, time)) {
      return this.setState({
        endError: true,
        endMsg: Utils.getText('结束时间不该小于开始时间', this.props.language),
        endtime: '',
        isDelay: false,
      });
    } else {
      this.setState({
        endError: false,
        endMsg: '',
        endtime: time,
        isDelay: false,
      });
    }
    if (Object.keys(this.dataO.values).length === 0 || (this.dataO.values[1] && this.dataO.values[1].k !== '$lte')) {
      _.set(dataO, `values.${index}.k`, '$lte');
      _.set(dataO, `values.${index}.v`, time);
    } else if (Object.keys(this.dataO.values[0]).length !== 0 && this.dataO.values[0].k === '$gte') {
      _.set(dataO, `values.${index + 1}.k`, '$lte');
      _.set(dataO, `values.${index + 1}.v`, time);
    } else if (Object.keys(this.dataO.values[0]).length !== 0 && this.dataO.values[0].k === '$lte') {
      _.set(dataO, `values.${index}.k`, '$lte');
      _.set(dataO, `values.${index}.v`, time);
    } else {
      _.set(dataO, `values.${index + 1}.k`, '$lte');
      _.set(dataO, `values.${index + 1}.v`, time);
    }
    delete dataO.name;
    const data = _toValue(dataO);
    this.onChange(data);
  }
  handleDeleteStart = () => {
    this.setState({
      starttime: '',
    });
    let index;
    for (const arr in this.dataO.values) {
      if (this.dataO.values[arr].k === '$gte') {
        index = arr;
      }
    }
    delete this.dataO.values[index];
    this.onChange(_toValue(this.dataO));
  }
  handleDeleteEnd = () => {
    this.setState({
      endtime: '',
    });
    let index;
    for (const arr in this.dataO.values) {
      if (this.dataO.values[arr].k === '$lte') {
        index = arr;
      }
    }
    delete this.dataO.values[index];
    this.onChange(_toValue(this.dataO));
  }
  _genStartError() {
    const { state, props, context } = this;
    const { startMsg } = state;
    const styles = getStyles(props, state, context);
    return (
      <span style={styles.errorMsg}>
        {startMsg}
      </span>
    );
  }
  _genEndMsg() {
    const { state, props, context } = this;
    const { endMsg } = state;
    const styles = getStyles(props, state, context);
    return (
      <span style={styles.errorMsg}>
        {endMsg}
      </span>
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
        <span style={styles.info}>{Utils.getText('满足以下选项', this.props.language)}</span>
        <div key="picker">
          <div style={{ position: 'relative' }}>
            <Picker
              ref={(r) => { this.startTime = r; }}
              span={Utils.getText('当前时间', this.props.language)}
              initialDate={this.state.starttime}
              error={this.state.startError}
              handleDelete={this.handleDeleteStart}
              language={this.props.language}
              data={{
                name: Utils.getText('开始时间', this.props.language),
                key: 'time',
                uiType: 'time',
                valueType: 'time',
                value: {
                  time: this.state.starttime,
                },
              }}
              style={{ display: 'flex', flexDirection: 'column', height: 'auto', alignItems: 'start', marginBottom: '8px' }}
              // bodyStyle={{ justifyContent: 'start' }}
              nameStyle={{ marginBottom: '4px' }}
              nameWidth={this.props.nameWidth}
              onChange={d => this.onStartTime(d, 0)}
              editable={false}
            />
            {/* { this.state.startError  ? this._genStartError() : null} */}
          </div>
          <div style={{ position: 'relative' }}>
            <Picker
              ref={(r) => { this.endtime = r; }}
              initialDate={this.state.endtime}
              span={Utils.getText('当前时间', this.props.language)}
              error={this.state.endError}
              language={this.props.language}
              handleDelete={this.handleDeleteEnd}
              data={{
                name: Utils.getText('结束时间', this.props.language),
                key: 'time',
                uiType: 'time',
                valueType: 'time',
                value: {
                  time: this.state.endtime,
                },
              // desc: '结束时间应大于开始时间'
              }}
              style={{ display: 'flex', flexDirection: 'column', height: 'auto', alignItems: 'start' }}
              // bodyStyle={{ justifyContent: 'start' }}
              nameStyle={{ marginBottom: '4px' }}
              nameWidth={this.props.nameWidth}
              editable={false}
              onChange={d => this.onEndTime(d, 0)}
            />
            {/* { this.state.endError  ? this._genEndMsg() : null} */}
          </div>
        </div>
      </div>
    );
  }
  ChangeStyle() {
    this.state.backgroundColor = '#ff0';
    this.state.color = '#000';
  }
  onColorChange = (d) => {
    const k = _.keys(d)[0];
    const color = d[k];
    const { dataO } = this;
    _.set(dataO, 'color', color);
    const ndata = _toValue(dataO);
    this.onChange(ndata);
  }
  _genTimeSelector = () => this.state.showCurrent ? this._genCurrent() : this._genDetail();
  _genTime() {
    const styles = getStyles(this.props, this.state, this.context);
    let selected;
    if (!this.state.showCurrent) {
      selected = this.dataO.logic;
    } else {
      selected = '$or';
    }
    return (
      <div className="z_filter" style={{ marginTop: '8px' }}>
        <RadioButtonGroup
          ref="buttonGroup"
          name={'name'}
          valueSelected={selected}
          style={styles.radioButtonGroup}
          onChange={(e, d) => this.onShowCurrent(e, d)}
        >
          <RadioButton
            value="$or"
            key="$or"
            labelStyle={styles.labelStyle}
            iconStyle={styles.iconStyle}
            label={Utils.getText('最近时间', this.props.language)}
            style={styles.radioButton}
            onTouchTap={() => this.onTimeClick('$and')}
          />
          <RadioButton
            value="$and"
            key="$and"
            label={Utils.getText('指定时间', this.props.language)}
            labelStyle={styles.labelStyle}
            iconStyle={styles.iconStyle}
            style={{ ...styles.radioButton, paddingLeft: '4px' }}
            onTouchTap={() => this.onTimeClick('$and')}
          />
        </RadioButtonGroup>
        { this._genTimeSelector()}
        {/* { showCurrent ? this._genCurrent() : this._genDetail()} */}
      </div>
    );
  }
  onClean = () => {
    this.onChange(null);
    this.setState({});
  }
  onApply = () => {
    const { starttime, endtime } = this.state;
    const { dataO } = this;
    if (!this.state.showCurrent) {
      this.setState({
        isDelay: false,
      });
      delete dataO.name;
      this.onChange(_toValue(this.dataO));
    }
    if (this.dataO.values.length === 0) {
      if (this.props.applyConfirm) {
        return this.props.applyConfirm(this.state.data);
      }
    }
    if (this.dataO.values[0].k === '$eql') {
      _.set(dataO, `values.${0}.k`, '$gte');
      this.onChange(_toValue(this.dataO));
    }

    if (checkTime(starttime, endtime)) {
      if (this.props.applyConfirm) this.props.applyConfirm(this.state.data);
    }
    if (this.props.applyConfirm) this.props.applyConfirm(this.state.data);
  }
  render() {
    const { props, state, context } = this;
    const styles = getStyles(props, state, context);
    const { type } = state.data.validate;
    const { handleConfirm, addColor } = state.data;
    // console.log('before', this.state.data.value)
    this.state.data.value = Utils.convertFilterTime(this.state.data.value);
    // console.log(this.state.data.value);
    this.dataO = _toDataO(type, this.state.data.value);
    // console.log('render', this.dataO)
    return (
      <div
        className="z_control-container z_control-container-direction"
        style={Object.assign({}, this._getContainerStyle())}
        onMouseEnter={this.onMouseOver}
        onMouseLeave={this.onMouseOut}
        ref={(r) => { this.mainContainer = r; }}
      >
        {this._genName()}
        <div className="z_operate_wrapper">
          {this._genDepthDiv(1)}
          <QueueAnim
            style={styles.anim}
          >
            {
              this.state.isExpand ?
                (<div className="z_control-container-direction">
                  <div style={{ fontSize: '12px', ...styles.lineName, paddingTop: '8px' }}>{Utils.getText('筛选条件', this.props.language)}</div>
                  {type === 'time' && this._genTime()}
                  {type !== 'time' ?
                    (<div>
                      {this._genQuery1()}
                      {this._genOrAnd()}
                      {this._genQuery2()}
                    </div>
                    ) : null
                  }
                  {
                    addColor ?
                    (<Color
                      key="color"
                      isShowDepth
                      isShowTitle
                      isActive={this.state.isActive}
                      data={{
                        name: Utils.getText('字体颜色', this.props.language),
                        uiType: 'color',
                        key: 'fontColor',
                        valueType: 'color',
                        value: this.dataO && this.dataO.color ? this.dataO.color : '#fff',
                        validate: {},
                      }}

                      onChange={d => this.onColorChange(d)}
                      heightPhi={0.7}
                    />)
                    : null
                  }
                  { handleConfirm ?
                    (<div className="z_control-raiseButton">
                      <RaisedButton 
                        style={{ marginBottom: '8px', marginRight: '8px', ...styles.button }} 
                        buttonStyle={styles.button} 
                        label={Utils.getText('清空', this.props.language)}
                        onTouchTap={() => this.onClean()} />
                      <RaisedButton 
                        style={{ marginBottom: '8px', ...styles.button }} 
                        buttonStyle={styles.button} 
                        label={Utils.getText('应用', this.props.language)}
                        primary 
                        onTouchTap={() => this.onApply()} />
                    </div>
                    ) : null
                  }
                </div>) : null
            }
          </QueueAnim>
          {this._genDepthDiv(1)}
        </div>
      </div>
    );
  }
}

