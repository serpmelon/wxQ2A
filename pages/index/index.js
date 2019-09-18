//index.js
var util = require('../../utils/util.js');
var globalData = require('../../utils/constant.js');
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function() {
    if (globalData.variable.userInfo) {
      this.setData({
        userInfo: globalData.variable.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          globalData.variable.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },

  onShow: function() {

    util.appLogin();
  },
  getUserInfo: function(e) {
    console.log(e)
    globalData.variable.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  start: function() {

    let userInfo = globalData.variable.userInfo
    wx.request({
      url: globalData.constant.context + '/user/information',
      method: 'post',
      data: {
        appid: '12244444',
        nickname: userInfo.nickName
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data)
        if (res.data.code == 1) { // 成功则跳转

          wx.navigateTo({
            url: '/pages/prepare/prepare?name=' + userInfo.nickName + '&pic=' +
              userInfo.avatarUrl
          })
        } else if (res.data.code == -2) { // -2表示用户没有登陆
          // todo 实现提示用户去登陆
        }
      }
    })

  }
})