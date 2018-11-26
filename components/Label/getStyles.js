import { fade } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context, height) {
  const { isActive } = state;
  const { palette } = context.muiTheme;
  const { textColor, primary1Color, canvasColor } = palette;
  let { borderColor } = palette;
  const { disable = false, labelStyle } = props.data;
  borderColor = isActive && !disable ? primary1Color : borderColor;
  return {
    wrapper: {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      overflow: 'hidden',
      alignItems: 'center',
      cursor: 'pointer',
      position: 'relative',
      fontSize: labelStyle && labelStyle.fontSize || '12px',
      fontWeight: labelStyle && labelStyle.fontWeight || 400,
      // border: `1px solid ${borderColor}`,
      background: 'transparent',
      color: labelStyle && labelStyle.fontColor || textColor,
      // paddingLeft: '8px'
    }
  }

}
