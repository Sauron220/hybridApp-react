import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from 'antd-mobile';
import router from 'umi/router';
import styles from 'assets/scss/home/home.scss';

class GridItem extends Component {

  nextPage = (item) => {
    const { url = '' } = item;
    url && router.push(url);
  };

  render () {
    const { IconArr = [] } = this.props;
    return (
      <div className={styles['bottom-icon-wrap']}>
        <Grid
          columnNum={3}
          hasLine={false}
          activeStyle={false}
          square={false}
          data={IconArr}
          onClick={this.nextPage}
          renderItem={item => (
            <div style={{ padding: '0' }}>
              <img className={styles['bottom-icon-item']} src={item.icon} alt=""/>
              <p className={styles['bottom-icon-text']}>{item.text}</p>
            </div>
          )}
        />
      </div>
    )
  }
}

GridItem.propTypes = {
  IconArr: PropTypes.array,
};

export default GridItem;
