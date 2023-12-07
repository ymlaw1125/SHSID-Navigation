// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    canIUseGetUserProfile: false,
    canIUseOpenData: wx.canIUse('open-data.type.userAvatarUrl') && wx.canIUse('open-data.type.userNickName'), // 如需尝试获取用户信息可改为false
    stv: {
      offsetX: 0,
      offsetY: 0,
      zoom: false,
      distance: 0,
      scale: 1,
    },
    startMultiArray: [
      ["Gates", "Teaching Buildings", "Parking Lots", "Cafeterias", "Sport Grounds", "Other Places"], 
      ["North Gate: Baise Road", "South Gate: Shang Zhong Road", "East Gate: North Long Chuan Road"],
    ],
    endMultiArray: [
      ["Gates", "Teaching Buildings", "Parking Lots", "Cafeterias", "Sport Grounds", "Other Places"], 
      ["North Gate: Baise Road", "South Gate: Shang Zhong Road", "East Gate: North Long Chuan Road"],
    ],
    objectMultiArray: [
      [
        {
          id: 0,
          name: 'Gates'
        },
        {
          id: 1,
          name: 'Teaching Buildings'
        },
        {
          id: 2,
          name: 'Parking Lots'
        },
        {
          id: 3, 
          name: 'Cafeterias'
        },
        {
          id: 4, 
          name: 'Sport Grounds'
        },
        {
          id: 5,
          name: 'Other places'
        }
      ],
      [
        {
          id: 0,
          name: 'North Gate: Baise Road'
        },
        {
          id: 1,
          name: 'South Gate: Shang Zhong Road'
        },
        {
          id: 2,
          name: 'East Gate: North Long Chuan Road'
        }
      ]
    ],
    startMultiIndex: [0,0],
    endMultiIndex: [0,0],
  },

  bindStartMultiPickerChange: function(e){
    console.log("Picker value changed into ", e.detail.value);
    this.setData({
      startMultiIndex: e.detail.value,
    })
  },
  bindEndMultiPickerChange: function(e){
    console.log("Picker value changed into ", e.detail.value);
    this.setData({
      endMultiIndex: e.detail.value,
    })
  },
  bindStartMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      startMultiArray: this.data.startMultiArray,
      startMultiIndex: this.data.startMultiIndex
    };
    data.startMultiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0: 
        switch (data.startMultiIndex[0]) {
          case 0:
            data.startMultiArray[1] = ["North Gate: Baise Road", "South Gate: Shang Zhong Road", "East Gate: North Long Chuan Road"];
            break;
          case 1:
            data.startMultiArray[1] = ["Primary School Building - Grades 1-3", "ZhongXing Building - Grades 4-7", "ZhenTao Building - Grades 8-10", "XianMian Building - Grades 11-12", "YiFu Building", "LongMen Building - Local School", "Engineering Building"];
            break;
          case 2:
            data.startMultiArray[1] = ["Teacher's Car Parking Lot", "School Bus Parking Lot"];
            break;
          case 3:
            data.startMultiArray[1] = ["SHSID Cafeteria", "SHS Cafeteria"];
            break;
          case 4:
            data.startMultiArray[1] = ["Tennis Center", "Outdoor Tennis Court", "Gymnasium", "Basketball Court", "Volleyball Court", "Soccer Field", "Indoor Swimming Pool"];
            break;
          case 5:
            data.startMultiArray[1] = ["Auditorium", "Administration Building", "XianMian Annex Building", "SHSID Admissions Office", "Multi-media Center", "Art Center", "General Affairs Building", "Library and Information Center", "Laundry", "Lawson"];
            break;
        }
        data.startMultiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  bindEndMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      endMultiArray: this.data.endMultiArray,
      endMultiIndex: this.data.endMultiIndex
    };
    data.endMultiIndex[e.detail.column] = e.detail.value;
    switch (e.detail.column) {
      case 0: 
        switch (data.endMultiIndex[0]) {
          case 0:
            data.endMultiArray[1] = ["North Gate: Baise Road", "South Gate: Shang Zhong Road", "East Gate: North Long Chuan Road"];
            break;
          case 1:
            data.endMultiArray[1] = ["Primary School Building - Grades 1-3", "ZhongXing Building - Grades 4-7", "ZhenTao Building - Grades 8-10", "XianMian Building - Grades 11-12", "YiFu Building", "LongMen Building - Local School", "Engineering Building"];
            break;
          case 2:
            data.endMultiArray[1] = ["Teacher's Car Parking Lot", "School Bus Parking Lot"];
            break;
          case 3:
            data.endMultiArray[1] = ["SHSID Cafeteria", "SHS Cafeteria"];
            break;
          case 4:
            data.endMultiArray[1] = ["Tennis Center", "Outdoor Tennis Court", "Gymnasium", "Basketball Court", "Volleyball Court", "Soccer Field", "Indoor Swimming Pool"];
            break;
          case 5:
            data.endMultiArray[1] = ["Auditorium", "Administration Building", "XianMian Annex Building", "SHSID Admissions Office", "Multi-media Center", "Art Center", "General Affairs Building", "Library and Information Center", "Laundry", "Lawson"];
            break;
        }
        data.endMultiIndex[1] = 0;
        break;
    }
    this.setData(data);
  },
  // 事件处理函数
  onLoad() {
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  touchstartCallback: function(e) {
    console.log(e);
    console.log("touchstartCallback");
    if (e.touches.length === 1){
      let {clientX, clientY} = e.touches[0];
      this.startX = clientX;
      this.startY = clientY;  
      this.touchStartEvent = e.touches;
    } else {
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove*xMove + yMove*yMove);
      this.setData({
        "stv.distance": distance,
        "stv.zoom": true, 
      })
    }
  },
  touchmoveCallback: function(e) {
    if (e.touches.length === 1){
      // single finger movement
      if (this.data.stv.zoom) {
        return;
      }
      let {clientX, clientY} = e.touches[0];
      let offsetX = clientX - this.startX;
      let offsetY = clientY - this.startY;
      this.startX = clientX;
      this.startY = clientY;
      let {stv} = this.data;
      stv.offsetX += offsetX;
      stv.offsetY += offsetY;
      stv.offsetLeftX = -stv.offsetX;
      stv.offsetLeftY = -stv.offsetLeftY;
      this.setData({
        stv: stv
      })
    } else {
      // double finger zooming
      let xMove = e.touches[1].clientX - e.touches[0].clientX;
      let yMove = e.touches[1].clientY - e.touches[0].clientY;
      let distance = Math.sqrt(xMove*xMove + yMove*yMove);
      let distanceDiff = distance - this.data.stv.distance;
      let newScale = this.data.stv.scale + 0.005 * distanceDiff;

      this.setData({
        'stv.distance': distance,
        'stv.scale': newScale,
      })
    }
  },
  touchendCallback: function(e){
    // end of touch
    if (e.touches.length === 0){
      this.setData({
        'stv.zoom': false,
      })
    }
  }, 

  toRoute: function(e) {
    console.log(e);
    console.log(this.data.startMultiArray[1][this.data.startMultiIndex[1]]);
    console.log(this.data.endMultiArray[1][this.data.endMultiIndex[1]]);
    var path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: '../' + path,
    })
  }
 


})
