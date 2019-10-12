import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { NoticeBar, Flex } from 'antd-mobile';
import Icon from 'component/Icon';
import styles from 'assets/scss/home/home.scss';

class Noticebar extends PureComponent {

  jumpNext = (item) => {
    console.log(item);
  };

  render() {
    const {
      msgNotices = [],
    } = this.props;

    return (
      <Flex.Item style={{ width: '100%' }}>
        <NoticeBar
          icon={<Icon type={'icontongzhi1'}/>}
          className={styles['notice-bg']}
          marqueeProps={{ loop: true, style: { padding: '0 10px' } }}
        >
          {
            msgNotices.map((item, key) => (
              <span onClick={() => this.jumpNext(item)} className={styles['notice-con-item']} key={key}>{item['activityContent']}</span>
            ))
          }
        </NoticeBar>
      </Flex.Item>
    );
  }
}

Noticebar.propTypes = {
  msgNotices: PropTypes.array,
};

export default Noticebar;
