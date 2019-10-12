import React, { PureComponent } from 'react';
import { Grid } from 'antd-mobile';
import propTypes from 'prop-types';
import styles from './index.scss';

class Index extends PureComponent {

  onClick = (item) => {
    const { onClick } = this.props;
    if (onClick) {
      onClick(item)
    }
  };

  render () {
    const { title, dataSource = [], onClick, ...restProps } = this.props;
    const renderItem = (v) => (
      <div className={styles.item} onClick={() => this.onClick(v)}>
        {v.icon ? <img className={styles.icon} src={v.icon} /> : null}
        <div className={styles.label}>{v.label}</div>
      </div>
    );
    return (
      <div className={styles.wrap}>
        <div className={styles.title}>{title}</div>
        <Grid
          data={dataSource}
          columnNum={3}
          renderItem={renderItem}
          {...restProps}
        />
      </div>
    )
  }
}

Index.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  dataSource: propTypes.array.isRequired,
  onClick: propTypes.func,
};

export default Index;
