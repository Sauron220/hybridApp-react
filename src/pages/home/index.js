import React, { Component } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { Flex, WhiteSpace, WingBlank, Button } from 'antd-mobile';
import Scroll from 'component/Scroll';
import { CreditStatus, NoticeBar, Carousel, GridItem } from './components';
import styles from 'assets/scss/home/home.scss';

@connect(({ home, app }) => ({ home, app }))
class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'home/marketingActivity',
      payload: {},
    });
  }

  render() {
    const { home, app, dispatch } = this.props;
    const {
      homeBanners = [],
      endBanners = [],
      IconArr,
      msgNotices = [],
      blank = [],
    } = home;
    const {
      applSummary = {},
      commit = {}
    } = app;

    return (
      <Scroll>
        <div className={styles['home-wrap']}>
          <Button onClick={_ => Router.push('/credit/personal')} type={'primary'}>Test</Button>
          <Carousel dispatch={dispatch} banner={homeBanners.map((v) => ({ imgUrl: v.activityPicture, hrefUrl: v.activityUrl }))} />
          <div className={styles['notice-borrow-wrap']}>
            <WingBlank size={'lg'}>
              <Flex direction={'column'}>
                <NoticeBar msgNotices={msgNotices} />
                <WhiteSpace size={'md'}/>
                <CreditStatus blank={blank} applSummary={applSummary} commit={commit} />
              </Flex>
            </WingBlank>
            <GridItem IconArr={IconArr}/>
            <Carousel dispatch={dispatch} autoplayInterval={5000} bottom={true} banner={endBanners.map((v) => ({ imgUrl: v.activityPicture, hrefUrl: v.activityUrl }))} />
          </div>
        </div>
      </Scroll>
    );
  }
}

export default Home;
