// component/echart_map/kLine.js

import * as echarts from "../ec-canvas/echarts.min.js";

Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    chart:null,
    ec:{
      lazyLoad:true
    },
    option:{
      grid:{
        left: 20,
        right: 20,
        bottom: 20,
        top: 20,
        containLabel: true
      },
      yAxis: [
        {
          type: 'value',
          min:0,
          max:100,
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
        }
      ],
      xAxis: [
        {
          type: 'category',
          axisTick: { show: true },
          data: [],
          axisLine: {
            lineStyle: {
              color: '#999'
            }
          },
          axisLabel: {
            color: '#666'
          }
        }
      ],
      dataZoom: {
        show: false,
        type:"inside",
        start: 98,
        end: 100,
      },
      series: [
        {
          name: '',
          type: 'candlestick',
          // itemStyle: {
          //   color:"#ec0000",
          //   color0:"#00da3c",
          //   borderColor:"#8A0000",
          //   borderColor0:"#008F28"
          // },
          data: [],
        },
        {
          name: 'ma5',
          type: 'line',
          color: '#FF9900',
          symbol:'none',
          lineStyle:{
            width:1
          },
          label: {
            normal: {
              show: false
            }
          },
          data: [],
        },
        {
          name: 'ma10',
          type: 'line',
          color: '#00CCFF',
          symbol:'none',
          lineStyle:{
            width:1
          },
          label: {
            normal: {
              show: false
            }
          },
          data: [],
        },
        {
          name: 'ma20',
          type: 'line',
          color: '#FF39EA',
          symbol:'none',
          lineStyle:{
            width:1
          },
          label: {
            normal: {
              show: false
            }
          },
          data: [],
        },
        {
          name: 'ma20',
          type: 'line',
          color: '#0A8AFA',
          symbol:'none',
          lineStyle:{
            width:1
          },
          label: {
            normal: {
              show: false
            }
          },
          data: [],
        },
      ]
    },
  },

  /**
   * 组件的方法列表
   */
  methods: {

    calculateMA(arr,dayCount) {
      var result = [];
      for (var i = 0, len = arr.length; i < len; i++) {
        if (i < dayCount) {
          result.push('-');
          continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
          sum += +arr[i - j][1];
        }
        result.push(sum / dayCount);
      }
      return result;
    },
    refresh(dic){
      let option = this.data.option
      option.xAxis[0].data = dic.xs
      option.series[0].data = dic.ys1
      option.yAxis[0].min = dic.miny
      option.yAxis[0].max = dic.maxy

      let arr = dic.ys1
      let ma5 = this.calculateMA(arr,5)
      let ma10 = this.calculateMA(arr,10)
      let ma20 = this.calculateMA(arr,20)
      let ma60 = this.calculateMA(arr,60)
      option.series[1].data = ma5
      option.series[2].data = ma10
      option.series[3].data = ma20
      option.series[4].data = ma60

      if (this.data.chart) {
        this.data.chart.setOption(option)
      }
    },
    init_echart(){
      let bar = this.selectComponent('#kline')
      let that = this
      bar.init((canvas, width, height,dpr) => {
        let chart = echarts.init(canvas,null,{
          width:width,
          height:height,
          devicePixelRatio:dpr  //解决小程序视图模糊的问题，必写
        })
        chart.setOption(that.data.option)
        that.data.chart = chart
        return chart
      })
    }
  },
  pageLifetimes:{
    show(){
      this.init_echart()
    }
  }
})
