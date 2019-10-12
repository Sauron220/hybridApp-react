import React from 'react'
import ReactDOM from 'react-dom'
import Alert from './index'

function Modal(props = {}) {
	return <Alert {...props} />
}

function confirm(props = {}) {
  const div = document.createElement('div')
  document.body.appendChild(div)

  function close() {
    const unmountResult = ReactDOM.unmountComponentAtNode(div);
    if (unmountResult) {
      div.parentNode.removeChild(div);
    }
  }

  function onCancel() {
    let cancelFn = props.onCancel || props.closeModal;
    if (cancelFn) {
      let ret;
      if (cancelFn.length) {
        ret = cancelFn(close);
      } else {
        ret = cancelFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  function onOk() {
    let okFn = props.onOk || props.success;
    if (okFn) {
      let ret;
      if (okFn.length) {
        ret = okFn(close);
      } else {
        ret = okFn();
        if (!ret) {
          close();
        }
      }
      if (ret && ret.then) {
        ret.then(close);
      }
    } else {
      close();
    }
  }

  const modalProps = {
    closeModal: onCancel,
    success: onOk,
    show: true,
    title: props.title,
    showCancel: props.showCancel,
    children: <React.Fragment>{props.content}</React.Fragment>,
  }

  ReactDOM.render(<Modal {...modalProps} />, div)

  return {
    destroy: close,
  }
}

Modal.confirm = confirm

export default Modal
export {
	confirm,
}