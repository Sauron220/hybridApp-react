export default {
  namesapce: 'feedback',
  state: {
    form: {
      account: ''
    }
  },
  effects: {
    *changeForm ({ payload }, { put, call }) {
      yield put({
        type: 'setForm',
        payload
      })
    }
  },
  reducers: {
    setForm (state, payload) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
