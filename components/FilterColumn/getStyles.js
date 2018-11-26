import { emphasize } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context, depth1) {
  const { palette } = context.muiTheme;
  const { textColor } = palette;
  const { depth } = props;
  const depthGrow = props.isShowDepth ? props.depthGrow || 0.2 : 0;
  return {
    depth: {
      flexGrow: depthGrow * (depth1 || depth) || 0,
      minWidth: '6px',
    },
    radioButtonGroup: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    orAnd: {
      height: '24px',
    },
    radioButton: {
      flex: 1,
      // width: '50%',
      alignItems: 'center',
      fontSize: '12px',
    },
    checkBox: {
      fontSize: '12px',
      marginTop: '8px',
    },
    iconWrapper: {
      display: 'flex',
    },
    icon: {
      display: 'block',
      cursor: 'pointer',
      width: '20px',
      height: '20px',
    },
    iconExpand: {
      width: '20px',
      height: '20px',
      cursor: 'pointer',
      display: 'block',
      transition: '0.2s',
      transformOrigin: '50% 50%',
      transform: !state.isExpand ? 'rotate(0deg)' : 'rotate(180deg)',
    },
    anim: {
      width: '100%',
    },
    orAndSpace: {
      width: '20px',
    },
    info: {
      fontSize: 12,
      display: 'block',
      padding: '12px 0',
      color: emphasize(textColor, 0.4),
    },
    dayChose: {
      display: 'flex',
    },
    button: {
      minWidth: '56px',
      height: '28px',
      lineHeight: '28px',
    },
    labelStyle: {
      width: 'auto',
      lineHeight: 'auto',
      color: emphasize(textColor, 0.4),
    },
    iconStyle: {
      marginRight: '4px',
      width: '16px',
      height: '16px',
    },
    inputStyle: {
      alignItems: 'center',
    },
    lineName: {
      color: emphasize(textColor, 0.4),
    },
    errorMsg: {
      backgroundColor: '#FFEEF0',
      position: 'absolute',
      left: 10,
      top: 60,
      // zIndex: 100,
      textOverflow: 'clip',
      whiteSpace: 'nowrap',
      lineHeight: '20px',
      padding: '0 4px',
      borderRadius: '2px',
      color: '#D0021B',
      fontSize: '12px',
    },
  };
}
