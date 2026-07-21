var app=getApp();Page({data:{isAdmin:false,pwd:'',err:false},
onLoad(){this.setData({isAdmin:app.globalData.isAdmin})},
onPwd(e){this.setData({pwd:e.detail.value})},
login(){if(this.data.pwd==='zoc2026'){app.globalData.isAdmin=true;wx.setStorageSync('adminAuth',{time:Date.now()});this.setData({isAdmin:true,err:false})}else{this.setData({err:true})}},
logout(){app.globalData.isAdmin=false;wx.removeStorageSync('adminAuth');this.setData({isAdmin:false,pwd:'',err:false})}})