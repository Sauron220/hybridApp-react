import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { createForm } from 'rc-form';
import { Button, Flex, List, Toast } from 'antd-mobile';
import { checkForm, i18n } from 'libs/tools';
import { Form } from 'component';
import styles from 'assets/scss/credit/idCard.scss';

const extra = <span className={'iconfont icontongxunlu'} style={{ fontSize: 20, color: '#2756D7' }}></span>

const RELATIONSHIP_DATA = [
  { label: 'Spouse', value: 'Spouse' },
  { label: 'Friend', value: 'Friend' },
  { label: 'Coworker', value: 'Coworker' },
  { label: 'Boss', value: 'Boss' },
  { label: 'Sibling', value: 'Sibling' },
  { label: 'Parents', value: 'Parents' },
  { label: 'Child', value: 'Child' },
]

const mapIptArr = [
  {
    title: i18n('contact.title1'),
  },
  {
    name: 'name1',
    label: i18n('contact.form.name'),
    type: 'text',
    compType: 'input',
  },
  {
    name: 'relationship1',
    label: i18n('contact.form.relationship'),
    data: [
      // ...RELATIONSHIP_DATA,
    ],
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'mobile1',
    label: i18n('contact.form.mobile'),
    type: 'number',
    compType: 'input',
  },
  {
    title: i18n('contact.title2'),
  },
  {
    name: 'name2',
    label: i18n('contact.form.name'),
    type: 'text',
    compType: 'input',
  },
  {
    name: 'relationship2',
    label: i18n('contact.form.relationship'),
    data: [
      // ...RELATIONSHIP_DATA,
    ],
    cols: 1,
    compType: 'picker'
  },
  {
    name: 'mobile2',
    label: i18n('contact.form.mobile'),
    type: 'number',
    compType: 'input',
  },
];

const bindEvents = (items, vm) => {
  return items.map((v) => {
    if (v.name && v.name.indexOf('name') !== -1) {
      return {
        ...v,
        extra,
        onExtraClick: () => vm.onExtraClick(v),
      }
    }
    return v
  })
};

@connect(({ contact, app }) => ({ contact, app }))
@createForm()
class Contact extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'app/option',
      payload: 'contact_relationship_AG',
    })
    dispatch({
      type: 'contact/getUserLocation',
      payload: {},
    })
  }

  sendFormData = () => {
    const { form } = this.props;
    checkForm(form, mapIptArr).then(res => {
      // Toast.info(JSON.stringify(res), 1);
      this.commit(res)
    }).catch(err => {
      Toast.info(err, 1);
    })
  };

  onExtraClick = (v) => {
    console.log('onExtraClick', v)
    const { dispatch } = this.props;
    dispatch({
      type: 'contact/getContact',
      payload: v.name,
    }).then((res) => {
      if (res !== false) {
        if (v.name === 'name1') {
          this.setFormItem('name1', res.name).setFormItem('mobile1', res.mobile)
        } else if (v.name === 'name2') {
          this.setFormItem('name2', res.name).setFormItem('mobile2', res.mobile)
        }
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

  commit = (data) => {
    const { dispatch } = this.props;
    this.props.dispatch({
      type: 'contact/upload',
      payload: data,
    }).then((res) => {
      if (res !== false) {
        dispatch({
          type: 'app/commit',
          payload: {
            segmentName: '常用联系人',
            segmentValue: [{
              callLogCount: '0',
              contactCount: '0',
              contactNo: '',
              contactSort: '1',
              contactType: 'URGENT',
              mixCallLogCount: '0',
              mixContactCount: '0',
              name: data.name1,
              needCarrier: 'Y',
              relationship: data.relationship1.join(' '),
              telNo: data.mobile1,
            }, {
              callLogCount: '0',
              contactCount: '0',
              contactNo: '',
              contactSort: '2',
              contactType: 'URGENT',
              mixCallLogCount: '0',
              mixContactCount: '0',
              name: data.name2,
              needCarrier: 'Y',
              relationship: data.relationship2.join(' '),
              telNo: data.mobile2,
            }],
          },
        }).then((res) => {
          res !== false && Router.replace('/credit/proofMaterials')
        })
      }
    });
  };

  render() {
    const { form, app } = this.props;
    const formItem = bindEvents(mapIptArr, this)

    formItem[2]['data'] = app['contact_relationship_AG'] || [];
    formItem[6]['data'] = app['contact_relationship_AG'] || [];

    return (
      <div className={styles.creditCard}>
        <List>
          <Form form={form} formItem={formItem} />
        </List>
        <Button type={'primary'} className={styles.continueBtn} onClick={this.sendFormData}>{i18n('continue')}</Button>
      </div>
    )
  }
}

export default Contact;
