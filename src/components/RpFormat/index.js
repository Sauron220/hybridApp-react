import React, {PureComponent} from 'react'
import styles from './index.scss'
import classnames from 'classnames';
import { formatMoney } from 'libs/tools';

class RpFormat extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      money: ''
    }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.onFocus = this.onFocus.bind(this)
  }

  onChange(event) {
    this.setState({
      money: event.target.value
    })
  }
  onFocus(event){
    const data = event.target.value.split('.').join('')
    this.setState({
      money: data
    })
  }

  onBlur(event){
    const data = formatMoney(event.target.value, 0)
    this.setState({
      money: data
    })
    this.props.form.setFieldsValue({
      [this.props.name]: event.target.value,
    });
  }

  render() {
    const { label, type, form, rules, name, ...restProps } = this.props;
    const { getFieldProps, getFieldValue, setFieldsValue, getFieldError } = form;
    delete restProps.compType;
    return (
      <div className={styles['rp-format']}>
        <label className={styles['rp-label']}>{label}</label>
        <span className={styles['span-style']}>Rp.</span>
        <input
          {
            ...getFieldProps(name, {
              ...rules
            })
          }

          {...restProps}
          className={
            classnames(
              [styles['input-base-input']]
            )
          }
          key={name}
          type={type}
          value={this.state.money}
          onChange={this.onChange}
          onBlur={this.onBlur}
          onFocus={this.onFocus}
          />
        <span className={styles['span-style']}>00.000</span>
      </div>
    )
  }
}
export default RpFormat
