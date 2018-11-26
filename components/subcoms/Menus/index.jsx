/*
* @Author: dengyongqing@aliyun.com
* @Date: 2016-12-26 11:55:57
*/
import _ from 'lodash';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import SearchIcon from 'material-ui/svg-icons/action/search';
import { emphasize } from 'material-ui/utils/colorManipulator';
import Checkbox from 'material-ui/Checkbox';
// import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import InputSearcher from './../InputSearcher';
import getStyles from './getStyles';
import Spiner from './../Spiner';
import ZToolTip from './../Tooltip';

import Utils from './../../../lib/utils';
import cUtils from './../../utils';
import tUtils from './../utils';
import './index.css';


// function partial(ds, ps) {
//   if (typeof ps === 'string') ps = [ps];
//   while (ps.length > 0) {
//     const p = ps.pop();
//     ds = _.partial(ds, p);
//   }
//   return ds;
// }

function getStylesD(props, state, context) {
  const { canvasColor } = context.muiTheme.palette;
  return {
    main: {
      width: '100%',
      height: 1,
      backgroundColor: emphasize(canvasColor, 0.1),
    },
  };
}

class Divider extends Component {
  constructor(props) {
    super(props);
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  render() {
    const styles = getStylesD(this.props, this.state, this.context);
    return (
      <div style={styles.main} />
    );
  }
}

export default class Menus extends Component{
  static propTypes = {
    onChange: PropTypes.func,
    onFinishChange: PropTypes.func,
    isActive: PropTypes.bool,
  }
  static defaultProps = {
    mode: 'single',
    data: [],
    groupBy: null,
    isActive: true,
    isCheckerIcon: true,
    selectIcon: null,
    isSearch: false,
    anchorEl: null,
    height: 48,
    loading: false,
    selectStyle: {},
    joinLevel1: true,
    maxShowN: 6,
    desktop: true,
    divideLine: false,
    minWidth: 96,
    maxWidth: 300,
    limitMenus: 100,
    realOnChange: true,
    language: 'zh',
    labelFormmat: null
  };
  constructor(props: any) {
    super(props);
    this.state = {
      selectData: props.value || []
    };
  }

  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
 
  _getMenuWidthStyle() {
    let { minWidth, anchorEl, maxWidth } = this.props;
    let menuStyle = { maxWidth, justifyContent: 'center', alignItems: 'center' };
    if (anchorEl) {
      minWidth = Math.max(minWidth, anchorEl.clientWidth);
      menuStyle = { ...menuStyle, minWidth, width: minWidth };
    }
    return menuStyle;
  }
  _genToolTipMenu(props) {
    const menuStyle = this._getMenuWidthStyle();
    const { width } = menuStyle;
    const { primaryText, key, labelFormmat, language } = props;
    const fontSize = 12;
    const m = <MenuItem {...props} />;
    if (fontSize * `${primaryText}`.length < width) return m;
    return (
      <ZToolTip
        title={labelFormmat ? labelFormmat(primaryText) : Utils.getText(primaryText, language) }
        className="z_tooltip"
        theme="light custom"
        key={primaryText + key}
        style={{ width: menuStyle.width }}
      >
        {m}
      </ZToolTip>
    );
  }
  loadMore = () => {
    if (this.props.loadMore) {
      this.props.loadMore();
    }
    // const maxShowN = this.state.maxShowN + 100;
    // this.setState({ maxShowN });
    
  };

