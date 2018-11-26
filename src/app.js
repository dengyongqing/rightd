
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
//

import './app.css';
import validation from './validation';
import validation1 from './validation1';
import validation2 from './validation2';
import validation3 from './validation3';
import validation_tmp from './validation_tmp';



// import validationCompare from './validationCompare';
// let validation1 = validation;

import d from './../lib/utils';
// import object      from './object';
import Controls from './../components/Controls';

import Menus from './../components/subcoms/Menus'
// import ControlsRow from './../components/ControlsRow';


const vv = d.getValue(validation2);
const validationColumn = validation_tmp;// d.toValidation(object);
// let validationColumn2 = validation2;//d.toValidation(object);
// let validationRow    = validation;

// const validationFromObject = d.toValidation(object);
// console.log(validationFromObject, 'validationFromObject');


// const vall = [{ valueType: 'boolean', uiType: 'toggle', value: true, name: '设置区！', desc: '是否打开设置编辑(不要轻易点击,点击设置按钮自动消失...)', key: 'isShowSetting' }, { uiType: 'group', key: 'access', name: '权限', expand: true, children: [{ valueType: 'boolean', uiType: 'toggle', value: true, name: '浏览权限', desc: '是否可浏览', key: 'getable' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '修改权限', desc: '是否可修改', key: 'updateable' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '删除权限', desc: '是否可删除', key: 'deleteable' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '写入权限', desc: '是否可写入', key: 'insertable' }] }, { uiType: 'group', key: 'ui', name: 'UI设置', expand: false, children: [{ valueType: 'boolean', uiType: 'toggle', value: false, name: '编辑模式', key: 'isShowEditorMode' }, { valueType: 'boolean', uiType: 'toggle', value: false, name: '视图', desc: '是否把用户的操作行为，保存为历史视图', key: 'isShowViews' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '条件过滤', desc: '是否显示条件过滤器', key: 'isShowDataFilter' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '字段过滤', desc: '是否显示字段过滤器', key: 'isShowColumnFilter' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '左侧导航', desc: '是否显示左侧导航', key: 'isShowLeftBar' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '左侧搜索', desc: '是否显示左侧搜索', key: 'isShowLeftSearch' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '数据库选择', desc: '是否能在上方选择不同的数据库', key: 'isShowDatabaseSelect' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '上传按钮', desc: '是否显示上传按钮', key: 'isShowUpload' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '下载按钮', desc: '是否显示下载按钮', key: 'isShowDownload' }] }, { uiType: 'group', key: 'table', name: '表选项', expand: false, children: [{ valueType: 'boolean', uiType: 'toggle', value: true, name: '可视化', desc: '是否可以可视化（柱图、颜色）', key: 'isVisualize' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '排序', desc: '是否可以排序', key: 'isSortable' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '翻页', desc: '是否显示翻页', key: 'isShowPaginate' }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '查询摘要', desc: '下方查询的结果(表名、查询条件、过滤条件、结果数量)', key: 'isShowSummary' }, { valueType: 'integer', uiType: 'slider', value: 8, name: '总高', desc: '表格高度(行高的几倍)', key: 'lineN', validate: { range: { min: 2, max: 20 }, step: 1 } }, { valueType: 'integer', uiType: 'slider', value: 144, name: '列宽', desc: '每列的宽度', key: 'columnWidth', validate: { range: { min: 40, max: 400 }, step: 1 } }, { valueType: 'integer', uiType: 'select', value: 8, name: '行数', desc: '每页返回的数据行数', key: 'dataN', validate: { options: [8, 20, 50, 100] } }, { valueType: 'boolean', uiType: 'toggle', value: true, name: '数字简写', desc: '是否用万、千等数字描述数字', key: 'isSymplifyNumber' }] }, { uiType: 'group', key: 'other', name: '其他', expand: false, children: [{ valueType: 'boolean', uiType: 'toggle', value: true, name: '自动纠错', desc: '待开发...', key: 'autoFindMistake' }] }];
// const diff = { isShowSetting: true, access: { getable: true, updateable: true, deleteable: true, insertable: true }, ui: { isShowEditorMode: false, isShowViews: false, isShowDataFilter: true, isShowColumnFilter: false, isShowLeftBar: true, isShowLeftSearch: false, isShowDatabaseSelect: false, isShowUpload: false, isShowDownload: false }, table: { isVisualize: true, isSortable: true, isShowPaginate: true, isShowSummary: true, lineN: 8, columnWidth: 144, dataN: 8, isSymplifyNumber: true }, other: { autoFindMistake: false } };

// console.log(d.mergeObject2Validation(vall, diff)[2].children[5]);

// import MuiEditor from './MuiEditor';
// import TextEditor from './TextEditor';
// import JsonEditor from './JsonEditor';

// import ComControl from './ComControl';


function getStyles(props, states, context) {
  const { palette } = context.muiTheme;
  const { canvasColor } = palette;
  return {
    main: {
      backgroundColor: canvasColor,
    },
  };
}

// const themeCopy = _.cloneDeep(theme);
// const themeValidation = d.toValidation(themeCopy);

// injectTapEventPlugin();

// <JsonEditor data={object} onChange={(options, diff, validation) => console.log(validation)}/>
// <Controls data={validation} onChange={(a, b, c) => console.log(a)}/>
// let json = d.toValidation(object);
// <ComControl component={Controls} datas={{data: validation}}/>

// console.log(d.toObject(validation1), 'validation1 | toObject')
// const objv = d.toValidation(object);

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
