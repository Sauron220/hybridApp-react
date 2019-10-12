import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';
import { convertMaritalStatus } from 'libs/tools';

export default modelExtend(model, {
  namespace: 'idCard',
  state: {
    ocrData: {},
  },
  effects: {
    *startTakePhoto ({ payload }, { put, select }) {
      const resData = yield invoke('startTakePhoto')();
      if (!resData) return false;
      yield put({
        type: 'updateState',
        payload: resData,
      });
      console.log(resData, 'resData<<<<<');
      const upload = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.common.multifile.upload',
          bizContent: {
            key1: resData.imgStr,
            bizType: 'ADVANCE',
            fileKeys: ['key1'],
          },
        },
      });
      console.log(upload, 'upload<<<<<');
      if (!upload || !upload.fileNameCodes) return false;
      const { commit } = yield select(_ => _.app)
      const ocrImage = upload.fileNameCodes.key1
      const ocrData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.user.ocrinfo.query',
          bizContent: {
            ocrImage,
            flowNo: commit.flowNo,
            mugShot: '',
            facePartner: 'ADVANCE',
            ocrType: 'EKTP',
            ocrMode: 1,
            ocrInfo: '',
          },
        },
      });

      // 映射字段
      const idAddress = [
        ocrData.province,
        ocrData.city,
        ocrData.district,
        ocrData.village,
        ocrData.rtrw,
        ocrData.address,
      ].filter((v) => !!v).join(', ')
      Object.assign(ocrData, {
        frontMid: ocrImage,
        idAddress,
        birthPlace: ocrData.birthPlaceBirthday || ocrData.birthPlace,
        idNo: ocrData.idNumber || ocrData.idNo,
        fullName: ocrData.name || ocrData.fullName,
        maritalStatus: [convertMaritalStatus(ocrData.maritalStatus)],
        idValidationDateStr: ocrData.expiryDate ? ocrData.expiryDate.split('-').reverse().join('-') : ocrData.idValidationDateStr,
      });

      yield put({
        type: 'updateState',
        payload: {
          ocrData,
        },
      });
      console.log(ocrData, 'ocrData<<<<<');
      return ocrData
    },
  },
})
