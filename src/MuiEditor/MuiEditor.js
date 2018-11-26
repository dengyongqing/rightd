import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import Utils from 'LIB/utils';
import Controls from 'COMPONENTS/Controls';
import SwipeableViews from 'react-swipeable-views';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import theme from 'material-ui/styles/baseThemes/lightBaseTheme';

export default class MuiEditor extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.spacingValidation = Utils.toValidation(data.spacing);
    this.paletteValidation = Utils.toValidation(data.palette);
    this.state = { data, index: 0 };
  }
  onChange(data) {
    this.props.onChange(data);
    this.setState({ data });
  }
  handleChange = value => this.setSlideIndex(value)
  setSlideIndex(index) {
    this.setState({
      index,
    });
  }
  onSpacingChange = (spacing) => {
    this.onChange(Object.assign({}, this.state.data, { spacing }));
  }
  onPaletteChange = (palette) => {
    this.onChange(Object.assign({}, this.state.data, { palette }));
  }
  render() {
    const { data } = this.props;
    const { paletteValidation, spacingValidation } = this;
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(theme)}>
        <div className="mui-editor">
          <Tabs onChange={this.handleChange}>
            <Tab label="空间信息" value={0} />
            <Tab label="色彩信息" value={1} />
          </Tabs>

          <SwipeableViews
            index={this.state.index}
            onChangeIndex={this.handleChange}
          >
            <div className="slide-page pg0">
              <Controls
                data={spacingValidation}
                onChange={this.onSpacingChange}
              />
            </div>

            <div className="slide-page pg1">
              <Controls
                data={paletteValidation}
                onChange={this.onPaletteChange}
              />
            </div>
          </SwipeableViews>
        </div>
      </MuiThemeProvider>
    );
  }
}
