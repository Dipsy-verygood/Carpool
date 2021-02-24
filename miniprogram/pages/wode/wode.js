// pages/wode/wode.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openid: '',
    nickname:'---',
    avaUrl:'../../images/default.png',
    mytripList:''

  },

  onGotUserInfo: function (e) {
    console.log(e);
    console.log(e.detail);
    
    this.setData({
      nickname:e.detail.userInfo.nickName,
      avaUrl:e.detail.userInfo.avatarUrl
    })
    console.log(this.data.avaUrl);
   },

   getOpenid() {
    let that = this;
    wx.cloud.callFunction({
     name: 'getOpenid',
     complete: res => {
      this.setData({openid:res.result.openId})
      console.log('云函数获取到的openid: ', this.data.openid)
     }
    })
   },

   getMytrip() {
    console.log('云函数获取到的openid: ', this.data.openid)
    const db=wx.cloud.database()
    db.collection('trip').where({
      _openid:this.data.openid
    })
    .get({
      success: res => {
        console.log(res.data)
        this.setData({mytripList:res.data})       
      }
    })
    
   },




  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    this.getOpenid();

    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {


  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})