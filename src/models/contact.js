import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'contact',
  state: {
    contactList: [],
    geoInfo: {
      addrInfo: '',
      area: '',
      province: '',
      city: '',
      latitude: 0,
      country: '',
      altitude: 0,
      zipcode: '',
      longitude: 0,
    },
  },
  effects: {
    *getUserLocation ({ payload }, { put }) {
      const resData = yield invoke('getUserLocation')();
      if (!resData) return false;
      yield put({
        type: 'updateState',
        payload: {
          geoInfo: {
            ...resData,
          },
        },
      });
      console.log(resData, 'resData<<<<<');
      return resData;
    },
    *getContact ({ payload }, { put }) {
      const resData = yield invoke('getContact')();
      if (!resData) return false;
      yield put({
        type: 'updateState',
        payload: {
          contactList: resData.listArr || [],
        },
      });
      console.log(resData, 'resData<<<<<');
      return resData;
    },
    *upload ({ payload }, { put, select }) {
      const { commit } = yield select(_ => _.app);
      const { contactList, geoInfo } = yield select(_ => _.contact);
      const params = {
        applNo: commit.applNo,
        dataMap: {
          appList: [],
          callRecords: [],
          contactList,
          emeContactList: [{
            name: payload.name1,
            telNo: payload.mobile1,
          }, {
            name: payload.name2,
            telNo: payload.mobile2,
          }],
        },
        geoInfo,
        uploadType: ['DAQ_CONTACT_RELATION', 'DAQ_APPLY_COMMIT', 'DAQ_CONTACT_LIST', 'DAQ_APP_LIST'],
      }

      console.log('params', params)

      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.appl.data.upload',
          bizContent: {
            ...params,
          },
        },
      });
      console.log(resData, 'resData<<<<<');
      if (resData === false) return false;
      return { ...params, ...resData }
    },
  },
})
