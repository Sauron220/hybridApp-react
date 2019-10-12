import React, { Component } from 'react';
import Router from 'umi/router';
import { connect } from 'dva';
import { List, WhiteSpace, Button } from 'antd-mobile';
import Scroll from 'component/Scroll';
import { invoke } from 'libs/native';
import styles from 'assets/scss/mine/mine.scss';
import userImg from 'assets/img/user.png';

@connect(({ mine }) => ({ mine }))
class Mine extends Component {

  nextPage = (url) => {
    if (url === 'toExternalLink') {
      invoke('toExternalLink')({
        urlStr: 'itms-apps://itunes.apple.com/app/1471295273?action=write-review',
      });
    } else {
      url && Router.push(url);
    }
  };

  render() {
    const { mine } = this.props;
    return (
      <Scroll height={window.innerHeight - 50}>
        <div className={styles.mine}>
          <div className={styles['user-info']}>
            <img className={styles['user-img']} src={userImg} alt=""/>
            {
              mine.isLogin ? (
                <>
                  <p className={styles.textStyle}>Have a nice day</p>
                  <p className={styles.textStyle}>+62********01</p>
                </>
              ) : (
                <>
                  <p className={styles.welcomeTip}>Welcome</p>
                  <Button className={styles.logIn}>Log in</Button>
                </>
              )
            }
          </div>
          <List>
            {
              mine.list.filter(item => {
                return !mine.isLogin ? !['Bank Account Management', 'Password Management'].includes(item.text) : item;
              }).map((item, key) => (
                (item.text) ? (
                  <List.Item
                    thumb={item.icon ? item.icon : ''}
                    platform="android" onClick={() => this.nextPage(item.url)} multipleLine arrow="horizontal" key={key}>
                    {item.text}
                  </List.Item>
                ) : (
                  <WhiteSpace key={key} style={{ backgroundColor: '#F6F7FA' }} size="lg"/>
                )
              ))
            }
          </List>
          {
            mine.isLogin && (
              <>
                <Button className={styles.logOut}>Log out</Button>
                <WhiteSpace style={{ backgroundColor: '#F6F7FA' }} size="lg"/>
              </>
            )
          }
        </div>
      </Scroll>
    );
  }
}

export default Mine;
