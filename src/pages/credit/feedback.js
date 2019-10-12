import React, { Component } from 'react'
import Router from 'umi/router';
import { connect } from 'dva'
import { Button } from 'antd-mobile';
import tip from 'assets/img/feedback1.png'
import styles from 'assets/scss/credit/feedback.scss';

@connect(({ feedback }) => ({ feedback }))

class FeedBack extends Component {
  render () {
    return (
      <div className={styles.feedback}>
        <div className={styles.topHeight}>
          <p className={styles.conHeight}><i className={`iconfont iconjujue ${styles.iconStyle} ${styles.iconjj}`}></i><span className={styles.textStyle}>Sorry! Your application is unsuccessful.</span></p>
          {/*<p className={styles.conHeight}><i className={`iconfont iconbujian ${styles.iconStyle} ${styles.iconbj}`}></i><span className={styles.textStyle}>Please return to the home page for supplementary materials to complete the application.</span></p>*/}
          {/*<p className={styles.conHeight}><i className={`iconfont iconchenggong ${styles.iconStyle} ${styles.iconcg}`}></i><span className={styles.textStyle}>Your application has been approved.Please return to the home page to borrow.</span></p>*/}
          {/*<p className={styles.conHeight}><i className={`iconfont icondengdai ${styles.iconStyle} ${styles.iconda}`}></i><span className={styles.textStyle}>We are reviewing your application.Please note the notification.</span></p>*/}
          <Button className={styles.homeBtn} onClick={() => Router.goBack()}>Back Home</Button>
        </div>
        <div className={styles.imgBg}>
          <img src={tip} alt="" className={styles.tipImg} />
        </div>

        <p className={styles.recommend}><i className="iconfont iconRecommend"></i><span>Recommend</span><i className="iconfont iconRecommend"></i></p>

        <div className={styles.ad}>
            广告位
        </div>
      </div>
    )
  }
}

export default FeedBack
