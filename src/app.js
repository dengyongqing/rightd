
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import './app.css';
import validation from './validation';
import validation1 from './validation1';
import validation2 from './validation2';
import validation3 from './validation3';
import validation_tmp from './validation_tmp';
import d from './../lib/utils';
import Controls from './../components/Controls';
import Menus from './../components/subcoms/Menus'

const vv = d.getValue(validation2);
const validationColumn = validation_tmp;// d.toValidation(object);

function getStyles(props, states, context) {
  const { palette } = context.muiTheme;
  const { canvasColor } = palette;
  return {
    main: {
      backgroundColor: canvasColor,
    },
  };
}

let validationRender;
const redraw = (validation) => {
  validationRender = validation || validationRender || validationColumn;
};
redraw(validation2);


export default class Root extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      validationRender,
    };
  }
  static contextTypes = {
    muiTheme: PropTypes.object.isRequired,
  }
  valiForm = (a) => {
    console.log(a);
  }
  onChangeSelection = (e, v) => {
    console.log(e, v);
  }
  render() {
    const styles = getStyles(this.props, this.state, this.context);
    return (
      <div className="column-container" style={styles.main}>
        <Controls
          ref='controls'
          style={styles.main}
          isShowDepth={true}
          offset={{ x: 0, y: 0 }}
          direction="column"
          language='ja'
          data={this.state.validationRender}
          // componentStyle={{
          //   width: 100,
          //   height: 20,
          //   borderWidth: 2,
          //   borderColor: '#f00',
          //   fontSize: '14px',
          //   normalColor: '#f00',
          //   selectColor: '#f0f',
          //   backgroundColor: '#0ff',
          //   fontWeight: '400'
          // }}
          // data={[{
          //     name: '请求参数',
          //     uiType: 'keyValue',
          //     key: 'param',
          //     valueType: 'object',
          //     addOnAfter: <div>123</div>,
          //     value: {
          //       key: 'id',
          //       value: 123
          //     }
          //   }
          // ]}
          // widthPhi={1}
          // showFooter={false}
          expand
          editable={false}
          
          isShowTitle={true}
          helpStyle={{
            color: '#f00'
          }}
          // multiSelectStyle={{

          // }}
          // layout='vertical'
          onConfirm={(a, b, c) => {
            console.log('onConfirm', a, b, c);
          }}
          onDelete={(d) => {
            console.log('onDelete', d);
          }}
          // onValiForm={this.valiForm}
          confirmStyle={{
            width: 60,
            minWidth: 60,
            heigth: 28,
          }}
          onChange={(a, b, c) => {
            console.log(a, b, c, 'test');
            validationRender = _.cloneDeep(c);
            this.setState({
              validationRender,
            });
          }}
        />
         <Menus
          mode="multiple"
          realOnChange={false}
          maxShowN={30}
          data={[{name: 'haha', value: '1'}, {name: 'lalla', value: '2'}]}
          value={this.state.value || [{name: 'haha', value: '1'}]}
          // onSelect={this.onChangeSelection}
          height={36}
          isActive
          onConfirm={ value => {
            this.setState({
              value
            })
          }}
          onRequestClose={this.onConfirmSelection}
          isSearch
        />
        <div onClick={() => {
          console.log(this.refs.controls);
          console.log(this.refs.controls.onValiForm());
        }}>提交</div>
      </div>
    );
  }
}

// <MuiEditor data={_.cloneDeep(themeCopy)} onChange={onThemeChange} />
// const d1 = [{"key":"house_rent_longhu_beijing","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"avg_rent_price","name":"平均价格","uiType":"group","valueType":"group","children":[{"key":"min","value":1000,"name":"最小值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}},{"key":"max","value":20000,"name":"最大值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}}]}]}];
// const d2 = [{"key":"house_rent_longhu_beijing","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"avg_rent_price","name":"平均价格","uiType":"group","valueType":"group","children":[{"key":"min","value":1000,"name":"最小值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}},{"key":"max","value":20000,"name":"最大值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}}]}]}]
// const d3 = [{"key":"house_rent_longhu_beijing","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"avg_rent_price","name":"平均价格","uiType":"group","valueType":"group","children":[{"key":"min","value":1000,"name":"最小值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}},{"key":"max","value":20000,"name":"最大值","uiType":"slider","valueType":"int","validate":{"range":{"min":0,"max":30000}}}]}]}]
// redraw(d1);
// redraw(d2);
// redraw(d3);

// redraw(validation);
// export default redraw(validation);

// setTimeout(d => redraw([validationCompare.b[0]]), 1000);


// const vals = [{"key":"distance","value":0,"valueType":"float","uiType":"input","name":"距离"},{"key":"subway_site","name":"地铁数据","uiType":"group","valueType":"group","children":[{"key":"line_name","name":"线路","uiType":"group","valueType":"group","children":[{"uiType":"multiSelect","valueType":"string","key":"$in","value":["1号线"],"name":"包含","validate":{"options":["1号线"]}}]}]}];
// console.log(vals);
// var pth = 'subway_site.line_name.$in';

// console.log(vv);