  _genMenus(data, groupBys, level = 0) {
    const { props  } = this;
    const { joinLevel1, value, desktop, itemStyle = {}, mode, isCheckerIcon, limitMenus, labelFormmat } = props;
    groupBys = _.cloneDeep(groupBys);
    data = _.cloneDeep(data);
    const { styles } = this;
    const menuStyle = this._getMenuWidthStyle();
    const groupBy = groupBys.pop();
    const line = this.props.divideLine ? <Divider /> : null;
    if (!groupBy) {
      const dlength = _.values(data).length;
      let i = 0;
      return [_.flatten(_.map(data, d => {
        i++;
        const { isSelected, key, value, name } = d;
        const styleM = isSelected ? styles.menuItemSelected : {};
        const style = {width: '14px', height: '14px'};
        const m = this._genToolTipMenu({
            multiple: mode === 'multiple',
            key,
            value,
            children: isCheckerIcon ? <Checkbox checked={isSelected} inputStyle={style} iconStyle={{...styles.checkerIcon, ...style}} style={{...styles.checker, ...style}} /> : null,
            primaryText: labelFormmat ? labelFormmat(name, d) : props.language ? Utils.getText(name, props.language) : name,
            innerDivStyle: styles.innerMenu,
            style: { ...styleM, ...menuStyle, ...itemStyle, fontSize: 12 },
            onTouchTap: e => this.onMenuItemClick(e, value),
            desktop,
          });
        if (!limitMenus) return this.props.divideLine && i < dlength - 1 ? [m, line] : m;
        if (i <= limitMenus) {
          return this.props.divideLine && i < dlength - 1 ? [m, line] : m;
        } 
      })),
      <div>
        { limitMenus && data.length - limitMenus > 0 ? 
          <span style={styles.load} onClick={this.loadMore}>
            {Utils.getText('剩余', this.props.language)}
            {data.length - limitMenus}
            {Utils.getText('项', this.props.language)},
            {Utils.getText('加载更多', this.props.language)}
          </span> :
          null
        }
      </div>
      ]
    }
    const grouped = _.groupBy(data, d => d[groupBy]);
    const groupKey = value[groupBy];
    level += 1;
    if (!joinLevel1 || level !== 1) {
      const dlength1 = _.values(data).length;
      let i = 0;
      return _.flatten(_.map(grouped, (arr, key) => {
        i++;
        const nextMenus = this._genMenus(arr, groupBys, level);
        const isSelected = groupKey === key;
        const styleM = isSelected ? styles.menuItemSelected : {};
        const m = this._genToolTipMenu({
          multiple: mode === 'multiple',
          key: `${groupBy}_${key}`,
          innerDivStyle: styles.innerMenu,
          value: key,
          primaryText: labelFormmat ? labelFormmat(key) : Utils.getText(key, this.props.language),
          style: { ...menuStyle, ...styleM, ...itemStyle, fontSize: 12 },
          rightIcon: (<ArrowDropRight />),
          menuItems: nextMenus,
        });
        return this.props.divideLine && i < dlength1 ? [m, line] : m;
      }));
    }
    const ms = _.map(grouped, (arr, key) => {
      const nextMenus = this._genMenus(arr, groupBys, level);
      return [
        this._genToolTipMenu({
          key: `${groupBy}_${key}`,
          multiple: mode === 'multiple',
          value: key,
          primaryText: labelFormmat ? labelFormmat(key) : Utils.getText(key, this.props.language),
          style: { ...menuStyle, ...itemStyle, ...styles.menuItemGroup, fontSize: 12 },
        })].concat(nextMenus);
    });
    return _.flatten(ms);
  }
  onRequestClose = (v) => {

    if (this.props.onRequestClose) this.props.onRequestClose(v);
  }
  _updateStyle() {
    this.styles = getStyles(this.props, this.state, this.context);
  }
  componentWillMount() {
    this._updateStyle();
  }
  componentWillUpdate() {
    this._updateStyle();
  }
  onInputChange = (v) => {
    this.searchFilter = cUtils.genSearchFilter(v);
    this.setState({ searchText: v });
  }
  onInputActiveStateChange = (bool) => {
    this.setState({ isInputActive: bool });
  }
  _genSearch() {
    const { styles, props } = this;
    const { isSearch, id='' } = props;
    const widthStyle = this._getMenuWidthStyle();
    // const dsN = ds.length;
    if (!isSearch) return null;
    const text = this.state.searchText || '';
    const isEmpty = this._isEmpty();
    return (
      <div style={{ ...styles.searchWrapper, ...widthStyle }} key='search'>
        <div style={styles.search}>
          <InputSearcher
            text={text}
            isInput
            isDropdown
            disabled={false}
            placeholder={Utils.getText('请搜索', this.props.language)}
            style={{ ...styles.input, height: this.props.height }}
            isShowActiveBorder={false}
            onChange={this.onInputChange}
            onFocuStateChange={this.onInputFocuStateChange}
            onActiveStateChange={this.onInputActiveStateChange}
            isInputActive={this.state.isInputActive}
            isActive={this.state.isActive}
            isCloseIcon={false}
            rightIcon={SearchIcon}
            isEmpty={!text}
            onClean={() => this.onInputChange('')}
          />
        </div>
      </div>
    );
  }
  onMenuItemClick = (e, value) => {
    const { selectData } = this.state;
    if (!this.props.realOnChange) {
      const result = this._mergeValue(selectData, value);
      this.setState({
        selectData: result
      })
      if (this.props.onSelect) {
        this.props.onSelect(e, value);
      }
    } else {
      if (this.props.onSelect) {
        this.props.onSelect(e, value);
      }
    }
    
  }
  _mergeValue(value, v) {
    let bol = false;
    for (const i in value) {
      if (_.isEqual(value[i], v)) {
        value.splice(i, 1);
        bol = true;
      }
    }

    if (!bol) value.push(v);
    return value;
  }
  onConfirm = () => {
    const { selectData } = this.state;
    if (!this.props.realOnChange) {
      if (this.props.onConfirm) {
        this.props.onConfirm(selectData);
      }
    }
    if (this.props.onRequestClose) this.props.onRequestClose();
  }
  _merge(a, b, isSub = false) { // a和b进行集合的合并
    const res = [...a];
    _.forEach(b, (bv) => {
      let bol = false;
      _.forEach(a, (av) => {
        bol = bol || _.isEqual(av, bv);
      });
      if (!bol) res.push(bv);
    });
    return res;
  }
  onSelectAll = () => {
    const data = this._getFilteredData();
    let value = _.values(data);
    value = this._merge(this.props.value, value);   
    
    this.setState({
      selectData: value
    });
    if (this.props.onSelect) this.props.onSelect(null, value);
  }
  onCancelSelectAll = () => {
    const data = this._getFilteredData();
    const all = _.values(this.props.data);
    const value = _.values(data);
    const res = _.filter(all, (v) => {
      let bol = true;
      _.forEach(value, (vv) => {
        bol = bol && (!_.isEqual(vv, v));
      });
      return bol;
    });
    this.setState({
      selectData: res
    });
    if (this.props.onSelect) this.props.onSelect(null, res);
  }
  _genFooter() {
    const styles = getStyles(this.props, this.state, this.context);
    const { mode, id='' } = this.props;
    if (!this.props.data) return null;
    const valueN = (this._getFilteredData({ select: true }) || []).length;
    const dataN = (_.values(this._getFilteredData()) || []).length;
    const isFull = dataN === valueN;
    const fn = isFull ? this.onCancelSelectAll : this.onSelectAll;
    const name = isFull ? Utils.getText('全不选', this.props.language) : Utils.getText('全选', this.props.language);
    if (mode === 'multiple') {
      return (
        <div style={styles.footer} key='footer'>
          <div
            style={styles.selectAll}
            className={'z_button'}
            onTouchTap={fn}
          >
            {name}
          </div>
          <div style={styles.divider} />
          <div
            style={styles.confirm}
            className={'z_button'}
            onTouchTap={this.onConfirm}
          >
            {Utils.getText('确定', this.props.language)}
          </div>
        </div>
      );
    }
    return null;
  }
  _getFilteredData(o = {}) {
    const { select = false } = o;
    const { selectData } = this.state;
    let { data, value } = this.props;
    const { searchFilter } = this;
    value = selectData || value;
    data = searchFilter ? searchFilter(data) : data;
    if (select) {
      data = _.filter(data, (d) => {
        let bol = false;
        _.forEach(value, (vv) => { bol = bol || _.isEqual(vv, d); });
        return bol;
      });
    }
    return data;
  }
  _isEmpty() {
    const { value } = this.props;
    if (!value) return true;
    if (Array.isArray(value) && !value.length) return true;
    return false;
  }
  render() {
    const { styles } = this;
    const { anchorEl, maxShowN, loading, selectStyle = {},  groupBy = [], id='', realOnChange=true } = this.props;

    let { value } = this.props;
  
    const { selectData } = this.state;
    if (!realOnChange) {
      value = selectData || value;
    }
    const data = this._getFilteredData();
    const menus = tUtils.genMenuArray(data, value);

    const maxHeight = maxShowN * 32 || 300;
    const isPopover = !!anchorEl;

    const core = loading ? <Spiner color="#5282EF" /> : (
      <div style={{ ...styles.menuWrapper }} key={id}>
        {this._genSearch()}
        <div style={{ ...styles.menu, maxHeight }} key='menus'>
          {this._genMenus(menus, _.cloneDeep(groupBy || []).reverse())}
        </div>
        {this._genFooter()}
      </div>
    );
    if (isPopover) {
      return (
        <Popover
          open={this.props.isActive}
          anchorEl={anchorEl}
          anchorOrigin={{
            horizontal: 'left',
            vertical: 'bottom',
          }}
          targetOrigin={{
            horizontal: 'left',
            vertical: 'top',
          }}
          onRequestClose={this.onRequestClose}
          useLayerForClickAway={false}
          style={{ ...styles.popover, overflow: 'hidden', ...selectStyle }}
        >
          { core }
        </Popover>
      );
    }
    return core;
  }
}
