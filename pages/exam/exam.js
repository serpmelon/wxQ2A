var util = require('../../utils/util.js');
var globalData = require('../../utils/constant.js');

const app = getApp()

Page({
  data: {
    // 问题集合
    QA: [],
    qaLength: 0,
    // 问题序号
    index: 0,
    // 展示的问题答案
    showQA: {},
    // 每道题倒计时时间
    countDownNum: globalData.constant.examCountdown,
    // 答题状态 1表示未答题 2正确 -1 错误
    state: 1,
    progress: 0
  },

  onLoad: function() {
    console.log("array  " + globalData.variable.examContext);
    this.setData({
      QA: globalData.variable.examContext,
      showQA: globalData.variable.examContext[this.data.index],
      qaLength: globalData.variable.examContext.length
    })
    console.log("launch");
  },

  onShow: function() {

    console.log("onShow");
    this.countDown();
  },

  onUnload: function() {
debugger
    console.log("unload")
  },

  /**
   * 倒计时
   */
  countDown: function() {

    var num = this.data.countDownNum;

    var index = this.data.index;
    var length = this.data.qaLength;
    console.log(length);
    if (index == length) {
      console.log("game over");
      return;
    }

    if (num <= 0) { // 倒计时结束
      if (this.data.state == 1) { // 未答题
        this.reply(this.data.showQA.id, -1);
        util.gotoError();
      }
      // 没结束则下一道题
      index++;
      this.setData({
        index: index,
        countDownNum: 3,
        showQA: this.data.QA[index]
      });
      const that = this; // 这里必须将this赋值出来
      setTimeout(function() { // 递归继续
        console.log("count " + num);
        that.countDown();
      }, 1000)

    } else { // 倒计时
      num--;
      var percent = (1 - num / globalData.constant.examCountdown) * 100;
      console.log('num ' + num + 'percent ' + percent);
      this.setData({
        countDownNum: num,
        progress: percent
      })

      const that = this;
      if (this.data.state == 1) {
        setTimeout(function() {
          console.log("count " + num);
          that.countDown();
        }, 1000)
      }
    }
  },

  radioChange: function(e) {

    console.log('radio发生change事件，携带value值为：', e.detail.value);
    this.reply(this.data.showQA.id, e.detail.value);

    var currentItem = this.data.showQA;
    for (var i = 0, len = currentItem.answerList.length; i < len; ++i) {
      currentItem.answerList[i].checked = currentItem.answerList[i].id == e.detail.value;
    }

    this.setData({
      showQA: currentItem
    });
  },

  reply: function(questionId, answerId) {

    console.log(questionId + "   " + answerId);
    var url = '/exam/score';
    var method = 'post';
    var openId = wx.getStorageSync('openId');

    var that = this;
    wx.request({
      url: globalData.constant.context + url,
      method: method,
      data: {
        'questionId': questionId,
        'answerId': answerId,
        'openId': openId.data
      },
      header: {
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res.data);
        if (res.data.data) { // 回答正确，设置状态为2
          that.setData({
            state: 2
          });
        } else if (answerId == 1) { // 答题超时，设置状态为-1
          that.setData({
            state: -1
          });
        } else {
          that.setData({ // 回答错误， 设置状态为-1
            state: -1
          });
          util.gotoError();
        }
      },
      fail(res) {
        console.log("fail to score");
      }
    })
  },

});