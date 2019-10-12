import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'personal',
  state: {},
  effects: {
    *getMapLocation ({ payload }, { put }) {
      const resData = yield invoke('getMapLocation')();
      if (!resData) return;
      yield put({
        type: 'updateState',
        payload: resData,
      });
      console.log(resData, 'resData<<<<<');
      return resData;
    },
  },
})
