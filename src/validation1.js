
export default [
  // {
  //   name: '字段过滤',
  //   key: 'filterColumn',
  //   uiType: 'filterRow',
  //   valueType: 'filter',
  //   desc: '字段过滤(category)',
  //   expand: false,
  //   expandable: true,
  //   value: null,
  //   validate: {
  //     type: 'time',
  //     options: ['a', 'b', 'c', 'd'],
  //   },
  // },
  // {
  //   name: '分组',
  //   key: 'pricesGroup1',
  //   uiType: 'group',
  //   valueType: 'group',
  //   disable: true,
  //   expand: true,
  //   children: [{
  //       name: '颜色',
  //       uiType: 'color',
  //       key: 'xxx',
  //       valueType: 'color',
  //       value: '#fff',
  //       validate: {},
  //     }, {
  //       name: '拖动条',
  //       uiType: 'slider',
  //       valueType: 'float',
  //       key: 'nyannyan',
  //       value: 50,
  //       validate: {
  //         range: {
  //           min: 1,
  //           max: 100,
  //         },
  //       },
  //       handlerType: 'realtime', // finish
  //     }]
  // },
  // {
  //   name: '字段过滤',
  //   key: 'filterColumn',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   desc: '字段过滤(category)',
  //   handleConfirm: function (a, b) { console.log(a, b); },
  //   // addColor: true,
  //   // settingIcon: <div>123</div>,
  //   expand: false,
  //   expandable: true,
  //   value: null,
  //   validate: {
  //     type: 'time',
  //     options: ['a', 'b', 'c', 'd'],
  //   },
    // filterStyle: {
    //   nameStyle: {
    //     background: '#F2F2F2',
    //     border: '1px solid #CFCFCF',
    //     borderRadius: '2px',
    //   },
    //   inputStyle: {
    //     background: '#F8F8F8',
    //     border: '1px solid #D4D4D4',
    //   },
    //   selectStyle: {
    //     background: '#F8F8F8',
    //   },
    // },
  // },
  // {
  //   name: '字段过滤',
  //   key: 'filterColumn1',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   handleConfirm: function (a, b) { console.log(a, b); },
  //   desc: '字段过滤(category)',
  //   expand: false,
  //   addColor: true,
  //   expandable: true,
  //   value: null,
  //   validate: {
  //     type: 'measure',
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
  //   name: '字段过滤',
  //   key: 'filterColumn2',
  //   uiType: 'filterColumn',
  //   valueType: 'filter',
  //   addColor: true,
  //   handleConfirm: function (a, b) { console.log(a, b); },
  //   desc: '字段过滤(category)',
  //   expand: false,
  //   expandable: true,
  //   value: null,
  //   validate: {
  //     type: 'category',
  //     options: [null, 1],
  //   },
  // },
  //  { 
  //   uiType: 'toggle',
  //   name: '锁定',
  //   key: 'isLock',
  //   value: false,
  // },
  // { 
  //   uiType: 'checkBox',
  //   name: 'checkbox',
  //   label: '单选框',
  //   key: 'checkBox',
  //   value: false,
  // },

  // {
  //   name: '时间范围',
  //   key: 'rangeTime',
  //   uiType: 'rangeDate',
  //   valueType: 'rangeDate',
  //   desc: '时间范围时间范围时间范围时间范围时间范围333333',
  //   // value: {
  //   //   range: {
  //   //     $gte: '2017-03-02 12:10:23',
  //   //     $lte: '2017-03-03',
  //   //   },
  //   //   name: null,
  //   // },
  //   value: {
  //     $gte: '2017-03-02 12:10:23',
  //     $lte: '2017-03-03',
  //   },

  //   style: {
  //     flexGrow: 2,
  //   },
  // },

  {
    name: '选择器',
    desc: 'xxxxx',
    key: 'selectssssd',
    value: 'a1',
    uiType: 'switch',
    valueType: 'string',
    validate: {
      options: {
        a1: [{
            name: '下拉选择[{}]11111',
            uiType: 'input',
            valueType: 'string',
            key: '下拉选择[{}]111',
            value: '',
          },
        ],
        a2: [
          {
            name: '取值范围2',
            key: 'fdsf',
            uiType: 'input',
            valueType: 'string',
            value: 5,
          },
        ],
      },
    },
  },

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
  //   name: '取值范围slider',
  //   key: 'range1',
  //   desc: 'xxxxx',
  //   uiType: 'slider',
  //   valueType: 'float',
  //   value: 22222,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 522222,
  //     },
  //   },
  // },
  // {
  //   name: '[string]',
  //   key: '[string]',
  //   value: ['a'],
  //   uiType: 'multiSelect',
  //   valueType: 'string',
  //   validate: {
  //     options: ['a', 'b', 'c', 'd', 'e'],
  //   },
  // },
  // {
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
    name: '多重选择2',
    key: 'multis2',
    uiType: 'multiSelect',
    value: [],
    itemStyle: {
      minHeight: '28px',
      lineHeight: '28px',
    },
    validate: {
      options: [
        '地方费的快感hiU盾火锅送达回复',
        'B1',
        'B2',
        'B3',
        'B4',
        'B5',  
      ],
    },
  },

  // {
  //   name: '多重选择',
  //   key: 'multis',
  //   uiType: 'multiSelect',
  //   valueType: 'string[]',
  //   value: [],
  //   validate: {
  //     options: [
  //       {
  //         name: 'ds',
  //         value: 'adac',
  //       }, {
  //         name: 'daac是大',
  //         value: 'dafag',
  //       }, {
  //         name: '你是谁讷讷你是谁讷讷你是谁讷讷你是谁讷讷你是谁讷讷',
  //         value: 'dacacaxd',
  //       }, {
  //         name: 'gadac大f',
  //         value: 'cadafgca',
  //       }, {
  //         name: 'cafg是大大',
  //         value: 'cafgac',
  //       }, {
  //         name: 'c三大若agqd2',
  //         value: 'ctyqf',
  //       }, {
  //         name: 'r大尺',
  //         value: 'cacgv',
  //       }, {
  //         name: 'cafg',
  //         value: 'ggsc',
  //       },{
  //         name: 'cafgdsf',
  //         value: 'ggscdf',
  //       },{
  //         name: 'cafsdg',
  //         value: 'ggsdsc',
  //       },{
  //         name: 'casdsdsdfg',
  //         value: 'ggssdsdc',
  //       },{
  //         name: 'cafkjllg',
  //         value: 'ggsdskff',
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
  {
    name: '颜色映射',
    key: 'xxxxx',
    uiType: 'binding',
    valueType: 'binding',
    value: {
      type: 'gradient',
      key: {
        value: 'price',
        options: ['price', 'lat', 'lng'],
      },
      dataid: 'house_lianjia_community',
      isLock: false,
      range: {
        min: '#f00',
        max: '#00f',
      },
    },
  },
  {
    name: '数据绑定',
    key: 'bds',
    uiType: 'binding',
    valueType: 'binding',
    value: {
        key: 'avr_price',
        dataid: 'house_lianjia_community',
        domain: {
          min: '$min',
          max: '$max'
        },
        range: {
          min: 5,
          max: 20
        }
      }
  },
  // // // // 整数 | float型的数据
  // {
  //   name: '整数输入222222222',
  //   key: 'length1',
  //   uiType: 'input',
  //   valueType: 'integer', // integer
  //   value: 50,
  //   disable: true,
  //   noShowBorder: true,
  //   desc: 'xxxxx',
  //   // addonAfter: <div>123</div>,
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100,
  //     },
  //     step: .01, //可选
  //   },
  // },
  // {
  //   name: '字符输入',
  //   key: 'length222',
  //   uiType: 'input',
  //   valueType: 'string', // integer
  //   value: 'dada',
  //   type: 'textarea',
  //   placeholder: '请输入项目描述.....',
  //   style: {
  //     height: 88,
  //   },
  //   validate: {
  //     range: {
  //       min: 1,
  //       max: 100
  //     },
  //     step: .01, //可选
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
  // {
  //   value: {
  //     id: 'data1',
  //     name: '数据1',
  //     type: '数据',
  //     parent: '1',
  //   },
  //   divideLine: true,
  //   name: '选择字段',
  //   key: 'xx',
  //   groupBy: ['parent', 'type'],
  //   uiType: 'select',
  //   valueType: 'object',
  //   isInput: false,
  //   styles: {
  //     text: {
  //       // color: '#ff0',
  //     },
  //   },
  //   validate: {
  //     options: [{
  //       id: 'data1',
  //       name: '数据1',
  //       type: '数据',
  //       parent: '1',
  //     }, {
  //       id: 'data2',
  //       name: '数据2',
  //       type: '数据1',
  //       parent: '2',
  //     }, {
  //       id: 'data23',
  //       name: '实体1',
  //       type: '实体2',
  //       parent: '2',
  //     }, {
  //       id: 'data13',
  //       name: '实体2',
  //       type: '实体',
  //       parent: '2',
  //     }, {
  //       id: 'v1',
  //       name: '实体1',
  //       type: '意图3',
  //       parent: '1',
  //     }, {
  //       id: 'v2',
  //       name: '意图2',
  //       type: '意图',
  //       parent: '1',
  //     }, {
  //       id: 'v23',
  //       name: '意图22',
  //       type: '意图4',
  //       parent: '2',
  //     }],
  //   },
  //   style: {
  //     fontSize: '12px',
  //   },
  // },
  {
    name: '操作符',
    key: 'operator',
    uiType: 'select',
    valueType: 'string',
    desc: 'xxxxx',
    desc: '选择字段啥的积分等会看看防腐剂的康师傅',
    disable: true,
    value: '>',
    validate: {
      options: [
        {name: 'data', value: 12},
        {name: 'value', value: 13}
      ],
    },
    tipClassName: '',
    style: {
      fontSize: '12px',
    },
  },
  // {
  //   name: '选择值',
  //   key: 'value',
  //   uiType: 'select',
  //   valueType: 'string',
  //   value: 'aa',
  //   validate: {
  //     options: ['aa', 'aaaa', 'aaaaaa'],
  //   },
  // },
  {
    name: '字符输入海的就哈斯高覆盖的方法富商大贾很费劲的',
    key: 'length1',
    uiType: 'input',
    desc: 'xxxxx',
    disable: true,
    valueType: 'string', // integer
    value: '',
    // addonAfter: <div>123</div>,
    validate: {
      range: {
        min: 1,
        max: 100,
      },
      step: 0.01, // 可选
    },
  },
];
