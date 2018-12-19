//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '',
    temp1:"",
    temp2:""
  },

  onLoad: function () {
    var that = this
    //从oneNET请求我们的Wi-Fi气象站的数据
    getData(this)
    setInterval(function () {
      getData(that)
    }, 3000)
  },

})

function getData(that) {
  const requestTask = wx.request({
    url: 'https://api.heclouds.com/devices/503137998/datapoints?datastream_id=Temperature,Humidity&limit=15',
    header: {
      'content-type': 'application/json',
      'api-key': 'lnsRQbr=9IN4QvyMPnL18O4o=ZI= '
    },
    success: function (res) {
      console.log(res)
      var app = getApp()

      that.setData({
        temp1: res.data.data.datastreams[0].datapoints[0].value,
        temp2: res.data.data.datastreams[1].datapoints[0].value
      })

      console.log(res)      //打印返回的数据
    },

    fail: function (res) {
      console.log("fail!!!")
    },

    complete: function (res) {
      console.log("end")
    }
  })
}