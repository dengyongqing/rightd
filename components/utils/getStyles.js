
import _ from 'lodash';
import zUtils from 'zUtils';
import { fade } from 'material-ui/utils/colorManipulator';

export default function getStyles(props, state, context) {
  const { palette } = context.muiTheme;
  const height = 48;
  const settingsO = zUtils.toObject(props.settings || []);
  const { isShowLeftSearch, isShowLeftBar } = (_.get(settingsO, 'ui') || {});
  const leftBarWidth = isShowLeftBar === false ? 0 : 48 * 5;
  return {
    sqlEditor: {
      width: '100%',
      height: `${height * 3}px`,
    },
    kpiKey: {
      display: 'inline-block',
      color: 'ccc',
      fontSize: '12px',
    },
    uniqueKeyStyle: {
      color: fade('#000', 0.3),
      cursor: 'pointer',
    },
    searchBar: {
      margin: '0 auto',
    },
    listGroupWrapper: {
      height: `calc(100% - ${height}px)`,
      overflow: 'scroll',
    },
    appContainer: {
      position: 'absolute',
    },
    tableContainer: {
      position: 'absolute',
      background: '#fff', // palette.background1Color
    },
    table: {
      position: 'absolute',
      overflow: 'hidden',
      height: '100%',
      right: 0,
      width: `calc(100% - ${leftBarWidth}px)`,
    },
    dialog: {
      width: '50%',
    },
    drawer: {
      pointerEvents: 'auto',
      position: 'absolute',
      bottom: 0,
      width: `${leftBarWidth}px`,
      height: '100%',
      // overflow: 'hidden'
    },
    leftBarWidth,
    containerDrawer: {
      bottom: 0,
      position: 'absolute',
      background: '#fff',
      height: 'calc(100%-48px)!important',
    },
    listItem: {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
    },
    selectedStyle: {
      backgroundColor: 'rgba(180,180,180,0.1)',
      color: '#000',
      fontWeight: 'bold',
    },
    normalButton: {
      background: '#222',
      color: '#999',
    },
    activeSaveButton: {
      background: '#f00',
      color: '#fff',
    },
    activeCleanButton: {
      background: '#222',
      color: '#fff',
    },
    summary: {
      position: 'absolute',
      width: '100%',
      height: '60px',
      bottom: 0,
      display: 'flex',
      justifyContent: 'center',
    },
    summaryKpiValue: {
      color: '#555',
      fontSize: '13px',
      margin: 0,
      padding: '0 1px',
    },
    summaryKpi: {
      padding: '0 4px',
    },
  };
}
