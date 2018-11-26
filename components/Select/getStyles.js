/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import { emphasize } from 'material-ui/utils/colorManipulator';
import _ from 'lodash';

export default function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  // console.log(context.muiTheme);
  const { textColor, primary1Color, canvasColor } = palette;
  const { isLineInput = true } = (_.get(props, 'data.props') || {});
  const { disable = false } = props.data;
  return {
    root: {
      // borderWidth: '1px',
      // borderColor,
      ...(isLineInput ? {} : {
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
      }),
      // borderStyle: 'solid',
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    hover: {
      ...(disable ? {border: 'none'} : { border: `1px solid ${primary1Color}` }),
      opacity: 1,
    },
    input: {
      height: '100%',
      background: canvasColor,
      // background: 'transparent',
      flexGrow: 1,
    },
    searchInput: {
      display: 'block',
      width: '96%',
      height: '35px',
      padding: '0 8px',
      boxSizing: 'border-box',
      margin: '8px auto',
      outline: 'none',
      fontFamily: 'sans-serif',
      color: textColor,
      fontSize: 12,
      borderWidth: 1,
      // borderStyle: 'solid',
      borderBottom: '1px dashed #f89',
      // borderColor: '#e3e3e3',
      borderRadius: '3px',
    },
    load: {
      color: primary1Color,
      textAlign: 'center',
      fontSize: 12,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    menuItem: {
      backgroundColor: emphasize(context.muiTheme.menuItem.hoverColor, 0.3),
    },
    text: {
      fontSize: '12px',
      color: textColor,
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      ...(_.get(props, 'data.styles.text') || {}),
    },
    
  };
}
