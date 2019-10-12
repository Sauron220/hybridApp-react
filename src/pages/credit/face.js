import React, { Component } from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { Flex, Button } from 'antd-mobile';
import { i18n } from 'libs/tools';
import styles from 'assets/scss/credit/face.scss';
import group from 'assets/img/Group 2@2x.png';

@connect(({ face }) => ({ face }))
class Credit extends Component {

  nextPage = () => {
    const { dispatch } = this.props;

    // test
    // dispatch({
    //   type: 'app/commit',
    //   payload: {
    //     segmentName: '人脸识别',
    //     segmentValue: [{
    //       "failCode": "undefined",
    //       "detectState": "S",
    //       "faceImage": "",
    //       "faceConsumeTime": "6428",
    //       "facePartner": "ADVANCE",
    //       "livenessId": "3b6064b3-d059-4109-b070-0dbbbb5f0e16"
    //     }],
    //   },
    // }).then((res) => {
    //   res !== false && router.replace('/credit/card')
    // })
    // return;

    dispatch({
      type: 'face/startLiveDetec',
    }).then((res) => {
      if (res !== false) {
        dispatch({
          type: 'app/commit',
          payload: {
            segmentName: '人脸识别',
            segmentValue: [{
              detectState: 'S',
              faceConsumeTime: res.faceConsumeTime,
              facePartner: 'ADVANCE',
              failCode: 'undefined',
              livenessId: res.livenessId,
              faceImage: '',
              fileImageMap: {},
            }],
          },
        }).then((res) => {
          res !== false && router.replace('/credit/card')
        })
      }
    });
  };

  render() {

    return (
      <div className={styles.face}>
        <Flex direction={'column'}>
          <Flex.Item>
            <p className={styles.title}>{i18n('create')} <span className={styles.keys}>{i18n('FaceID')}</span> {i18n('keepAccount')}</p>
            <p className={styles.subTitle}>{i18n('latstFacial')}</p>
          </Flex.Item>
          <Flex.Item>
            <img src={group} alt="" className={styles.groupImg} />
          </Flex.Item>
          <Flex.Item style={{ width: '100%' }}>
            <Button onClick={this.nextPage} type={'primary'} size={'large'} className={styles.btn}>{i18n('startVerification')}</Button>
          </Flex.Item>
          <Flex.Item>
            <p className={styles.desc}>* {i18n('makeSure')}</p>
          </Flex.Item>
        </Flex>
      </div>
    )
  }
}

export default Credit;
