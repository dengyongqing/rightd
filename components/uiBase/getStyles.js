/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
import { emphasize } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context, depth1) {
  const { palette } = context.muiTheme;
  const { style = {}, depth, nameWidth, direction, layout, helpStyle={} } = props;
  const width = style.width;
  const dataStyle = state.data && state.data.style;
  const radioStyle = state.data && state.data.layout;
  const height = props.height || style.height || 48;
  const depthGrow = props.isShowDepth ? props.depthGrow || 0.4 : 0;
  const { primary1Color } = palette;
  const hover = {};
  const normal = {
    width: width || '100%',
    height,
    background: style.background || style.backgroundColor || 'transparent',
    // background: style.background || style.backgroundColor || 'transparent' || palette.alternateTextColor,
    flexGrow: 1 || style.flexGrow,
  };
  const bgStyle = state.isActive || state.isOpenEditor ? { ...normal, ...hover } : normal;
  return {
    container: {
      display: 'flex',
      flexDirection: direction === 'row' ? 'row' : 'column',
      padding: layout === 'vertical'  ? '4px 0px' : radioStyle && radioStyle === 'vertical' ? '8px 0px' : '0px 0px',
      width: '100%',
      ...bgStyle,
      ...(props.style || {}),
      height: 'auto',
    },
    main: {
      normal,
    },
    mainWrapper: {
      width: '100%',
      height: dataStyle && dataStyle.height ? dataStyle.height : layout === 'vertical' ? height + 8 : height,
      display: 'flex',
      flexDirection: layout === 'horizontal' ? 'row' : layout === 'vertical' ? 'column' : 'row',
      alignItems: dataStyle && dataStyle.alignItems || 'center'
    },
    name: {
      maxWidth: layout === 'vertical' ? '100%' : '60px',
      width: layout === 'vertical' ? '100%' : '60px',
      minWidth: layout === 'vertical' ? '100%' : '60px',
      color: style.color || emphasize(palette.textColor, 0.4),
      fontSize: style.fontSize || 12,
      ...(props.nameStyle || {}),
    },
    end: {
      flexGrow: (props.endStyle || {}).flexGrow || 1,
    },
    depth: {
      flexGrow: depthGrow * (depth1 || depth) || 0,
      minWidth: '6px',
    },
    body: {
      width: layout === 'vertical' ? '100%' : '1px',
      // width: layout === 'vertical' ? '100%' : nameWidth || nameWidth === 0 ?  `calc(100% - ${nameWidth}px)` : '1px',
      height: '100%',
      flexGrow: (props.bodyStyle || {}).flexGrow || 8,
      justifyContent: (props.bodyStyle || {}).justifyContent || 'center',
      ...(props.bodyStyle || {}),
    },
    advanceWrapper: {
      display: 'flex',
      width: '100%',
      height: height / 2,
      minHeight: 18,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    advanceTextWrapper: {
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'row',
      fontSize: '12px',
      height: '100%',
      color: primary1Color,
      justifyContent: 'center',
      alignItems: 'center',
    },
    advanceLogo: {
      display: 'flex',
      transition: '0.2s',
      fontSize: '16px',
      width: height / 3,
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      transformOrigin: 'center center',
      transform: state.isAdvance ? 'rotate(-90deg)' : 'rotate(90deg)',
    },
    helpIcon: {
      width: height * 0.3 || 14.4,
      height: height * 0.3 || 14.4,
      color: helpStyle.color || emphasize(palette.textColor, 0.3),
    },
    helpIconHover: {
      color: helpStyle.color || emphasize(palette.textColor, 0.5),
    },
    floatTag: {
      boxSizing: 'border-box',
      fontSize: '12px',
      left: '0px',
    },
    warn: {
      position: layout === 'vertical' ? 'relative' : 'absolute' ,
      left: 0,
      color: '#f00',
    },
    extra: {

    }
  };
}
