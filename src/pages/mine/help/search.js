import React, { Component } from 'react';
import { connect } from 'dva';
import Router from 'umi/router';
import { md5Data, i18n } from 'libs/tools';
import { List } from 'component';
import Filter from './components/Filter';
import styles from 'assets/scss/mine/help.scss';

@connect(({ help }) => ({ help }))
class Help extends Component {

  queryCrmHelpByName = (newQuery = {}) => {
    const { dispatch, location } = this.props;
    const params = {
      ...location.query,
      ...newQuery,
    };
    dispatch({
      type: 'help/queryCrmHelpByName',
      payload: {
        keycode: md5Data(params.name),
        ...params,
      }
    });
    Router.replace({ pathname: location.pathname, query: params })
  };

  componentDidMount() {
    this.queryCrmHelpByName()
  }

  get filterProps() {
    const { dispatch, help, location } = this.props;
    const { filter } = help;

    return {
      filter,
      hide: true,
      start: true,
      defaultValue: location.query.name,
      onFilterChange: (value) => {
        if (!value) return;
        dispatch({
          type: 'help/filter',
          payload: (filter.find((v) => v === value) ? filter : [value, ...filter]).slice(0, 2),
        });
        this.queryCrmHelpByName({ name: value })
      },
    }
  }

  get listProps() {
    const { help } = this.props;
    const dataSource = help.searchList.map((v) => ({ ...v, label: v.title }));

    return {
      dataSource,
      onClick(v) {
        Router.push(`/mine/help/${v._id}`);
      },
    }
  }

  render () {
    const { help } = this.props;
    const isEmpty = !help.searchList.length;

    return (
      <div className={styles.wrap} style={{ padding: 0 }}>
        <Filter {...this.filterProps} />
        {!isEmpty ? <List {...this.listProps} />
        : <div className={styles.empty}>
          <img className={styles.img} src={'icons/Empty@2x.png'} />
          <div className={styles.text}>Not found</div>
        </div>}
      </div>
    )
  }
}

export default Help;
