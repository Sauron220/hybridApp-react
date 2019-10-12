import React, {Component} from 'react'
import Router from 'umi/router';
import { Accordion, List, Button, Modal } from 'antd-mobile'
import {connect} from 'dva'
import styles from 'assets/scss/credit/additionalInfo.scss'
const alert = Modal.alert;

@connect(({ additionalInfo }) => ({ additionalInfo }))

class AdditionalInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      socialNum: 0,
      EcommerceNum: 0,
      travelNum: 0
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'additionalInfo/reptileQuery',
      payload: {},
    })
  }

  // 提交判断
  alertFun() {
    alert('', 'We recommend you to fill more information to increase credit line.', [
      { text: 'Fill', onPress: () => console.log('cancel') },
      {
        text: 'Submit',
        onPress: () =>
          new Promise((resolve) => {

          }),
      },
    ])
  }

  onClick = (name) => {
    this.props.dispatch({
      type: 'additionalInfo/startTdDataBox',
      payload: name,
    })
  }

  nextPage = () => {
    this.commit({});
  }

  commit = (data) => {
    const { dispatch, additionalInfo } = this.props;
    const { reptileDetail } = additionalInfo;
    const segmentValue = Object.keys(reptileDetail)
      .filter((v) => reptileDetail[v] && reptileDetail[v]['message'])
      .map((v) => ({
        platform: `${v}_phl`,
        taskId: reptileDetail[v]['message'],
        taskUse: 'APPL',
      }));

    console.log('segmentValue', segmentValue)

    dispatch({
      type: 'app/commit',
      payload: {
        segmentName: '信息加油',
        segmentValue,
      },
    }).then((res) => {
      res !== false && Router.replace('/credit/feedback')
    })
  };

  render (){
    let tit1 = (
      <React.Fragment>
        <p className={styles.titName}>Social</p>
        <p className={styles.titNum}>{this.state.socialNum}/4 enabled</p>
      </React.Fragment>
    )
    let tit2 = (
      <React.Fragment>
        <p className={styles.titName}>E-commerce</p>
        <p className={styles.titNum}>{this.state.EcommerceNum}/4 enabled</p>
      </React.Fragment>
    )
    let tit3 = (
      <React.Fragment>
        <p className={styles.titName}>Travel</p>
        <p className={styles.titNum}>{this.state.travelNum}/4 enabled</p>
      </React.Fragment>
    )
    const items = [{name:'FaceBook',id:1},{name:'Instagram',id:2},{name:'WhatsApp',id:3},{name:'Linkedin',id:4}]

    return (
      <div className={styles.additionalInfo}>
        <Accordion>
          <Accordion.Panel header={tit1} className={styles.mB20}>
            <List>
              {
                items.map(item => {
                  return (<List.Item key={item.id} onClick={_ => this.onClick(item.name)}><span className={styles.nameStyle}>{item.name}</span><i className={`iconfont iconlink ${styles.iconStyle} ${styles.iconChecked}`}></i></List.Item>)
                })
              }
            </List>
          </Accordion.Panel>

          <Accordion.Panel header={tit2} className={styles.mB20}>
            <List>
              <List.Item><span className={styles.nameStyle}>11</span><i className={`iconfont iconlink ${styles.iconStyle} ${styles.iconChecked}`}></i></List.Item>
            </List>
          </Accordion.Panel>

          <Accordion.Panel header={tit3} className={styles.mB20}>
            <List>
              <List.Item><span className={styles.nameStyle}>11</span><i className={`iconfont iconlink ${styles.iconStyle} ${styles.iconChecked}`}></i></List.Item>
            </List>
          </Accordion.Panel>
        </Accordion>

        <Button className={styles.uploadBtn} onClick={this.nextPage}>Upload</Button>
      </div>
    )
  }
}

export default AdditionalInfo
