import React, { PureComponent } from 'react';
import router from 'umi/router';
import classnames from 'classnames';
import { Modal, List, Radio, Toast } from 'antd-mobile';
import './tranAccount.scss';
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

const RadioItem = Radio.RadioItem;

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

class TranAccount extends PureComponent {
  state = {
    value: null,
    data: [
      { value: 0, label: 'Erin.Pan ************ 1258' },
      { value: 1, label: 'Erin.Pan ************ 1256' },
      { value: 'connect', label: 'Connect an Existed Account' },
      { value: 'open', label: 'Open a New Account' },
    ]
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

  hideVisible = () => {
    this.props.hidden(false);
  };

  chooseAccount = () => {
    const { value } = this.state;
    const selOrCreateAccount = new Map();
    selOrCreateAccount
      .set('connect', () => router.push('/credit/bankAccount'))
      .set('open', () => Toast.info('Creating Ag Account'));
    if (selOrCreateAccount.get(value)) {
      selOrCreateAccount.get(value)();
    } else {
      this.hideVisible();
      value !== null && router.push('/credit/face');
    }
  };

  onChange = (value) => {
    this.setState({
      value
    })
  };

  render () {
    const { visible } = this.props;
    const { value, data } = this.state;
    return (
      <Modal
        visible={visible}
        transparent
        maskClosable={false}
        title={<div>Transaction Account Confirmation</div>}
        wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        className={'modal-wrap'}
        footer={[
          { text: 'Borrow Later', onPress: () => this.hideVisible(), style: {...cancelBtn} },
          { text: 'Confirm', onPress: () => this.chooseAccount(), style: {...confirmBtn} },
        ]}
      >
        <List>
          <p className={'desc'}>You need to confirm an AG account to receive money:</p>
          {
            data.map(item => (
              <RadioItem
                key={item.value}
                onChange={() => this.onChange(item.value)}
                checked={value === item.value}>
                <span className={classnames('label-name', { 'selected-color': value === item.value })}>{item.label}</span>
              </RadioItem>
            ))
          }
        </List>
      </Modal>
    )
  }
}

export default TranAccount;
