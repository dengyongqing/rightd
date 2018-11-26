export default [
  {
    name: '单选测试',
    uiType: 'group',
    key: 'select',
    children: [{
      name: '[string]',
      key: 'level',
      value: '中学3年级',
      uiType: 'select',
      valueType: 'string',
      validate: {
        options: ['小学1年级', '小学2年级', '小学3年级', '小学4年级'],
      },
    },
    {
      name: '[number]',
      key: '[number]',
      value: 1,
      uiType: 'select',
      valueType: 'integer',
      validate: {
        options: [1, 2, 3, 4, 5],
      },
    },
    {
      name: '[boolean]',
      key: '[boolean]',
      value: true,
      desc: 'xxxx',
      uiType: 'select',
      valueType: 'boolean',
      validate: {
        options: [true, false],
      },
    },
    {
      name: '[number, options[object]]',
      key: '[number, options[object]]',
      value: 1,
      uiType: 'select',
      valueType: 'integer',
      validate: {
        options: {
          一: 1,
          二: 2,
        },
      },
    },
    {
      name: '[object]',
      key: '[object]',
      value: {
        name: 'a',
        id: 1,
      },
      uiType: 'select',
      valueType: 'object',
      validate: {
        options: [{
          name: 'a',
          id: 1,
        }, {
          name: 'b',
          id: 2,
        }],
      },
    }, {
      key: 'time_type',
      value: [6, 10],
      name: '时间段',
      uiType: 'select',
      valueType: 'string',
      validate: {
        options: {
          '上午(6-10)': [6, 10],
          '中午(10-13)': [10, 13],
          '下午(13-17)': [13, 17],
          '晚上(17-20)': [17, 20],
          '夜晚(20-24)': [20, 24],
          '凌晨(0-5)': [0, 5],
        },
      },
    }],
  },
  {
    name: '多选测试',
    uiType: 'group',
    key: 'multiselect',
    children: [{
      uiType: 'multiSelect',
      valueType: 'number',
      key: '[numbers]',
      name: '[numbers]',
      value: [1],
      validate: {
        options: [1, 2, 3, 4],
      },
    }],
  },
];
