import axios from './api.request';
import { Toast } from 'antd-mobile';
import { BD_OPEN, BD_PUB_PARAMS } from '_conf';
import { i18n } from 'libs/tools';
// export function setupWebViewJavascriptBridge(callback) {
//   if (window.WebViewJavascriptBridge) { return callback(WebViewJavascriptBridge); } // eslint-disable-line no-undef
//   if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback); }
//   window.WVJBCallbacks = [callback];
//   var WVJBIframe = document.createElement('iframe');
//   WVJBIframe.style.display = 'none';
//   WVJBIframe.src = 'https://__bridge_loaded__';
//   document.documentElement.appendChild(WVJBIframe);
//   setTimeout(function() { document.documentElement.removeChild(WVJBIframe) }, 0)
// }

// export function setBridge(funName, dataJson, callback) {
//   setupWebViewJavascriptBridge(function(bridge) {
//     bridge.registerHandler(funName, function(data, responseCallback) {
//       // '注册函数，从app拿到的数据', data
//       callback && callback(data);
//       var responseData = dataJson;
//       // 'js返回给app的数据', responseData
//       responseCallback(responseData);
//     });
//   });
// }

// export function getBridge(funName, dataJson, callback) {
//   setupWebViewJavascriptBridge(function(bridge) {
//     bridge.callHandler(funName, dataJson, function(response) {
//       callback && callback(response);
//     });
//   });
// }

/**
 * 判断当前移动设备
 */
export const Platform = (function () {
  const ua = navigator.userAgent;
  const android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
  const ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
  const ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
  const iphone = !ipad && ua.match(/(iPhone\sOS)\s([\d_]+)/);
  return {
    isIOS: !!ipad || !!iphone || !!ipod,
    isAndroid: !!android,
  };
})();

/**
 * 封装 JSBridge
 */
export class JSBridge {
	constructor(config) {
		this.global = window;
		this.Platform = Platform;
    this.defaults = config || {};
    this.Platform.isAndroid && this.initAndroidWebViewJsBridge();
	}

  /**
   * 注入公共参数
   * @param {Object} config 参数对象
   */
  injectDefaults(config) {
    if (arguments.length > 1) {
      config = {
        call: arguments[0] || {},
        register: arguments[1] || {},
      };
    } else {
      config = config || {};
    }
    Object.assign(this.defaults, config || {});
  }

	iOSHandler(method, params, cb) {
    const promise = new Promise((resolve, reject) => {
      this.setupWebViewJavascriptBridge((bridge) => {
        bridge.callHandler(method, params, (res) => {
          console.log(res, `<- responseData===${params && params['method'] || method}`);
          const { flag, data = {}, code = '' } = res;
          if (flag !== 'S') {
            code && Toast.info(i18n(code));
            return resolve(false);
          }
          resolve(data);
        });
      });
    });
    if (typeof cb === 'function') {
      promise.then(cb.bind(this.global));
    }
    return promise;
  }

  androidHandler(method, params, cb) {
    const promise = new Promise((resolve, reject) => {
      this.connectWebViewJavascriptBridge(bridge => {
        bridge.callHandler(method, params, (res) => {
          console.log(res, `<- responseData===${params && params['method'] || method}`);
          const { flag, data = {}, code = '' } = res;
          if (flag !== 'S') {
            code && Toast.info(i18n(code));
            return resolve(false);
          }
          resolve(data);
        });
      });
    });
    if (typeof cb === 'function') {
      promise.then(cb.bind(this.global));
    }
    return promise;
  }

  /**
   * 执行函数（app 暴露给 js 使用）
   * @param {String} method 方法名
   * @param {Object|String} params 参数对象
   * @param {Function} cb 回调函数
   */
  call(method, params, cb) {
    params = typeof params === 'string' ? { method: params, bizContent: {} } : params || {};
    if (params.method) {
      params = Object.assign({}, this.defaults.call, params || {});
      params.bizContent = JSON.stringify(params.bizContent || {});
    } else {
      params = params.bizContent;
    }
    try {
      this.Platform.isIOS ?
        this.iOSHandler(method, params, cb) :
        this.androidHandler(method, params, cb);
    } catch (e) {
      console.warn(e);
    }
  }

