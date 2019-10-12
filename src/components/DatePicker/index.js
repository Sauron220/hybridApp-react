import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import { DatePicker, List } from 'antd-mobile';
import { formatDate } from 'libs/tools';
import HOCondition from '../HOCondition';
import styles from './index.scss';

@HOCondition
class DatePick extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render () {
    const { label, form, name, rules, mode, formatType, ...restProps } = this.props;
    const { getFieldProps, getFieldValue, getFieldError } = form;
    delete restProps.compType;
    return (
      <div className={styles.dateWarp}>
        <DatePicker
          {
            ...getFieldProps(name, {
              ...rules,
            })
          }
          {...restProps}
          mode={mode}
          extra={' '}
          format={(d) => formatDate(d, formatType)}
        >
          <List.Item
            className={
              classnames({
                [styles['validate-error-underline']]: getFieldError(name),
                [[styles['input-underline']]]: !getFieldError(name),
              })
            }
            arrow="horizontal">
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
            <List.Item.Brief className={styles['input-date-value']}>{formatDate(getFieldValue(name), formatType)}</List.Item.Brief>
          </List.Item>
        </DatePicker>
      </div>
    )
  }
}

DatePick.defaultProps = {
  label: '',
  form: {},
  name: '',
  rules: {},
  mode: 'date',
  formatType: 'default',
  condition: '',
};

DatePick.propTypes = {
  label: propTypes.string,
  form: propTypes.object,
  name: propTypes.string,
  rules: propTypes.object,
  condition: propTypes.string,
  formatType: propTypes.oneOf(['default', 'hm', 'hms']),
};

export default DatePick;
