const app = getApp()
const db = wx.cloud.database() //初始化数据库
const settings = db.collection('user_setting')
const picker = new Array('5', '10', '20', '30', '45', '60')
// 在页面中定义插屏广告
let interstitialAd = null

Page({

  data: {
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    index: null,
    picker: ['5', '10', '20', '30', '45', '60'],
    hidden_or_not: null,

    msg: null,
    dark_mode: null,
  },

  onLoad() {
    var settings_new = wx.getStorageSync('settings_new')
    app.globalData.openid = wx.getStorageSync('openid')

    this.onQuery_msg();

    this.setData({
      dark_mode: settings_new[0].dark_mode,
    })

    // 在页面onLoad回调事件中创建插屏广告实例
    if (wx.createInterstitialAd) {
      interstitialAd = wx.createInterstitialAd({
        adUnitId: 'adunit-e563df22798519aa'
      })
      interstitialAd.onLoad(() => {})
      interstitialAd.onError((err) => {})
      interstitialAd.onClose(() => {})
    }
  },

  close_it: function() {
    // wx.setStorageSync("hidden_or_not", true)

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  successToast: function() {
    wx.showToast({
      title: '设置已保存',
      icon: 'sucess',
      duration: 1000,
      mask: true,
    })
  },

  onGetUserInfo: function(e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userInfo: e.detail.userInfo
      })
    }
  },

  onGetOpenid_download: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    var that = this
    wx.showModal({
      title: '注意',
      content: '点击“确定”将会下载云端数据，云端数据将会覆盖本地。使用场景：恢复记录',
      success(res) {
        if (res.confirm) {
          that.onQuery();
          wx.setStorageSync('learn_word_new_today', null);
          if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: err => {
        console.error('download失败：', err)
      }
    })
  },

  onGetOpenid_upload: function() {
    // 调用云函数
    wx.cloud.callFunction({
      name: 'login',
      data: {},
      success: res => {
        console.log('[云函数] [login] user openid: ', res.result.openid)
        app.globalData.openid = res.result.openid
        wx.setStorageSync('openid', res.result.openid)
      },
      fail: err => {
        console.error('[云函数] [login] 调用失败', err)
      }
    })
    var that = this
    wx.showModal({
      title: '注意',
      content: '点击“确定”将会上传本地数据，本地数据将会覆盖云端。使用场景：备份记录',
      success(res) {
        if (res.confirm) {
          that.onUpdate();
          console.log('用户点击确定')
          if (interstitialAd) {
            interstitialAd.show().catch((err) => {
              console.error(err)
            })
          }
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      },
      fail: err => {
        console.error('upload失败：', err)
      }
    })

  },


  onAdd: function() {
    const db = wx.cloud.database()
    db.collection('user_setting').add({
      data: {
        carte_arrey: wx.getStorageSync('carte_arrey'),
        settings_new: wx.getStorageSync('settings_new'),
        mots_deja_vu: wx.getStorageSync('mots_deja_vu'),
      },
      success: res => {
        // 在返回结果中会包含新创建的记录的 _id
        wx.showToast({
          title: '同步成功',
        })
        console.log('[数据库] [新增记录] 成功，记录 _id: ', res._id)
      },
      fail: err => {
        console.error('[数据库] [新增记录] 失败：', err)
      }
    })
  },

  onQuery: function() {
    var that = this
    const db = wx.cloud.database()
    // 查询当前用户所有的 counters
    db.collection('user_setting').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res.data)
        console.log(res.data.length)
        console.log(res.data[0].settings_new)
        if (res.data.length === 0) {
          that.onAdd()
          wx.showToast({
            title: '同步成功',
          })
        } else if (res.data.length != 0 && res.data[0].settings_new === undefined) {
          wx.setStorageSync('mots_deja_vu', res.data[0].mots_deja_vu);
          app.globalData.mots_deja_vu = res.data[0].mots_deja_vu;

          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }

          wx.showToast({
            title: '同步成功',
          })
        } else {
          wx.setStorageSync('carte_arrey', res.data[0].carte_arrey);
          wx.setStorageSync('settings_new', res.data[0].settings_new);
          wx.setStorageSync('mots_deja_vu', res.data[0].mots_deja_vu);
          wx.setStorageSync('word_frequence_5000', res.data[0].word_frequence_5000);
          app.globalData.mots_deja_vu = res.data[0].mots_deja_vu;
          wx.setStorageSync('learn_word_new_today', null);

          app.globalData.carte_arrey = res.data[0].carte_arrey;
          app.globalData.word_frequence_5000 = res.data[0].word_frequence_5000;
          app.globalData.settings_new = res.data[0].settings_new;

          if (getCurrentPages().length != 0) {
            //刷新当前页面的数据
            getCurrentPages()[getCurrentPages().length - 1].onLoad()
          }

          wx.showToast({
            title: '同步成功',
          })
        }

      },
      fail: err => {
        console.error('onquery失败：', err)
      }
    })
  },

  onUpdate: function() {
    var that = this
    const db = wx.cloud.database()
    db.collection('user_setting').where({
      _openid: app.globalData.openid
    }).get({
      success: function(res) {
        console.log(res.data)
        if (res.data.length === 0) {
          that.onAdd()
        } else {
          db.collection('user_setting').doc(res.data[0]._id).remove({
            success: function(res) {
              console.log(res.data)
            }
          })
          db.collection('mots_deja_vu').doc(res.data[0]._id).remove({
            success: function(res) {
              console.log(res.data)
            }
          })
          that.onAdd()
        }
      },
      fail: err => {
        console.error('onupdate失败：', err)
      }
    })
  },

  help: function() {
    wx.navigateTo({
      url: 'help/help',
    })
  },

  about: function() {
    wx.navigateTo({
      url: 'help/more',
    })
  },

  copy: function() {
    var self = this;
    wx.setClipboardData({
      data: "https://xd.sh.cn/conj-helper",
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴到浏览器访问',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })
  },

  settings_vocab: function() {
    wx.navigateTo({
      url: 'settings_vocab',
    })
  },

  settings_conj: function() {
    wx.navigateTo({
      url: 'settings_conj',
    })
  },

  zhuye: function() {
    var self = this;
    wx.setClipboardData({
      data: "https://xd.sh.cn/conj-helper",
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴到浏览器访问',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })

    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  gongzhonghao: function() {
    var self = this;
    wx.setClipboardData({
      data: "不淡定的实验室",
      success: function(res) {
        wx.showModal({
          title: '提示',
          content: '✨复制成功✨请粘贴在微信搜索框搜索公众号',
          success: function(res) {
            if (res.confirm) {
              console.log('确定')
            } else if (res.cancel) {
              console.log('取消')
            }
          }
        })
      }
    })

    if (interstitialAd) {
      interstitialAd.show().catch((err) => {
        console.error(err)
      })
    }
  },

  hard_choice: function() {
    wx.navigateToMiniProgram({
      appId: 'wx4b37e8a18be82a4d',
      path: 'pages/index1/index1',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },

  budanding_shop: function() {
    wx.navigateToMiniProgram({
      appId: 'wx0d095359b1a7272a',
      path: 'page/index/index',
      extraData: {
        foo: 'bar'
      },
      envVersion: 'develop',
      success(res) {
        // 打开成功
      }
    })
  },

  dark_mode: function(e) {
    var settings_new = wx.getStorageSync('settings_new')
    if (e.detail.value == true) {
      settings_new[0].dark_mode = true;
      wx.setStorageSync('settings_new', settings_new)
    } else {
      settings_new[0].dark_mode = false;
      wx.setStorageSync('settings_new', settings_new)
    }

    this.setData({
      dark_mode: settings_new[0].dark_mode,
    })
    this.successToast();

    if (getCurrentPages().length != 0) {
      //刷新当前页面的数据
      getCurrentPages()[getCurrentPages().length - 1].onLoad()
    }
  },

  onQuery_msg: function(search_word) {
    var that = this
    const db = wx.cloud.database()
    const _ = db.command
    db.collection('setting_msg').get({
      success: function(res) {
        console.log(res.data)
        app.globalData.msg_data = res.data;
        that.setData({
          msg: res.data[0].msg,
        })
      }
    })
  },

  onShareAppMessage: function(res) {
    return {
      title: '搞定法语动词变位就靠它了！😱',
      path: 'pages/welcome/welcome',
      imageUrl: '',
      success: function(shareTickets) {
        console.info(shareTickets + '成功');
        // 转发成功
      },
      fail: function(res) {
        console.log(res + '失败');
        // 转发失败
      },
      complete: function(res) {
        // 不管成功失败都会执行
      }
    }
  }
})