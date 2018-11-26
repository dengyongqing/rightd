
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './index.css';

import brace from 'brace';
import AceEditor from 'react-ace';

import 'brace/mode/json';
import 'brace/theme/kuroir';

export default class TextEditor extends Component {
  static propTypes = {
    // data:    PropTypes.any.isRequired,
    // onChange: PropTypes.func.isRequired,
  }
  constructor(props: any) {
    super(props);
    this.state = {};
  }
  onChange = (code) => {
    this.props.onChange(code);
  }
  render(){
    const {onChange, data} = this.props;
    return (
      <AceEditor
        mode="json"
        theme="kuroir"
        onChange={this.onChange}
        name="UNIQUE_ID_OF_DIV"
        fontSize={14}
        tabSize={2}
        value={data}
        editorProps={{$blockScrolling: 'Infinity'}}
      />
    );
  }
};

