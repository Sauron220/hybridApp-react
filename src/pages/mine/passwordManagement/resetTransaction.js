import React, { Component } from 'react';
import { createForm } from 'rc-form';
import {InputItem, Button } from 'antd-mobile'
import styles from 'assets/scss/mine/resetTransaction.scss';
import Router from 'umi/router';

@createForm()

class ResetTransaction extends Component {
  constructor(props){
    super(props)
    this.toPersonInfo = this.toPersonInfo.bind(this)
  }

  toPersonInfo() {
    Router.push('/mine/passwordManagement/personInfo')
  }

  render() {
    const { form } = this.props;
    const { getFieldProps } = form;
    return (
      <div className={styles.resetTransaction}>

        <InputItem
          {
            ...getFieldProps('resetTransaction', {
              initialValue: '',
              rules: [{ required: false, message: '' }]
            })
          }
          placeholder={'Current Transaction Password'}
          type={'password'}
          maxLength={30}
          className={styles['input-wrap']}
        />

        <Button className={styles.conBtn} onClick={this.toPersonInfo}>Confirm</Button>
        <div className={styles.orStyle}><span className={styles.line}></span><span className={styles.txtStyle}>or</span><span className={styles.line}></span></div>
        <Button className={styles.viaBtn}>Via Verification Code</Button>

      </div>
    )
  }
}

export default ResetTransaction

