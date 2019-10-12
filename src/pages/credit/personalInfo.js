import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import Form from 'component/Form';
import Scroll from 'component/Scroll';
import { Button, Toast } from 'antd-mobile';
import { checkForm, i18n, alertErr, convertAddress } from 'libs/tools';
import { createForm } from 'rc-form';
import address from '_conf/address.json';
import styles from 'assets/scss/credit/personalInfo.scss';

const mapFormItem = [
  {
    title: 'Residence',
  },
  {
    name: 'address',
    label: i18n('province'),
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'province') }
      ]
    },
    data: [
      ...convertAddress(address),
    ],
    cols: 3,
    iconType: 'icondingwei',
    iconText: 'GPS',
    clickEvent: () => {
      return {
        // address: 'province',
        // residenceCity: '212',
      }
    },
    compType: 'picker',
  },
  {
    name: 'residenceCity',
    label: i18n('domicile'),
    rules: {
      initialValue: '',
      rules: [
        { required: true, message: alertErr('fillError', 'domicile') },
      ]
    },
    type: 'text',
    compType: 'input',
  },
  {
    name: 'residenceStatus',
    label: i18n('houseStatus'),
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'houseStatus') },
      ]
    },
    cols: 1,
    data: [
      // { label: 'value', value: '1' },
    ],
    compType: 'picker',
  },
  {
    name: 'rent',
    label: i18n('rent'),
    rules: {
      rules: [
        { required: true, message: alertErr('fillError', 'rent') },
      ],
    },
    condition: 'residenceStatus,rent',
    type: 'number',
    compType: 'input',
  },
  {
    title: i18n('others'),
  },
  {
    name: 'education',
    label: i18n('education'),
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'education') }
      ]
    },
    data: [
      // { label: 'COLLEGE', value: 'COLLEGE' },
    ],
    cols: 1,
    compType: 'picker',
  },
  {
    name: 'email',
    label: i18n('email'),
    rules: {
      initialValue: '',
      rules: [
        { required: true, type: 'email', message: alertErr('fillError', 'email') },
      ]
    },
    type: 'text',
    compType: 'input',
  },
  {
    name: 'motherMaidenName',
    label: i18n('motherName'),
    rules: {
      initialValue: '',
      rules: [
        { required: true, message: alertErr('fillError', 'motherName') },
      ]
    },
    type: 'text',
    compType: 'input',
  },
  {
    name: 'sourceFund',
    label: 'Source of Repayment',
    rules: {
      rules: [
        { required: true, message: 'Please choose Others-Source of Repayment correctly.' }
      ]
    },
    data: [
      // { label: 'Business Income', value: 'Business Income' },
      // { label: 'Parents', value: 'Parents' },
      // { label: 'Husband/Wife', value: 'Husband/Wife' },
      // { label: 'Heritage/Grant', value: 'Heritage/Grant' },
      // { label: 'Salary/Pension Fund', value: 'Salary/Pension Fund' },
      // { label: 'Investment/Commissioners Fee', value: 'Investment/Commissioners Fee' },
      // { label: 'Other', value: 'Other' },
    ],
    cols: 1,
    compType: 'picker',
  },
  {
    name: 'fundOther',
    label: i18n('others'),
    rules: {
      rules: [
        { required: true, message: alertErr('fillError', 'others') },
      ],
    },
    condition: 'sourceFund,Other',
    type: 'text',
    compType: 'input',
  },
];

@connect(({ personal, app }) => ({ personal, app }))
@createForm()
class PersonInfo extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/option',
      payload: 'education_status_AG',
    });
    dispatch({
      type: 'app/option',
      payload: 'job_income_type_AG',
    });
    dispatch({
      type: 'app/option',
      payload: 'residence_status_AG',
    })
  }

  clickEvent = () => {
    const { dispatch, form } = this.props;
    const { setFieldsValue } = form;
    dispatch({
      type: 'personal/getMapLocation',
    }).then((res) => {
      if (res !== false) {
        setFieldsValue({
          residenceCity: res.addrInfo,
        })
      }
    });
    return {}
  };

  sendFormData = () => {
    const { form } = this.props;
    checkForm(form, mapFormItem).then(res => {
      // Toast.info(JSON.stringify(res), 1);
      this.commit(res)
    }).catch(err => {
      Toast.info(err, 1);
    })
  };

  commit = (data) => {
    const { dispatch } = this.props;

    // test
    // dispatch({
    //   type: 'app/commit',
    //   payload: {
    //     segmentName: '个人信息认证',
    //     segmentValue: [{
    //       "motherMaidenName": "Steven",
    //       "education": "Master or higher",
    //       "fundOther": "Make money myself",
    //       "sourceFund": "Other",
    //       "residenceCity": "Batee, KAB. PIDIE, ACEH",
    //       "rent": "1000",
    //       "email": "ph_experience@outlook.com",
    //       "address": "Shanghai Pudong, No. 150 Hongsheng East Road",
    //       "residenceStatus": "rent"
    //     }],
    //   },
    // })
    // return;

    dispatch({
      type: 'app/commit',
      payload: {
        segmentName: '个人信息认证',
        segmentValue: [{
          address: data.address.join(' '),
          education: data.education.join(' '),
          email: data.email,
          fundOther: data.fundOther,
          motherMaidenName: data.motherMaidenName,
          rent: data.rent,
          residenceCity: data.residenceCity,
          residenceStatus: data.residenceStatus.join(' '),
          sourceFund: data.sourceFund.join(' '),
        }],
      },
    }).then((res) => {
      res !== false && Router.replace('/credit/job')
    })
  };

  render() {
    const { form, app } = this.props;

    mapFormItem[1].clickEvent = this.clickEvent;
    mapFormItem[3]['data'] = app['residence_status_AG'] || [];
    mapFormItem[6]['data'] = app['education_status_AG'] || [];
    mapFormItem[9]['data'] = app['job_income_type_AG'] || [];

    return (
      <Scroll>
        <div className={styles['personal-info-wrap']}>
          <Form formItem={mapFormItem} form={form} />
          <Button className={styles['continueBtn']} onClick={this.sendFormData} type={'primary'}>Continue</Button>
        </div>
      </Scroll>
    )
  }
}

export default PersonInfo;
