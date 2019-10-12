import modelExtend from 'dva-model-extend';
import { model } from 'libs/model';
import { invoke } from 'libs/native';

export default modelExtend(model, {
  namespace: 'app',
  state: {
    // 账号概要
    applSummary: {},

    // 授信节点信息
    commit: {
      flowNo: '',
    },

    // 下拉配置项
    residence_status_AG: [],
    education_status_AG: [],
    marriage_type_AG: [],
    job_industry_AG: [],
    work_type_AG: [],
    job_rank_AG: [],
    working_duration_AG: [],
    job_income_type_AG: [],
    job_salary_AG: [],
    contact_relationship_AG: [],
    bank_list_AG: [],

    // 用户信息
    userInfo: {
      token: '5e5ff5f28a664f018f3c49b222081169',
      userNo: 'UR7443587063859527680',
      mobileNo: '+6208111222025',
      channelId: 'APK_AG_000_IOS',
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      dispatch({
        type: 'applSummary',
        payload: {},
      }).then((res) => {
        if (res !== false) {
          switch (res.applState) {
            case 'NON':
            case 'APL':
              dispatch({
                type: 'commit',
                payload: {},
              });
            break;
          }
        }
      });
      dispatch({
        type: 'getUserParams',
        payload: {},
      });
    },
  },
  effects: {
    /**
     * 账号概要查询
     */
    *applSummary ({ payload }, { put }) {
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.appl.summary.query',
          payload: { ...payload },
        }
      });
      if (!resData) return false;
      yield put({
        type: 'updateState',
        payload: {
          applSummary: {
            ...resData,
          },
        },
      })
      return resData
    },
    /**
     * 授信节点提交
     * @param {Object} payload 参数对象
     * @param {String} payload.segmentName 段信息名称
     * @param {Array} payload.segmentValue 段信息值列表
     * @param {Any} payload.other 额外的参数
     */
    *commit ({ payload }, { put, select }) {
      // 获取当前传入参数，即将要提交的授信节点参数
      const { segmentName, segmentValue, ...other } = payload;
      // 获取上一节点参数
      const { commit } = yield select(_ => _.app);
      // 审批号、客户号、流程号、节点号、节点码
      const { applNo = '', custNo = '', flowNo, nodeNo, nodeCode } = commit;
      // 段信息列表
      const segmentInfoList = [{
        segmentName,
        segmentCode: nodeCode,
        segmentValue,
      }];
      // 构造请求参数
      const params = {
        applNo,
        custNo,
        flowNo,
        nodeNo,
        nodeCode,
        segmentInfoList,
        ...other,
      };

      // 若 applNo 不存在则移除之
      if (!params.applNo) {
        delete params.applNo
      }

      // 若 custNo 不存在则移除之
      if (!params.custNo) {
        delete params.custNo
      }

      console.log(params, 'commit<<<<<');

      // 授信节点提交，当 flowNo 不存在时，不提交参数
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.appl.item.commit',
          bizContent: flowNo ? params : {},
        },
      });

      if (!resData) return false;

      // 刷新授信节点信息
      yield put({
        type: 'updateState',
        payload: {
          commit: resData,
        },
      });

      return resData
    },
    /**
     * 下拉配置项
     * 枚举: residence_status_AG,education_status_AG,marriage_type_AG,job_industry_AG,work_type_AG,job_rank_AG,working_duration_AG,job_income_type_AG,job_salary_AG,contact_relationship_AG,bank_list_AG
     * 枚举备注: 居住状况，教育状况，婚姻状况，从事行业，工作状况，职业类型，工作时长，工资发放方式，薪水范围，联系人关系类型，银行卡名称列表
     * @param {Object|String} payload 类型
     */
    *option ({ payload }, { put }) {
      const type = typeof payload === 'string' ? payload : payload.type
      const resData = yield put.resolve({
        type: 'request',
        payload: {
          method: 'qihoo.sdk.common.data.option',
          bizContent: { type },
        },
      });

      if (!resData) return false;

      const optionList = resData && resData.optionList || resData || []

      yield put({
        type: 'updateState',
        payload: {
          [type]: optionList,
        },
      });

      return optionList
    },
    /**
     * 获取用户信息
     */
    *getUserParams ({ payload }, { put }) {
      const resData = yield invoke('getUserParams')();
      if (!resData) return false;
      Object.assign(resData, {
        mobileNo: resData.mobile || resData.mobileNo,
      })
      yield put({
        type: 'updateState',
        payload: {
          userInfo: resData,
        },
      });
      console.log(resData, 'resData<<<<<');
      return resData
    },
    /**
     * 更新用户配置信息
     */
    *updateUserInfo ({ payload }, { put, select }) {
      const resData = yield invoke('updateUserInfo')({ bizContent: payload });
      if (resData === false) return false;
      const { userInfo } = yield select(_ => _.app);
      const newUserInfo = {
        ...userInfo,
        ...resData,
      }
      yield put({
        type: 'updateState',
        payload: {
          userInfo: newUserInfo,
        },
      });
      console.log(resData, 'resData<<<<<');
      return { ...newUserInfo, ...resData }
    },
  },
})
