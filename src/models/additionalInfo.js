import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'additionalInfo',
  state: {
    reptileQuery: [],
    reptileDetail: {},
  },
  effects: {
    *reptileQuery ({ payload }, { put }) {
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.appl.reptile.query',
          bizContent: {
            ...payload,
          },
        },
      });
      yield put({
        type: 'updateState',
        payload: {
          reptileQuery: resData,
        },
      });
      console.log(resData, 'resData<<<<<');
      return resData
    },
    *startTdDataBox ({ payload }, { put, select }) {
      if (!payload) return false;
      const resData = yield invoke('startTdDataBox')({ bizContent: { type: payload } });
      if (!resData) return false;
      const { reptileDetail } = yield select(_ => _.additionalInfo);
      Object.assign(reptileDetail, {
        [payload]: resData,
      })
      yield put({
        type: 'updateState',
        payload: {
          reptileDetail,
        },
      });
      console.log(resData, 'resData<<<<<');
      return resData;
    },
  },
})
