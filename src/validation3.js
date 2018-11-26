
export default [
  {
    name: 'sql编辑',
    key: 'sqlValue',
    desc: 'xxxxxxx',
    value: 'select * from db',
    uiType: 'inputCode',
    valueType: 'mysql',
    color: '#c7245f',
  },
  {
    name: 'js编辑',
    key: 'jsValue',
    desc: 'xxxxxxxxxxx',
    value:  'var a=1',
    uiType: 'inputCode',
    valueType: 'javascript',
    color: '#f7e032',
  },
  {
    name: 'json编辑111111',
    key: 'jsonValue',
    desc: 'xxxxxxxxxxxxxxx',
    value: {a: 1, c: 2, b: { c: 2, d: {cc: 1, dd: 2}, d1: {cc: 1, dd: 2}}},
    uiType: 'inputCode',
    valueType: 'json',
    color: '#099',
  },
    {
    name: 'java编辑',
    key: 'javaValue',
    desc: 'xxxxxxx',
    value: 'System.out.println("Hello World!")',
    uiType: 'inputCode',
    valueType: 'java',
    color: '#e76f00',
  },
  {
    name: 'css编辑',
    key: 'cssValue',
    desc: 'xxxxxxx',
    value: '#id: { color: #fff; }',
    uiType: 'inputCode',
    valueType: 'css',
    color: '#487c35',
  },
  {
    name: 'python编辑',
    key: 'pythonValue',
    desc: 'xxxxxxx',
    value: 'if age<21: print("你不能买酒。")',
    uiType: 'inputCode',
    valueType: 'python',
    color: '#3771a1',
  },
 {
    name: '整数输入',
    key: 'length1',
    uiType: 'input',
    valueType: 'integer', // integer
    value: 50,
    validate: null
  },
  {
    name: '字符输入',
    key: 'length222',
    uiType: 'input',
    valueType: 'string', // integer
    value: "sd",
    // validate: null
  },
  {
    name: '字符数组输入',
    key: 'length123',
    uiType: 'input',
    valueType: 'string[]',
    value: ['s','d'],
    validate: null
  },
{
    name: '数组输入',
    key: 'length666',
    uiType: 'input',
    valueType: 'int[]',
    value:  [1, 2, 3, 4],
    validate: null,
  },
  {
    name: '小数输入',
    key: 'length2',
    uiType: 'input',
    valueType: 'float', // integer
    value: 2.44,
    validate: null,
  },
];
