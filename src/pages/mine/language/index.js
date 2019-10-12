import React, { Component } from 'react';
import { Menu } from 'antd-mobile';
import styles from 'assets/scss/mine/language.scss';

const data = [
  {
    value: '1',
    label: 'Auto'
  }, {
    value: '2',
    label: 'Bahasa Indonesia'
  },
  {
    value: '3',
    label: 'English'
  },
];

class Language extends Component {
  onChange = (value) => {
    let label = '';
    data.forEach((dataItem) => {
      if (dataItem.value === value[0]) {
        label = dataItem.label;
        if (dataItem.children && value[1]) {
          dataItem.children.forEach((cItem) => {
            if (cItem.value === value[1]) {
              label += ` ${cItem.label}`;
            }
          });
        }
      }
    });
    console.log(label);
  }

  render() {
    const menuEl = (
      <Menu
        className={styles['single-foo-menu']}
        data={data}
        value={['1']}
        level={1}
        onChange={this.onChange}
        height={204}
      />
    );

    return (
      <div className={styles["single-menu"]}>
        {menuEl}
      </div>
    );
  }
}

export default Language
