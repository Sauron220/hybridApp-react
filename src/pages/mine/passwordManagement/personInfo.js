import React, { Component } from 'react';
import { createForm } from 'rc-form';
import Form from 'component/Form';
import styles from 'assets/scss/mine/personInfo.scss'
import {Button, Modal} from 'antd-mobile'

const mapFormItem = [
{
  name: 'Full Name',
  label: 'Full Name',
  type: 'text',
  compType: 'input',
},
  {
    name: 'KTP No.',
    label: 'KTP No.',
    type: 'text',
    compType: 'input',
  }
]

@createForm()
class PersonInfo extends Component{
  constructor(props) {
    super(props);
    this.nextSubmit = this.nextSubmit.bind(this)
    this.state = {
      show: false
    }
  }

  nextSubmit(){
    this.setState({ show: true });
  }

  render() {
    const { form } = this.props;
    const { getFieldProps } = form;
    return (
      <div className={styles.personInfo}>
        <p className={styles.tip}>Please fill in your personal information</p>
        <Form form={form} formItem={mapFormItem} />
        <Button className={styles.nextBtn} onClick={this.nextSubmit}>Next</Button>

        <Modal
          visible={this.state.show}
          transparent
          maskClosable={false}
          onClose={  () => {
            this.setState({ show: false });
          }}
          footer={[{ text: 'OK', onPress: () => {  this.setState({ show: false }); } }]}
        >
         <p style={{textAlign: 'left', color: '#6D7278'}}>Please receive the verification code on the phone number as you sign up！</p>
        </Modal>

      </div>
    )
  }
}

export default PersonInfo
