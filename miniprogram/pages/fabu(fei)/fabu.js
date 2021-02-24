// pages/fabu/fabu.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'2020-11-21',
    time:'12:00',
    departIndex:0,
    destIndex:1,
    array:['嘉定校区','昌吉东路地铁站','上海汽车城地铁站','虹桥机场/火车站']
  },

  bindDateChange:function(e){
    this.setData({
      date:e.detail.value
    })
  },

  bindTimeChange:function(e){
    this.setData({
      time:e.detail.value
    })
  },
  bindDepartChange:function(e){
    console.log(e);
    this.setData({
      departIndex:e.detail.value
    })
  },
  bindDestChange:function(e){
    console.log(e);
    this.setData({
      destIndex:e.detail.value
    })
  },
  onAddTrip:function(e){
    const db = wx.cloud.database()
    db.collection('trip').add({
      data: {
        date: this.data.date,
        time: this.data.time,
        depart:this.data.array[this.data.departIndex],
        dest:this.data.array[this.data.destIndex]
        
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        this.setData({
          counterId: res._id,
          count: 1
        })
        wx.showToast({
          title: '新增记录成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '新增记录失败'
        })
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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