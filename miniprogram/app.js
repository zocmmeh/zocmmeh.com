App({
  globalData: {
    hospitalName: '中山大学中山眼科中心茂名医院',
    hospitalNameEn: 'Maoming Eye Hospital',
    adminPassword: 'zoc2026',
    primaryColor: '#1b4d89',
    accentColor: '#fc802f'
  },
  onLaunch() {
    const auth = wx.getStorageSync('adminAuth');
    if (auth && auth.time && Date.now() - auth.time < 86400000) {
      this.globalData.isAdmin = true;
    }
  }
});
