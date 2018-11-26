/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-27 15:52:11
*/

export default function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  const border = '1px solid rgba(150, 150, 150, 0.2)';
  return {
    ring: {
      cursor: 'pointer',
    },
    colorGrid: {
      margin: '0',
    },
    alpha: {
      display: 'flex',
      height: '24px',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: palette.canvasColor,
    },
    swatch: {
      width: '76%',
      height: '75%',
      borderRadius: '2px',
      overflow: 'hidden',
    },
  };
}
