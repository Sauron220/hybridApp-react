import React, { Component } from 'react';
import { List, Button } from 'antd-mobile';
import { connect } from 'dva';
import styles from 'assets/scss/branches/branches.scss'
const Item = List.Item;
const Brief = Item.Brief;

@connect(({ branches }) => ({ branches }))
class NearByBranches extends Component {

  render() {
    const { branches } = this.props;
    return (
      <div className={styles.branches}>
        <List className={styles.listItem}>
        {
          branches.listData.map((item, key)=> (
            <Item key={key} extra={item.distance} multipleLine align="top" wrap>
              {item.name}<Brief>{item.tel}</Brief>
              <p className={styles.addStyle}>{item.address}</p>
            </Item>
            ))
        }
        </List>

        <div className={styles.footerBtn}>
          {
            branches.isSuccess ? (
              <>
                <span>Location Service is disabled. </span>
                <Button inline>Turn on</Button>
              </>
            ) : (
              <>
                <span>Failed to access location. </span>
                <Button inline>Try Again</Button>
              </>
            )
          }
        </div>
      </div>
    );
  }
}

export default NearByBranches
