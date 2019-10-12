import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'setPassword',
  state: {},
  effects: {
    *password ({ payload }, { put }) {
      const password = yield invoke('rsaEncryptString')({ bizContent: payload.password });
      if (!password) return false;
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.user.password.set',
          bizContent: {
            ...payload,
            password,
          },
        },
      });
      console.log(resData, 'resData<<<<<');
      return { ...resData, password }
    },
  },
})
