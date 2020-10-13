/**
 *  getLocationParams——从地址栏里面获取参数值
 *  getInfo——获取用户信息
 */

var utils = {
  isAndroid: navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1,
  isIPhone: navigator.userAgent.indexOf('iPhone') > -1,
  isClient: navigator.userAgent.indexOf('mzapp') > -1,
  isIos: navigator.userAgent.match(/Mac OS/),
  ua: window.navigator.userAgent.toLowerCase(),


  appType(){
    if (this.isAndroid) {
      return true
    }else if (this.isIPhone) {
      return false
    }
  },

  /**
   * 跳转到原生页面Jump
   */
  JumpNavite(Pagetype,type, callback) {
    /**
     * 聊天客服           jumpToCustomerService
     * 关闭页面           clickOnfinish
     * APP首页            jumpToMain
     * 个人中心           jumpToPersonCenter
     * 产品详情           jumpToProduct
     * APP注册            jumpToRegister
     * APP登录            jumpToLogin
     * APP卡包页面        jumpToCoupon
     * App绑定银行卡      jumpToAddBankCard
     * 产品列表（理财列表） jumpToProductList
     * App绑卡银行卡      jumpToBindBankCard   //返回不经过中间页面
     * 产品列表（理财列表） jumpToProductList
     */
    if(type){
      var data = { result:{type:type}, type: Pagetype };
    }else{
      var data = { result:0, type: Pagetype };
    }

    if (this.isIPhone) {
      this.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("ObjcCallBackJs", JSON.stringify(data), function (res) {
          if (callback) callback(res);
        });
      });
    } else if (this.isAndroid) {
      window.demo[Pagetype](JSON.stringify(data));
    }
  },
  jumpToProduct(id) {
    // 调到指定产品的投资页面
    var data = {
      result: 0,
      id: id,
      type: "jumpToProduct"
    };
    if (this.isIPhone) {
      this.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("ObjcCallBackJs", JSON.stringify(data), function (res) {
          if (callback) callback(res);
        });
      });
    } else if (this.isAndroid) {
      window.demo["jumpToProduct"](JSON.stringify(data));
    }
  },
  // 风险测评回调js
  backRiskAssessment() {
    this.setupWebViewJavascriptBridge(function (bridge) {
      bridge.registerHandler('backRiskAssessment', function (data, responseCallback) {
        //处理oc给的传参
        // alert('oc请求js  传值参数是：'+data)
        var responseData = backRiskAssessment()
        //处理完，回调传值给oc
        responseCallback(responseData)
      })

    })
  },
  /**
   * 跳转到HTTP链接
   */

  Jump(url) {
    if (url.share != undefined) {
      var data = {
        result: 0,
        type: "jumpToEvents",
        urlEvents: url["link"],
        adName: url["adName"],
        isShare: url["share"],
        share: {
          shareTitle: url["shareTitle"],
          shareDesc: url["shareDesc"],
          shareLink: url["shareLink"],
          shareUrl: url["shareUrl"]
        }
      };
    } else {
      var data = {
        result: 0,
        type: "jumpToEvents",
        urlEvents: url["link"],
        adName: url["adName"],
        isShare: url["share"],
      };
    };

    if (this.isClient) {
      if (this.isIPhone) {
        this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('ObjcCallBackJs', JSON.stringify(data), function (response) { });
        });
      } else if (this.isAndroid) {
        window.demo.jumpToEvents(JSON.stringify(data));
      }
    } else {
      window.location.href = url["link"];
    }
  },

  /**
   * 跳转到登录（去登录）
   */
  Login: function (callback) {
    var data = { result: 0, type: "jumpToLogin" };
    if (this.isIPhone) {
      this.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("ObjcCallBackJs", JSON.stringify(data), function (res) {
          if (callback) callback(res);
        });
      });
    } else if (this.isAndroid) {
      window.demo.jumpToLogin(JSON.stringify(data));
    }
  },
  /**
   *  分享接口，传递一个obj{ title,desc,icon,url}
   */
  Share: function (obj) {
    var { title, desc, icon, url } = obj;
    var data = {
      result: 0,
      type: "openShare",
      title: "邀请好友",
      discript: "",
      url: "",
      imageUrl: "",
      share: {
        shareTitle: title,
        shareDesc: desc,
        shareLink: url,
        shareUrl: icon
      }
    };
    if (this.isClient && this.isIPhone) {
      this.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler('ObjcCallBackJs', JSON.stringify(data), function (response) { });
      });
    } else if (this.isClient && this.isAndroid) {
      window.demo.openShare(JSON.stringify(data));
    }
  },
