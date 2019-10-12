export default {
  namespace: 'creditCard',
  state: {

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
