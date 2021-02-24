Page({

  /**
   * 页面的初始数据
   */
  data: {
    date:'',
    time:'12:00',
    departIndex:0,
    destIndex:1,
    peopleNumIndex:0,
    array:['嘉定校区','昌吉东路地铁站','上海汽车城地铁站','虹桥机场/火车站'],
    num:[1,2,3,4,5,6,7],
    contactInfo:''
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
  bindPeopleNumChange:function(e){
    console.log(e);
    this.setData({
      peopleNumIndex:e.detail.value
    })
  },
  bindContactInfoChange:function(e){
    console.log(e);
    this.setData({
      contactInfo:e.detail.value
    })
  },






  onAddTrip:function(e){
    const db = wx.cloud.database()
    db.collection('trip').add({
      data: {
        date: this.data.date,
        time: this.data.time,
        depart:this.data.array[this.data.departIndex],
        dest:this.data.array[this.data.destIndex],
        peopleNum:this.data.num[this.data.peopleNumIndex]
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

    /**此处获得当天日期 */
    var nowDate = new Date();
    var date;
        var year = nowDate.getFullYear(), month = nowDate.getMonth() + 1, day = nowDate.getDate()
        this.setData({
            "nowDateString": `${year}-${month}-${day}`,
            date:`${year}-${month}-${day}`
        })


  }
})