// 下载
  jumpToBrowsers(durl) {
    // 调到指定产品的投资页面
    var data = {
      result: 0,
      downloadurl: durl,
      type: "jumpToBrowser"
    };
    if (this.isIPhone) {
      this.setupWebViewJavascriptBridge(function (bridge) {
        bridge.callHandler("ObjcCallBackJs", JSON.stringify(data), function (res) {
          if (callback) callback(res);
        });
      });
    } else if (this.isAndroid) {
      window.demo.jumpToBrowser(JSON.stringify(data));
    }
  },
  GetLocationParams: function (name) {
    // 获取地址栏参数
    var
      href = window.location.href,
      subIndex = href.indexOf("?"),
      paramsObj = {};
    if (subIndex != -1) {
      var params = href.substr(subIndex + 1);
      var paramsMany = params.indexOf("&");
      if (paramsMany != -1) {
        var paramsArr = params.split("&");
        paramsArr.forEach((item, index) => {
          paramsObj[item.split("=")[0]] = item.split("=")[1];
        })
      } else {
        paramsObj[params.split("=")[0]] = params.split("=")[1];
      }
    }

    if (paramsObj.hasOwnProperty(name)) {
      return paramsObj[name];
    } else {
      return null
    }
  },
  /**
   *  获取地址栏里面的参数
   */
  getLocationParams: function (name) {
    // 获取地址栏参数
    var
      href = window.location.href,
      subIndex = href.indexOf("?"),
      paramsObj = {};
    if (subIndex != -1) {
      var params = href.substr(subIndex + 1);
      var paramsMany = params.indexOf("&");
      if (paramsMany != -1) {
        var paramsArr = params.split("&");
        paramsArr.forEach((item, index) => {
          paramsObj[item.split("=")[0]] = item.split("=")[1];
        })
      } else {
        paramsObj[params.split("=")[0]] = params.split("=")[1];
      }
    }

    if (paramsObj.hasOwnProperty(name)) {
      return paramsObj[name];
    }
    else {
      return null
    }
  },

  /**
   * 执行IOS 这边的接口方法
   */
  setupWebViewJavascriptBridge: function (callback) {
    if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); }
    if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
    window.WVJBCallbacks = [callback];
    if (this.ua.indexOf("iphone") !== -1 || this.ua.indexOf("ipad") !== -1) {
      var WVJBIframe = document.createElement('iframe');
      WVJBIframe.style.display = 'none';
      WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
      document.documentElement.appendChild(WVJBIframe);
      setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
    }
  },
  /**
   * 获取用户信息接口
   */
  getInfo: function () {
    var _this = this;
    return new Promise(function (resolve, reject) {
      var dataJson = { result: 0, type: 'respondJavascript' };
      if (_this.ua.indexOf('mzapp') !== -1 && (_this.ua.indexOf("iphone") !== -1 || _this.ua.indexOf("ipad") !== -1)) {
        _this.setupWebViewJavascriptBridge(function (bridge) {
          bridge.callHandler('ObjcCallBackJs', JSON.stringify(dataJson), function (response) {
            resolve(response);
          });

        });
      } else if (_this.ua.indexOf('mzapp') !== -1 && _this.ua.indexOf("android") !== -1) {
        var msg = window.demo[dataJson.type](JSON.stringify(dataJson));
        resolve(JSON.parse(msg));
      } else {
        reject("获取失败");
      }
    });
  },
  /**
   * H5 设置页面tilte
   */
  setTitle: function (t) {
    document.title = t;
    var i = document.createElement('iframe');
    i.src = '//m.baidu.com/favicon.ico';
    i.style.display = 'none';
    i.onload = function () {
      setTimeout(function () {
        i.remove();
      }, 9)
    }
    document.body.appendChild(i);
  },
  getDateAfter: function (AddDayCount, str) {
    var dd = new Date();
    if (str && dd.getDay() == 0) {
      AddDayCount++
    } else if (str && dd.getDay() == 6) {
      AddDayCount = AddDayCount + 2
    }
    dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
    var y = dd.getFullYear();
    var m = (dd.getMonth() + 1) < 10 ? "0" + (dd.getMonth() + 1) : (dd.getMonth() + 1);
    var d = dd.getDate() < 10 ? "0" + dd.getDate() : dd.getDate();
    var h = dd.getHours();
    var minute = dd.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    h = h < 10 ? ('0' + h) : h;
    if (str) {
      return m + "." + d;
    } else {
      return m + "." + d + " " + h + ":" + minute;
    }
  }
};

export default utils;
