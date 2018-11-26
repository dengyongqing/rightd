## rightd介绍
rightd的目的是通过较简单的配置，生成通用的表单组件，如下拉选择、多选、时间选择器等。
对单个组件，可以被如下的数据配置表示(后文称validation),  validation包含了数值信息、约束信息和UI信息:

```javascript
  const validation = {
    uiType: 'select', //UI的类型，
    valueType: 'string', //值的类型
    desc: '选择器示例',//描述(可选，选择后会在rightd里出现一个❓提示)
    key: 'a',//键的值
    value: 1,//对应的值
    validate: {//取值的约束条件(定义域)
      options: [1, 2, 3]//选择性值
    },
    style: {}
  }
```

#### uiType可选择: 

| uiType    | 含义    |  对应数据类型  |
| --------   | -----:  | :----: |
| select  | 单选选择器 | string \| object \| float \| boolean \| integer |
| multiSelect | 多选选择器 | string \| object \| float \| boolean \| integer |
| color   | 颜色选择器 | color |
| toggle | 是非选择器 | boolean |
| slider | 数值滑动条 | float \| integer |
| input | 输入框 | float \| string \| integer |
| colorArray | 颜色数组 | color[] |
| range | 范围选择器 | {min: 1, max: 2} |
| rangeTime | 时间范围选择器 | {min: '2018-01-23', max: '2018-03-23'} |
| time | 时间选择器 | time |
| group | 群组 | group |


#### valueType 可选择: 

| valueType | 含义    |
| --------   | -----:  |
| float  | 浮点型 |
| integer | 整数 |
| boolean | 布尔 |
| color[] \| integer[] \| string[] | 数组 |
| time | 时间 |
| color | 颜色 |
| gradient | 颜色渐变 |
| range | 范围 |
| rangeTime | 时间范围 |

对于valiation, 我们可以转化为对象:
```javascript
const zUtils = require('rightd/lib/utils');
console.log(zUtils.toObject(validation));
/**
 * {a: 1}
 * /
```

也可以把valiation转化为UI组件(react):
```javascript
  const rightd = require('rightd');
  const Com = () => <rightd data={validation}/>;
```

## rightd里的查询格式
| sequelize | 含义    |
| --------   | -----:  |
| $eq  | 等于 |
| $ne | 不等于 |
| $gte | 大于等于 |
| $gt | 大于 |
| $lte | 小于等于 |
| $lt | 小于 |
| $not | 不是 |
| $between | 在...之间 |
| $notBetween | 不在...之间 |
| $in | 存在 |
| $notIn | 不存在 |
| $like | 包含 |
| $notLike | 不包含 |
| $and | 且 |
| $or | 或 |

eg、一个筛选器中，首先配置validation,
```javascript
  筛选器validation
  const validation1 = {
    name: '字段过滤',
    key: 'filterColumn',
    uiType: 'filterColumn',
    valueType: 'filter',
    desc: '字段过滤(category)',
    handleConfirm: function (a, b) { console.log(a, b); },
    expand: false,
    expandable: true,
    value: null,
    validate: {
      type: 'time', //时间类型
      options: ['a', 'b', 'c', 'd'],
    },
  },
 
  {
    name: '字段过滤',
    key: 'filterColumn1',
    uiType: 'filterColumn',
    valueType: 'filter',
    handleConfirm: function (a, b) { console.log(a, b); },
    desc: '字段过滤(category)',
    expand: false,
    addColor: true,
    expandable: true,
    value: null,
    validate: {
      type: 'measure', //数值类型
      options: ['a', 'b', 'c', 'd'],
    },
  },
  {
    name: '字段过滤',
    key: 'filterColumn2',
    uiType: 'filterColumn',
    valueType: 'filter',
    addColor: true,
    handleConfirm: function (a, b) { console.log(a, b); },
    desc: '字段过滤(category)',
    expand: false,
    expandable: true,
    value: null,
    validate: {
      type: 'category', //文本类型
      options: ['a', 'b', 'c', 'd'],
    },
  },
  measure类型举例 选择并且，选中大于，输入数值，选中小于，输入数值，onChange吐出格式：
  'filterColumn: {
    $and: [ // 不是$and 就是 $or
      {$gt: 2},
      {$lt: 8}
    ]
  }
  category类型举例 选择或者，选择存在，输入内容(可用逗号隔开)，选中不存在，输入内容，onchange吐出格式：
  'filterColumn: {
    $or: [ // 不是$and 就是 $or
      {$in: [1,2,3]},
      {$notIn: [1,2]}
    ]
  }
  time类型举例，可以选择最近的一段时间和之间时间，选择最近时间，可选过去，未来，当前，
  例如 选择过去一天，吐出：
  'filterColumn: {
    $and: [ // 不是$and 就是 $or
      {$gte: '2018-03-14 12:10:12'},
      {$lte: '2018-03-15 12:10:12'}
    ]
  }
  按以上吐出格式类推, $and/$or是固定的，数组里面的对象key值是根据用户选择的变化，如大于就是$gt,包含$like...
```




