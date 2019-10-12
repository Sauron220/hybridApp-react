import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Picker, List } from 'antd-mobile';
import Icon from 'component/Icon';
import HOCondition from '../HOCondition';
import styles from './index.scss';
import { defaultFieldNames, getRealCols } from './utils';

const CustomChildren = props => {
  const { iconType, iconText, name, form, label, clickEvent, iconStyle } = props;
  const { getFieldValue, getFieldError, setFieldsValue } = form;
  return (
    <div
      className={
        classnames(
          styles['input-underline'],
          styles['cust-child-wrap'],
          {
            [styles['validate-error-underline']]: getFieldError(name)
          }
        )
      }
    >
      <div className={styles['cust-content-wrap']}>
        <div
          onClick={() => {
            setFieldsValue({[name]: null});
            props.onClick && props.onClick();
          }}
          className={
            classnames(
              [styles['label-root']],
              {
                [styles['label-focused']]: getFieldValue(name),
                [styles['label-error-color']]: getFieldError(name),
              },
            )
          }
        >
          <span>{label}</span>
          <p className={classnames([styles['label-root']], {[styles['label-value']]: getFieldValue(name) })}>{(getFieldValue(name) instanceof Array) ? getFieldValue(name).join(', ') : getFieldValue(name)}</p>
        </div>
        <div
          onClick={() => {
            const itemName = clickEvent();
            Object.keys(itemName).map((item) => setFieldsValue({ [item]: itemName[item] }))
          }}
          className={styles['icon-right']}>
          {iconType && (
            <span className={styles['icon-wrap']}>
              <Icon style={{...iconStyle}} className={classnames(styles['icon-width'])} type={iconType}/>
              <span className={styles['icon-desc-name']}>{iconText}</span>
            </span>
          )}
        </div>
      </div>
    </div>
  )
};

@HOCondition
class PickerWrap extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      fieldNames: props.defaultFieldNames || defaultFieldNames,
    };
  }

  render () {
    const { title, data, label, name, form, rules, iconType, iconText, clickEvent, iconStyle, ...restProps } = this.props;
    const { getFieldProps, getFieldValue, getFieldError } = form;
    const { fieldNames } = this.state;
    delete restProps.compType;
    return (
      <div className={classnames(styles['picker-warp'])}>
        <Picker
          {
            ...getFieldProps(name, {
              ...rules
            })
          }
          { ...restProps }
          data={getRealCols(data, fieldNames)}
          title={title}
        >
          {
            !clickEvent ? (<List.Item
              className={
                classnames({
                  [styles['validate-error-underline']]: getFieldError(name),
                  [[styles['input-underline']]]: !getFieldError(name),
                })
              }
              arrow={!iconType ? 'horizontal' : ''}>
            <span
              className={
                classnames(
                  [styles['label-root']],
                  {
                    [styles['label-focused']]: getFieldValue(name),
                    [styles['label-error-color']]: getFieldError(name),
                  },
                )
              }
            >{label}</span>
              <List.Item.Brief>{getFieldValue(name) && getFieldValue(name).join(', ')}</List.Item.Brief>
            </List.Item>) : (<CustomChildren iconStyle={iconStyle} clickEvent={clickEvent} name={name} label={label} iconText={iconText} iconType={iconType} form={form} />)
          }
        </Picker>
      </div>
    )
  }
}

PickerWrap.defaultProps = {
  label: '',
  form: {},
  name: '',
  rules: {},
  data: [],
  defaultFieldNames,
  title: '',
  condition: '',
};

PickerWrap.propTypes = {
  label: PropTypes.string,
  form: PropTypes.object,
  name: PropTypes.string,
  rules: PropTypes.object,
  data: PropTypes.array,
  defaultFieldNames: PropTypes.object,
  title: PropTypes.string,
  condition: PropTypes.string,
};

export default PickerWrap;
