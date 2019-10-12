import React, { PureComponent } from 'react';
import classnames from 'classnames';
import BScroll from 'better-scroll';
import PropTypes from 'prop-types';
import styles from './index.scss';

class Scroll extends PureComponent {
  componentDidMount() {
    this.scroll = new BScroll(this.refs.wrap, {
      click: true,
      scrollY: true,
      mouseWheel: false,
      bounceTime: 300,
      swipeBounceTime: 300,
      swipeTime: 1000,
    });
    this.scroll.on('beforeScrollStart',() => {
      if(!!document.activeElement){
        document.activeElement.blur();
      }
    });
  }

  render() {
    const { children, wrapClass, height } = this.props;
    return (
      <div
        style={{ overflow: 'hidden', height }}
        className={classnames(wrapClass, styles.scrollView)}
        ref='wrap'
      >
        {children}
      </div>
    );
  }
}

Scroll.defaultProps = {
  children: null,
  wrapClass: '',
  height: document.body.clientHeight
};

Scroll.propTypes = {
  children: PropTypes.node,
  wrapClass: PropTypes.string,
};

export default Scroll;
