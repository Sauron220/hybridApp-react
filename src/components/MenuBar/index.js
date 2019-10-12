import React, { PureComponent } from 'react';
import { TabBar } from 'antd-mobile';
import Router from 'umi/router';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import BizIcon from '../BizIcon';
import them from '@/theme';
import styles from './index.scss'

const tabBarData = [
  {
    title: 'Home',
    icon: 'iconHome',
    selectedIcon: 'iconHome',
    link: '/'
  },
  // {
  //   title: 'Coupon',
  //   icon: 'fenlei',
  //   selectedIcon: 'fenlei',
  //   link: '/coupon',
  // },
  {
    title: 'Mine',
    icon: 'iconwode',
    selectedIcon: 'iconwode',
    link: '/mine',
  },
];

class MenuBar extends PureComponent {
  render () {
    const { isMenuBar, children, pathname } = this.props;
    return (
      <div className={styles.tabWarp}>
        <TabBar hidden={isMenuBar} tintColor={them.primaryColor}>
          {
            !isMenuBar ? tabBarData.map(({ icon, selectedIcon, link }) => (
              <TabBar.Item
                key={link}
                title={''}
                icon={<BizIcon type={icon} />}
                selectedIcon={<BizIcon type={selectedIcon} />}
                selected={pathname === link}
                onPress={() => Router.push(`${link}`)}
              >
                <div className={classnames({
                  [styles['am-tab-bar-item']]: !isMenuBar,
                  [styles['am-tab-bar-item-no-padding']]: isMenuBar,
                })}>
                  { pathname === link && children }
                </div>
              </TabBar.Item>
            )) : (
              <TabBar.Item
                key={pathname}
                title={''}
              >
                <div className={classnames({
                  [styles['am-tab-bar-item']]: !isMenuBar,
                  [styles['am-tab-bar-item-no-padding']]: isMenuBar,
                })}>
                  { children }
                </div>
              </TabBar.Item>
            )
          }
        </TabBar>
      </div>
    )
  }
}

MenuBar.defaultProps = {
  isMenuBar: false,
  children: null,
  pathname: '/'
};

MenuBar.propTypes = {
  isMenuBar: PropTypes.bool,
  children: PropTypes.node,
  pathname: PropTypes.string,
};

export default MenuBar;
