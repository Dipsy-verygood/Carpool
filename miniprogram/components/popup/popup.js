Component({
  properties: {
    date:{type:String,value:""},
    time:{type:String,value:""},
    depart:{type:String,value:""},
    dest:{type:String,value:""},
    peopleNum:{type:Number,value:0},
    contactInfo:{type:String,value:""}
  },
 
  data: {
   showModal: false,
   showAlert1:false,
   showAlert2:false,
   showci:false

  },

  methods:{
  /**submit的功能：初步检查数据问题，弹出匹配行程弹窗，调取服务器数据 */
  submit:function() {
    if(this.data.dest==this.data.depart) this.setData({showAlert1: true});
    else if(this.data.contactInfo=='') this.setData({showAlert2: true});
    else{
      this.setData({showModal: true})
      this.getTripList_day()
    }

   
  },
  

  preventTouchMove: function() {},
  
  /**go的功能：添加新纪录至服务器，关闭弹窗 */
  go: function() { 
    const db = wx.cloud.database()
    db.collection('trip').add({
      data: {
        date: this.data.date,
        time: this.data.time,
        depart:this.data.depart,
        dest:this.data.dest,
        peopleNum:this.data.peopleNum,
        contactInfo:this.data.contactInfo,
        uploadTime:new Date(),

        join:[]
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
   this.setData({
   showModal: false
   })
  },

  /**关闭弹窗，返回首页  */
  retn: function() { 
    
   this.setData({
   showModal: false,
   showAlert1: false,
   showAlert2: false,
   showci:false
   })
  },

  getTripList_day:function(){
    const db=wx.cloud.database()
    db.collection('trip').where({
      date:this.data.date,
      depart:this.data.depart,
      dest:this.data.dest
    })
    .get({
      success: res => {
        console.log(res.data)
        this.setData({tripList:res.data})       
      }
    })
  },

  join:function(e){
    this.setData({showci:true});
    console.log(e)

  },

  /**筛选时间范围，暂时没用上 */
  radioChange:function(){

  }
 }
 }
 )