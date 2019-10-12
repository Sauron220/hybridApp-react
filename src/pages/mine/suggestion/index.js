import React, { Component } from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { List, Toast, Button, InputItem } from 'antd-mobile';
import Form from 'component/Form';
import { invoke } from 'libs/native';
// import Router from 'umi/router';
import { checkForm, alertErr, formatDate, md5Data } from 'libs/tools';
import PhotoSwipe from 'component/PhotoSwipe';
import Scroll from 'component/Scroll';
import styles from 'assets/scss/mine/suggestion.scss';

const mapFormItem = [
  {
    label: 'Please select the target function',
    name: 'feedbackFunction',
    data: [
      {
        label: 'Credit',
        value: 'Credit',
        children: [
          { label: 'Video Verification', value: 'Video Verification' },
          { label: 'Identity Information', value: 'Identity Information' },
          { label: 'Personal Information', value: 'Personal Information' },
          { label: 'Job Information', value: 'Job Information' },
          { label: 'Bank Account Information', value: 'Bank Account Information' },
          { label: 'Transaction Password', value: 'Transaction Password' },
          { label: 'Contact Information', value: 'Contact Information' },
          { label: 'Proof Materials', value: 'Proof Materials' },
          { label: 'Additional Information', value: 'Additional Information' },
        ]
      },
      { label: 'Borrow', value: 'Borrow' },
      { label: 'Repay', value: 'Repay' },
      { label: 'Bank Account Management', value: 'Bank Account Management' },
      { label: 'Password Management', value: 'Password Management' },
      { label: 'Promotion', value: 'Promotion' },
      { label: 'Language', value: 'Language' },
      { label: 'Other', value: 'Other' },
    ],
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'suggestion.target') },
      ]
    },
    cols: 2,
    compType: 'picker',
  },
  {
    name: 'feedbackType',
    label: 'Please select a feedback type',
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'suggestion.feedback') },
      ]
    },
    data: ['Error', 'Question', 'Suggestion'],
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'feedbackDate',
    label: 'Crash Time',
    mode: 'datetime',
    formatType: 'hm',
    rules: {
      initialValue: new Date(),
      rules: [
        { required: true, message: '' },
      ],
    },
    condition: 'feedbackType,Error',
    compType: 'datePicker',
  },
  {
    name: 'content',
    label: 'Description',
    placeholder: 'Describe your issue using at least 10 characters so that we can help troubleshoot your issue',
    count: 300,
    rows: 5,
    rules: {
      rules: [
        { required: true, min: 10, message: alertErr('fillError', 'suggestion.description') }
      ]
    },
    compType: 'textarea',
  },
  { name: 'remarks' }
];

@connect(({ suggestion }) => ({ suggestion }))
@createForm()
class Suggestion extends Component {
  state = {
    files: [],
    multiple: true,
    limit: 4,
    loading: false,
  };

  onChange = (files) => {
    this.setState(files);
  };

  validateForm = async () => {
    const { form, dispatch, location } = this.props;
    const { files } = this.state;
    const { mobileNo: custMobile = '' } = await invoke('getUserParams')() || {};
    const { custNo: custid = '' } = await invoke('getPubParams')() || {};
    const { query: { feedbackSource = '' } } = location;
    checkForm(form, mapFormItem).then(res => {
      let { feedbackDate, feedbackFunction, feedbackType } = res;
      let imgArray = files.map(item => item.url);
      feedbackDate = formatDate(feedbackDate, 'hm');
      feedbackFunction = feedbackFunction.join('-');
      feedbackType = feedbackType.join('');
      let payload = {
        ...res,
        custid,
        custMobile,
        feedbackDate,
        feedbackFunction,
        feedbackType,
        feedbackSource,
        imgArray,
        keycode: md5Data(res.content+res.feedbackType)
      };
      this.setState({ loading: true });
      // 数据上传
      dispatch({
        type: 'suggestion/sendQuestion',
        payload
      }).then(res => {
        if (!res) { this.setState({ loading: false }); return }
        Toast.info('Success', 1, () => {
          // Router.goBack()
          invoke('backNativeView')()
        });
      });
    }).catch(err => {
      Toast.info(err, 1);
    })
  };

  render () {
    const { form } = this.props;
    const { getFieldProps } = form;
    const { files, multiple, limit, loading } = this.state;
    return (
      <Scroll>
        <div className={styles['suggestion-wrap']}>
          <Form form={form} formItem={mapFormItem} />
          <List
            renderHeader={() =>
              <div className={styles['label-name']}>
                <span>Screenshots for troubleshooting(Optional)</span>
                <span style={{ float: 'right', marginRight: 20 }}>{files.length}/4</span>
              </div>}
            renderFooter={() => <div className={styles['upload-img-type']}><span>PNG,JPG,JPEG files，≤2M.</span></div>}
          >
            <PhotoSwipe
              files={files}
              multiple={multiple}
              limit={limit}
              onChange={this.onChange}
            />
          </List>
          <List
            renderHeader={() => <div className={styles['label-name']}><span>Contact (Optional)</span></div>}
          >
            <InputItem
              {
                ...getFieldProps('remarks', {
                  initialValue: '',
                  rules: [{ required: false, message: '' }]
                })
              }
              placeholder={'Please enter your phone number'}
              type={'tel'}
              maxLength={30}
              className={styles['input-wrap']}
            />
          </List>
          <Button loading={loading} disabled={loading} onClick={this.validateForm} className={styles['complete-btn']} type={'primary'}>Complete</Button>
        </div>
      </Scroll>
    )
  }
}

export default Suggestion;
