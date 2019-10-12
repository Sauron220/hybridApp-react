export default {
  namespace: 'branches',
  state: {
    listData: [{
      name: 'KPO Sudirman',
      address: 'DKI Jakarta, South Jakarta, Jl. Jend. Sudirman Kav. 52-53, Jakarta Selatan 12190',
      tel: '021-5152168',
      distance: '50m',
    },{
      name: 'Melawai',
      address: 'Melawai, DKI Jakarta, South Jakarta, Jl. Jl. Melawai Raya Blok B III No. 194, Jakarta Selatan 12160',
      tel: '021-5152168',
      distance: '150m',
    },{
      name: 'Matraman',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Suryopranoto',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Artha Gading',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Artha Gading',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Artha Gading',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Artha Gading',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Artha Gading',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    },{
      name: 'Artha Gading',
      address: 'DKI Jakarta, East Jakarta, Jl. Matraman Raya No. 38, Jakarta Timur 13150',
      tel: '021-5152168',
      distance: '730m',
    }],
    isSuccess: false
  },
  effects: {
    *setValue ({ payload }, { put }) {
      yield put({
        type: 'setItem',
        payload
      })
    }
  },
  reducers: {
    setItem (state, { payload }) {
      return {
        creditCardMaterial: {
          ...state.creditCardMaterial,
          ...payload
        }
      }
    }
  }
}
