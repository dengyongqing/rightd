import { emphasize, decomposeColor, fade } from 'material-ui/utils/colorManipulator';

function getStyles(props, state, context) {
  const border = '1px solid rgba(150, 150, 150, 0.2)';
  const { canvasColor, textColor, borderColor } = context.muiTheme.palette;
  return {
    main: {
      background: canvasColor,
      minWidth: '200px',
      minHeight: '200px',
      display: 'flex',
      flexDirection: 'column',
    },
    tabs: {
      width: '100%',
      height: '24px',
      background: emphasize(canvasColor, 0.05),
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
    },
    editor: {
      // padding: '8px',
    },
    button: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '0 6px',
      background: 'transparent',
      cursor: 'pointer',
      color: textColor,
      fontSize: 12,
    },
    buttonActive: {
      fontWeight: 'bold',
      background: canvasColor,
      borderRight: `solid 1px ${borderColor}`,
      borderLeft: `solid 1px ${borderColor}`,
    },
  };
}
export default getStyles;
