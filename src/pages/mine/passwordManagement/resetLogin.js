import React, { Component } from 'react';
import { createForm } from 'rc-form';
import {InputItem, Button } from 'antd-mobile'
import styles from 'assets/scss/mine/resetLogin.scss';
@createForm()

class ResetLogin extends Component {
  render() {
    const { form } = this.props;
    const { getFieldProps } = form;
    return (
      <div className={styles.resetLogin}>

        <InputItem
          {
            ...getFieldProps('resetPwd', {
              initialValue: '',
              rules: [{ required: false, message: '' }]
            })
          }
          placeholder={'Current Login Password'}
          type={'password'}
          maxLength={30}
          className={styles['input-wrap']}
        />

        <Button className={styles.conBtn}>Confirm</Button>
        <div className={styles.orStyle}><span className={styles.line}></span><span className={styles.txtStyle}>or</span><span className={styles.line}></span></div>
        <Button className={styles.viaBtn}>Via Verification Code</Button>

      </div>
    )
  }
}

export default ResetLogin
