import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { Link } from 'umi';
import styles from './Footer.scss';

class Footer extends PureComponent {
  render () {
    const { to, isFixed, backgroundColor } = this.props
    return (
      <Link className={classnames(styles.link, { [styles.fixed]: isFixed })} style={{ backgroundColor }} to={to || '/'}>
        Still Need Help? <span className={styles.text}>Leave a message.</span>
      </Link>
    )
  }
}

Footer.propTypes = {
  to: propTypes.string,
  isFixed: propTypes.bool,
  backgroundColor: propTypes.string,
}

export default Footer;
