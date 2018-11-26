// function applyErrorMessage(errorMessage, a, b, c, d){
//   if (a) {

//   }

// }


export default [
  {
    name: 'input0',
    key: 'input0',
    uiType: 'input',
    valueType: 'integer',
    numberic: true,
    value: '',
    placeholder: '请输入数字',
    validate: {
    }
  },
  {
    name: 'input-1',
    key: 'input-1',
    uiType: 'input',
    valueType: 'string',
    value: '',
    placeholder: '请输入数字',
    validate: {
    }
  },
  {
    name: 'input1',
    key: 'input1',
    uiType: 'input',
    valueType: 'integer',
    value: '',
    placeholder: '请输入数字',
    validate: {
      step: 1,
      rules: [{
        type: 'notNull',
        value: '',
        errorMessage: '输入不能为空'
      },{
        type: 'range',
        value: {
          min: 1,
          max: 6
        },
        errorMessage: '请输入1~6'
        // errorMessage: '请输入${min}~${max}'
        // errorMessage: (value) => {
        //   return `${}${}`
        // }
      }]
    }
  },
  {
    name: 'input2',
    key: 'input2',
    uiType: 'input',
    valueType: 'integer',
    value: '',
    placeholder: '请输入数字',
    validate: {
      rules: [{
        type: 'notNull',
        value: '',
        errorMessage: '输入不能为空'
      }]
    }
  },
  {
    name: 'input3',
    key: 'input3',
    uiType: 'input',
    valueType: 'integer',
    value: '',
    placeholder: '请输入数字',
    validate: {
      rules: [{
        type: 'range',
        value: {
          min: 1,
          max: 6
        },
        errorMessage: '请输入0~6'
      }]
    }
  },
  // {
  //   name: '时间1',
  //   key: 'rangeTime',
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
  //   name: '时间2',
  //   key: 'rangeTime2',
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
  {
    name: '时间',
    key: 'time',
    uiType: 'time',
    valueType: 'time',
    value: {
      time: '2017-09-01'
    },
  },
  // {
  //   name: 'sql编辑',
  //   key: 'sqlValue',
  //   desc: 'xxxxxxx',
  //   value: 'select * from db',
  //   uiType: 'inputCode',
  //   valueType: 'mysql',
  //   color: '#c7245f',
  // },
  // {
  //   name: 'js编辑',
  //   key: 'jsValue',
  //   desc: 'xxxxxxxxxxx',
  //   value: 'var a=1',
  //   uiType: 'inputCode',
  //   valueType: 'javascript',
  //   color: '#f7e032',
  // },
  // {
  //   name: 'json编辑111111',
  //   key: 'jsonValue',
  //   desc: 'xxxxxxxxxxxxxxx',
  //   value: {a: 1, c: 2, b: { c: 2, d: {cc: 1, dd: 2}, d1: {cc: 1, dd: 2}}},
  //   uiType: 'inputCode',
  //   valueType: 'json',
  //   color: '#099',
  // },
  // {
  //   name: '取值范围slider',
  //   key: 'range1',
  //   uiType: 'rangeSlider',
  //   valueType: 'range',
  //   value: {
  //     min: 0.001,
  //     max: 2,
  //   },
  // },
  // {
  //   name: '多重选择',
  //   key: 'multis',
  //   uiType: 'multiSelect',
  //   valueType: 'string[]',
  //   // value: [{
  //   //       name: 'ds',
  //   //       value: 'adac'
  //   //     },{
  //   //       name: 'daaca',
  //   //       value: 'dafag'
  //   //     }],
  //   value: [],
  //   validate: {
  //     options: [
  //       {
  //         name: 'ds',
  //         value: 'adac',
  //       }, {
  //         name: 'daac是大大大多a',
  //         value: 'dafag',
  //       }, {
  //         name: 'cadcaa大分2我的钱dc',
  //         value: 'dacacaxd',
  //       }, {
  //         name: 'gadac大大大af',
  //         value: 'cadafgca',
  //       }, {
  //         name: 'cafg是大大插入sac',
  //         value: 'cafgac',
  //       }, {
  //         name: 'c三大若agqd2',
  //         value: 'ctyqf',
  //       }, {
  //         name: 'r大尺度三大尺度三大尺度三大尺度三大尺度三dacdsagca',
  //         value: 'cacgv',
  //       }, {
  //         name: 'cssdd',
  //         value: 'ggsc',
  //       },
  //     ],
  //   },
  // },
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
  // {
  //   name: 'xxax',
  //   key: 'xxxxx',
  //   uiType: 'binding',
  //   valueType: 'binding',
  //   value: {
  //     type: 'gradient',
  //     key: {
  //       value: 'price',
  //       options: ['price', 'lat', 'lng']
  //     },
  //     dataid: 'house_lianjia_community',
  //     isLock: true,
  //     range: {
  //       min: '#ff0',
  //       max: '#fff'
  //     }
  //   }
  // },
  // // {
  // //   name: '数据绑定',
  // //   key: 'bds',
  // //   uiType: 'binding',
  // //   valueType: 'binding',
  // //   value: {
  // //       key: 'avr_price',
  // //       dataid: 'house_lianjia_community',
  // //       domain: {
  // //         min: '$min',
  // //         max: '$max'
  // //       },
  // //       range: {
  // //         min: 5,
  // //         max: 20
  // //       }
  // //     }
  // // },
  // 整数 | float型的数据
  // {
  //   name: '查找',
  //   key: 'search',
  //   uiType: 'inputSearch',
  //   valueType: 'string', // integer
  //   placeholder: '查找',
  //   validate: {
  //     options: [
  //       'xxx',
  //       'xyz',
  //       'xyy',
  //       'xchs',
  //       'ddd',
  //       'z',
  //       's',
  //     ],
  //   },
  // },
  // {
  //   name: '整数输入',
  //   key: 'length1',
  //   uiType: 'input',
  //   valueType: 'integer', // integer
  //   value: 50,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //     step: 0.01, // 可选
  //   },
  // },
  // {
  //   name: '字符输入',
  //   key: 'length1',
  //   uiType: 'input',
  //   valueType: 'string', // integer
  //   value: 'dada',
  //   // addonAfter: <div>123</div>,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //     step: 0.01, // 可选
  //   },
  // },
  // {
  //   name: '小数输入',
  //   key: 'length2',
  //   uiType: 'input',
  //   valueType: 'float', // integer
  //   value: 2.44,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //     step: 0.01, // 可选
  //   },
  // },
  // {
  //   name: '数组输入',
  //   uiType: 'input',
  //   desc: '数组输入',
  //   key: 'array',
  //   valueType: 'int[]', // integer[]
  //   value: [1, 2, 3, 4],
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //     step: 1, // 可选
  //   },
  // },
  //整数 | float型的数据
  // {
  //   name: '数字拖条',
  //   uiType: 'slider',
  //   key: 'kkk',
  //   valueType: 'float',
  //   // disable: true,
  //   value: 20000000,
  //   validate: {
  //     range: {
  //       min: 100000000,
  //       max: 200000000
  //     },
  //   },
  //   handlerType: 'realtime' //finish
  // },
  // { "name": "population", "key": "population", "uiType": "group", "valueType": "group", "disable": false, "expand": true,
  //  "children": [
  //    { "key": "min", "value": 4, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 15635.84 } } },
  //    { "key": "max", "value": 15635.84, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 4, "max": 17199.024 } } }
  //   ]
  // }, { "name": "mall_count", "key": "mall_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -0.1, "max": 1 } } }, { "key": "max", "value": 1, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 1.1 } } }] }, { "name": "residential_count", "key": "residential_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -0.9, "max": 9 } } }, { "key": "max", "value": 9, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 9.9 } } }] }, { "name": "landscape_count", "key": "landscape_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -0.1, "max": 1 } } }, { "key": "max", "value": 1, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 1.1 } } }] }, { "name": "second_industry_count", "key": "second_industry_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -0.30000000000000004, "max": 3 } } }, { "key": "max", "value": 3, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 3.3 } } }] }, { "name": "industry_count", "key": "industry_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -0.30000000000000004, "max": 3 } } }, { "key": "max", "value": 3, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 3.3 } } }] }, { "name": "tertiary_industry_count", "key": "tertiary_industry_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -1.3, "max": 13 } } }, { "key": "max", "value": 13, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 14.3 } } }] }, { "name": "office_count", "key": "office_count", "uiType": "group", "valueType": "group", "disable": true, "children": [{ "key": "min", "value": 0, "name": "大于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": -0.2, "max": 2 } } }, { "key": "max", "value": 2, "name": "小于", "uiType": "slider", "valueType": "float", "validate": { "range": { "min": 0, "max": 2.2 } } }] }]


// export default [
//   // {
//   //   name: '时间范围',
//   //   key: 'rangeTime',
//   //   uiType: 'rangeTime',
//   //   valueType: 'rangeTime',
//   //   value: {
//   //     min: '2017-03-02',
//   //     max: '2017-03-03',
//   //   },
//   //   style: {
//   //     flexGrow: 2
//   //   }
//   // },
//   // {
//   //   name: '时间',
//   //   key: 'time',
//   //   uiType: 'time',
//   //   valueType: 'time',
//   //   value: {
//   //     time: '2017-09-01'
//   //   },
//   // },
//   {
//     name: 'sql编辑',
//     key: 'sqlValue',
//     desc: 'xxxxxxx',
//     value: 'select * from db',
//     uiType: 'inputCode',
//     valueType: 'mysql',
//     color: '#c7245f',
//   },
//   {
//     name: 'js编辑',
//     key: 'jsValue',
//     desc: 'xxxxxxxxxxx',
//     value:  'var a=1',
//     uiType: 'inputCode',
//     valueType: 'javascript',
//     color: '#f7e032',
//   },
//   {
//     name: 'json编辑111111',
//     key: 'jsonValue',
//     desc: 'xxxxxxxxxxxxxxx',
//     value: {a: 1, c: 2, b: { c: 2, d: {cc: 1, dd: 2}, d1: {cc: 1, dd: 2}}},
//     uiType: 'inputCode',
//     valueType: 'json',
//     color: '#099',
//   },
//   // {
//   //   name: '取值范围slider',
//   //   key: 'range1',
//   //   uiType: 'rangeSlider',
//   //   valueType: 'range',
//   //   value: {
//   //     min: 0.001,
//   //     max: 2,
//   //   },
//   // },
//   {
//     name: '多重选择',
//     key: 'multis',
//     uiType: 'multiSelect',
//     valueType: 'string[]',
//     // value: [{
//     //       name: 'ds',
//     //       value: 'adac'
//     //     },{
//     //       name: 'daaca',
//     //       value: 'dafag'
//     //     }],
//     value: [],
//     validate: {
//       options: [
//         {
//           name: 'ds',
//           value: 'adac'
//         }, {
//           name: 'daac是大大大多a',
//           value: 'dafag'
//         }, {
//           name: 'cadcaa大分2我的钱dc',
//           value: 'dacacaxd'
//         }, {
//           name: 'gadac大大大af',
//           value: 'cadafgca'
//         }, {
//           name: 'cafg是大大插入sac',
//           value: 'cafgac'
//         }, {
//           name: 'c三大若agqd2',
//           value: 'ctyqf'
//         }, {
//           name: 'r大尺度三大尺度三大尺度三大尺度三大尺度三dacdsagca',
//           value: 'cacgv'
//         }, {
//           name: 'cssdd',
//           value: 'ggsc'
//         }
//       ]
//     }
//   },
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
//   // {
//   //   name: 'xxax',
//   //   key: 'xxxxx',
//   //   uiType: 'binding',
//   //   valueType: 'binding',
//   //   value: {
//   //     type: 'gradient',
//   //     key: {
//   //       value: 'price',
//   //       options: ['price', 'lat', 'lng']
//   //     },
//   //     dataid: 'house_lianjia_community',
//   //     isLock: true,
//   //     range: {
//   //       min: '#ff0',
//   //       max: '#fff'
//   //     }
//   //   }
//   // },
//   // // {
//   // //   name: '数据绑定',
//   // //   key: 'bds',
//   // //   uiType: 'binding',
//   // //   valueType: 'binding',
//   // //   value: {
//   // //       key: 'avr_price',
//   // //       dataid: 'house_lianjia_community',
//   // //       domain: {
//   // //         min: '$min',
//   // //         max: '$max'
//   // //       },
//   // //       range: {
//   // //         min: 5,
//   // //         max: 20
//   // //       }
//   // //     }
//   // // },
//   // 整数 | float型的数据
//   {
//     name: '整数输入',
//     key: 'length1',
//     uiType: 'input',
//     valueType: 'integer', // integer
//     value: 50,
//     validate: {
//       range: {
//         min: 1,
//         max: 100
//       },
//       step: .01, //可选
//     },
//   },
//   {
//     name: '字符输入',
//     key: 'length222',
//     uiType: 'input',
//     valueType: 'string', // integer
//     value: 'dada',
//     validate: {
//       range: {
//         min: 1,
//         max: 100
//       },
//       step: .01, //可选
//     },
//   },
//   {
//     name: '小数输入',
//     key: 'length2',
//     uiType: 'input',
//     valueType: 'float', // integer
//     value: 2.44,
//     validate: {
//       range: {
//         min: 1,
//         max: 100
//       },
//       step: .01, //可选
//     },
//   },
//     {
//     name: '数组输入',
//     uiType: 'input',
//     desc: '数组输入',
//     key: 'array',
//     valueType: 'int[]', // integer[]
//     value: [1, 2, 3, 4],
//     validate: {
//       range: {
//         min: 1,
//         max: 100
//       },
//       step: 1, //可选
//     }
//   },
//   //整数 | float型的数据
//   // {
//   //   name: '数字拖条',
//   //   uiType: 'slider',
//   //   key: 'kkk',
//   //   valueType: 'float',
//   //   // disable: true,
//   //   value: 20000000,
//   //   validate: {
//   //     range: {
//   //       min: 100000000,
//   //       max: 200000000
//   //     },
//   //   },
//   //   handlerType: 'realtime' //finish
//   // },

//   //选择器 各种数据都可以
  {
    name: '下拉选择[{}]11111',
    uiType: 'select',
    valueType: 'string',
    key: '下拉选择[{}]11111',
    value: {value: 'xx', name: '测试'},
    validate: {
      options: {
        xx: null,
        xxx: 'xxx',
        yyy: 'yyy',
        zzz: 'zzz',
        ccc: 'ccc',
        ddd: 'ddd',
        z: 'z',
        d: 's'
      } // {上海: 310000, 杭州: 320000}  [{value: 310000, name: '上海'}]
    }
  },
//   // {
//   //   name: '下拉选择[]',
//   //   desc: '下拉选择哈哈哈',
//   //   uiType: 'select',
//   //   valueType: 'string',
//   //   key: '下拉选择[]',
//   //   value: 222222222222222222222,
//   //   validate: {
//   //     options: [1, 222222222222222222222, 3, null] // {上海: 310000, 杭州: 320000}  [{value: 310000, name: '上海'}]
//   //   }
//   // },
//   // {
//   //   name: '下拉选择{}',
//   //   uiType: 'select',
//   //   valueType: 'string',
//   //   key: 'place',
//   //   value: 'xx',
//   //   validate: {
//   //     options: { 1: 'xx', 2: 'xxx' }
//   //   }
//   // },
//   //颜色
//   // {
//   //   name: '颜色disable',
//   //   uiType: 'color',
//   //   valueType: 'color',
//   //   key: 'displayColor',
//   //   value: '#f00',
//   //   validate: {},
//   //   disable: true
//   // },

//   // 数组 | 矩阵 、、、、
//   // {
//   //   name: '长度',
//   //   uiType: 'input',
//   //   key: 'matrix',
//   //   valueType: 'int[]', // integer[]
//   //   value: [1, 2, 3, 4],
//   //   validate: {
//   //     range: {
//   //       min: 1,
//   //       max: 100
//   //     },
//   //     step: 1, //可选
//   //   }
//   // },

//   // {
//   //   name: '分组',
//   //   key: 'pricesGroup1',
//   //   uiType: 'group',
//   //   valueType: 'group',
//   //   expand: true,
//   //   children: [{
//   //     name: '颜色1',
//   //     uiType: 'color',
//   //     key: 'xxx',
//   //     valueType: 'color',
//   //     value: '#f90',
//   //     validate: {}
//   //   }, ]
//   // },


//   {
//     name: '字段过滤(category)xxxxxxxxxx',
//     key: 'filterColumn',
//     uiType: 'filterColumn',
//     valueType: 'filter',
//     desc: '字段过滤(category)',
//     expand: true,
//     expandable: false,
//     value: null,
//     validate: {
//       type: 'time',
//       options: ['a', 'b', 'c', 'd']
//     }
//   },


//     {
//     name: '分组',
//     key: 'pricesGroup1',
//     uiType: 'group',
//     valueType: 'group',
//     isable: true,
//     expand: true,
//     children: [{
//       name: '颜色',
//       uiType: 'color',
//       key: 'xxx',
//       valueType: 'color',
//       value: '#fff',
//       validate: {}
//     }, {
//       name: '拖动条',
//       uiType: 'slider',
//       valueType: 'float',
//       key: 'nyannyan',
//       value: 50,
//       validate: {
//         range: {
//           min: 1,
//           max: 100
//         }
//       },
//       handlerType: 'realtime' //finish
//     }]
//   },
];
