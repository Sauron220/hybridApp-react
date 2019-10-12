import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, List, Toast } from 'antd-mobile';
import { checkForm, i18n } from 'libs/tools';
import { Form } from 'component';
import styles from 'assets/scss/credit/idCard.scss';

const TYPE_DATA = [
  { label: 'unemployed', value: 'unemployed' },
  { label: 'unemployed-housewife', value: 'unemployed-housewife' },
  { label: 'freelance', value: 'freelance' },
  { label: 'self-employed', value: 'self-employed' },
  { label: 'Farmer/Fisherman', value: 'Farmer/Fisherman' },
  { label: 'part time', value: 'part time' },
  { label: 'contract', value: 'contract' },
  { label: 'permanent', value: 'permanent' },
  { label: 'entrepreneurs', value: 'entrepreneurs' },
]

const NATURE_DATA = [
  { label: 'Building / Construction', value: 'Building / Construction' },
  { label: 'Hospitality', value: 'Hospitality' },
  { label: 'Health & Medical', value: 'Health & Medical' },
  { label: 'Information Technology', value: 'Information Technology' },
  { label: 'Logistic / Warehouse / Transportation', value: 'Logistic / Warehouse / Transportation' },
  { label: 'Manufacturing', value: 'Manufacturing' },
  { label: 'Government', value: 'Government' },
  { label: 'Education / Training', value: 'Education / Training' },
  { label: 'Banking / Insurance / Other Financial Institutions', value: 'Banking / Insurance / Other Financial Institutions' },
  { label: 'Consumer Goods', value: 'Consumer Goods' },
  { label: 'Police/Army', value: 'Police/Army' },
  { label: 'Art / Media / Communication', value: 'Art / Media / Communication' },
  { label: 'Others', value: 'Others' },
]

const OCCUPATION_DATA = [
  'ACCOUNTANT/CPA',
  'ACTOR/ENTERTAINER',
  'ARMY/NAVY',
  'ARTIST',
  'BANKER',
  'BUSINESS/DIRECTOR/CEO/HOUSEWORKS',
  'CARETAKER',
  'CLERK/EMPLOYEES/STAFF',
  'CONSULTANT',
  'CREW/SEAMAN',
  'DIPLOMAT',
  'DRIVER',
  'DOCTOR/DENTIST',
  'ENGINEER/ENG/ARCHITECTH',
  'FARMER/AGRICULTURE',
  'FISHERMAN',
  'GOVERNMENT OFFICER',
  'HOUSEKEEPER/HOUSEMAKER',
  'HOUSEWIFE',
  'IT',
  'JOURNALIST/REPORTER',
  'LABOR',
  'LAWYER/ATTORNEY/COUNSEL',
  'MECHANIC/FACTORY WORKER',
  'MANUFACTURE WORKER',
  'MUSICIAN',
  'NURSE',
  'PILOT',
  'PRIEST',
  'PROFESSOR/LECTURER/INSTRUCTOR',
  'RESEARCHER',
  'SALESMAN',
  'SCIENTIST',
  'SECRETARY',
  'SPECAILIST',
  'STUDENT/SCHOLAR/PUPIL',
  'TEACHER/EDUCATIOR',
  'TECHNICIAN',
  'WRITER',
  'NONE/BABY/INFANT',
  'OTHER',
]

const YEARS_DATA = [
  { label: 'Less than 3 months', value: 'Less than 3 months' },
  { label: '3-6 months', value: '3-6 months' },
  { label: '6-12 months', value: '6-12 months' },
  { label: '1-2 years', value: '1-2 years' },
  { label: 'More than 2 years', value: 'More than 2 years' },
]

const AVERAGE_DATA = [
  { label: 'Less than Rp 100.000.000,', value: 'Less than Rp 100.000.000,' },
  { label: 'More than Rp100.000.000', value: 'More than Rp100.000.000' },
]

