import React, { Component } from 'react';
import PropTyps from 'prop-types';
import Input from 'component/Input';
import DatePicker from 'component/DatePicker';
import Picker from 'component/Picker';
import Textarea from 'component/Textarea';
import RpFormat from 'component/RpFormat'
import { List } from 'antd-mobile';
import styles from './index.scss';

class Form extends Component {
  render () {
    const { form, formItem } = this.props;
    const formRenderItem = formItem.map((item, key) => {
      if (item.compType === 'input') {
        return (<Input key={key} form={form} {...item}/>);
      } else if (item.compType === 'datePicker') {
        return (
          <DatePicker key={key} form={form} {...item} />
        );
      } else if (item.compType === 'picker') {
        return (
          <Picker key={key} form={form} {...item} />
        )
      } else if (item.compType === 'textarea') {
        return (
          <Textarea key={key} form={form} {...item} />
        )
      }else if (item.compType === 'rpFormat'){
        return (
          <RpFormat key={key} form={form} {...item} />
        )
      } else if (item.title) {
        return (
          <h2 key={key} className={styles['title']}>{item.title}</h2>
        )
      } else {
        return null;
      }
    });

    return(
      <List className={styles['form-wrap']}>
        { formRenderItem }
      </List>
    )
  }
}

Form.defaultProps = {
  form: {},
  formItem: [],
};

Form.propTypes = {
  form: PropTyps.object.isRequired,
  formItem: PropTyps.array,
};

export default Form;
