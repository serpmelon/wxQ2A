var util = require('../../utils/util.js');
var globalData = require('../../utils/constant.js');

const app = getApp()

Page({
  data: {
    QA: [],
    index: 0,
    showQA: {},
    countDownNum: 3
  },

  onLoad: function() {
    console.log("array  " + globalData.variable.examContext);
    this.setData({
      QA: globalData.variable.examContext,
      showQA: globalData.variable.examContext[this.data.index]
    })
    console.log("launch");
  },

  onShow: function() {

    console.log("onShow");
    this.countDown();
  },

  countDown: function() {

    let num = this.data.countDownNum;

    var index = this.data.index;
    var length = this.data.QA.length;
    console.log(length);
    if (index == length) {
      console.log("game over");
      return;
    }

    if (num <= 0) {
      index++;
      this.setData({
        index: index,
        countDownNum: 3,
        showQA: this.data.QA[index]
      });
      const that = this;
      setTimeout(function() {
        console.log("count " + num);
        that.countDown();
      }, 1000)

    } else {
      num--;
      this.setData({
        countDownNum: num
      })

      const that = this;
      setTimeout(function() {
        console.log("count " + num);
        that.countDown();
      }, 1000)
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
    debugger
    // var result = util.request(url, method, params);
    // console.log(result);
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
      },
      fail(res) {
        console.log("fail to score");
      }
    })
  }

});