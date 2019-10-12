import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, Toast } from 'antd-mobile';
import { checkForm, i18n } from 'libs/tools';
import styles from 'assets/scss/credit/setPassword.scss';

/**
 * 非 6 位相同数字，非 6 位连续数字
 */
function checkPassword(password) {
  if (password.length < 6) return false
  let count = 1
  let checked = false
  let val = String(password)
  for (let i = 0; i < val.length; i++) {
    if (Math.abs(val[i] - val[i - 1]) === 1) {
      count++
    }
    if (i !== 0 && val[i] !== val[i - 1]) {
      checked = true
    }
  }
  return !(count === 6 || !checked)
}

const tips = {
  '1': {
    title: i18n('setPassword.tips.title'),
    label: i18n('setPassword.tips.label'),
  },
  '2': {
    title: i18n('setPassword.tips.title2'),
  },
}

@connect(({ setPassword, app }) => ({ setPassword, app }))
@createForm()
class SetPassword extends Component {

  state = {
    value: '',
    count: 1,
    password: '',
    newPassword: '',
  }

  sendFormData = () => {
    const { count, value } = this.state
    if (count === 1) {
      if (!checkPassword(value)) {
        Toast.info('Weak passwords cannot work such as same numbers and consective numbers.', 1)
        return
      }
      this.setState({ password: value, count: 2, value: '' })
    } else if (count === 2) {
      if (value !== this.state.password) {
        Toast.info(i18n('setPassword.toast.diff'), 1)
        this.setState({ password: '', count: 1, value: '' })
        return
      }
      this.setState({ newPassword: value, value: '' }, () => {
        this.setPassword({
          password: value,
        })
      })
    }
  };

  onChange = (e) => {
    const value = e.target.value.substr(0, 6)
    this.setState({ value })
  };

  setPassword = (data) => {
    if (!data.password) return;
    const { dispatch, app } = this.props;

    // test
    // dispatch({
    //   type: 'setPassword/password',
    //   payload: {"password":"Eo9t/zc7B2R5Oip7GAVPSLCuc14SrMDXlEDVKCx+HTbTlBxPVm6lvze6r6Ew/1SHBvlfoRIPxGNe7nlJwep03OxCyH2uvHIsR6kJmaALEJz8sR0qR1i8kpHM8NxutFmutxYiIRPY5mjEpWN9NlsML2d4L9C+fZYga2n2dSPDELPtEIbhpaVwTW+mkF2kOdj860dMXFHH5QF8D5g8rGEIWRa8dZJ2cAp1r12SU+/XFAgmr9OgrrTqlE9e4W3PhVxxvfT5/y3fdn/9iyt6GpeBRxj6BjlBSCjUlv67acb1BkgwL83pD389CwT1e2w763axbjNk+EB+IfKPJRizCRAu8g==","pwdType":"T"},
    // }).then((res) => {
    //   console.log(111, res)
    //   // this.commit()
    // })
    // return

    dispatch({
      type: 'setPassword/password',
      payload:  {
        password: data.password,
        pwdType: 'T',
      },
    }).then((res) => {
      res !== false && this.commit()
    })
  };

  commit = (data) => {
    const { dispatch, location, app } = this.props;
    const { userInfo } = app;
    const { query = {} } = location;

    dispatch({
      type: 'app/commit',
      payload: {
        segmentName: '收款银行卡',
        segmentValue: [{
          cdKey: '',
          certNo: query.certNo,
          mobileNo: userInfo.mobileNo,
          smsChannel: '',
          smsCode: '',
        }],
      },
    }).then((res) => {
      dispatch({
        type: 'app/updateUserInfo',
        payload: {
          custNo: res.custNo,
        },
      }).then((res) => {
        res !== false && Router.replace('/credit/contact')
      })
    })
  };

  render() {
    const { count, value } = this.state
    const keys = [...new Array(6)].map((_, i) => i)
    const { title, label } = tips[count]

    return (
      <div className={styles.setPassword}>
        <div className={styles.tips}>
          <div className={styles.title}>{title}</div>
          {label && <div className={styles.label}>{label}</div>}
        </div>
        <div className={styles.password}>
          <div className={styles.numbers}>
            {keys.map((v) => {
              return <div key={v} className={styles.number}>
                {value.length >= (v + 1) && <div className={styles.dot}></div>}
              </div>
            })}
          </div>
          <input className={styles.input} value={value} maxLength={6} type="tel" onChange={this.onChange} />
        </div>
        <Button type={'primary'} className={styles.continueBtn} onClick={this.sendFormData}>{i18n('continue')}</Button>
      </div>
    )
  }
}

export default SetPassword;
