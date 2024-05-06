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

export function dangerTypeOption(data: any) {
  return {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '2%',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.map((e: any) => e.x)
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '数据1',
        type: 'bar',
        stack: 'd',
        emphasis: {
          focus: 'series'
        },
        data: data.map((e: any) => e.y1)
      },
      {
        name: '数据2',
        type: 'bar',
        stack: 'd',
        emphasis: {
          focus: 'series'
        },
        data: data.map((e: any) => e.y2)
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

export function dangerVaryOption(data: any) {
  return {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      top: '2%',
      left: '0',
      right: '0',
      bottom: '0',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.map((e: any) => e.x)
      }
    ],
    yAxis: [
      {
        type: 'value'
      }
    ],
    series: [
      {
        name: '数据1',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: data.map((e: any) => e.y1)
      },
      {
        name: '数据2',
        type: 'bar',
        emphasis: {
          focus: 'series'
        },
        data: data.map((e: any) => e.y2)
      }
    ]
  };
}
