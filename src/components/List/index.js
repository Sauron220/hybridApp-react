import React, { PureComponent } from 'react';
import { List } from 'antd-mobile';
import propTypes from 'prop-types';
import styles from './index.scss';

const { Item } = List

class Index extends PureComponent {

  onClick = (item, isMore) => {
    const { onClick } = this.props
    if (onClick) {
      onClick(item, isMore)
    }
  }

  render () {
    const { title, isMore, dataSource = [], onClick, ...restProps } = this.props;
    const renderHeader = () => <div className={styles.title}>
      <div>{title}</div>
      {isMore ? <div className={styles.more} onClick={() => this.onClick(null, true)}>More</div> : null}
    </div>
    return (
      <React.Fragment>
        <List className={styles.list} renderHeader={renderHeader} {...restProps}>
          {dataSource.map((v, i) => {
            return (
              <Item
                key={i}
                className={styles.item}
                arrow="horizontal"
                onClick={() => this.onClick(v, false)}
                thumb={v.thumb}
                extra={v.extra}
              >
                <img className={styles.img} src={'icons/Lamp@2x.png'} /> {v.label}
              </Item>
            )
          })}
        </List>
      </React.Fragment>
    )
  }
}

Index.propTypes = {
  title: propTypes.oneOfType([propTypes.string, propTypes.element]),
  isMore: propTypes.bool,
  dataSource: propTypes.array.isRequired,
  onClick: propTypes.func,
};

export default Index;
