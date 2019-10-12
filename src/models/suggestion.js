import { questionFeedBack } from 'services/suggestion';

export default {
  namespace: 'suggestion',
  state: {
    feedbackSource: '',
  },
  effects: {
    *sendQuestion ({ payload }, { call }) {
      return yield call(questionFeedBack, payload);
    }
  },
  reducers: {
    setFeedBackSource (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
  subscriptions: {
    // setup ({ dispatch, history }) {
    //   // 监听路由变化
    //   return history.listen(({ pathname, query }) => {
    //     const { feedbackSource } = query;
    //     if (pathname === '/mine/suggestion/feedback') {
    //       dispatch({ type: 'setFeedBackSource', payload: { feedbackSource } })
    //     }
    //   })
    // }
  }
}
