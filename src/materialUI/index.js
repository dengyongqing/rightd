
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';


import baseTheme        from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import SelectField from 'material-ui/SelectField';
import MenuItem    from 'material-ui/MenuItem';
import Chip        from 'material-ui/Chip';

import Controls from 'COMPONENTS/Controls';
import Utils    from 'LIB/utils';


import pageList  from './pageList';
import MuiEditor from './../MuiEditor';
import './index.css';


let theme = baseTheme;

class MaterialDesignTheme extends Component {
	constructor(props){
		super(props);
		const {Page, pageName} = this.props;
		this.state = { theme, Page, pageName };
	}
	onThemeChange = theme => {
		this.setState({theme})
	}
	onPageChange = (pageName) => {
	  const Page = pageList[pageName]; 
	  this.setState({Page, pageName})
  }
  _genChips(){
  	const style = {
		  margin: 4,
		  fontSize: '12px'
  	};
  	return _.map(pageList, (Com, id) => (
  		<Chip 
  		  key={id} 
  		  style={style}
  		  onTouchTap={() => this.onPageChange(id)}
  		  value={id}
  		> {id}
  		</Chip>
  	));
  }
  render(){
  	const {theme, Page, pageName} = this.state;
  	return(
  		<div>
	  		<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
					<div className="container">
					  <div className="input-container">
					    <Page/>
					  </div>
					</div>
				</MuiThemeProvider>

				<MuiThemeProvider muiTheme={getMuiTheme(theme)}>
				  <div className="select-container">
		         {this._genChips()}
				  </div>
				</MuiThemeProvider>

				<MuiEditor data={_.cloneDeep(this.props.baseTheme)} onChange={this.onThemeChange} />
			</div>
  	);
  }
};

let curPageName = 'AppBarPage';

ReactDOM.render(
	<div>
	  <MaterialDesignTheme
	    pageName={curPageName}
	    theme={theme}
	    baseTheme={baseTheme}
	    Page={pageList[curPageName]}
	  />
	</div>,
  document.querySelector('.app')
);


