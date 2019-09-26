var util = require('../../utils/util.js');
var globalData = require('../../utils/constant.js');

const app = getApp()

Page({
  data: {
    countDownNum: 1,
    rotateBlue: "rotateY(0deg)",
    rotateBlueAngle: 0,
    rotateRed: "rotateY(-180deg)",
    rotateRedAngle: -180,
  },
  onLoad: function() {
    var examContext = globalData.variable.examContext;
    if (examContext) {
      util.examContentInit();
    }
  },
  onShow: function() {

    
    this.countDown();
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

      this.rotate();

      const that = this;
      setTimeout(function() {
        console.log("count " + num);
        that.countDown();
      }, 1000)
    }
  },

  gotoExam: function() {

    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  },

  rotate: function() {

    var blue = this.data.rotateBlueAngle;
    var red = this.data.rotateRedAngle;

    blue += 180;
    red += 180;

    this.setData({
      rotateBlueAngle: blue,
      rotateRedAngle: red,
      rotateBlue: this.createRotate(blue),
      rotateRed: this.createRotate(red),
    })
  },

  createRotate: function(rotateAngle) {

    var tmp = "rotateY(" + rotateAngle + "deg)";

    console.log(tmp);
    return tmp;
  },

})