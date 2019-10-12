import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Button, Flex } from 'antd-mobile';
import { formatMoney } from 'libs/tools';
import TranAccount from './tranAccount';
import router from 'umi/router';
import ASP from 'assets/img/ASP@2x.png';
import AGC from 'assets/img/AGC@2x.png';
import APR from 'assets/img/APR@2x.png';
import ARJ from 'assets/img/ARJ@2x.png';
import APS from 'assets/img/APS@2x.png';
import styles from 'assets/scss/home/home.scss';

class CreditStatus extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    }
  }

  nextPage = (status) => {
    const { commit: { lastNode = 'N', nodeCode = '' } } = this.props;
    const nodeRouterMap = new Map([
      ['default', '/credit/face'],
      ['NON', '/credit/face'],
      ['APR', '/credit/feedback'],
      ['ASP', '/credit/proofMaterials'],
      ['AGC', '/credit/creditCard'],
      ['ARJ', '/credit/feedback'],
      ['APS', '/nearbybranches'],
      ['APL', {
        'FACE': '/credit/face',
        'IDENTITY': '/credit/idCard',
        'PERSONINFO': '/credit/personal',
        'JOBINFO': '/credit/job',
        'CARD': '/credit/bankAccount',
        'CONTACT': '/credit/contact',
        'MATERIAL': '/credit/proofMaterials',
        'REPTILE': '/credit/additionalInfo',
      }]
    ]);
    if (!nodeRouterMap.get(status) || lastNode !== 'N') return;
    status === 'APL'
      ? router.push(nodeRouterMap.get(status)[nodeCode])
      : router.push(nodeRouterMap.get(status));
  };

  toggleHidden = (visible) => {
    this.setState({
      visible
    })
  };

  creditStatus = () => {
    const { applSummary, blank: [activity = {}] } = this.props;
    const { applState = 'NON' } = applSummary;
    const components = new Map();
    // 未登录
    components
      .set('default', (
        <>
          <p className={styles['borrow-status']}>Available Credit</p>
          <div className={styles['borrow-money-wrap']}>
            <span className={styles['borrow-unit']}>Rp</span>
            <span className={styles['borrow-money-con']}>{formatMoney(activity['activityName'])}</span>
          </div>
          <p className={styles['borrow-rate-desc']}>Comprehensive rates only {activity['activityContent']} Per Day</p>
          <Button className={styles['borrow-btn']} type={'primary'}>Borrow Now</Button>
        </>
      ))
      // 登录未授信
      .set('NON', (
        <>
          <p className={styles['borrow-status']}>Available Credit</p>
          <div className={styles['borrow-money-wrap']}>
            <span className={styles['borrow-unit']}>Rp</span>
            <span className={styles['borrow-money-con']}>{formatMoney(activity['activityName'])}</span>
          </div>
          <p className={styles['borrow-rate-desc']}>Comprehensive rates only {activity['activityContent']} Per Day</p>
          <Button className={styles['borrow-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>Borrow Now</Button>
        </>
      ))
      // 申请中
      .set('APL', (
        <>
          <p className={styles['borrow-status']}>Available Credit</p>
          <div className={styles['borrow-money-wrap']}>
            <span className={styles['borrow-unit']}>Rp</span>
            <span className={styles['borrow-money-con']}>{formatMoney(activity['activityName'])}</span>
          </div>
          <p className={styles['borrow-rate-desc']}>Comprehensive rates only {activity['activityContent']} Per Day</p>
          <Button className={styles['borrow-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>Borrow Now</Button>
        </>
      ))
      // 授信补充资料
      .set('ASP', (
        <>
          <p className={styles['borrow-status']}>Please update the informantion and Submit your application again</p>
          <div className={styles['borrow-credit-wait']}>
            <img src={ASP} className={styles['borrow-wait-bg']} alt=""/>
          </div>
          <Button className={styles['borrow-waiting-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>Supplement</Button>
        </>
      ))
      // 补充信用卡信息
      .set('AGC', (
        <>
          <p className={styles['borrow-status']}>Please update the informantion and Submit your application again</p>
          <div className={styles['borrow-credit-wait']}>
            <img src={AGC} className={styles['borrow-wait-bg']} alt=""/>
          </div>
          <Button className={styles['borrow-waiting-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>Supplement</Button>
        </>
      ))
      // 授信审核中
      .set('APR', (
        <>
          <p className={styles['borrow-status']}>Your application is under review</p>
          <div className={styles['borrow-credit-wait']}>
            <img src={APR} className={styles['borrow-wait-bg']} alt=""/>
          </div>
          <Button className={styles['borrow-waiting-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>Track My Status</Button>
        </>
      ))
      // 授信拒绝
      .set('ARJ', (
        <>
          <p className={styles['borrow-status']}>Sorry！<br/>
            Your application is unsuccessful</p>
          <div className={styles['borrow-credit-wait']}>
            <img src={ARJ} className={styles['borrow-wait-bg']} alt=""/>
          </div>
          <Button className={styles['borrow-waiting-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>Track My Status</Button>
        </>
      ))
      // 审核通过
      .set('APS', (
        <>
          <p className={styles['borrow-status']}>Your application has been approved
            Please go to AG branches to borrow</p>
          <div className={styles['borrow-credit-wait']}>
            <img src={APS} className={styles['borrow-wait-bg']} alt=""/>
          </div>
          <Button className={styles['borrow-waiting-btn']} onClick={() => this.nextPage(applState)} type={'primary'}>View nearby branches</Button>
        </>
      ));
      // 审核通过
      // .set('APS', (
      //   <>
      //     <p className={styles['borrow-status']}>Available Credit</p>
      //     <div className={styles['borrow-money-wrap']}>
      //       <span className={styles['borrow-unit']}>Rp</span>
      //       <span className={styles['borrow-money-con']}>{formatMoney(applSummary['availableAmt'])}</span>
      //     </div>
      //     <Button className={styles['borrow-btn']} type={'primary'} onClick={() => this.setState({ visible: true })}>Borrow Now</Button>
      //   </>
      // ));
    return components.get(applState);
  };

  render() {
    const { visible } = this.state;
    return (
      <>
        <Flex.Item className={styles['borrow-content-wrap']}>
          {this.creditStatus()}
        </Flex.Item>
        <TranAccount hidden={this.toggleHidden} visible={visible}/>
      </>
    );
  }
}

CreditStatus.propTypes = {
  applSummary: PropTypes.object,
  commit: PropTypes.object,
  blank: PropTypes.array,
};

export default CreditStatus;
