import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import store from 'store'
import { queryCrmHelp, queryCrmHelpQuestion, queryCrmHelpByName, queryCrmHelpAnswer } from 'services/help';

const defaultFilter = ['Down Payment', 'Open AG Account'];

export default modelExtend(model, {
  namespace: 'help',
  state: {
    filter: store.get('filter') || defaultFilter || [],
    searchList: [],
    typeList: [],
    questionList: [],
    detail: {},
  },
  effects: {
    *queryCrmHelpByName ({ payload }, { put, call }) {
      const resData = yield call(queryCrmHelpByName, payload);
      if (!resData) return;
      const { result = [] } = resData.data || {};
      yield put({
        type: 'updateState',
        payload: {
          searchList: result,
        }
      });
    },
    *queryCrmHelp ({ payload }, { put, call }) {
      const resData = yield call(queryCrmHelp, payload);
      if (!resData) return;
      const { result = [] } = resData.data || {};
      yield put({
        type: 'updateState',
        payload: {
          typeList: result,
        }
      });
    },
    *queryCrmHelpQuestion ({ payload }, { put, call }) {
      yield put({ type: 'updateState', payload: { questionList: [] } });
      const resData = yield call(queryCrmHelpQuestion, payload);
      if (!resData) return;
      const { result = [] } = resData.data || {};
      yield put({
        type: 'updateState',
        payload: {
          questionList: result,
        }
      });
    },
    *queryCrmHelpAnswer ({ payload }, { put, call }) {
      yield put({ type: 'updateState', payload: { detail: {} } });
      const resData = yield call(queryCrmHelpAnswer, payload);
      if (!resData) return;
      const { result = {} } = resData.data || {};
      yield put({
        type: 'updateState',
        payload: {
          detail: result,
        }
      });
    },
  },
  reducers: {
    filter(state, { payload }) {
      store.set('filter', payload);
      return { ...state, filter: payload }
    },
  }
})
