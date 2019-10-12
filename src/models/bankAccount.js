import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'bankAccount',
  state: {},
  effects: {
    *submit ({ payload }, { put }) {
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.cust.card.submit',
          bizContent: {
            ...payload,
          },
        },
      });
      yield put({
        type: 'updateState',
        payload: {
          ...resData,
        },
      });
      console.log(resData, 'resData<<<<<');
      return resData
    },
  },
})
