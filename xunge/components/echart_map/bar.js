// component/echart_map/bar.js

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
      dataZoom: {
        show: false,
        type:"inside",
        start: 50,
        end: 100,
      },
      series: [
        {
          name: '',
          type: 'bar',
          color: '#22A2F4',
          label: {
            normal: {
              show: true,
              position: 'top',
              color: '#22a2f4'
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
      let allNum = dic.xs.length
      let rate = 5.0 / allNum 
      option.xAxis[0].data = dic.xs
      option.series[0].data = dic.ys
      option.dataZoom.start = 100 * (1 - rate)
      option.dataZoom.end = 100
      if (this.data.chart) {
        this.data.chart.setOption(option)
      }
    },
    init_echart(){
      let bar = this.selectComponent('#bar')
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
