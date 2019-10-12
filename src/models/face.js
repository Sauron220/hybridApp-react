import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'face',
  state: {},
  effects: {
    *startLiveDetec ({ payload }, { put }) {
      const start = Date.now()
      const resData = yield invoke('startLiveDetec')();
      if (!resData) return false;
      return {
        ...resData,
        faceConsumeTime: String(Date.now() - start),
      }
    },
  },
})
