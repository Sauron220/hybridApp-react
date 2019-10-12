import React, { PureComponent } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import { List, TextareaItem } from 'antd-mobile';
import HOCondition from '../HOCondition';
import styles from './index.scss';

@HOCondition
class Textarea extends PureComponent {
  render () {
    const { form, name, title, label, placeholder, rules, ...restProps } = this.props;
    const { getFieldProps, getFieldError } = form;
    delete restProps.compType;
    return (
      <div className={styles['textarea-wrap']}>
        <List renderHeader={() => <div className={classnames(styles['label-name'], { [styles['validate-error']]: getFieldError(name) })}>{label}</div>}>
          <TextareaItem
            {
              ...getFieldProps(name, {
                ...rules,
              })
            }
            {...restProps}
            title={title}
            placeholder={placeholder}
            autoHeight={!restProps.count}
          />
        </List>
      </div>
    )
  }
}

Textarea.defaultProps = {
  form: {},
  rules: {},
  name: '',
  title: '',
  label: '',
  placeholder: '',
  condition: '',
};

Textarea.propTypes = {
  form: PropTypes.object,
  rules: PropTypes.object,
  name: PropTypes.string,
  title: PropTypes.string,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  condition: PropTypes.string,
};

export default Textarea;
