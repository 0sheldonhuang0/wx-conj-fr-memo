//app.js
App({
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
        env: "conj-helper-96fe10",
      })
    }

    this.getSkin();

  },
  globalData: {
    userInfo: null,
    ow: null,
    consult_data: null,
    consult_data_js: null,

    newer: null,
    version: null,
    isChecked1: false,
    isChecked1_selected: false,
    isChecked1_50: true,
    isChecked1_100: false,
    isChecked1_230: false,

    isChecked2: null,
    isChecked3: null,
    isChecked4: null,
    true_or_false: true,
    advanced_shitai: [],
    extra_shitai: [],
    inusuel_shitai: [],
    right_answer: [],
    tag_classic: true,
    tag_selected: true,
    tag_50: true,
    tag_100: true,
    tag_230: true,

    shitai_no: null,
    search_word: null,
    carte_number: null,
    carte_arrey: null,
    time_count: null,

    ps1: null,
    ps2: null,
    likeandsave: [],
    idx_carte_number: 0,

    openid: null,
    msg: null,

    vocal: null,
    choosed_answer_number: null,

    article_number: null,
  },

  getSkin: function () {
    var that = this
    var settings_new = wx.getStorageSync('settings_new');
    that.globalData.dark_mode = settings_new[0].dark_mode;
    console.log(that.globalData.dark_mode);
  },

  //导航栏标题背景
  setNavBarBg: function () {
    var that = this
    if (that.globalData.dark_mode == false) {
      that.setSkinNormalTitle()
    } else {
      that.setSkinBlackTitle()
    }
  },
  setSkinBlackTitle: function () {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#2e3136',
    })
  },
  setSkinNormalTitle: function () {
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
})