// component/echart_map/eLine.js

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
          axisLabel:{
            formatter:"{value}%"
          },
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
          axisTick: { show: false },
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
      series: [
        {
          name: '',
          type: 'line',
          color: '#22A2F4',
          symbol:'none',
          label: {
            normal: {
              show: false
            }
          },
          data: [],
        },
        {
          name: '',
          type: 'line',
          color: '#00FFEA',
          symbol:'none',
          label: {
            normal: {
              show: false
            }
          },
          data: [],
        },
        {
          name: '',
          type: 'line',
          color: '#FFA200',
          symbol:'none',
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

    refresh(dic){
      let option = this.data.option
      option.xAxis[0].data = dic.xs
      option.series[0].data = dic.ys1
      option.series[1].data = dic.ys2
      option.series[2].data = dic.ys3
      if (this.data.chart) {
        this.data.chart.setOption(option)
      }
    },
    init_echart(){
      let bar = this.selectComponent('#line')
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
