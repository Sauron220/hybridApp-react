import React, {Component} from 'react'
import { connect } from 'dva';
import Router from 'umi/router';
import styles from 'assets/scss/credit/NPWP.scss'
import {Button,Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import Form from 'component/Form';
import { alertErr, checkForm, i18n } from 'libs/tools';
import PhotoSwipe from 'component/PhotoSwipe';
import { files2Payload } from 'libs/tools';

const mapFormItem = [
  {
    name: 'npwpNo',
    label: 'NPWP NO.',
    rules: {
      initialValue: '',
      rules: [
        { required: true, message: alertErr('fillError', 'NPWP NO') },
      ]
    },
    type: 'text',
    compType: 'input',
  }
]

@connect(({ proofMaterials }) => ({ proofMaterials }))
@createForm()
class NPWP extends Component{
  state = {
    files: [],
    multiple: true,
    limit: 20
  };

  validateForm = () => {
    const { form } = this.props;

    checkForm(form, mapFormItem).then(res => {
      console.log('res', res)
      if(res.npwpNo.length < 15) {
        // Toast.info('999', 1);
      } else if(isNaN(Number(res.npwpNo))){
        // Toast.info('888', 1);
      } else {

      }
      this.nextPage(res)
    }).catch(err => {
      Toast.info(err, 1);
    })
  };

  onChange = (files) => {
    this.setState(files);
  };

  nextPage = (data) => {
    const { files } = this.state;
    const payload = files2Payload(files)
    console.log(payload);
    const { dispatch } = this.props;
    if (files.length > 0) {
      dispatch({
        type: 'proofMaterials/upload',
        payload,
      }).then((res) => {
        if (res !== false) {
          dispatch({
            type: 'proofMaterials/updateState',
            payload: {
              npwpNo: data.npwpNo,
              npwpPicList: res,
            },
          })
          Router.goBack()
        }
      })
    }
  };

  render () {
    const { files, multiple, limit} = this.state;
    const { form } = this.props;

    return (
      <div className={styles.npwp}>
        <div className={styles.jobCon}>
          <Form formItem={mapFormItem} form={form}/>
          <p className={styles.tit}>NPWP</p>
          <p className={styles.tip}>Name/NPWP No./address should be included.</p>

          <PhotoSwipe
            files={files}
            multiple={multiple}
            limit={limit}
            onChange={this.onChange}
          />
        </div>
        <p className={styles.bottomText}>PNG,JPG,JPEG files，≤2M</p>
        <Button type={'primary'} className={styles.uploadBtn} onClick={this.validateForm}>Upload</Button>
      </div>
    )
  }
}

export default NPWP
