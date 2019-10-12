import React from 'react';
import PropTypes from 'prop-types';
import { Modal } from 'antd-mobile';
import styles from './index.scss';
// reset cancel style
const cancelBtn = {
  fontSize: '17px',
  color: '#959595',
  letterSpacing: 0,
  textAlign: 'center',
};
// reset confirm style
const confirmBtn = {
  fontSize: '17px',
  color: '#2756D7',
  letterSpacing: 0,
  textAlign: 'center',
};

function closest(el, selector) {
  const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
  while (el) {
    if (matchesSelector.call(el, selector)) {
      return el;
    }
    el = el.parentElement;
  }
  return null;
}

class Alert extends React.PureComponent {

  onClose = () => {
    this.props.closeModal();
  };

  onSuccess = () => {
    this.props.success();
  };

  onWrapTouchStart = (e) => {
    // fix touch to scroll background page on iOS
    if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
      return;
    }
    const pNode = closest(e.target, '.am-modal-content');
    if (!pNode) {
      e.preventDefault();
    }
  };

  render() {
    const { show, children, title, showCancel } = this.props;
    const actionBtns = showCancel ? [
      { text: 'Cancel', onPress: () => { this.onClose(); }, style: {...cancelBtn} },
      { text: 'Confirm', onPress: () => { this.onSuccess(); }, style: {...confirmBtn} }
    ] : [
      { text: 'Confirm', onPress: () => { this.onSuccess(); }, style: {...confirmBtn} }
    ];
    return (
      <Modal
        className={styles['modal-wrap']}
        visible={show}
        transparent
        maskClosable={false}
        onClose={() => this.onClose()}
        title={title}
        footer={actionBtns}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        afterClose={() => {}}
      >
        <div className={styles['content-wrap']}>
          {children}
        </div>
      </Modal>
    )
  }
}

Alert.defaultProps = {
  show: false,
  title: '',
  children: null,
  showCancel: true,
};

Alert.propTypes = {
  show: PropTypes.bool,
  title: PropTypes.string,
  children: PropTypes.element,
  showCancel: PropTypes.bool,
};

export default Alert;
