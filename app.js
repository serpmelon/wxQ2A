//app.js
var util = require('./utils/util.js');
var globalData = require('./utils/constant.js');

App({
  onLaunch: function() {

    var openId = wx.getStorageSync("openId");

    if (!openId) {
      util.appLogin();
    }

    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              globalData.variable.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow: function() {
    console.log("app onshow");
    this.dataInit();
  },
  
  /**
   * 数据初始化，答题题目等
   */
  dataInit: function() {

    util.examContentInit();
  }
})