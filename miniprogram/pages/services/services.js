Page({data:{depts:['白内障科','青光眼科','眼底病科','近视激光科','小儿眼病科','眼整形与泪道科'],docs:['张明远-眼底病科','李雅琴-白内障科','王建华-青光眼科','陈思雨-近视激光科','刘晓峰-小儿眼病科','赵文静-眼整形与泪道科'],times:['上午(08:00-12:00)','下午(14:00-17:30)'],di:0,docI:0,ti:0,date:'',name:'',phone:''},
onDept(e){this.setData({di:e.detail.value})},onDoc(e){this.setData({docI:e.detail.value})},
onDate(e){this.setData({date:e.detail.value})},onTime(e){this.setData({ti:e.detail.value})},
onName(e){this.setData({name:e.detail.value})},onPhone(e){this.setData({phone:e.detail.value})},
submit(){wx.showToast({title:'预约功能即将上线',icon:'none'})}
})