const mapIptArr = [
  {
    name: 'typeWork',
    label: i18n('job.form.type'),
    data: TYPE_DATA,
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'industry',
    label: i18n('job.form.nature'),
    data: NATURE_DATA,
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'rank',
    label: i18n('job.form.occupation'),
    data: OCCUPATION_DATA,
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'companyName',
    label: i18n('job.form.name'),
    type: 'text',
    compType: 'input',
  },
  {
    name: 'companyAddress',
    label: i18n('job.form.address'),
    type: 'text',
    compType: 'input',
  },
  {
    name: 'officeNumber',
    label: i18n('job.form.phone'),
    type: 'number',
    compType: 'input',
  },
  {
    name: 'durationWork',
    label: i18n('job.form.years'),
    data: YEARS_DATA,
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'salary',
    label: i18n('job.form.average'),
    data: AVERAGE_DATA,
    cols: 1,
    compType: 'picker'
  },
]

const bindEvents = (items, vm) => {
  return items.map((v) => {
    if (v.name && v.name === 'companyAddress') {
      return {
        ...v,
        extra: <span className={'iconfont icondingwei'} style={{ fontSize: 20, color: '#2756D7' }}></span>,
        onExtraClick: () => vm.onExtraClick(v),
      }
    }
    return v
  })
};

@connect(({ job, app }) => ({ job, app }))
@createForm()
class Job extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/option',
      payload: 'job_industry_AG',
    })
    dispatch({
      type: 'app/option',
      payload: 'job_rank_AG',
    })
    dispatch({
      type: 'app/option',
      payload: 'work_type_AG',
    })
    dispatch({
      type: 'app/option',
      payload: 'working_duration_AG',
    })
    dispatch({
      type: 'app/option',
      payload: 'job_salary_AG',
    })
  }

  validateForm = () => {
    const { form } = this.props;
    checkForm(form, mapIptArr).then(res => {
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
    //     segmentName: '工作信息认证',
    //     segmentValue: [{
    //       "officeNumber": "566365889",
    //       "companyName": "Lenove",
    //       "typeWork": "entrepreneurs",
    //       "companyAddress": "Shanghai Pudong, No.169 Shengxia Road",
    //       "salary": ">Rp.417 Juta",
    //       "industry": "Government",
    //       "durationWork": "more than 5 years",
    //       "rank": "CARETAKER"
    //     }],
    //   },
    // })
    // return;

    dispatch({
      type: 'app/commit',
      payload: {
        segmentName: '工作信息认证',
        segmentValue: [{
          companyAddress: data.companyAddress,
          companyName: data.companyName,
          durationWork: data.durationWork.join(' '),
          industry: data.industry.join(' '),
          officeNumber: data.officeNumber,
          rank: data.rank.join(' '),
          salary: data.salary.join(' '),
          typeWork: data.typeWork.join(' '),
        }],
      },
    }).then((res) => {
      res !== false && Router.replace('/credit/bankAccount')
    })
  }

  onExtraClick = (v) => {
    console.log('onExtraClick', v)
    const { dispatch } = this.props;
    dispatch({
      type: 'job/getMapLocation',
      payload: {},
    }).then((res) => {
      if (res !== false) {
        this.setFormItem('companyAddress', res.addrInfo)
      }
    })
  };

  setFormItem = (key, value) => {
    const { form } = this.props;
    if (key) {
      form.setFieldsValue({
        [key]: value
      })
    }
    return this
  };

  render() {
    const { form, app } = this.props;
    const formItem = bindEvents(mapIptArr, this);

    formItem[0]['data'] = app['job_rank_AG'] || [];
    formItem[1]['data'] = app['job_industry_AG'] || [];
    formItem[2]['data'] = app['work_type_AG'] || [];
    formItem[6]['data'] = app['working_duration_AG'] || [];
    formItem[7]['data'] = app['job_salary_AG'] || [];

    return (
      <div className={styles.creditCard}>
        <List>
          <Form form={form} formItem={formItem} />
        </List>
        <Button type={'primary'} className={styles.continueBtn} onClick={this.validateForm}>{i18n('continue')}</Button>
      </div>
    )
  }
}

export default Job;
