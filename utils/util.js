var globalData = require('./constant.js');

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  appLogin: appLogin,
  request: simpleRequest,
  examContentInit: examContentInit,
  gotoError: gotoError
}

function appLogin() {
  // 登录
  wx.login({
    success: res => {
      console.log(res);
      console.log(res.code);
      // 发送 res.code 到后台换取 openId, sessionKey, unionId
      wx.request({
        url: globalData.constant.context + '/user/login',
        method: 'post',
        data: {
          code: res.code
        },
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success(res) {

          console.log(res.data);
          wx.setStorageSync("openId", res.data);
        },
        fail(res) {
          console.log("fail to login");
        }
      })
    }
  })
}

function simpleRequest(url, method, params) {
  params.openId = 'q1111';
  wx.request({
    url: globalData.constant.context + url,
    method: method,
    data: {
      params
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      return res.data;
    },
    fail(res) {
      console.log("fail to login");
    }
  })
}

/**
 * 答题初始化
 */
function examContentInit() {
  wx.request({
    url: globalData.constant.context + '/exam/content',
    method: 'get',
    data: {
      appid: '12244444'
    },
    header: {
      'content-type': 'application/json'
    },
    success(res) {
      console.log("res " + res);
      globalData.variable.examContext = res.data;
      console.log("app array" + globalData.variable.examContext);
    }
  })
}
/**
 * 跳转回答错误页面
 */
function gotoError() {
  var url = '/pages/result/wrong/wrong';
  gotoUrl(url);
}
/**
 * 跳转答题成功页面
 */
function gotoSuccess() {
  var url = '/pages/result/success/success';
  gotoUrl(url);
}
/**
 * 页面跳转
 */
function gotoUrl(url) {
  wx.navigateTo({
    url: url
  })
}