/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
import { fade, emphasize, darken } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context) {
  const { textColor } = context.muiTheme.palette;
  const disableStyle = {
    opacity: 0.4,
    cursor: 'not-allowed',
  };
  const { palette } = context.muiTheme;
  let { borderColor, primary1Color, canvasColor } = palette;
  const isActive = props.isInputActive || props.isActive;
  const { isShowActiveBorder = true, isInput, disable, style={}, componentStyle={}, helpStyle={} } = props;
  let borderWidth = style.borderWidth ? style.borderWidth : '1px';
  borderColor = (style.borderColor && !isActive) ? style.borderColor : (isActive && isShowActiveBorder && !disable) ? primary1Color : borderColor;
  return {
    main: {
      border: `${borderWidth} solid ${borderColor}`,
      height: '100%',
      padding: 0,
      flexGrow: 1,
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      overflow: 'hidden',
      borderColor: style.borderColor || borderColor,
      ...(props.style || {}),
      borderRadius: 3,
      boxSizing: 'border-box',
      // background: canvasColor,
    },
    input: {
      border: 0,
      outline: 0,
      fontWeight: style.fontWeight ? style.fontWeight : 400,
      color: style.color ? style.color : textColor,
      padding: isInput ? '0 8px' : '0 0px',
      boxSizing: 'border-box',
      margin: 0,
      flexGrow: 1,
      width: '100%',
      height: !props.isDropdown && componentStyle.height ? componentStyle.height : '100%',
      fontSize: style.fontSize ? style.fontSize : '12px',
      left: 0,
      top: 0,
      background: props.isDropdown ? 'none' : !props.isDropdown && componentStyle.backgroundColor ? componentStyle.backgroundColor : canvasColor,
      ...(props.disable ? disableStyle : {}),
    },
    label: {
      padding: `0px 8px`,
      fontSize: '12px',
      color: helpStyle.color || emphasize(palette.textColor, 0.3)
    },
    placeholder: {
      color: helpStyle.color || emphasize(palette.textColor, 0.3)
    },
    inputDiv: {
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    rightIcon: {
      color: '#7B7B7B',
      transform: state.isActive ? 'rotate(180deg)' : 'rotate(0deg)',
      display: props.isDropdown ? 'block' : 'none',
      height: '100%',
      right: 0,
      top: 0,
      width: '20px',
      minWidth: '20px',
      maxWidth: '20px',
      margin: '0 6px',
      // zIndex: 100,
      cursor: 'pointer',
    },
  };
}
