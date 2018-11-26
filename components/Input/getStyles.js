import { fade } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context, height) {
  const { isActive } = state;
  const { palette } = context.muiTheme;
  const { textColor, primary1Color, canvasColor } = palette;
  let { borderColor } = palette;
  const { style={}, componentStyle={} } = props;
  const width = style.width || '100%';
  const { disable = false } = props.data;
  borderColor = componentStyle.borderColor ? componentStyle.borderColor : isActive && !disable ? primary1Color : borderColor;
  let borderWidth = componentStyle.borderWidth ? componentStyle.borderWidth : 1;
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      overflow: 'hidden',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
    },
    jsonText: {
      display: 'flex',
      flexDirection: 'row',
    },
    inputJson: {
      border: 'null',
      backgroundColor: fade(textColor, 0.1),
    },
    noBorder: {
      border: 'none',
    },
    input: {
      boxSizing: 'border-box',
      width: componentStyle.width ? componentStyle.width : '100%',
      // background: componentStyle.backgroundColor ? componentStyle.backgroundColor : canvasColor,
      // background: 'transparent',
      fontWeight: componentStyle.fontWeight ? componentStyle.fontWeight : 'normal',
      
      border: `${borderWidth}px solid ${borderColor}`,
      borderWidth,
      borderColor,
      borderRadius: '2px',
      outline: 'none',
      appearance: 'none',
      margin: 0,
      fontSize: componentStyle.fontSize ? componentStyle.fontSize : '12px',
      transition: 'opacity 0.6s ease, color 0.6s ease, border-color 0.6s ease',
      color: componentStyle.normalColor ? componentStyle.normalColor : textColor,
      pointerEvents: 'auto',

    },
    error: {
      border: '1px solid #f01000',
    },
    disabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
    },
    show: {
      opacity: 1,
    },
    'input-item-error': {
      position: 'absolute',
      background: '#fae3e3',
      borderRadius: '2px',
      fontSize: '14px',
      color: '#FF1F1F',
      letterSpacing: '0px',
      padding: '7.5px 2px 7.5px 2px',
      // height: '28px',
      opacity: 0,
      minWidth: '160px',
      zIndex: 2,
      transition: 'opacity ease 0.5s',
    },
    hover: {
      ...(disable ? { border: `1px solid ${primary1Color}` } : {}),
      opacity: 1,
    },
    searchIcon: {
      width: '24px',
      height: '24px',
      color: 'b9b9b9',
      position: 'absolute',
      right: '8px',
      display: 'block',
    },
    deleteIcon: {
      width: '20px',
      height: '20px',
      color: 'b9b9b9',
      position: 'absolute',
      right: '8px',
      display: 'block',
      zIndex: 10
    },
    unhoverIcon: {
      display: 'none',
    },
    errorMsg: {
      color: '#D0021B',
      fontSize: '12px',
    },
    popOver: {
      // position: 'fixed',
      // margin: `${height}px 0 0 0`,
      // backgroundColor: '#FFEEF0',
      // padding: '4px 6px',
      background: 'transparent',
      marginTop: '-4px',
      boxShadow: 'none',
      boxSizing: 'border-box',
      zIndex: 99,
    },
    extra: {
      width: '56px',
    },
    arrow: {
      width: '20px',
      borderLeftStyle: 'solid',
      borderLeftWidth: '1px',
      borderLeftColor: borderColor,
      color: fade(textColor, 0.3),
    },
    arrowDown: {
      borderTopStyle: 'solid',
      borderTopWidth: '1px',
      borderTopColor: borderColor,
    },
    btn: {
      position: 'absolute',
      right: 0,
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    },
  };
}
