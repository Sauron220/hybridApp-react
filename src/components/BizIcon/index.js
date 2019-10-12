import React from 'react';
import classnames from 'classnames';
import styles from './index.scss';

const BizIcon = props => {
  const { type } = props;
  return <i className={classnames('iconfont', type, styles['icon-style'])}/>;
};

export default BizIcon;
