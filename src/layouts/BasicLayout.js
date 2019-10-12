import React, { PureComponent } from 'react';
import withRouter from 'umi/withRouter';
import MenuBar from 'component/MenuBar';
import { connect } from 'dva';
import { LocaleProvider } from 'antd-mobile';
import { setLanguage } from 'locales';
import { TransitionGroup, CSSTransition } from "react-transition-group";
// import styles from './BasicLayout.scss'

// 底部有bar菜单
const BarRoutes = ['/', '/mine', '/coupon'];
const lan = setLanguage();

class BasicLayout extends PureComponent {

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    const { children, location, history } = this.props;
    const ANIMATION_MAP = {
      PUSH: 'forward-from-right',
      POP: 'back-to-right'
    };
    const isShowBar = !BarRoutes.includes(location.pathname);

    return (
      <LocaleProvider locale={lan}>
        <TransitionGroup
          className={'router-wrapper'}
          enter={isShowBar}
          exit={isShowBar}
          childFactory={child => React.cloneElement(child,
            { classNames: ANIMATION_MAP[history.action] },
          )}
        >
          <CSSTransition key={location.pathname} timeout={250}>
            <div style={{ overflowX: 'hidden', height: '100%', width: '100%' }}>
              <MenuBar isMenuBar={isShowBar} pathname={location.pathname}>
                {children}
              </MenuBar>
            </div>
          </CSSTransition>
        </TransitionGroup>
      </LocaleProvider>
    );
  }
}

export default withRouter(connect(({ app, loading }) => ({ app, loading }))(BasicLayout));
