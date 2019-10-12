import React, {Component} from 'react'
import { List, Button } from 'antd-mobile'
import styles from 'assets/scss/credit/proofMaterials.scss'
import { connect } from 'dva';
import Router from 'umi/router';
import { i18n } from 'libs/tools';


const Item = List.Item;
const Brief = Item.Brief;

@connect(({ proofMaterials }) => ({ proofMaterials }))

class ProofMaterials extends Component {

  nextPage = () => {
    const { proofMaterials } = this.props;
    this.commit(proofMaterials);
  }

  commit = (data) => {
    const { dispatch } = this.props;

    // test
    // dispatch({
    //   type: 'app/commit',
    //   payload: {
    //     segmentName: '材料补充',
    //     segmentValue: [{
    //       bankPicList: ["FNfbca469be84a4b398d6469fe8c5c728f"],
    //       jobPicList: ["FN7a1ba1182a484ca28eee3a212f9fffbc"],
    //       npwpNo: "142536789014253",
    //       npwpPicList: ["FNd022b811109843deb3999a5a73bca933"],
    //     }],
    //   },
    // })
    // return;

    dispatch({
      type: 'app/commit',
      payload: {
        segmentName: '材料补充',
        segmentValue: [{
          bankPicList: data.bankPicList || [],
          jobPicList: data.jobPicList || [],
          npwpNo: data.npwpNo || '',
          npwpPicList: data.npwpPicList || [],
        }].map((v) => (v.npwpNo && v.npwpPicList.length > 0 ? v : { bankPicList: v.bankPicList, jobPicList: v.jobPicList })),
      },
    }).then((res) => {
      res !== false && Router.replace('/credit/additionalInfo')
    })
  };

  render () {
    return (
      <div className={styles.proofMaterials}>
        <List onClick={ ()=>{ Router.push('/credit/bankStatement')} }>
          <Item extra={
            (
              <React.Fragment>
                <i className={`iconfont iconshangchuan ${styles.plusIcon}`}></i>
              </React.Fragment>
            )
          } align="middle" multipleLine>
            <span className={styles.titCon}>Bank Statement</span> <span className={styles.asterisk}>*</span> <Brief>Already Uploaded</Brief>
          </Item>
        </List>
        <List onClick={ ()=>{ Router.push('/credit/jobProof')} }>
          <Item extra={
            (
              <React.Fragment>
                <i className={`iconfont iconshangchuan ${styles.plusIcon}`}></i>
              </React.Fragment>
            )
          } align="middle" multipleLine>
            <span className={styles.titCon}>Proof of Job </span> <span className={styles.asterisk}>*</span> <Brief>Already Uploaded</Brief>
          </Item>
        </List>

        <List  onClick={ ()=>{ Router.push('/credit/NPWP')} }>
          <Item extra={
            (
              <React.Fragment>
                <i className={`iconfont iconshangchuan ${styles.plusIcon}`}></i>
              </React.Fragment>
            )
          } align="middle" multipleLine>
            <span className={styles.titCon}>NPWP</span>
          </Item>
        </List>

        <p className={styles.tipStyle}>*means mandatory document  you need to upload</p>

        <Button type={'primary'} className={styles.uploadBtn} onClick={this.nextPage}>{i18n('continue')}</Button>

      </div>
    )
  }
}

export default  ProofMaterials
