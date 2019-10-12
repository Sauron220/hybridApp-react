import React, { Component } from 'react';
import styles from 'assets/scss/mine/pwd.scss'
import { List} from 'antd-mobile';
import Router from 'umi/router';

const Item = List.Item;

class PasswordManagement extends Component {
  render() {
    return (
      <div className={styles.pwd}>
        <List>
          <Item arrow="horizontal" onClick={() => {Router.push('/mine/passwordManagement/resetLogin')}}>Reset Login Password</Item>
          <Item arrow="horizontal" onClick={() => {Router.push('/mine/passwordManagement/resetTransaction')}}>Reset Transaction Password</Item>
        </List>
      </div>
    )
  }
}

export default PasswordManagement
