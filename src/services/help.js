import axios from 'libs/api.request';

export const queryCrmHelp = (data) => {
  return axios.request({
    url: 'crm-foreign-api/queryCrmHelp',
    method: 'POST',
    data
  })
};

export const queryCrmHelpQuestion = (data) => {
  return axios.request({
    url: 'crm-foreign-api/queryCrmHelpQuestion',
    method: 'POST',
    data
  })
};

export const queryCrmHelpAnswer = (data) => {
  return axios.request({
    url: 'crm-foreign-api/queryCrmHelpAnswer',
    method: 'POST',
    data
  })
};

export const queryCrmHelpByName = (data) => {
  return axios.request({
    url: 'crm-foreign-api/queryCrmHelpByName',
    method: 'POST',
    data
  })
};