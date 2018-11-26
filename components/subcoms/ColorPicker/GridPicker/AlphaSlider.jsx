// /*
// * @Author: dengyongqing@aliyun.com
// * @Date: 2016-12-27 15:52:11
// */

// import React from 'react';
// import PropTypes from 'prop-types';
// import Popover from 'material-ui/Popover';
// import { fade } from 'material-ui/utils/colorManipulator';
// import _ from 'lodash';

// import UiBase from './../../../uiBase';
// import Utils from './../../../../lib/utils';

// const colors = Utils.getColorArray();

// const defaultStyle = {
//   color: '#f00',
// };

// function getStyles(props, state, context) {
//   const { palette } = context.muiTheme;
//   const border = '1px solid rgba(150, 150, 150, 0.2)';
//   const borderRadius = '2px';
//   const { color } = props;
//   const color0 = fade(color, 0);
//   const color1 = fade(color, 1);
//   const sliderHeight = '12px';
//   return {
//     slider: {
//       width: 'calc(100% - 16px)',
//       height: sliderHeight,
//       display: 'flex',
//       borderRadius,
//       cursor: 'pointer',
//       overflow: 'hidden',
//       background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
//     },
//     sliderLine: {
//       position: 'absolute',
//       width: 'calc(100% - 16px)',
//       flexGrow: 1,
//       height: sliderHeight,
//       background: `linear-gradient(to right, ${color0},${color1})`,
//     },
//     dot: {
//       border,
//       position: 'absolute',
//       height: '12px',
//       width: '12px',
//       borderRadius: '48px',
//       pointerEvents: 'none',
//       background: palette.canvasColor,
//     },
//   };
// }

// export default class Color extends UiBase {
//   static defaultProps = {
//     value: 0.2,
//   };
//   static propTypes = {
//   }
//   constructor(props: any) {
//     super(props);
//     this.state = {};
//   }
//   handelChangeValue(e) {
//     if (!this.sliderEL) return;
//     const width = this.sliderEL.offsetWidth;
//     const wid = e.nativeEvent.offsetX;
//     const ratio = wid / width;
//     if (this.props.onChange) this.props.onChange(ratio);
//   }
//   _getDotX() {
//     if (!this.sliderEL) return;
//     const width = this.sliderEL.offsetWidth;
//     return width * this.props.value;
//   }
//   onMouseDown = (e) => {
//     this.isdown = true;
//     this.handelChangeValue(e);
//   }
//   onMouseMove = (e) => {
//     if (!this.isdown) return;
//     this.handelChangeValue(e);
//   }
//   onMouseUp = (e) => {
//     this.isdown = false;
//   }
//   render() {
//     const styles = getStyles(this.props, this.state, this.context);
//     return (
//       <div
//         style={styles.slider}
//         className="z_color-transparent-image"
//         onMouseDown={this.onMouseDown}
//         onMouseMove={this.onMouseMove}
//         onMouseUp={this.onMouseUp}
//         onTouchStart={this.onMouseUp}
//         onTouchMove={this.onMouseMove}
//         onTouchEnd={this.onMouseUp}
//         ref={ref => this.sliderEL = ref}
//       >
//         <div style={styles.sliderLine} />
//         <div style={{ ...styles.dot, left: this._getDotX() }} />
//       </div>
//     );
//   }
// }

/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

import React from 'react';
import { fade } from 'material-ui/utils/colorManipulator';
import _ from 'lodash';

import UiBase from './../../../uiBase';


function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  const border = '1px solid rgba(150, 150, 150, 0.2)';
  const borderRadius = '2px';
  const { color } = props;
  const color0 = fade(color, 0);
  const color1 = fade(color, 1);
  const sliderHeight = '12px';
  return {
    slider: {
      width: '100%',
      height: sliderHeight,
      display: 'flex',
      borderRadius,
      cursor: 'pointer',
      overflow: 'hidden',
      background: 'url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAMUlEQVQ4T2NkYGAQYcAP3uCTZhw1gGGYhAGBZIA/nYDCgBDAm9BGDWAAJyRCgLaBCAAgXwixzAS0pgAAAABJRU5ErkJggg==") left center',
    },
    sliderLine: {
      position: 'relative',
      width: '100%',
      flexGrow: 1,
      height: sliderHeight,
      background: `linear-gradient(to right, ${color0},${color1})`,
    },
    dot: {
      border,
      position: 'absolute',
      height: '12px',
      width: '12px',
      borderRadius: '48px',
      background: palette.canvasColor,
    },
  };
}

export default class Color extends UiBase {
  static defaultProps = {
    value: 0.2,
  };
  static propTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    if (this.sliderEL) {
      const v = this._getRect(this.props.value);
      this.setState({
        left: v
      });
    }
    document.addEventListener("mousemove",  this.onMouseMove, false);
    document.addEventListener("mouseup",  this.onMouseUp, false);
  }
  componentWillUnmount(){
    document.removeEventListener('mousemove', this.onMouseMove, false);
    document.removeEventListener('mouseup', this.onMouseUp, false);
  }
  
  handelChangeValue(ratio) {
    if (this.props.onChange) this.props.onChange(ratio);
  }

  _getRect(v) {

    if (!this.sliderEL) return;
    const width = this.sliderEL.offsetWidth;
    return v === 1 ? width - 14 : width * v;
  }

  onMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.isdown = true;
    let l = e.target.offsetLeft; 
    let x = e.clientX ;  
    let disX = '';
    disX = x-l;  
    let max;

    if(!this.sliderEL || !e.target) return;

    max = this.sliderEL.offsetWidth - e.target.offsetWidth;  
    this.setState({
      max,
      disX,
    })
  }
  onMouseMove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!this.isdown) return;

    const { max, id, disX, index } = this.state;
    let moveX = '';
    let moveL = '';
    moveX = e.clientX;
    moveL = Math.min(max, Math.max(0, moveX - disX));
    if(!this.sliderEL && this.refs.rect) return;
    this.refs.rect.style.left = moveL + 'px';  //设置滑块left值
    const ratio = moveL / this.sliderEL.offsetWidth;

    this.handelChangeValue(ratio);
  }
  onMouseUp = (e) => {
    e.preventDefault();
    e.stopPropagation();
    this.isdown = false;
  }
  addRect = (e) => {
    const id = e.target.getAttribute('id');
    if(!id || id !== 'rectContainer' || !this.sliderEL) return;
    const width = this.sliderEL.offsetWidth;
    const offsetX = e.nativeEvent.offsetX;
    if(this.props.onChange) this.props.onChange(offsetX/width);
  }
  render() {
    const styles = getStyles(this.props, this.state, this.context);
    const { value } = this.props;
    return (
      <div 
        style={styles.slider}
        onClick={this.addRect}
      > 
        <div
          style={styles.sliderLine} 
          ref={ref => this.sliderEL = ref}
          id="rectContainer"
        >
          <div 
            ref='rect'
            onMouseDown={this.onMouseDown}
            style={{ ...styles.dot, left: this._getRect(value) || this.state.left }} 
          />
        </div>
      </div>
   
    )
  }
}

