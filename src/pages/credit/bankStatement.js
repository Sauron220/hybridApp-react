import React, {Component} from 'react'
import { connect } from 'dva';
import styles from 'assets/scss/credit/bankStatement.scss'
import { Button } from 'antd-mobile';
import Router from 'umi/router';
import PhotoSwipe from 'component/PhotoSwipe';
import { files2Payload } from 'libs/tools';

@connect(({ proofMaterials }) => ({ proofMaterials }))
class BankStatement extends Component{
  state = {
    files: [],
    multiple: true,
    limit: 20,
  };

  onChange = (files) => {
    this.setState(files);
  };

  nextPage = () => {
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
              bankPicList: res,
            },
          })
          Router.goBack()
        }
      })
    }
  };

  render () {
    const { files, multiple, limit} = this.state;
    return (
      <div className={styles.bankStatement}>
        <div className={styles.jobCon}>
          <p className={styles.tit}>Bank Statement</p>
          <p className={styles.tip}>Name/date/seal should be included.</p>
          <PhotoSwipe
            files={files}
            multiple={multiple}
            limit={limit}
            onChange={this.onChange}
          />
        </div>
        <p className={styles.bottomText}>PNG,JPG,JPEG files，≤2M</p>
        <Button type={'primary'} className={styles.uploadBtn} onClick={this.nextPage}>Upload</Button>
      </div>
    )
  }
}

export default BankStatement
