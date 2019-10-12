export default {
  namespace: 'coupon',
  state: {
    couponArr: [
      '10',
      '20',
      '30',
      '40',
      '10',
      '20',
      '30',
      '40',
    ]
  },
  effects: {
    *GetUserCouPonInfo({ payload }, { put, call }) {
      yield put({
        type: 'setCounpon',
        payload
      })
    }
  },
  reducers: {
    setCounpon(state, { payload }) {
      return {
        ...state,
        ...payload
      }
    }
  }
}
