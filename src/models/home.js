import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';

export default modelExtend(model, {
  namespace: 'home',
  state: {
    IconArr: [
      {
        icon: 'http://jagorupiah-test.oss-ap-southeast-5.aliyuncs.com/1d78b3455b784c4eb0cc0da560190011.png',
        text: 'Merchant',
        url: '',
      },
      {
        icon: 'http://jagorupiah-test.oss-ap-southeast-5.aliyuncs.com/d4cf1c8ad2084a55aa53662db535a5d1.png',
        text: 'Calculator',
        url: '/activity/calculator',
      },
      {
        icon: 'http://jagorupiah-test.oss-ap-southeast-5.aliyuncs.com/15dadf9eab604999ac7fd282dff917e5.png',
        text: 'Promotion',
        url: '/activity/promotions',
      },
    ],
    blank: [
    {
      "activityCode": "",
      "activityContent": "1.12%",
      "activityName": "25000000",
      "activityPicClose": "",
      "activityPicOpen": "",
      "activityPicture": "",
      "activityType": 234,
      "activityUrl": "",
      "popupCode": "POPUP_1568097557522",
      "priority": "10"
    }
  ],
    msgNotices: [
      {
        'activityCode': '',
        'activityContent': 'erin 啦啦啦啦啦',
        'activityName': '公告',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': '',
        'activityType': 300,
        'activityUrl': 'https://www.baidu.com',
        'popupCode': 'POPUP_1568184706956',
        'priority': '1',
      },
      {
        'activityCode': '',
        'activityContent': '*** have successfully borrowed Rp 600.000.00000 min ago.',
        'activityName': '公告2',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': '',
        'activityType': 300,
        'activityUrl': '',
        'popupCode': 'POPUP_1568785419959',
        'priority': '2',
      },
      {
        'activityCode': '',
        'activityContent': '*** have successfully borrowed RP 10000 2 min ago.',
        'activityName': '公告3',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': '',
        'activityType': 300,
        'activityUrl': '*** have successfully borrowed RP 10000 2 min ago.',
        'popupCode': 'POPUP_1568184843953',
        'priority': '3',
      },
      {
        'activityCode': '',
        'activityContent': 'xxx has successfully borrowed Rp15.000.000 2 min ago',
        'activityName': '公告4',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': '',
        'activityType': 300,
        'activityUrl': 'www.baidu.com',
        'popupCode': 'POPUP_1569736011720',
        'priority': '4',
      },
    ],
    endBanners: [
      {
        'activityCode': '',
        'activityContent': '',
        'activityName': '底部慈善',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'http://jagorupiah-test.oss-ap-southeast-5.aliyuncs.com/7bbe08380f2e4da586d866548c2e386d.png',
        'activityType': 128,
        'activityUrl': '',
        'popupCode': 'POPUP_1568182673769',
        'priority': '1',
      },
      {
        'activityCode': '',
        'activityContent': '',
        'activityName': '底部慈善',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'http://jagorupiah-test.oss-ap-southeast-5.aliyuncs.com/7bbe08380f2e4da586d866548c2e386d.png',
        'activityType': 128,
        'activityUrl': '',
        'popupCode': 'POPUP_1568859665840',
        'priority': '2',
      },
      {
        'activityCode': '',
        'activityContent': '',
        'activityName': '肥兔',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569835979528&di=db2089802339835b726c032e27fbb3e4&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp173243600.jpg',
        'activityType': 128,
        'activityUrl': '',
        'popupCode': 'POPUP_1569826131316',
        'priority': '10',
      },
    ],
    homeBanners: [
      {
        'activityCode': '',
        'activityContent': '',
        'activityName': '小白兔',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3242380026,625354708&fm=26&gp=0.jpg',
        'activityType': 36,
        'activityUrl': 'https://www.baidu.com',
        'popupCode': 'POPUP_1568778237930',
        'priority': '1',
      },
      {
        'activityCode': '',
        'activityContent': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3242380026,625354708&fm=26&gp=0.jpg',
        'activityName': '小白白兔',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3242380026,625354708&fm=26&gp=0.jpg',
        'activityType': 36,
        'activityUrl': 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3242380026,625354708&fm=26&gp=0.jpg',
        'popupCode': 'POPUP_1570527529783',
        'priority': '4',
      },
      {
        'activityCode': '',
        'activityContent': '详情',
        'activityName': '大白兔',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569835378291&di=5a47bf061a5cdcde3c7245cf5e44bfb5&imgtype=0&src=http%3A%2F%2Fimg12.360buyimg.com%2Fn1%2Fjfs%2Ft13903%2F355%2F201103483%2F342774%2F5d0b4ec9%2F5a05c6b0Neec1badb.jpg',
        'activityType': 36,
        'activityUrl': 'https://www.qq.com',
        'popupCode': 'POPUP_1568702942988',
        'priority': '10',
      },
      {
        'activityCode': '',
        'activityContent': '',
        'activityName': '麻辣兔头',
        'activityPicClose': '',
        'activityPicOpen': '',
        'activityPicture': 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569835979528&di=db2089802339835b726c032e27fbb3e4&imgtype=0&src=http%3A%2F%2Fimg3.doubanio.com%2Fview%2Fgroup_topic%2Fl%2Fpublic%2Fp173243600.jpg',
        'activityType': 36,
        'activityUrl': 'https://360.com',
        'popupCode': 'POPUP_1569826157034',
        'priority': '10',
      },
    ],
    activityUrl: '',
  },
  effects: {
    *marketingActivity ({ payload }, { put }) {
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.marketing.activity.popup.query',
          bizContent: { ...payload },
          serType: 'mms',
        },
      });
      if (!resData) return false;
      yield put({
        type: 'updateState',
        payload: resData,
      });
      return resData
    },
  },
  reducers: {
    setActivityUrl(state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    }
  }
})
