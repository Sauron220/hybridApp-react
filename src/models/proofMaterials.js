import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'proofMaterials',
  state: {
    bankPicList: [],
    jobPicList: [],
    npwpNo: '',
    npwpPicList: [],
  },
  effects: {
    *upload ({ payload }, { put, select }) {
      const upload = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.common.multifile.upload',
          bizContent: {
            ...payload,
          },
        },
      });
      const fileNameCodes = upload.fileNameCodes || {}
      const files = Object.keys(fileNameCodes).map((v) => fileNameCodes[v])
      console.log(upload, 'upload<<<<<');
      return files.length > 0 ? files : false
    },
  },
})
