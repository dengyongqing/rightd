/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/
import QueueAnim from 'rc-queue-anim';
import React from 'react';
import PropTypes from 'prop-types';
import Subheader from 'material-ui/Subheader';
import OpenIcon from 'material-ui/svg-icons/navigation/expand-more';
import { fade, emphasize, darken } from 'material-ui/utils/colorManipulator';
import Toggle from 'material-ui/Toggle';
import UiBase from './../uiBase';
import './index.css';

export function getStyles(props, state, context) {
  const { group = {}, depth } = props;
  const { weakenLevel = 1000000 } = group;
  const isShowLine = depth < weakenLevel;
  const { palette } = context.muiTheme;
  const { alternateTextColor, borderColor } = palette;
  return {
    main: {
      normal: {
        height: '36px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: alternateTextColor,
        boxSizing: 'border-box',
        borderBottom: isShowLine ? `1px solid ${fade(darken(borderColor, 0.3), 0.2)}` : 'none',
      },
      hover: {
        background: fade(alternateTextColor, 0.05),
      },
    },

    iconExpand: {
      cursor: 'pointer',
      color: emphasize(palette.textColor, 0.4),
      display: 'block',
      transition: '0.2s',
      transformOrigin: '50% 50%',
      transform: state.isExpand ? 'rotate(0deg)' : 'rotate(-90deg)',
    },
    trackOff: {
      height: '2px',
    },
    thumbOff: {
      width: 12,
      height: 12,
      border: `1px solid ${borderColor}`,
      top: -1,
    },
    thumbSwitched: {
      width: 12,
      height: 12,
      border: 0,
      marginLeft: -12,
    },
  };
}

const getv = (v1, v2) => {
  if (v1 !== null && v1 !== undefined) return v1;
  if (v2 !== null && v2 !== undefined) return v2;
  return true;
};

export default class Group extends UiBase {
  static propTypes = {
    /**
     * 组件的配置数据
     */
    data: PropTypes.any.isRequired,
    /**
     * 当value改变时触发回调
     */
    onChange: PropTypes.func.isRequired,
    /**
     * 当鼠标提起或离开，触摸结束，输入框失焦时触发
     */
    onFinishChange: PropTypes.func,
    /**
     * 组件的子结点
     */
    children: PropTypes.any,
  }

  constructor(props: any) {
    super(props);
    // console.log(props)
    this.state = {
      isExpand: getv(this.props.data.expand, this.props.expand),
      contentHeight: null,
    };
  }
  componentDidMount() {
    this.setState({
      contentHeight: this.content.clientHeight,
    });
  }

  onExpandClick = () => {
    const isExpand = !this.state.isExpand;
    if (this.props.onExpand) this.props.onExpand(isExpand);
    this.state.data.expand = isExpand;
    this.setState({ isExpand });
  }

  _genStatusIcon() {
    const { group = {}, depth } = this.props;
    const { weakenLevel = 1000000 } = group;
    const isShowIcon = depth < weakenLevel;
    if (!isShowIcon) return null;
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <OpenIcon
        onClick={this.onExpandClick}
        style={styles.iconExpand}
      />
    );
  }

  _genChildren = () => {
    const { disable } = this.state.data;
    return (
      <QueueAnim
        interval={[4, 0]}
        duration={[0, 0]}
      >
        { this.state.isExpand && this.props.children && !disable ? this.props.children : null}
      </QueueAnim>
    );
  }

  onChange = (d) => {
    if (this.props.onChange) this.props.onChange(null, d);
  }

  onToggleClick = () => {
    const { data } = this.state;
    data.disable = !data.disable;
    this.setState({ data: { ...data } });
    // this.onChange(data, data);
    this.props.onChange(data, data);
  }

  _genIsable() {
    const { disable } = this.state.data;
    const styles = getStyles(this.props, this.state, this.context);
    if (disable === null || disable === undefined) return null;
    return (
      <Toggle
        toggled={!disable}
        thumbStyle={styles.thumbOff}
        trackStyle={styles.trackOff}
        thumbSwitchedStyle={styles.thumbSwitched}
        trackSwitchedStyle={styles.trackSwitched}
        onToggle={this.onToggleClick}
      />
    );
  }

  // TODO: add pending to child group
  render() {
    const { name } = this.props.data;
    const shStyle = {
      lineHeight: `${25}px`,
      fontSize: 12,
      flexGrow: 11,
      width: 'auto',
      paddingLeft: 0,
      userSelect: 'none',
    };
    const depthStyle = this._getDepthStyle();
    const shrinkText = this.state.isExpand ? '' : ' … ';
    const style = getStyles(this.props, this.state, this.context);
    const { main } = style;
    // const bgStyle  = this.state.isActive ? Object.assign({}, main.normal, main.hover): main.normal;
    const bgStyle = main.normal;
    return (
      <div className="z_group-container">
        <div
          className="z_group-line-container"
          style={bgStyle}
          onMouseOver={this.onMouseOver}
          onMouseOut={this.onMouseOut}
        >
          <div style={depthStyle} className="z_group-depth">
            { this._genStatusIcon() }
          </div>
          <Subheader
            style={shStyle}
            onClick={this.onExpandClick}
          >
            { name + shrinkText }
          </Subheader>
          <div className="z_group-end" >
            {this._genIsable()}
          </div>
        </div>

        <div
          ref={(ref) => { this.content = ref; }}
          className="z_group-content"
          style={{ maxHeight: this.state.contentHeight || null }}
        >
          <div className="z_group-content-container">
            { this._genChildren()}
          </div>
        </div>
      </div>
    );
  }
}

