import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Icon } from 'antd-mobile';
import HOCondition from '../HOCondition';
import styles from './index.scss';

class InputItem extends PureComponent {
  static defaultProps = {
    type: 'text',
  };

  static propTypes = {
    type: PropTypes.string,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
  };

  constructor(props) {
    super(props);
    const value = typeof props.value === 'undefined' ? props.defaultValue : props.value;
    this.state = {
      value,
    };
  }

  componentDidUpdate() {
  }

  static getDerivedStateFromProps(nextProps) {
    if ('value' in nextProps) {
      return {
        value: nextProps.value,
      };
    }
    return null;
  }

  setValue = (value, e, callback) => {
    if (!('value' in this.props)) {
      this.setState({ value }, callback);
    }
    const { onChange } = this.props;
    if (onChange) {
      onChange(e);
    }
  };

  onChange = (e) => {
    this.setValue(e.target.value, e);
  };

  saveInput = (node) => {
    this.input = node;
  };

  focus() {
    this.input.focus();
  }

  blur() {
    this.input.blur();
  }

  select() {
    this.input.select();
  }

  onBlur = (e) => {
    const { onBlur } = this.props;
    if (onBlur) {
      onBlur(e);
    }
    const scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
    window.scrollTo({
      top: scrollHeight,
      behavior: 'smooth'
    });
  };

  render() {
    const { value } = this.state;
    const { onChange, type, ...restProps } = this.props;
    return <input ref={this.saveInput} {...restProps} type={type === 'number' ? 'tel' : type} value={value}
                  onChange={this.onChange} onBlur={this.onBlur} />;
  }
}

@HOCondition
class Input extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      focused: props.rules.initialValue,
    };
  }

  render() {
    const { label, type, clear, form, rules, name, extra, onExtraClick, ...restProps } = this.props;
    const { getFieldProps, getFieldValue, setFieldsValue, getFieldError } = form;
    delete restProps.compType;
    return (
      <div key={name} className={styles['form-input-root']}>
        <label
          className={
            classnames(
              [styles['form-label-root']],
              [styles['input-label-root']],
              [styles['input-label-formControl']],
              [styles['input-label-animated']],
              [styles['input-label-marginDense']],
              {
                [styles['input-label-shrink']]: getFieldValue(name) || this.state.focused,
                [styles['label-focused']]: getFieldValue(name) || this.state.focused,
                [styles['validate-error']]: getFieldError(name),
              },
            )
          }
        >{label}</label>
        <div
          className={
            classnames(
              [styles['input-base-root']],
              [styles['input-root']],
              {
                [styles['label-focused']]: this.state.focused,
                [styles['input-underline']]: !getFieldError(name),
                [styles['input-error-underline']]: getFieldError(name),
              },
            )
          }
        >
          <InputItem
            {
              ...getFieldProps(name, {
                ...Object.assign({ initialValue: '' }, rules || {}),
              })
            }
            {...restProps}
            className={
              classnames(
                [styles['input-base-input']],
                [styles['input-inputMarginDense']],
              )
            }
            key={name}
            type={type}
            onFocus={(e) => this.setState({ focused: true })}
            onBlur={(e) => {
              this.setState({ focused: getFieldValue(name) });
            }}/>
          {
            (this.state.focused || getFieldValue(name)) && clear && (
              <Icon
                className={styles['icon-clear']}
                type={'cross-circle-o'}
                size={'xs'}
                onClick={() => {
                  setFieldsValue({ [name]: '' });
                  this.state.focused = false;
                }}
                color={'#DFDFDF'}/>
            )
          }
          {extra && <div className={styles.extra} onClick={onExtraClick}>{extra}</div>}
        </div>
      </div>
    );
  }
}

Input.defaultProps = {
  label: '',
  type: 'text',
  clear: true,
  form: {},
  rules: {},
  condition: '',
  extra: '',
  onExtraClick() {},
};

Input.propTypes = {
  label: PropTypes.string,
  type: PropTypes.oneOf(['text', 'number', 'email', 'tel']),
  clear: PropTypes.bool,
  form: PropTypes.object,
  rules: PropTypes.object,
  condition: PropTypes.string,
  extra: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  onExtraClick: PropTypes.func,
};

export default Input;
