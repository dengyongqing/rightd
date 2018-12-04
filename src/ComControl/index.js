
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import baseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import _ from 'lodash';

import Controls from './../../components/Controls';
import Utils from './../../lib/utils';

import './index.css';

const getOption = Com => Com.defaultProps.options || Com.defaultProps;

export default class ComControl extends Component {
  static propTypes = {
    component: PropTypes.any.isRequired,
  }
  constructor(props) {
    super(props);
    this._init();
  }
  _init() {
    const Component = this.getComponent();
    const optionsCom = this.optionsCom = getOption(Component);
    console.log(optionsCom);
    this.state = { optionsCom };
    this._getComValidations();
  }
  getComponent() {
    const Component = this.props.component;
    console.log(Component);
    return Component || <div>请插入需要测试的组件</div>;
  }
  getTheme() {
    const theme = this.props.theme;
    return theme || {};
  }
  _onOptionsChange = (optionsCom, diff, validationCom) => {
    console.log(optionsCom, 'optionsCom');
    this.setState({ optionsCom, validationCom });
  }
  _getComValidations() {
    const { optionsCom } = this.state;
    const { datas } = this.props;
    const optionsCopy = _.cloneDeep(optionsCom);
    if (datas) {
      for (const k in datas) {
        delete optionsCopy[k];
      }
    }
    console.log(optionsCopy);
    this.validationCom = Utils.toValidation(optionsCopy);
  }
  render() {
    const Component = this.getComponent();
		// const validationCom = Utils.toValidation(this.state.optionsCom);
    const { optionsCom } = this.state;
    const datas = this.props.datas || {};
    const props = Object.assign({}, optionsCom, datas);
    const theme = this.getTheme();
    return (
      <div className="wrapper-container">
        <div className="com-container">
          <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
            <Component {...props} onChange={o => console.log(o)} />
          </MuiThemeProvider>
        </div>
        <div className="control-container">
          <MuiThemeProvider muiTheme={getMuiTheme(baseTheme)}>
            <Controls
              data={this.state.validationCom || this.validationCom}
              onChange={this._onOptionsChange}
            />
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}


