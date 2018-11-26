/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import SettingIcon from 'material-ui/svg-icons/action/settings';
import HelpIcon from 'material-ui/svg-icons/action/help-outline';
import ReactTooltip from 'react-tooltip';
import './index.css';
import './../common/index.css';
import Utils from './../../lib/utils';
import EditorFloatTag from './../editors/EditorFloatTag';
// import FloatTag from './../subcoms/FloatTag';


// import FileCloudDownload from 'material-ui/svg-icons/file/cloud-download';

import getStyles from './getStyles';

const empty = () => null;

export default class UiBase extends Component {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.object.isRequired,
    /**
     * 当value改变时触发回调函数
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当UI的配置数据发生该变时触发
     */
    onUITypeChange: PropTypes.func,
    /**
     * 组件的子元素
     */
    children: PropTypes.array,
    /**
     * 设置是否可编辑组件的属性
     */
    editable: PropTypes.boolean,
    /**
     * 设置组件的深度
     */
    depth: PropTypes.number,
    /**
     * 设置组件间是否要加分割线
     */
    isBorder: PropTypes.boolean,
    /**
     * 单击确认按钮是触发回调函数
     */
    onConfirm: PropTypes.func,
    /**
     *  设置组件的宽度
     */
    width: PropTypes.number,
    /**
     * 设置组件的高度
     */
    height: PropTypes.number,
  }
  static defaultProps = {
    editable: false,
    disable: false,
    onFinishChange: () => console.error('替换 props.onFinishChange'),
    onChange: () => console.error('替换 props.onChange'),
    heightPhi: 0.7,
    widthPhi: 0.9,
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  constructor(props: any) {
    super(props);
    props = this.props;
    this.state = {
      isOpenEditor: props.isOpenEditor,
      isActive: false,
      isIconHover: false,
      data: props.data,
    };
  }
  componentWillMount() {
    this._extendState();
  }
  _getDepthStyle(depth) {
    return getStyles(this.props, this.state, this.context, depth).depth;
  }
  componentWillReceiveProps(newprops) {
    const { isOpenEditor, data } = newprops;
    this.setState({ data, isOpenEditor });
  }
  componentWillUpdate(newprops) {
    return !_.isEqual(newprops.data, this.state.data) || !_.isEqual(newprops.uiThemeId, this.props.uiThemeId);
  }
  // 为了一部分的重布局计算
  componentDidMount() {
    this._redraw();
    this._addEventResize();
    this._addEventKeyboard();
    // if(this.state.data.value) this.onChange(this.state.data);
  }
  _redraw = () => {
    this.setState({});
  }
  _extendState() {
    this.state = Object.assign(this.state, {
      data: _.cloneDeep(this.props.data),
    });
  }
  _genEditorIcon() {
    if (!this.props.editable) return null;

    const styleIcon = {
      fontSize: 10,
      transform: 'scale(0.8)',
      transformOrigin: '50% 50%',
      color: 'rgba(150,150,150,0.5)',
    };

    return (
      <SettingIcon
        style={styleIcon}
        onMouseOver={this.onEditorIconMouseOver}
        onMouseOut={this.onEditorIconMouseOut}
      />
    );
  }
  _genUI() {
    console.warn('必须继承这个方法');
  }
  _getDataObject(v) {
    const { key } = this.state.data;
    return { [key]: v };
  }
  _getDefaultHeight() {
    const styles = getStyles(this.props, this.state, this.context);
    return this.props.height || styles.main.normal.height;
  }
  _getItemHeight() {
    return this.props.heightPhi * this._getDefaultHeight();
  }
  _getSelectorWidth() {
    return `${Math.floor(this.props.widthPhi * 100)}%`;
  }
  
  _getSelectorStyle() {
    const width = this._getSelectorWidth();
    const height = `${this._getItemHeight()}px`;
    return { width, maxWidth: width, height };
  }
  onMouseOut = () => {
    this._unActive();
  }
  onMouseOver = () => {
    this._active();
  }
  _addEventResize() {
    // 不是特别好实现 大部分组件也不需要
  }
  // 键盘事件
  _addEventKeyboard() {
    Utils.onKeydown('Escape', () => {
      if (this.state.isOpenEditor) this.setState({ isOpenEditor: false });
    });
  }
  _active() {
    if (!this.state.isActive) this.setState({ isActive: true });
  }
  _unActive() {
    if (this.state.isActive) this.setState({ isActive: false });
  }

  onOpenEditClick = () => {
    if (!this.props.editable) return;
    this.setState({
      isOpenEditor: !this.state.isOpenEditor,
      isActive: false,
    });
  }
  onEditorChange = (d) => {
    if (this.state.data.uiType !== d.uiType) {
      return this.props.onUITypeChange(d, this.state.isOpenEditor);
    }
    this.setState({
      data: Utils.deepMerge(this.state.data, d),
    });
  }
  onEditorIconMouseOver = () => {
  }
  onEditorIconMouseOut = () => {
  }
  onChange = (...v) => {
    const { data } = this.state;
    const { unit } = data;
    let value = v[v.length - 1];
    this.setState({
      data: Object.assign({}, this.state.data, { value }),
    }, () => {
      
      if (unit) value = `${value}${unit}`;
      if (this._genFunc && this.props.compileFunction) value = this._genFunc();
      const d = this._getDataObject(value);
      (this.props.onChange || empty)(d, this.state.data, value);
    });
  }
  _genEditor() {
    const editable = this.props.editable;
    const { state } = this;
    if (!editable) return null;
    const controlEndStyle = {
      minWidth: this._getDefaultHeight(),
      opacity: this.state.isActive ? 1 : 0,
    };
    return [
      <div
        className="z_control-end"
        onClick={this.onOpenEditClick}
        style={controlEndStyle}
      >
        {this._genEditorIcon()}
      </div>,
      <EditorFloatTag
        data={state.data}
        component={this.refs.mainContainer}
        isOpen={state.isOpenEditor}
        onBgClick={this.onOpenEditClick}
        onFinishChange={this.onEditorChange}
        onMouseOver={() => false}
        onMouseOut={() => false}
      />,
    ];
  }
  onIconMouseOut = () => {
    this.setState({
      isIconHover: false,
    });
  }
  onIconMouseOver = () => {
    this.setState({
      isIconHover: true,
    });
  }
  _genName() {
    const { state, props } = this;
    const { data } = state;
    const { isShowTitle } = props;
    const styles = getStyles(this.props, this.state, this.context);
    if (isShowTitle === false) return null;
    const { desc, tipClassName, validate } = data;
    const rules = validate ? validate.rules : '';
    let iconStyle = state.isIconHover ? styles.helpIcon : styles.helpIconHover;
    iconStyle = { ...styles.helpIcon, ...iconStyle };
    const descHTML = desc ? (
      <div
        className="z_desc_incon"
      >
        <HelpIcon
          data-for="main" data-tip={desc} data-iscapture="true"
          style={iconStyle}
          ref="helpNode"
          onMouseOver={this.onIconMouseOver}
          onMouseOut={this.onIconMouseOut}
        />
        <ReactTooltip className={`toolStyle ${tipClassName}`} id="main" place="bottom" type="dark" effect="solid" multiline />
      </div>) : null;
    return (
      (state.data && typeof state.data.name === 'string'  ? <div className="z_control-name" style={styles.name} >
        { rules && state.data.name && <span style={styles.warn} className='z_warn'>*</span>}
        <div
          className="z_name_wrapper"
          ref="name"
        > 
          <div
            className="z_name"
            title={state.data.name}
          >
            {state.data.name}
          </div>
          {descHTML}
        </div>
      </div> : null)
    );
  }
  onAdvanceClick = () => this.setState({ isAdvance: !this.state.isAdvance });
  _genAdvance() {
    const { isAdvance, direction } = this.props;
    if (direction === 'row' || (isAdvance !== false && isAdvance !== true)) return null;
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div
        style={styles.advanceWrapper}
      >
        <div
          style={styles.advanceTextWrapper}
          onTouchTap={this.onAdvanceClick}
        >
          {'高级'}
          <div style={styles.advanceLogo}>
            {'»'}
          </div>
        </div>
      </div>
    );
  }
  _genBody() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div
        className="z_control-body" style={styles.body}
        ref="controlBody"
        // onClick={(e) => { e.stopPropagation()}}
        onMouseLeave={this.onMouseOut}
        onMouseEnter={this.onMouseOver}
      >
        {this._genUI()}
      </div>
    );
  }
  _genExtra(){
    // console.log('继承')
    if(!this._genUIExtra) return null;
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div style={styles.extra}>
        {this._genUIExtra()}
      </div>
    );
  }
  render() {
    const { state, props } = this;
    const styles = getStyles(this.props, this.state, this.context);

    // 如果是普通的选择器 中间有一个分划线
    // const borderWidth = props.isBorder ? 1 : 0;
    // Object.assign(style, {borderTop: `${borderWidth}px solid rgba(255, 255, 255, 0.05)`});
    // 深层嵌套的时候 左边有空间


    return (
      <div
        className="z_control-container"
        style={styles.container}

        ref="mainContainer"
      >
        
        <div style={styles.mainWrapper}>
          {props.isShowDepth ? <div className="z_control-depth-space" style={styles.depth} /> : null}
          {this._genName()}
          {this._genBody()}
          {this._genExtra()}
          {/* {this._genEditor()} */}
        </div>
        {/* {this._genAdvance()} */}
      </div>
    );
  }
}
