import React from 'react';
import 'react-tippy/dist/tippy.css';
import {
  Tooltip,
} from 'react-tippy';

function getStyles() {
  return {
    main: {
      backgroundColor: 'transparent',
    },
  };
}

export default class ZToolTip extends React.Component {
  render() {
    const styles = getStyles();
    const { position, title, ...rest } = this.props;
    return (
      <Tooltip
        style={styles.main}
        html={<div>{title || ''}</div>}
        duration="10"
        position={position || 'bottom'}
        arrow
        trigger="mouseenter"
        {...rest}
      >
        {this.props.children}
      </Tooltip>
    );
  }
   }
