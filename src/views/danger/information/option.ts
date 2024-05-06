export function dangerLevelOption(data: any) {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center'
    },
    series: [
      {
        name: '隐患等级',
        type: 'pie',
        radius: ['40%', '70%'],
        data
      }
    ]
  };
}

export function dangerMendOption(data: any) {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center'
    },
    series: [
      {
        name: '隐患整改情况',
        type: 'pie',
        radius: '50%',
        data
      }
    ]
  };
}

export function dangerSourceOption(data: any) {
  return {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      left: 'center'
    },
    series: [
      {
        name: '隐患整改情况',
        type: 'pie',
        radius: '50%',
        data
      }
    ]
  };
}
