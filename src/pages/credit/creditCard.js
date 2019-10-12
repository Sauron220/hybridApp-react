import React, { Component } from 'react';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { List, Toast, Button } from 'antd-mobile';
import Form from 'component/Form';
import PhotoSwipe from 'component/PhotoSwipe';
import { alertErr, checkForm } from 'libs/tools';
import styles from 'assets/scss/credit/creditCard.scss';

const mapFormItem = [{
  name: 'Bank Name',
  label: 'Bank Name',
  rules: {},
  data: ['1', '2', '3'],
  cols: 1,
  compType: 'picker',
}, {
  name: 'Account Name',
  label: 'Account Name',
  type: 'text',
  compType: 'input',
}, {
  name: 'Credit Card No.',
  label: 'Credit Card No.',
  type: 'text',
  compType: 'input',
}, {
  name: 'Credit Line',
  label: 'Credit Line',
  type: 'text',
  compType: 'rpFormat',
}, {
  name: 'Billing Address',
  label: 'Billing Address',
  type: 'text',
  compType: 'input',
}, {
  name: 'Issuing Date',
  label: 'Issuing Date',
  mode: 'datetime',
  formatType: 'hm',
  rules: {
    initialValue: '',
    rules: [
      { required: true, message: '' },
    ],
  },
  compType: 'datePicker',
}, {
  name: 'Expire Date',
  label: 'Expire Date',
  mode: 'datetime',
  formatType: 'hm',
  rules: {
    initialValue: '',
    rules: [
      { required: true, message: '' },
    ],
  },
  compType: 'datePicker',
}];

@connect(({ cardInfo }) => ({ cardInfo }))
@createForm()
class CreditCard extends Component {
  state = {
    files: [],
    multiple: true,
    limit: 4,
    files1: [],
    multiple1: true,
    limit1: 4,
    loading: false,
  };

  onChange = (files) => {
    this.setState(files);
  };

  onChange1 = (files) => {
    this.setState(files);
  };

  validateForm = async () => {
    const { form } = this.props;
    checkForm(form, mapFormItem).then(res => {
      console.log(res);
    }).catch(err => {
      Toast.info(err, 1);
    });
  };

  render() {
    const { form } = this.props;
    const { files, multiple, limit, files1, multiple1, limit1, loading } = this.state;
    return (
      <div className={styles.cardInfo}>
        <Form form={form} formItem={mapFormItem}/>
        <List
          renderHeader={() =>
            <div className={styles['label-name']}>
              <span>Credit Card</span>
            </div>
          }
          renderFooter={() =>
            <div className={styles['upload-img-type']}>
              <span>PNG,JPG,JPEG files，≤2M.</span>
            </div>
          }
        >
          <p className={styles.textStyle}>
            Credit Card No./name/issuing date/expire date should be included.
          </p>
          <PhotoSwipe
            files={files}
            multiple={multiple}
            limit={limit}
            onChange={this.onChange}
          />
        </List>
        <List
          renderHeader={() =>
            <div className={styles['label-name']}>
              <span>Credit Card Bill</span>
            </div>
          }
          renderFooter={() =>
            <div className={styles['upload-img-type']}>
              <span>PNG,JPG,JPEG files，≤2M.</span>
            </div>
          }
        >
          <p className={styles.textStyle}>
            Credit card bills for the past three months should be included.
          </p>
          <PhotoSwipe
            files={files1}
            multiple={multiple1}
            limit={limit1}
            onChange={this.onChange1}
          />
        </List>
        <Button
          loading={loading}
          disabled={loading}
          onClick={this.validateForm}
          className={styles['complete-btn']}
          type={'primary'}>Submit</Button>
      </div>
    );
  }
}

export default CreditCard;
