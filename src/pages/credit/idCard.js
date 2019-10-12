import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, Flex, Toast } from 'antd-mobile';
import { checkForm, i18n, alertErr, formatDate } from 'libs/tools';
import Alert from 'component/Alert';
import Form from 'component/Form';
import Scroll from 'component/Scroll';
import styles from 'assets/scss/credit/idCard.scss';
import idCardBg from 'assets/img/idCard.png';

const mapIptArr = [
  {
    name: 'fullName',
    rules: {
      initialValue: '',
      rules: [
        { required: true, message: alertErr('fillError', 'fullName') },
      ],
    },
    maxLength: 120,
    label: i18n('fullName'),
    type: 'text',
    compType: 'input',
  },
  {
    name: 'idNo',
    rules: {
      initialValue: '',
      rules: [
        { required: true, message: alertErr('fillError', 'ktpNo') },
        { max: 16, message: '最多输入16个数字' },
      ],
    },
    label: i18n('ktpNo'),
    type: 'number',
    compType: 'input',
  },
  {
    name: 'issueDateStr',
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'issuingDate') },
      ],
    },
    label: i18n('issuingDate'),
    compType: 'datePicker',
  },
  {
    name: 'maritalStatus',
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'maritalStatus') },
      ]
    },
    label: i18n('maritalStatus'),
    data: [
      // { label: 'Married', value: 'married' },
      // { label: 'Single', value: 'single' },
      // { label: 'Divorced', value: 'divorced' },
      // { label: 'Widowed', value: 'widowed' },
    ],
    cols: 1,
    compType: 'picker',
  },
  {
    name: 'spouseOccupation',
    label: i18n('spouseOccupation'),
    rules: {
      rules: [
        { required: true, message: alertErr('chooseError', 'spouseOccupation') },
      ]
    },
    cols: 1,
    data: [
      // { label: '银行职员', value: 'yinhang' }
    ],
    condition: 'maritalStatus,Married',
    compType: 'picker',
  }
];

@connect(({ idCard, app }) => ({ idCard, app }))
@createForm()
class IdCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      formData: {},
      mapIptArr,
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/option',
      payload: 'job_rank_AG',
    })
    dispatch({
      type: 'app/option',
      payload: 'marriage_type_AG',
    })
  }

  sendFormData = () => {
    // TODO 上传数据
    console.log(this.state.formData);
    this.commit(this.state.formData)
    // Router.push('/credit/personal');
  };

  validateForm = () => {
    const { form } = this.props;
    checkForm(form, mapIptArr).then(res => {
      res.issueDateStr = formatDate(res.issueDateStr)
      this.setState({
        show: true,
        formData: res,
      });
    }).catch(err => {
      Toast.info(err, 1);
    })
  };

  nextPage = () => {
    const { dispatch, form } = this.props;
    const { setFieldsValue } = form;
    dispatch({
      type: 'idCard/startTakePhoto',
    }).then((res) => {
      if (res !== false) {
        setFieldsValue({
          fullName: res.fullName,
          idNo: res.idNo,
          // issuingDate: undefined,
          maritalStatus: res.maritalStatus,
          // spouseOccupation: res.spouseOccupation,
        })
      }
    });
  };

  commit = (data) => {
    const { dispatch, idCard } = this.props;
    const { ocrData } = idCard;

    Object.assign(data, ocrData, {})

    // test
    // dispatch({
    //   type: 'app/commit',
    //   payload: {
    //     segmentName: '身份信息',
    //     segmentValue: [{
    //       "issueDateStr": "2012-08-29",
    //       "rearMid": "",
    //       "birthPlace": "JAKARTA. 10-09-1992",
    //       "religion": "ISLAM",
    //       "idNo": "317203100998" + Math.ceil(Math.random() * 10000),
    //       "frontMid": "FN2f6a46f104f54f1d9b8cdeb7de368814",
    //       "fullName": "FIGCI ENNWL",
    //       "nationality": "WNI",
    //       "idAddress": "DKI JAKARTA, JAKARTA UTARA, KOJA, TUGU SELATAN, 010/001, JL.KAMPUNGIMANGGA",
    //       "idValidationDateStr": "2025-03-11",
    //       "maritalStatus": "Single",
    //       "idType": "EKTP"
    //     }],
    //   },
    // }).then((res) => {
    //   res !== false && Router.replace('/credit/personal')
    // })
    // return;

    const segmentValue = {
      birthPlace: data.birthPlace,
      frontMid: data.frontMid,
      fullName: data.fullName,
      idAddress: data.idAddress,
      idNo: data.idNo,
      idType: data.idType || 'EKTP',
      idValidationDateStr: data.idValidationDateStr,
      issueDateStr: data.issueDateStr,
      maritalStatus: data.maritalStatus.join(' '),
      nationality: data.nationality,
      rearMid: data.rearMid,
      religion: data.religion || 'ISLAM',
    }

    // 配偶职业
    if (segmentValue.maritalStatus === 'Married') {
      segmentValue.spouseOccupation = data.spouseOccupation
    }

    console.log('segmentValue', segmentValue)

    dispatch({
      type: 'app/commit',
      payload: {
        segmentName: '身份信息',
        segmentValue: [segmentValue],
      },
    }).then((res) => {
      dispatch({
        type: 'app/updateUserInfo',
        payload: {
          realName: data.fullName,
          identityCode: data.idNo,
        },
      }).then((res) => {
        res !== false && Router.replace('/credit/personal')
      })
    })
  };

  render() {
    const { form, idCard, app } = this.props;
    const { getFieldValue } = form;

    mapIptArr[3]['data'] = app['marriage_type_AG'] || [];
    mapIptArr[4]['data'] = app['job_rank_AG'] || [];

    return (
      <Scroll>
        <div className={styles.creditCard}>
          <div className={styles.cardTop}>
            <Flex direction={'column'}>
              <Flex.Item>
                <div className={styles.cardBgWarp}>
                  <img src={idCard.imgStr ? `data:image/png;base64,${idCard.imgStr}` : idCardBg} alt=""/>
                </div>
              </Flex.Item>
              <Flex.Item>
                <Button type={'primary'} className={styles.creditCardBtn} onClick={this.nextPage}>Click to identify</Button>
              </Flex.Item>
            </Flex>
          </div>
          <Form form={form} formItem={mapIptArr} />
          <Alert
            show={this.state.show}
            closeModal={
              () => {
                this.setState({ show: false });
              }
            }
            success={
              () => {
                this.setState({ show: false });
                this.sendFormData();
              }
            }
          >
            <>
              <p className={'modal-desc'}>{i18n('confirmMsg')}</p>
              <h3 className={'modal-con-val'}>{getFieldValue('fullName')}</h3>
              <h3 className={'modal-con-val'}>EKTP {getFieldValue('idNo')}</h3>
            </>
          </Alert>
          <Button type={'primary'} className={styles.continueBtn} onClick={() => this.validateForm()}>{i18n('continue')}</Button>
        </div>
      </Scroll>
    )
  }
}

export default IdCard;
