export default {
  color: [
    '#000',
    '#A13FC3',
    '#98C2CF',
    '#6FB3F1',
    '#4CBFCF',
    '#61D6B1',
    '#A0E896',
    '#E7F59B',
    '#D3C24B',
    '#536572',
  ],
  backgroundColor: '#fff',
  tooltip: {
    type: 'xxx',
    trigger: 'axis',
    backgroundColor: '#fff',
    textStyle: {
      fontSize: 10,
      color: '#4A4A4A',
    },
    axisPointer: {
      lineStyle: {
        color: '#C9C9C9',
      },
    },
    extraCssText: 'box-shadow: 0 2px 4px rgba(0,0,0,.5);',
  },
  grid: {
    top: '20px',
    left: '3%',
    right: '4%',
    bottom: '20px',
    containLabel: true,
  },
  xAxis: {
    axisLine: {
      lineStyle: {
        color: '#E2E2E2',
      },
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      textStyle: {
        fontSize: 10,
        color: '#666666',
      },
    },
    type: 'category',
    boundaryGap: false,
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisTick: {
      lineStyle: {
        color: '#B0B0B0',
        width: 3,
      },
    },
    axisLabel: {
      textStyle: {
        fontSize: 10,
        color: '#666666',
      },
    },
    splitLine: {
      lineStyle: {
        color: '#B0B0B0',
        type: 'dotted',
      },
    },
    type: 'value',
  },
  vseries: {
    type: 'line',
    symbol: 'circle',
    smooth: true,
  },
};
