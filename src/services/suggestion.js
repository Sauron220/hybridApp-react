import axios from 'libs/api.request';

export const questionFeedBack = (data) => {
  return axios.request({
    url: 'crm-foreign-api/crmQuestionFeedback',
    method: 'POST',
    data,
  })
};
