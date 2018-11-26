import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Utils    from 'LIB/utils';
import Controls from 'COMPONENTS/Controls';
import SwipeableViews   from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import theme            from 'material-ui/styles/baseThemes/lightBaseTheme';
import TextEditor from './../TextEditor';

const formater = json => JSON.stringify(json, null, 2);
export default class JsonEditor extends Component {
  static propTypes = {
    data:     PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired,
  }
  static defaultProps = {
    onChange: () => console.error('替换 props.onChange'),
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  };
  constructor(props){
    super(props);
    const {data} = this.props;
    const validation = Utils.toValidation(data);
    this.state = {
      validation, data
    };
  }
  onUIChange = (data) => {
    const validation = this._mergeValidation(data);
    this.setState({ validation });
  }
  _mergeValidation = (data) => Utils.mergeObject2Validation(this.state.validation, data);
  onCodeChange  = (code) => {
    if(!code) return;
    let json;
    try{
      json = JSON.parse(code);
    } catch(e){
      console.error(e);
      return;
    }
    const data = this._mergeValidation(json);
    this.setState({data});
  }
  render(){
    const {validation} = this.state;
    const data = Utils.toObject(validation);
    return (
      <div className="container">
        <div className="group-container">
          <div className="input-container">
            <Controls data={validation} onChange={this.onUIChange} uiThemeId={Math.random()}/>
          </div>
          <div className="code-container">
            <TextEditor data={formater(data)} onChange={this.onCodeChange}/>
          </div>
        </div>
      </div>
    );
  }
};