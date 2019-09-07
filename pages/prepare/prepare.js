//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    countDownNum: 3,
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

    wx.navigateTo({
      url: '/pages/exam/exam',
    })
  }

})