Page({data:{ct:'triage'},
switchTab(e){this.setData({ct:e.currentTarget.dataset.tab})},
showToast(){wx.showToast({title:'智能导诊功能开发中',icon:'none'})},
goDept(){wx.navigateTo({url:'/pages/departments/departments'})},
goGuide(){wx.switchTab({url:'/pages/guide/guide'})}})