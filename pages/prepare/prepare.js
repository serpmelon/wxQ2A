
var util = require('../../utils/util.js');
var globalData = require('../../utils/constant.js');

const app = getApp()

Page({
  data: {
    countDownNum: 3,
    b11: "",
    b22: "",
  },
  onLoad: function() {
    var examContext = globalData.variable.examContext;
    if(examContext) {
      util.examContentInit();
    }
  },
  onShow: function() {

    this.countDown()
  },

  countDown: function() {

    let num = this.data.countDownNum;
    if (num <= 0) {
      this.gotoExam()
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

  gotoExam: function() {

    // wx.navigateTo({
    //   url: '/pages/exam/exam',
    // })
  },

  b1: function() {
    this.setData({
      b11:"rotateY(180deg)",
      b22:"rotateY(0deg)"
    })
    console.log("b1")
  },

  b2: function(){
    this.setData({
      b11: "rotateY(0deg)",
      b22: "rotateY(-180deg)"
    })
    console.log("b2")
  }

})