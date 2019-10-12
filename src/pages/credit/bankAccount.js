import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, List, Toast, Modal } from 'antd-mobile';
import { checkForm, i18n, alertErr } from 'libs/tools';
import { Form } from 'component';
import styles from 'assets/scss/credit/idCard.scss';

const mapIptArr = [
  {
    name: 'bankName',
    label: i18n('bankAccount.form.bankName'),
    data: [
      // { label: 1, value: 1 },
    ],
    defaultFieldNames: { label: 'label', value: 'label' },
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'name',
    label: i18n('bankAccount.form.accountName'),
    type: 'text',
    compType: 'input',
  },
  {
    name: 'cardNo',
    rules: {
      rules: [
        { required: true, message: alertErr('fillError', 'bankAccount.form.accountNo') },
        { max: 38, message: '最多可以输入38个英文字母' },
      ],
    },
    label: i18n('bankAccount.form.accountNo'),
    type: 'text',
    compType: 'input',
  },
]

@connect(({ bankAccount, app }) => ({ bankAccount, app }))
@createForm()
class BankAccount extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/option',
      payload: 'bank_list_AG',
    })
  }

  validateForm = () => {
    const { form } = this.props;
    checkForm(form, mapIptArr).then(res => {
      // Toast.info(JSON.stringify(res), 1);
      this.submit(res)
    }).catch(err => {
      Toast.info(err, 1);
    })
  };

  submit = (data) => {
    const { dispatch, app } = this.props;
    const { userInfo } = app;
    const item = data.bankName && app['bank_list_AG'].find((v) => v.label === data.bankName.join(' '))

    // test
    // dispatch({
    //   type: 'bankAccount/submit',
    //   payload: {
    //     "bankCode": "002",
    //     "smsCode": "",
    //     "mobileNo": "+6208111222018",
    //     "branch": "",
    //     "bindType": "1",
    //     "cardNo": "15935725" + Math.ceil(Math.random() * 10000),
    //     "name": "FIGCI ENNWL",
    //     "bankName": "Bank Rakyat Indonesia",
    //     "idType": "1",
    //     "accountType": "",
    //     "templateName": "lps_bindcard_code"
    //   },
    // })
    // return;

    dispatch({
      type: 'bankAccount/submit',
      payload: {
        bankCode: item && item.value,
        smsCode: '',
        mobileNo: userInfo.mobileNo,
        branch: '',
        bindType: '1',
        cardNo: data.cardNo,
        name: data.name,
        bankName: data.bankName.join(' '),
        idType: '1',
        accountType: '',
        templateName: 'lps_bindcard_code',
      },
    }).then((res) => {
      res !== false && Router.replace(`/credit/setPassword?certNo=${res.certNo}`)
    })
  }

  alert() {
    Modal.alert(
      i18n('bankAccount.alert.title'),
      <div>{i18n('bankAccount.alert.reason')}<div>{i18n('bankAccount.alert.times')}</div></div>,
      [{ text: 'Confirm', onPress: () => console.log('Confirm') }]
    )
  };

  render() {
    const { form, app } = this.props;

    mapIptArr[0]['data'] = app['bank_list_AG'] || [];

    return (
      <div className={styles.creditCard}>
        <List>
          <Form form={form} formItem={mapIptArr} />
        </List>
        <Button type={'primary'} className={styles.continueBtn} onClick={this.validateForm}>{i18n('continue')}</Button>
      </div>
    )
  }
}

export default BankAccount;
