// const BD_ENV = process.env.NODE_ENV === 'development'; // 线上运行
const BD_ENV = true; // true 离线运行; 原生APP 访问本地文件
const localBaseUrl = process.env.envUrl; // 本地调试切换环境
const serverMap = new Map();
export const BD_OPEN = false; // false调用原生请求，true本地浏览器调试使用
export const BD_PUB_PARAMS = {
  deviceInfo: '{"screenSize":"(750.0, 1334.0)","inActiveMemory":"0.27 GB","batteryStatus":"Fully charged","cellularAddress":"10.186.230.1","localizedmodel":"iPhone","isJailbreaking":"N","currentLanguage":"en","uuid":"BE01F9EC-5AE3-4EF1-92CB-D8246E787E1E","imsi":"1BB8DD66-17B4-4D95-96C0-D23D191DDBDB","terminalType":"app","deviceOsVersion":"12.3.1","deviceSn":"C1544AAC-A568-55B7-2D04-A8278D865791","singleCpuUtilization":"0.2378599 0.2113211","mccmnc":"46002","isValidInterfaceOrientation":true,"buildSerial":"0881779d88a5dc16686ef1e2b1cbfd00","deviceIp":"192.168.112.155","usedMemory":"0.78 GB","batteryLevel":1,"deviceName":"Ideal-iPhone6","isProximityMonitoringEnabled":false,"macAddress":"12:5:88:19:3f:bf","brand":"Apple","totalMemory":"0.97 GB","deviceOrientation":"portrait","device":"iPhone7,2","deviceIps":{"en0\\\/ipv4":"192.168.112.155","lo0\\\/ipv6":"fe80::1","pdp_ip0\\\/ipv4":"10.186.230.1","en4\\\/ipv4":"169.254.118.90","en0\\\/ipv6":"fe80::1c50:342b:7cea:61ed","en4\\\/ipv6":"fe80::1835:ba32:5652:98e6","utun0\\\/ipv6":"fe80::61e4:6cc0:e7e8:9383","awdl0\\\/ipv6":"fe80::28aa:10ff:fe85:e296","lo0\\\/ipv4":"127.0.0.1"},"regId":"","proximityState":false,"purgableMemory":"0.00 GB","totalStorage":"59.59 GB","wifiName":"Oula_5G","networkType":"WIFI","usedStorage":"46.67 GB","appVersion":"1.0.0-dev","deviceOs":"IOS","model":"iPhone 6","idfa":"C1544AAC-A568-55B7-2D04-A8278D865791","idfv":"CB833DC6-E816-4034-B118-69E72F162597","wifiMac":"CB833DC6-E816-4034-B118-69E72F162597","cpuCores":2,"wifiIpAddress":"192.168.112.155","wiredMemory":"0.21 GB","activeMemory":"0.30 GB","isEmulator":"N","cpuUtilization":0.44918102025985718,"bssid":"12:5:88:19:3f:bf"}',
  signType: 'RSA',
  hostApp: 'AGLOAN',
  subChannel: '',
  appVersion: '1.0.0-dev',
  sourceType: 'APK',
  countryCode: '+62',
  custNo: 'CT7337801890711572480',
  version: '1.0.0-dev',
  charset: 'UTF-8',
  pageName: 'activityIframe.scss.html',
  timestamp: '1569327662278',
  channelSource: 'AG_000_IOS',
  userNo: 'UR7443587063859527680',
  token: '5e5ff5f28a664f018f3c49b222081169',
  productCode: 'AGLOAN',
  h5Version: '10000',
};

// 开发环境服务地址
const PH_DEV_BASEURL = {
  H5BaseUrl: BD_ENV ? 'http://crm.ph-dev.hidataverse.com/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

const AG_DEV_BASEURL = {
  H5BaseUrl: BD_ENV ? 'http://crm.ag-dev.hidataverse.com/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

// 测试环境服务地址
const PH_SIT_BASEURL = {
  H5BaseUrl: BD_ENV ? 'http://crm.ph-sit.hidataverse.com/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

// UAT测试环境服务地址
const PH_UAT_BASEURL = {
  H5BaseUrl: BD_ENV ? 'https://crm.ph-uat.hidataverse.com/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

const TH_UAT_BASEURL = {
  H5BaseUrl: BD_ENV ? 'https://crm.th-uat.hidataverse.com/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

// MVP生产环境服务地址
const MVP_PRO_BASEURL = {
  H5BaseUrl: BD_ENV ? 'https://help.jagorupiah.id/crm/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

// 泰国生产环境服务地址
const TH_PRO_BASEURL = {
  H5BaseUrl: BD_ENV ? 'https://crm.easylend.xyz/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

// 菲律宾生产环境服务地址
const PH_PRO_BASEURL = {
  H5BaseUrl: BD_ENV ? 'https://crm.ezlendin.com/' : '/crm-api/',
  md5: '7d41c06ff1b24df59'
};

// 服务映射关系
serverMap
  .set('ph_dev', PH_DEV_BASEURL)
  .set('ag_dev', AG_DEV_BASEURL)
  .set('ph_sit', PH_SIT_BASEURL)
  .set('ph_uat', PH_UAT_BASEURL)
  .set('th_uat', TH_UAT_BASEURL)
  .set('mvp_pro', MVP_PRO_BASEURL)
  .set('th_pro', TH_PRO_BASEURL)
  .set('ph_pro', PH_PRO_BASEURL);

export default serverMap.get(localBaseUrl);
