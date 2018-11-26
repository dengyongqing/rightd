
import _ from 'lodash';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import SwapHoriz from 'material-ui/svg-icons/action/swap-horiz';
import Utils from './../../../../lib/utils';
import ColorLine from '../../../Gradient/ColorLine';
import getStyles from './getStyles';

export default class GradientPicker extends Component {
  static propTypes = {
  }
  constructor(props: any) {
    super(props);
    this.state = {
      rightArrow: true,
      data: ''
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data
    })
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      data: nextProps.data
    })
  }
  clickGrid = (e, d) => {
    if(this.props.onChange) {
      this.props.onChange(d);
    }
  }
  autoSetlect = (value, index) => {
    if(this.props.onChange) {
      this.props.onChange(value, index);
    }
  }
  onSwap = () => {
    this.setState({
      rightArrow: !this.state.rightArrow
    }, () => {
        const { domain, range } = this.state.data;
        // _.reverse(domain);
        _.reverse(range);
        this.setState({
          data: this.state.data
        })
        this.props.reverseColor(this.state.data);
    })
  } 

  render() {
    const styles = getStyles(this.props, this.state, this.context);
    const { anchorEl, data } = this.props;
    if (anchorEl) {
      return (
        <div style={styles.colorLine}>
          <ColorLine
            isShowSlider={true}
            data={this.state.data || data}
            height={24}
            handleGridClick={this.clickGrid}
            onChange={this.autoSetlect}
            onDelete={ (index) => this.props.handleDelete(index) }
          />
          <div style={styles.swapWrap}>
            <SwapHoriz style={styles.swap} onClick={this.onSwap} />
          </div>
          
        </div>
        
      );
    }
    return null;
  }
}

