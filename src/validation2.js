import React, { PureComponent, PropTypes } from 'react';

const simpleHoc = WrappedComponent => {
  
  return class extends React.Component {

    handleClick = (e) => {
      console.log(e.target);
      if (e.target.getAttribute('id') !== 'wrap') {
        return;
      } else {
        console.log(e.currentTarget, e.target, 'inner')
      }
      
      
    }
    constructor(props) {
      super(props);
      this.state = {
        show: false
      }
    }
    componentDidMount() {
      // console.log('run');
    }
    // shouldComponentUpdate(nextProps, nextState){
      // if (_.isEqual(nextProps, this.props)) {
      //   return false
      // } else {
      //   return true
      // }
    // }
    onMouseEnter = () => {
      this.setState({
        show: true
      })
    }
    onMouseLeave = () => {
      this.setState({
        show: false
      })
    }
    onChange = (v, d, o) => {
      console.log(v, d, o);
      // Object.assign(this.props.data, d);
    }
    render() {

      return (
        <div onClick={this.handleClick} 
          id='wrap'
          onMouseEnter={this.onMouseEnter} 
          onMouseLeave={this.onMouseLeave}
          style={{border: '1px solid #f00'}}>
          <WrappedComponent {...this.props}   style={{background: '#f00'}} />
          {/* {
            this.state.show ? <div>123</div> : <div></div>
          } */}
        </div>
        
      )
    }
  }
}
export default [
  // {
  //   name: '时间范围',
  //   key: 'rangeTime',
  //   uiType: 'rangeDate',
  //   valueType: 'rangeDate',
  //   desc: '时间范围时间范围时间范围时间范围时间范围333333',
  //   value: {
  //     $gte: '2017-03-02 12:10:23',
  //     $lte: '2017-03-03 11:10:13',
  //   },

  //   style: {
  //     flexGrow: 2,
  //   },
  // },
  // { 
  //   uiType: 'checkBox',
  //   name: '多选框',
  //   desc: '多选的季后赛',
  //   label: '多选框',
  //   key: 'checkBox',
  //   value: false,
  // },
  // {
  //   uiType: 'radioButton',
  //   name: '单选框',
  //   // hoc: simpleHoc,
  //   layout: 'vertical',
  //   // layout: 'inline',
  //   key: 'radio',
  //   // value: {label: '蕉', value: 'bana'},
  //   value: {},
  //   /* when layout is vertical, add style like this' */
  //   style: {
  //     height: 'auto',
  //     alignItems: 'start'
  //   },
  //   validate: {
  //     options: [
  //       {
  //         label: '果',
  //         value: 'apple',
  //       }, {
  //         label: '蕉',
  //         value: 'bana',
  //       }, {
  //         label: '梨',
  //         value: 'pear',
  //       }
  //     ],
  //   }

  // },
  {
    name: '字段过滤(category)xxxxxxxxxx',
    key: 'filterColumn123',
    uiType: 'filterColumn',
    valueType: 'filter',
    desc: '字段过滤(category)',
    expand: true,
    expandable: true,
    value: null,

    validate: {
      type: 'category',
      options: ['a', 'b', 'c', 'd']
    }
  },
  // {
  //   name: '字段过滤(measure)',
  //   key: 'filterColumn1',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   desc: '字段过滤(measure)',
  //   expand: true,
  //   expandable: true,
  //   value: null,
  //   validate: {
  //     type: 'mesure',
  //     options: ['a', 'b', 'c', 'd']
  //   }
  // },
   {
    name: 'json编辑111111',
    key: 'jsonValue',
    desc: 'xxxxxxxxxxxxxxx',
    value: {a: 1, c: 2, b: { c: 2, d: {cc: 1, dd: 2}, d1: {cc: 1, dd: 2}}},
    uiType: 'inputCode',
    valueType: 'json',
    color: '#099',
  },
  // {
  //   name: '字段过滤(time)',
  //   key: 'filterColumn',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   desc: '字段过滤(time)',
  //   expand: true,
  //   expandable: true,
  //   value: {
  //     $and: [{
  //       $gte: '2017-10-01',
  //     }, {
  //       $lte: '2017-10-09',
  //     },
  //     ],
  //   },
  // //   value: null,
  //   validate: {
  //     type: 'time',
  //     options: ['a', 'b', 'c', 'd'],
  //   },
  // },
  // {
  //   name: '字段过滤(category)',
  //   key: 'filterColumn121',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   desc: '字段过滤(category)',
  //   value: null,
  //   validate: {
  //     type: 'category',
  //     options: [null, 'a']
  //   },
  // },
  // {
  //   name: '时间范围',
  //   key: 'rangeTime',
  //   uiType: 'rangeTime',
  //   valueType: 'rangeTime',
  //   desc: 'ss|rangeTime|ss',
  //   value: {
  //     $gte: '2017-03-02',
  //     $lte: '2017-03-03',
  //   },
  //   style: {
  //     flexGrow: 2,
  //   },
  // },
  {
    name: '时间',
    key: 'time',
    uiType: 'time',
    // hoc: simpleHoc,
    valueType: 'time',
    value: {
      time: '2017-09-01',
    },
    validate: {
    }
  },
  // {
  //   name: '时间',
  //   key: 'time1',
  //   uiType: 'time',
  //   // hoc: simpleHoc,
  //   valueType: 'time',
  //   value: '',
  //   validate: {
  //   }
  // },
  // {
  //   name: '时间',
  //   key: 'time2',
  //   uiType: 'time',
  //   hoc: simpleHoc,
  //   valueType: 'time',
  //   value:  '',
  //   placeholder: '请输入时间'
  // },
  // {
  //   name: 'json编辑111111',
  //   key: 'jsonValue',
  //   desc: 'xxxxxxxxxxxxxxxxxxxxxxxx',
  //   value: {a: 1, c: 2, b: { c: 2, d: {cc: 1, dd: 2}, d1: {cc: 1, dd: 2}}},
  //   uiType: 'input',
  //   valueType: 'json',
  // },

  // {
  //   name: '取值范围',
  //   key: 'range',
  //   uiType: 'range',
  //   valueType: 'range',
  //   value: {
  //     min: 0.001,
  //     max: 2,
  //   },
  // },
  // {
  //   name: '字段过滤',
  //   key: 'filterColumn2',
  //   desc: '过滤过滤大健康',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   addColor: true,
  //   handleConfirm(a, b) { console.log(a, b); },
  //   desc: '字段过滤(category)',
  //   expand: false,
  //   expandable: true,
  //   value: null,
  //   validate: {
  //     type: 'time',
  //     options: ['a', 'b', 'c', 'd'],
  //   },
  //   filterStyle: {
  //     nameStyle: {
  //       background: '#F2F2F2',
  //       border: '1px solid #CFCFCF',
  //       borderRadius: '2px',
  //     },
  //     inputStyle: {
  //       background: '#F8F8F8',
  //       border: '1px solid #D4D4D4',
  //     },
  //     selectStyle: {
  //       background: '#F8F8F8',
  //     },
  //   },
  // },
  // {
  //   name: '取值范围slider',
  //   key: 'range1',
  //   uiType: 'slider',
  //   valueType: 'float',
  //   value: 3,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 5,
  //     },
  //   },
  // },
  // {
  //   name: '时间范围',
  //   key: 'rangeTime1',
  //   uiType: 'rangeDate',
  //   valueType: 'rangeDate',
  //   desc: '时间范围时间范围时间范围时间范围时间范围333333',
  //   value: {
  //     $gte: '2017-03-02 12:10:23',
  //     $lte: '2017-03-03 11:10:13',
  //   },

  //   style: {
  //     flexGrow: 2,
  //   },
  // },
  // {
  //   name: '字符输入',
  //   key: 'length222',
  //   uiType: 'input',
  //   valueType: 'string', // integer
  //   value: 'dada',
  //   type: 'textarea',
  //   resize: 'vertical',
  //   // hoc: simpleHoc,
  //   placeholder: '请输入项目描述.....',
  //   style: {
  //     height: 'auto',
  //     alignItems: 'start',
  //     padding: '10% 0px'
  //     // color: '#fff',
  //   },
  //   validate: {
  //   },
  // },
  // {
  //   name: '输入',
  //   key: 'length124',
  //   uiType: 'input1',
  //   valueType: 'string', // integer
  //   value: 'dada',
  //   // type: 'textarea',
  //   // resize: 'vertical',
  //   hoc: simpleHoc,
  //   placeholder: '请输入项目描述.....',
  //   // style: {
  //   //   height: 'auto',
  //   //   alignItems: 'start',
  //   //   padding: '10% 0px'
  //   //   // color: '#fff',
  //   // },
  //   validate: {
  //   },
  // },
  {
    name: 'multi',
    key: 'multiSelect',
    uiType: 'multiSelect',
    // realOnChange: false,
    // hoc: simpleHoc,
    valueType: 'string[]',
    placeholder: '请输入',
    value: [],
    validate: {
      options: ['c', 'd']
    }
  },
 
  //  {
  //   name: '[number, options[object]]',
  //   key: '[number, options[object]]',
  //   uiType: 'multiSelect',
  //   value: [],
  //   validate: {
  //     options: {
  //       A: 'a11111111111111111111111111111111111111111111',
  //       B1: 'B1',
  //       B2: 'B2',
  //       B3: 'B3',
  //       B4: 'B4',
  //       B5: 'B5',
  //       B6: 'B6',
  //       B7: 'B7',
  //       B8: 'B8',
  //       B9: 'B9',
  //       B10: 'B10',
  //       B11: 'B11',
  //     },
  //   },
  // },
  {
    name: '多重选择',
    key: 'multis',
    uiType: 'multiSelect',
    valueType: 'string[]',
    // hoc: simpleHoc,
    // realOnChange: false,
    onConfirm: () => console.log('click'), 
    placeholder: '请添加项目',
    value: [],
    validate: {
      options: [
        {
          name: 'ds',
          value: 0,
        }, {
          name: 'daac是大大大多a',
          value: 1,
        }, {
          name: 'cadcaa大分2我的钱dc',
          value: 'dacacaxd',
        }, {
          name: 'gadac大大大af',
          value: 'cadafgca',
        }, {
          name: 'cafg是大大插入sac',
          value: 'cafgac',
        }, {
          name: 'c三大若agqd2',
          value: 'ctyqf',
        }, {
          name: 'r大尺度三大尺度三大尺度三大尺度三大尺度三dacdsagca',
          value: 'cacgv',
        }, {
          name: 'cafg',
          value: 'ggsc',
        }, {
          name: 'jsakhdf',
          value: '值123'
        }, {
          name: 'tirttr',
          value: '值124'
        },  {
          name: 'llgfjh',
          value: '值125'
        }, {
          name: 'auhfiu',
          value: '值126'
        }
      ],
    },
  },
  // {
  //   name: '颜色渐变(函数)',
  //   key: 'gradient',
  //   uiType: 'gradient',
  //   valueType: 'gradient', // integer
  //   value: {
  //     domain: {
  //       min: 0.001,
  //       max: 200000
  //     },
  //     range: {
  //       min: "rgba(0, 115, 81, .9)",
  //       max: "rgba(249, 255, 173, 1)"
  //     }
  //   },
  // },
  {
    name: 'xxax',
    key: 'xxxxx',
    uiType: 'binding',
    valueType: 'binding',
    value: {
      type: 'gradient',
      key: {
        value: 'price',
        options: ['price', 'lat', 'lng']
      },
      dataid: 'house_lianjia_community',
      isLock: true,
      range: {
        min: '#ff0',
        max: '#fff'
      }
    }
  },
  // {
  //   name: '数据绑定',
  //   key: 'bds',
  //   uiType: 'binding',
  //   valueType: 'binding',
  //   value: {
  //       key: 'avr_price',
  //       dataid: 'house_lianjia_community',
  //       domain: {
  //         min: '$min',
  //         max: '$max'
  //       },
  //       range: {
  //         min: 5,
  //         max: 20
  //       }
  //     }
  // },
  {
    // name: 'label',
    key: 'label1',
    uiType: 'label',
    value: '文本文本',
    // hoc: simpleHoc,
    labelStyle: {
      fontSize: '14px',
      fontWeight: 700,
    }
  },
  {
    name: 'input',
    key: 'length666',
    uiType: 'input',
    valueType: 'float',
    // numberic: true,
    // hoc: simpleHoc,
    value: '',
    placeholder: '请输入数字',
    validate: {
      step: 0.1,
      rules: [{
        type: 'notNull',
        value: '',
        errorMessage: '输入不能为空'
      }]
    }
  },
  // {
  //   name: 'time',
  //   key: 'rangeTime222',
  //   uiType: 'rangeTime',
  //   valueType: 'rangeTime',
  //   value: {
  //     min: '2017-03-02',
  //     max: '2017-03-03',
  //   },
  //   style: {
  //     flexGrow: 2
  //   }
  // },
  // {
  //   name: '颜色渐变',
  //   key: 'xxxxx',
  //   uiType: 'binding',
  //   valueType: 'binding',
  //   value: {
  //     type: 'gradient',
  //     key: {
  //       value: 'price',
  //       options: ['price', 'lat', 'lng'],
  //     },
  //     dataid: 'house_lianjia_community',
  //     isLock: false,
  //     domain: [0, 1],
  //     range: ['#f0f', '#f00']
  //   },
  // },
  // // 整数 | float型的数据
  // {
  //   name: '整数输入',
  //   key: 'length1',
  //   uiType: 'inputCompact',
  //   value: {
  //     value: 1,
  //     unit: '小时'
  //   },
  //   validate: {
  //     options: ['小时', '周', '天']
  //   }
  // },
  // {
  //   name: '字符输入',
  //   key: 'length222',
  //   uiType: 'input',
  //   valueType: 'string', // integer
  //   value: 'dadadfa',
  //   validate: {
  //     rules(value) {
  //       if (value.length < 6) return false;
  //       return true;
  //     },
  //     errormessage: '字符不低于6个',
  //   },
  // },
  // {
  //   name: '小数输入',
  //   key: 'length2',
  //   uiType: 'input',
  //   valueType: 'float', // integer
  //   value: 50,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100
  //     },
  //     step: .01, //可选
  //   },
  // },
  // {
  //   name: '单位处理',
  //   uiType: 'input',
  //   valueType: 'float',
  //   key: 'unit',
  //   unit: 'px',
  //   value: 50,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //     units: ['px', 'cm']
  //   },
  // },
  // // //整数 | float型的数据
  // // {
  // //   name: '数字拖条',
  // //   uiType: 'slider',
  // //   key: 'kkk',
  // //   valueType: 'float',
  // //   disable: true,
  // //   value: 20000000,
  // //   validate: {
  // //     range: {
  // //       min: 1,
  // //       max: 200000000
  // //     },
  // //   },
  // //   handlerType: 'realtime' //finish
  // // },

  // 选择器 各种数据都可以
  {
    name: '下拉选择[{}]11111',
    uiType: 'select',
    valueType: 'string',
    key: '下拉选择[{}]11111',
    value: '',
    placeholder: '下拉',
    // isInput: true,
    // hoc: simpleHoc,
    handleOpen: () => { console.log('1') },
    validate: {
      options: {
        xx: null,
        xxx: 'xxx',
        yyy: 'yyy',
      }, // {上海: 310000, 杭州: 320000}  [{value: 310000, name: '上海'}]
    },
  },
  // {
  //   name: '组合',
  //   uiType: 'inputCompact',
  //   valueType: 'string',
  //   key: 'input组合框',
  //   value: {
  //     inputValue: 10,
  //     selectValue: '时'
  //   },
  //   validate: {
  //     options: ['时', '分', '秒']
  //   }
  // },
  // {
  //   name: '下拉选择',
  //   uiType: 'select',
  //   valueType: 'string',
  //   key: '下拉选择123',
  //   value: 'xx',
  //   validate: {
  //     options: [{
  //       name: '测试',
  //       value: 'xx'
  //     },{
  //       name: '上海',
  //       value: 'shanghai'
  //     },{
  //       name: '杭州',
  //       value: 'hangzhou'
  //     }] // {上海: 310000, 杭州: 320000}  [{value: 310000, name: '上海'}]
  //   }
  // },
  // {
  //   name: '下拉选择[]',
  //   desc: '下拉选择哈哈哈',
  //   uiType: 'select',
  //   valueType: 'string',
  //   key: '下拉选择[]',
  //   value: 2,
  //   validate: {
  //     options: [1,2,3, null] // {上海: 310000, 杭州: 320000}  [{value: 310000, name: '上海'}]
  //   }
  // },
  // {
  //   name: '下拉选择{}',
  //   uiType: 'select',
  //   valueType: 'string',
  //   // hoc: simpleHoc,
  //   // isInput: true,
  //   placeholder: '请选择',
  //   key: 'place',
  //   value: '',
  //   validate: {
  //     options: {1: 'xx', 2: 'xxx'}
  //   }
  // },
  // // //颜色
  // {
  //   name: '颜色disable',
  //   uiType: 'color',
  //   valueType: 'color',
  //   key: 'displayColor',
  //   // isShowAlpha: false,
  //   value: '#f00',
  //   validate: {},
  //   // disable: true
  // },

  // {
  //   name: '颜色Alpha',
  //   uiType: 'color',
  //   valueType: 'color',
  //   key: 'Color',
  //   value: '#f00',
  //   validate: {},
  //   // disable: true
  // },
 
  // // // 数组 | 矩阵 、、、、
  // {
  //   name: '长度',
  //   uiType: 'input',
  //   key: 'matrix',
  //   valueType: 'integer', // integer[]
  //   value: 1,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100
  //     },
  //     step: 1, //可选
  //   }
  // },
  {
    name: '颜色',
    uiType: 'color',
    key: 'xxx1',
    valueType: 'color',
    value: '#fff',
    validate: {}, 
  },  
  {
    name: '选择器',
    key: 'selectsss1',
    value: 'a1',
    uiType: 'switch',
    valueType: 'string',
    validate: {
      options: {
        a1: [
          {
            name: '取值范围1',
            key: 'range1',
            uiType: 'range',
            valueType: 'range',
            value: {
              min: 0.001,
              max: 2,
            },
          },
          {
            name: '小数输入xxx',
            key: 'length2xx',
            uiType: 'input',
            valueType: 'float',
            value: 150,
            validate: {
              range: {
                min: 1,
                max: 100
              },
              step: .01, //可选
            },
          }
        ],
        a2: [
          {
            name: '取值范围2',
            key: 'range2',
            uiType: 'range',
            valueType: 'range',
            value: {
              min: 0.03,
              max: 12,
            },
          }
        ],
        a3: []
      }
    }
  },
  {
    name: '分组',
    key: 'pricesGroup1',
    uiType: 'group',
    valueType: 'group',
    disable: true,
    expand: true,
    children: [{
        name: '颜色',
        uiType: 'color',
        key: 'xxx',
        valueType: 'color',
        value: '#fff',
        validate: {}, 
    },  {
      name: '选择器',
      key: 'selectsss',
      value: 'a1',
      uiType:    'switch',
      valueType: 'string',
      validate: {
        options: {
          a1: [
            {
              name: '取值范围1',
              key: 'range1',
              uiType: 'range',
              valueType: 'range',
              value: {
                min: 0.001,
                max: 2,
              },
            },
            {
              name: '小数输入xxx',
              key: 'length2xx',
              uiType: 'input',
              valueType: 'float',
              value: 150,
              validate: {
                range: {
                  min: 1,
                  max: 100
                },
                step: .01, //可选
              },
            }
          ],
          a2: [
            {
              name: '取值范围2',
              key: 'range2',
              uiType: 'range',
              valueType: 'range',
              value: {
                min: 0.03,
                max: 12,
              },
            }
          ],
          a3: []
        }
      }
    },],
  },
  // {
  //   name: 'key-value',
  //   uiType: 'keyValue',
  //   key: 'keyvalue',
  //   valueType: 'object',
  //   addOnAfter: <div style={{display: 'flex'}} ><div>123</div></div>,
  //   value: {
  //     key: 'id',
  //     value: '123'
  //   },
  //   validate: {
  //     rules: [{
  //       type: 'notNull',
  //       value: '',
  //       errorMessage: '输入不能为空'
  //     }]
  //   }
  // },
  // {
  //   name: '',
  //   uiType: 'keyValue',
  //   key: 'keyvalue1',
  //   valueType: 'object',
  //   addOnAfter: <div style={{display: 'flex'}} ><div>123</div></div>,
  //   value: {
  //     key: 'id',
  //     value: '123'
  //   },
  //   validate: {
  //     rules: [{
  //       type: 'notNull',
  //       value: '',
  //       errorMessage: '输入不能为空'
  //     }]
  //   }
  // },
  // {
  //   name: '取值范围',
  //   key: 'range',
  //   uiType: 'range',
  //   valueType: 'range',
  //   value: {
  //     min: 0.001,
  //     max: 2,
  //   },
  // },
  // {
  //   name: '颜色映射',
  //   key: 'xxxxx',
  //   uiType: 'binding',
  //   valueType: 'binding',
  //   value: {
  //     type: 'gradient',
  //     key: {
  //       value: 'price',
  //       options: ['price', 'lat', 'lng'],
  //     },
  //     dataid: 'house_lianjia_community',
  //     isLock: false,
  //     range: {
  //       min: '#f00',
  //       max: '#00f',
  //     },
  //   },
  // },
  // {
  //   name: '数据绑定',
  //   key: 'bds',
  //   uiType: 'binding',
  //   valueType: 'binding',
  //   value: {
  //       key: 'avr_price',
  //       dataid: 'house_lianjia_community',
  //       domain: {
  //         min: '$min',
  //         max: '$max'
  //       },
  //       range: {
  //         min: 5,
  //         max: 20
  //       }
  //     }
  // },
 
  // {
  //   name: '拖动条',
  //   uiType: 'slider',
  //   valueType: 'float',
  //   key: 'nyannyan',
  //   unit: 'px',
  //   value: 50,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //   },
  //   handlerType: 'realtime', // finish
  // }

  {
    name: '数组输入',
    uiType: 'input',
    key: 'array',
    valueType: 'int[]', // integer[]
    value: [1, 2, 3, 4],
    placeholder: '请输入数组',
    validate: {
      rules: [{
        type: 'notNull',
        value: ''
      }],
      // range: {
      //   min: 1,
      //   max: 100
      // },
      step: 1, //可选
    }
  },
];
