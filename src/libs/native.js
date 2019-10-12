import { jsBridge } from './JSBridge';
import { BD_OPEN } from '_conf';
const nativeMap = new Map();

nativeMap
  /**
   * 调用原生请求数据接口
   * */
  .set('request', (data) => jsBridge[BD_OPEN ? 'requestAsync' : 'callAsync']('requestData', data))
  /**
   * 人脸识别
   * */
  .set('startLiveDetec', (data) => jsBridge.callAsync('startLiveDetec', data))
  /**
   * 获取用户位置信息（定位）
   * */
  .set('getUserLocation', (data) => jsBridge.callAsync('getUserLocation', data))
  /**
   * 爬虫/数据魔盒
   * */
  .set('startTdDataBox', (data) => jsBridge.callAsync('startTdDataBox', data))
  /**
   * 拍摄身份证图片
   * */
  .set('startTakePhoto', (data) => jsBridge.callAsync('startTakePhoto', data))
  /**
   * 获取联系人
   * */
  .set('getContact', (data) => jsBridge.callAsync('getContact', data))
  /**
   * 打开外部链接
   * */
  .set('toExternalLink', (data) => jsBridge.callAsync('toExternalLink', data))
  /**
   * 关闭当前页面
   * */
  .set('closeNowPage', (data) => jsBridge.callAsync('closeNowPage', data))
  /**
   * googleMap 获取地图位置
   * */
  .set('getMapLocation', (data) => jsBridge.callAsync('getMapLocation', data))
  /**
   * rsa 加密
   * */
  .set('rsaEncryptString', (data) => jsBridge.callAsync('rsaEncryptString', data))
  /**
   * 更新用户配置信息
   * */
  .set('updateUserInfo', (data) => jsBridge.callAsync('updateUserInfo', data))
  /**
   * 获取app端语言环境
   * */
  .set('getLocalLanguage', (data) => jsBridge.callAsync('getLocalLanguage', data))
  /**
   * 获取APP端公用参数
   * */
  .set('getPubParams', (data) => jsBridge.callAsync('getPubParams', data))
  /**
   * 登出页面
   * */
  .set('jsLoginOut', (data) => jsBridge.callAsync('jsLoginOut', data))
  /**
   * 获取用户信息
   * */
  .set('getUserParams', (data) => jsBridge.callAsync('getUserParams', data))
  /**
   * 返回原生界面
   * */
  .set('backNativeView', (data) => jsBridge.callAsync('backNativeView', data))
  /**
   * 获取授信状态
   * */
  .set('getUserCreditState', (data) => jsBridge.callAsync('getUserCreditState', data))
  /**
   * 调用原生方法申请
   * */
  .set('apply', (data) => jsBridge.callAsync('apply', data))
  /**
   *  调用原生方法获取用户名、手机号、mac地址
   * */
  .set('getCustomerInfo', (data) => jsBridge.callAsync('getCustomerInfo', data));

// 调用原生方法
export const invoke = (methodName) => nativeMap.get(methodName);
