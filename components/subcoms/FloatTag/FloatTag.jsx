
/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';
import Utils from './../../../lib/utils';
import UiBase from './../../uiBase';
import Popover from 'material-ui/Popover';


const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
ctx.fontSize = '12px';
const getTextLength = (text) => {
  const textLen = ctx.measureText(text).width;
  return textLen;
};

const translate = (x, y) => `translate(${x}%, ${y}%)`;
const translatePX = (x, y) => `translate(${x}px, ${y}px)`;

const getOrAddId = (container) => {
  if (!container) return;
  let id = container.getAttribute('id');
  if (id) return id;
  id = `id_${Math.floor(Math.random() * 100000)}`;
  container.getAttribute('id', id);
  return id;
};

const getDirection = type => ({ top: 'column', left: 'row', right: 'row-reverse', bottom: 'column-reverse' }[type]);
const getTextStyle = (type) => {
  const stls = {
    top: {
      flexDirection: 'column',
    },
    bottom: {
      flexDirection: 'column-reverse',
    },
    left: {
      flexDirection: 'row',
    },
    right: {
      flexDirection: 'row-reverse',
    },
  };
  return stls[type];
};
const getTriangleStyle = (type, w, color) => {
  const stls = {
    top: {
      borderWidth: `${w}px ${w}px 0 ${w}px`,
      borderColor: `${color} transparent transparent transparent`,
    },
    bottom: {
      borderWidth: `0 ${w}px ${w}px ${w}px`,
      borderColor: `transparent transparent ${color} transparent`,
    },
    left: {
      borderWidth: `${w}px 0 ${w}px ${w}px`,
      borderColor: `transparent transparent transparent ${color}`,
    },
    right: {
      borderWidth: `${w}px ${w}px ${w}px 0`,
      borderColor: `transparent ${color} transparent transparent`,
    },
  };
  return stls[type];
};

export function getStyles(props, context) {
  const { background, color } = props;
  return {
    main: {
      background,
      color,
    },
  };
}

export default class FloatTag extends Component {
  static defaultProps = {
    heightTriangle: 7,
    direction: 'top',
    maxWidth: 200,
    background: '#d5d5d5',
    color: '#fff',
    transform: {
      x: 0,
      y: 0,
    },
  }
  static propTypes = {
    onChange: PropTypes.func,
    onFinishChange: PropTypes.func,
    isActive: PropTypes.bool,
    primaryText: PropTypes.any,
    direction: PropTypes.string,
    component: PropTypes.any,
    offset: PropTypes.number,
    background: PropTypes.string,
    color: PropTypes.string,
  }
  constructor(props: any) {
    super(props);
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  componentDidMount() {
    this.setState({});
  }
  _getFloatTagStyle() {
    const posStyle = this._computePosition();
    return Object.assign({}, posStyle, this.props.style);
  }
  _getTranslate() {
    const { direction, transform } = this.props;
    const transforms = {
      top: translate(0, 0),
      bottom: translate(0, 100),
      left: translate(-50, 50),
      right: translate(50, 50),
    };
    return { transform: transforms[direction] };
  }
  _computePosition(type) {
    const { ftc } = this.refs;
    const fh = (ftc ? ftc.offsetHeight : null);
    const fw = (ftc ? ftc.offsetWidth : null);
    const { component, offset = 5 } = this.props;
    const direction = this.props.direction;
    if (!component) return {};
    const left = component.offsetLeft,
      top = component.offsetTop;
    const width = component.offsetWidth,
      height = component.offsetHeight;
    const posMap = {
      left: {
        transform: translatePX(-fw, -fh / 2 - width / 2),
      },
      top: {
        transform: translatePX(-fw / 2 + width / 2, -fh - height),
      },
      bottom: {
        transform: translatePX(-fw / 2 + width / 2, 0),
      },
      right: {
        transform: translatePX(width, -fh / 2 - width / 2),
      },
    };
    const minWidth = { minWidth: `${fw}px` };
    const backgroundColor = { backgroundColor: 'transparent' };
    return Object.assign(posMap[type], minWidth, backgroundColor);
  }
  _genChildren = () => {
    const { children } = this.props;
    if (children === null || children === undefined) return null;
    if (typeof (children) === 'number') return Utils.numberFormater(children);
    if (typeof (children) === 'string') return children;
    return React.Children.map(children, child => React.cloneElement(child, {}));
  }
  render() {
    const { isActive, primaryText, direction, heightTriangle, background } = this.props;

    const style = {};
    const className = isActive ? 'z_float-tag-container z_float-tag-active' : 'z_float-tag-container z_float-tag-normal';
    const children = this._genChildren();
    const styles = getStyles(this.props, this.context);
    const { ftc } = this.refs;
    let maxWidth;
    let pw = maxWidth = this.props.maxWidth;
    if (this.refs.textspan) {
      pw = Math.min(pw, this.refs.textspan.offsetWidth);
    } else if (typeof children === 'string') {
      pw = Math.min(pw, getTextLength(children));
    }
    const ph = (ftc ? ftc.offsetHeight : 100);
    const wrapperStyle = {
      width: `${pw + 20}px`,
      maxWidth: `${pw + 20}px`,
      height: 'auto',
    };
    const sizeStyle = {
      width: `${pw}px`,
      maxWidth: `${pw}px`,
      height: 'auto',
    };
    // if (!isActive) return null;
    return (
      <Popover
        open={isActive}
        anchorEl={this.props.component}
        useLayerForClickAway={false}
        zDepth={0}
        style={this._computePosition(direction)}
      >
        <div
          className={className}
          style={{
            ...style,
            ...wrapperStyle,
            opacity: isActive ? 1 : 0,
          }}
        >
          <div
            className="z_float-tag-content-wapper-container"
            ref="ftw"
          >
            { this.refs.ftw ? <div
              className="z_float-tag-content-container"
              ref="ftc"
              style={getTextStyle(direction)}
            >
              <div
                className="z_float-tag-text-container"
                style={{ ...styles.main, ...sizeStyle }}
              >
                <span
                  className="z_float-tag-text-container-span"
                  ref="textspan"
                  style={{ maxWidth }}
                >
                  {children}
                </span>
              </div>
              <div className="z_float-tag-triangle-container">
                <div
                  className="z_float-tag-triangle"
                  style={getTriangleStyle(direction, heightTriangle, background)}
                />
              </div>
            </div>
            : null
            }
          </div>
        </div>
      </Popover>
    );
  }
}
