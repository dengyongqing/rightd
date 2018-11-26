import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
// import { AppContainer } from 'react-hot-loader';

import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import App from './app';

const theme = lightBaseTheme;
const redraw = (Component) => {
  ReactDOM.render(
    <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
      <Component />
    </MuiThemeProvider>
    ,
    document.querySelector('.app'),
  );
};

// 该天再引入react-hot-loader,大师，太晚了，先给你做一个暴力rerender.
// const watchs = [{ key: }]
if (module.hot) {
  module.hot.accept('./app', () => {
    const NextApp = require('./app').default;
    redraw(NextApp);
  });
}

injectTapEventPlugin();
redraw(App);
