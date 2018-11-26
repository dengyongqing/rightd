/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/

import { fade, emphasize } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, context, state) {
  const { palette } = context.muiTheme;
  let { textColor, borderColor, primary1Color, canvasColor } = palette;
  const { multiSelectStyle, helpStyle={} } = props;
  const color = multiSelectStyle && multiSelectStyle.borderColor ? multiSelectStyle.borderColor : borderColor;
  borderColor = state.isActive ? primary1Color : color;
 // borderColor = state.isActive ? primary1Color : borderColor;
  const showSpan = {
    color: textColor,
    display: 'inline-block',
    fontSize: multiSelectStyle && multiSelectStyle.fontSize ? multiSelectStyle.fontSize : 12,
  };
  const { isLineInput = true } = (_.get(props, 'data.props') || {});
  return {
    root: {
      ...(isLineInput ? {} : {
        borderRadius: 0,
        borderLeftWidth: 0,
        borderRightWidth: 0,
        borderTopWidth: 0,
      }),
      boxSizing: 'border-box',
      whiteSpace: 'nowrap',
      flexWrap: 'nowrap',
      width: '100%',
      height: '100%',
      display: 'flex',
    },
    rightIcon: {
      textAlign: 'center',
      color: primary1Color,
      width: 16,
      height: 16,
      margin: '12px 8px 12px 12px',
    },
    menuHover: {
      ':hover': {
        // backgroundColor: menuItemStyle && menuItemStyle.hoverColor ? menuItemStyle.hoverColor : primary1Color,
        // color: '#fff',
      },
    },
    showSpan,
    showSpanNumber: {
      ...showSpan,
      color: primary1Color,
      fontWeight: 'bold',
    },
    showDiv: {
      color: textColor,
      border: 0,
      outline: 0,
      width: '100%',
      height: '100%',
      background: 'transparent',
      display: 'flex',
      alignItems: 'center',
      flexGrow: 1,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    input: {
      // display: 'block',
      height: '100%',
      flexGrow: 1,
      background: canvasColor,
      fontFamily: 'sans-serif',
      color: textColor,
      fontSize: multiSelectStyle &&multiSelectStyle.fontSize ? multiSelectStyle.fontSize : 12,
      borderWidth: multiSelectStyle && multiSelectStyle.borderWidth ? multiSelectStyle.borderWidth : 1,
      borderStyle: 'solid',
      borderColor,
      borderRadius: '2px',

      fontWeight: multiSelectStyle && multiSelectStyle.fontWeight ? multiSelectStyle.fontWeight : 400,
    },
    menuItem: {
      backgroundColor: fade(multiSelectStyle && multiSelectStyle.selectedColor ? multiSelectStyle.selectedColor : '#5281EF', 0.1),
    },
    showItem: {
      marginRight: '4px',
      display: 'block',
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    deleteIcon: {
      width: '20px',
      height: '20px',
      color: '#777',
      display: 'block',
      zIndex: '10',
    },
    unhoverIcon: {
      display: 'none',
    },
    dropIcon: {
      color: '#7B7B7B',
      display: 'block',
    },
    showSingleItem: {
      width: '100%',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontSize: multiSelectStyle && multiSelectStyle.fontSize ? multiSelectStyle.fontSize : '12px',
    },
    info: {
      fontSize: '12px',
      color: helpStyle.color || '#CCCCCC',
    },
    item: {
      fontSize: '12px',
    },
    load: {
      color: primary1Color,
      textAlign: 'center',
      fontSize: multiSelectStyle && multiSelectStyle.fontSize ? multiSelectStyle.fontSize : 12,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    selectBox: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily:multiSelectStyle &&multiSelectStyle.fontFamily ? multiSelectStyle.fontFamily : 'sans-serif',
      color: multiSelectStyle && multiSelectStyle.color ? multiSelectStyle.color : textColor,
      fontSize: multiSelectStyle && multiSelectStyle.fontSize ? multiSelectStyle.fontSize : 12,
      cursor: 'pointer',
    },
    option: {
      height: '30px',
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: primary1Color,
      border: `1px solid ${color}`,
    },
    selectPadding: {
      padding: '0 40px 0 16px',
      position: 'relative',
    },
    unSelectPadding: {
      padding: '0 16px',
    },
    itemTitle: {
      padding: '5px 0',
      color: '#4a4a4a',
    },
    tagStyle: {
      display: 'flex',
      flexDirection: 'row',
      flexFlow: 'wrap',
      width: '100%',
      overflow: 'auto'
    }
  };
}
