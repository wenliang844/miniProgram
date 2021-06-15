// pages/addr/addr.js
Page({
  data: {
    addrlist: [
      {
        id: 1,
        name: "陈文亮",
        phone: "13426533661",
        postNo: "41000",
        province: "江西",
        city: "南昌",
        area: "南昌县",
        street: "紫阳大道115号",
        desc: "江西科技学院18栋",
        isDefault: true,
        isLast: false
      },
      {
        id: 2,
        name: "陈小白",
        phone: "13426533661",
        postNo: "41000",
        province: "江西",
        city: "抚州",
        area: "崇仁县",
        street: "中山路",
        desc: "永盛花园1号楼",
        isDefault: false,
        isLast: false
      }
    ]
  },
  onLoad: function (options) {
  },
  updateAddr: function () {
    var that = this;
    wx.showToast({
      title: "Loading...",
      icon: "loading",
      duration: 300000
    })
    wx.request({
      //url: 'http://localhost:8080/Wxmini/addr_getlist.do',
      method: 'GET',
      success: function (res) {
        console.log('getlist:',res.data)
        for (var i = 0; i < res.data.length; i++) {
          var addr = res.data[i];
          if (i == res.data.length - 1) {
            addr.isLast = true;
          } else {
            addr.isLast = false;
          }
        }
        that.setData({
          addrlist: res.data
        })
      },
      fail: function () {
        // fail
        setTimeout(function () {
          // wx.showToast({
          //   title: "获取地址失败",
          //   duration: 2000
          // })
          // setTimeout(function () {
          //   wx.navigateBack({
          //     delta: 1, // 回退前 delta(默认为1) 页面
          //   })
          // }, 2000)
        }, 100)
      },
      complete: function () {
        // complete
        wx.hideToast();
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    this.updateAddr();
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  onPullDownRefresh: function () {
    var that = this;
    setTimeout(function () {
      that.updateAddr();
      wx.stopPullDownRefresh();
      console.log("stoppull")
    }, 2000)
  },
  beDefault: function (e) {
    //console.log(e.target)
    var id = e.target.dataset.id;
    var flag = e.detail.value
    if (flag) {
      console.log(id)
      wx.showToast({
        title: "Loading",
        icon: "loading",
        duration: 900000
      })
      var that = this;
      wx.request({
        //url: 'http://192.168.43.63:8080/Wxmini/addr_bedefault.do?id=' + id,
        // data: {},
        method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
        header: {
          'content-type': 'application/json'
        }, // 设置请求的 header
        success: function (res) {

          var addrs = that.data.addrlist;
          console.log(addrs)
          for (var i = 0; i < addrs.length; i++) {
            //console.log(addrs[i])
            var addr = addrs[i]
            if (addr.id == id) {
              addr.isDefault = true;
              //console.log(addr)
            } else {
              addr.isDefault = false;
            }
            if (i == addrs.length - 1) {
              addr.isLast = true;
            } else {
              addr.isLast = false;
            }
          }
          console.log("over", addrs)
          that.setData({
            addrlist: addrs
          })
          setTimeout(function () {
            wx.showToast({
              title: "更改成功",
              duration: 1500
            })
          }, 100)
        },
        fail: function () {
          wx.showModal({
            content: "更改默认地址失败",
            showCancel: false
          })
        },
        complete: function () {
          wx.hideToast();
        }
      })
    }
  },
  navigateToAdd: function (e) {
    wx.navigateTo({
     // url: './edit/edit'
    })
  },
  navigateToEdit: function (e) {
    var id = e.target.dataset.id;
    console.log(id)
    wx.navigateTo({
      //url: './edit/edit?id=' + id
    })
  },
  delAddr: function (e) {
    var id = e.target.dataset.id;
    console.log(id)
    var that = this;
    wx.showModal({
      title: "警告",
      content: "是否删除该地址?",
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title: "Loading",
            icon: "loading",
            duration: 900000
          })
          wx.request({
            //url: 'http://192.168.43.63:8080/Wxmini/addr_del.do?id=' + id,
            data: {},
            method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            // header: {}, // 设置请求的 header
            success: function (res) {
              setTimeout(function () {
                wx.showToast({
                  title: "删除成功",
                  duration: 1500
                })
              }, 100)
              var addrs = that.data.addrlist;
              for (var i = 0; i < addrs.length; i++) {
                var addr = addrs[i]
                if (addr.id == id) {
                  addrs.splice(i, 1);
                }
              }
              //根据索引顺序更改对应的 isLast值,确保页面正确显示
              for (var i = 0; i < addrs.length; i++) {
                if (i == addrs.length - 1) {
                  addrs[i].isLast = true;
                } else {
                  addrs[i].isLast = false;
                }
              }

              console.log("over", addrs)
              that.setData({
                addrlist: addrs
              })

            },
            fail: function () {
              wx.showModal({
                content: "操作失败,未删除此地址!",
                showCancel: false
              })

            },
            complete: function () {
              wx.hideToast();
            }
          })
        }
      }
    })
  }
})