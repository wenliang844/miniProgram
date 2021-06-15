// pages/user/user.js
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false
  },

  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },


  // //事件处理函数
  // bindViewTap: function () {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  // onLoad: function () {
  //   console.log('onLoad')
  //   var that = this
  //   //调用应用实例的方法获取全局数据
  //   app.getUserInfo(function (userInfo) {
  //     //更新数据
  //     console.log("获取用户信息成功!")
  //     that.setData({
  //       userInfo: userInfo
  //     })
  //   })
  // },
  // onShareAppMessage: function (e) {
  //   return {
  //     title: "极客交易都",
  //     desc: "我的小程序"
  //   }
  // },
  // onPullDownRefresh: function () {
  //   var that = this
  //   setTimeout(function () {
  //     wx.stopPullDownRefresh();
  //     console.log("stoppull")
  //     //调用应用实例的方法获取全局数据
  //     app.getUserInfo(function (userInfo) {
  //       //更新数据
  //       console.log("获取用户信息成功!")
  //       that.setData({
  //         userInfo: userInfo
  //       })
  //     })
  //   }, 2000)
  // },
  // showUserTip: function () {
  //   wx.showModal({
  //     content: "用户信息已经和微信绑定",
  //     showCancel: false,
  //     confirmText: "知道了"
  //   })
  // },

  navigateToAddr: function () {
    wx.navigateTo({
      url: '../addr/addr'
    })
  },
  navigateToOrder: function () {
    
    wx.navigateTo({
      url: './order/order?typeId=0'
    })
  },
  navigateToOrder_pay: function () {
   
    wx.navigateTo({
      url: './order/order?typeId=1'
    })
  },
  navigateToOrder_get: function () {
    
    wx.navigateTo({
      url: './order/order?typeId=2'
    })
  }
})