  /**
   * 异步执行函数（app 暴露给 js 使用）
   * @param {String} method 方法名
   * @param {Object|String} params 参数对象
   * @param {Function} cb 回调函数
   */
  callAsync(method, params, cb) {
    params = typeof params === 'string' ? { method: params, bizContent: {} } : params || {};
    if (params.method) {
      params = Object.assign({}, this.defaults.call, params || {});
      params.bizContent = JSON.stringify(params.bizContent || {});
    } else {
      params = params.bizContent;
    }
    return this.Platform.isIOS ?
      this.iOSHandler(method, params, cb) :
      this.androidHandler(method, params, cb);
  }

  setupWebViewJavascriptBridge(callback) {
    if (this.global.WebViewJavascriptBridge) {
      return callback(WebViewJavascriptBridge); // eslint-disable-line no-undef
    }
    if (this.global.WVJBCallbacks) {
      return this.global.WVJBCallbacks.push(callback);
    }
    this.global.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => {
      document.documentElement.removeChild(WVJBIframe)
    }, 0)
  }

  iOSAddEvent(method, params, handler) {
    this.setupWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(method, (data, responseCallback) => {
        responseCallback(params);
        typeof handler === 'function' && handler.apply(this.global, [data, responseCallback]);
      })
    })
  }

  connectWebViewJavascriptBridge(callback) {
    if (this.global.WebViewJavascriptBridge) {
      typeof callback === 'function' && callback.call(this.global, this.global.WebViewJavascriptBridge);
    } else {
      document.addEventListener('WebViewJavascriptBridgeReady', () => {
        typeof callback === 'function' && callback.call(this.global, this.global.WebViewJavascriptBridge);
      }, false);
    }
  }

  initAndroidWebViewJsBridge () {
    this.connectWebViewJavascriptBridge((bridge) => {
      try {
        if (!this.global.WebViewJavascriptBridge._messageHandler) {
          bridge.init((message, responseCallback) => {
            responseCallback();
          });
        }
      } catch (e) {
        console.warn(e);
      }
    })
  }

  androidAddEvent(method, params, handler) {
    this.connectWebViewJavascriptBridge((bridge) => {
      bridge.registerHandler(method, (data, responseCallback) => {
        responseCallback(params);
        typeof handler === 'function' && handler.apply(this.global, [data, responseCallback]);
      });
    });
  }

  /**
   * 注册函数（js 暴露给 app 使用）
   * @param {String} method 方法名
   * @param {Object} params 参数对象
   * @param {Function} handler 函数体
   */
  register(method, params, handler) {
    params = Object.assign({}, this.defaults.register, params || {});
    try {
      this.Platform.isIOS ?
        this.iOSAddEvent(method, params, handler) :
        this.androidAddEvent(method, params, handler);
    } catch (e) {
      console.warn(e);
    }
  }
}

// 暴露实例对象
const jsBridge = new JSBridge();

/**
 * 发送请求 - 用于本地测试
 * @param {String} method 请求方法
 * @param {Object|String} params 请求参数
 * @param {Function} cb 回调函数
 */
jsBridge.requestAsync = function requestAsync(method = 'POST', params, cb) {
  params = typeof params === 'string' ? { method: params, bizContent: {} } : params;
  params = Object.assign({}, this.defaults.call, params || {});
  params.bizContent = JSON.stringify(params.bizContent || {});
  let serType = params.serType || 'lps';
  return axios.request({
    url: '/gateway.do',
    method: method === 'requestData' ? 'POST' : method,
    data: params,
  }, {
    baseURL: `http://${serType}-web.ag-dev.hidataverse.com/api`,
  }).then(res => {
    const { flag, data = {} } = res;
    let reData = {};
    console.log(res, `<- responseData===${params['method']}`);
    if (flag === 'S') {
      reData = data;
      cb && cb(data)
    } else {
      reData = res;
      cb && cb(reData)
    }
    return reData;
  })
};

// 注入公共参数 - 用于本地测试
BD_OPEN && jsBridge.injectDefaults({
  call: { ...BD_PUB_PARAMS },
});

export { jsBridge }
export default jsBridge
