/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
import { fade, emphasize, darken } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context) {
  const { isActive } = props;
  const { chip, menuItem, palette } = context.muiTheme;
  const { canvasColor, primary1Color, borderColor } = palette;
  const backgroundColor = props.backgroundColor || chip.backgroundColor;
  // const focusColor = emphasize(backgroundColor, 0.08);
  // const pressedColor = emphasize(backgroundColor, 0.12);
  const { hoverColor } = context.muiTheme.menuItem;
  const footerButton = {
    fontSize: '14px',
    flexGrow: 1,
    cursor: 'pointer',
    color: primary1Color,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.3s',
  };
  const logoSize = '18px';
  // const itemHeight = 48;
  return {
    root: {
      backgroundColor,
    },
    menuItemSelected: {
      color: primary1Color,
      backgroundColor: emphasize(hoverColor, 0.1),
    },
    menuItemGroup: {
      backgroundColor: darken(palette.canvasColor, 0.1),
      height: '36px',
    },
    popover: {
    },
    menuWrapper: {
      padding: '0px 0px',
      transition: '0.3s',
    },
    menu: {
      padding: '0px 0px',
      overflow: 'auto',
    },
    innerMenu: {
      padding: '0px 12px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'row',
      flewWrap: 'nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    checker: {
      width: logoSize,
      minWidth: logoSize,
      overflow: 'hidden',
      marginRight: '4px',
    },
    checkerIcon: {
      width: logoSize,
      height: logoSize,
      color: '#f00',
      overflow: 'hidden',
    },
    searchWrapper: {
      height: 48,
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
    search: {
      height: 36,
      width: `calc(100% - ${12}px)`,
      position: 'relative',
      // backgroundColor: emphasize(canvasColor, 0.1),
    },
    selectAll: {
      ...footerButton,
    },
    confirm: {
      ...footerButton,
    },
    divider: {
      height: '100%',
      width: '1px',
      background: borderColor,
    },
    footer: {
      background: canvasColor,
      borderTop: `1px solid ${borderColor}`,
      height: 32,
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
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
  };
}
