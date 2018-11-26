/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

import DeleteIcon from 'material-ui/svg-icons/navigation/cancel';
import { fade, emphasize } from 'material-ui/utils/colorManipulator';

function getStyles(props, context, state) {
  const {chip} = context.muiTheme;

  const backgroundColor = props.backgroundColor || chip.backgroundColor;

  return {
    root: {
      backgroundColor,
    },
    deleteIcon: {
      color: (state.deleteHovered) ? fade(chip.deleteIconColor, 0.4) : chip.deleteIconColor,
      cursor: 'pointer',
      margin: '0',
      transformOrigin: '50% 50%',
      transform: 'scale(0.8,0.8)'
    },
  };
}

export default class TagIcon extends Component {
  static propTypes = {
    onChange:       PropTypes.func,
    onFinishChange: PropTypes.func,
    isActive:       PropTypes.bool,
  }
  constructor(props: any) {
    super(props);
    this.state = {deleteHovered: false}
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  handleMouseEnterDeleteIcon = () => {
    this.setState({deleteHovered: true});
  }
  handleMouseLeaveDeleteIcon = () => {
    this.setState({deleteHovered: false});
  }
  onDelete = (e) => {
    this.props.onDelete(e);
  }
  _genDeleteIcon(){
    const styles = getStyles(this.props, this.context, this.state);
    return(
      <DeleteIcon
        color={styles.deleteIcon.color}
        style={styles.deleteIcon}
        onTouchTap={this.onDelete}
        onMouseEnter={this.handleMouseEnterDeleteIcon}
        onMouseLeave={this.handleMouseLeaveDeleteIcon}
      />
    );
  }
  render(){
    let { children} = this.props;
    const styles = getStyles(this.props, this.context, this.state);
    return (
      <div 
        className="z_tag-container"
        style={Object.assign(styles.root, this.props.style)}
      > 
        <div className="z_tag-text">{children}</div>
        <div className="z_tag-icon">
          {this._genDeleteIcon()}
        </div>
      </div>
    );
  }
}
